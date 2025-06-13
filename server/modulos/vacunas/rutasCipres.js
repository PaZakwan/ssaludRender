const express = require("express");
const axios = require("axios");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectSetUnset, isObjectIdValid} = require(process.env.MAIN_FOLDER +
  "/tools/object");
const {guardarFile, leerFile} = require(process.env.MAIN_FOLDER + "/tools/file");
const {groupBy} = require(process.env.MAIN_FOLDER + "/tools/object");
const {capitalize, checkIsValidJson} = require(process.env.MAIN_FOLDER + "/tools/string");

const Area = require(process.env.MAIN_FOLDER + "/modulos/main/models/area");
const VacunaAplicacion = require("./models/vacuna_aplicacion");

const app = express();

// SISTEMA NOMIVAC... SISA (NACION)
// https://sisa.msal.gov.ar/sisadoc/docs/050203/nomivac_intro.jsp
// SISTEMA CIPRES... (Provincia)
// https://www.youtube.com/watch?v=KngcLXJFo9Q

// {
// "fechaAplicacion": "2023-02-12",
// "fechaVencimiento": "2025-02-12",
// "lote": "SASASASA",

// // paciente => (buscar) documento/tipo_doc/sexo -> id;
// // [Recien nacidos | Indocumentados] NI IDEA COMO CARGAR...
// "paciente": "api/paciente/{id}",

// // establecimiento => (archivo temporal) SISA (codigoRefes) (origen.area.SISA) -> id (origen.area.RUPES) (id_cipres) (id_IRA)
// "establecimiento": "/api/establecimiento/dependencia/{id}",

// // dosis => (archivo temporal) descripcionDosis -> id
// "dosis": "/api/vacunacion/dosis/{id}",

// // planVacunacion => (archivo temporal) vacuna, dosis, estrategia(motivo/esquema), poblacion -> id
// // chicos -> antigripal adultos (dosisAdministrada : media dosis)
// "planVacunacion": "/api/vacunacion/plan_vacunacion/{id}"
// }

const getDataBaseCipres = async () => {
  // return datos temporales diarios de cipres { CIPRES } o { error }
  try {
    // verificar que el sistema cuenta con la APIKEY del CIPRES
    if (!process.env.CIPRES_URL || !process.env.CIPRES_USR || !process.env.CIPRES_PSR)
      return {
        error: {message: "El sistema no cuenta con acceso a CIPRES al momento.", status: 501},
      };

    // leer archivo -> CIPRES.json
    let CIPRES = await leerFile({
      fileName: "CIPRES",
      fileExtension: "json",
      route: "../file_server/opciones",
    });
    if (CIPRES.error) {
      CIPRES = {
        date: "",
        tkn: "",
        establecimientoSISARUPES: {},
        dosis: {},
        motivos: {},
        esquemas: {},
        planVacunacionesVacunaNOMIVAC: {},
        planVacunacionesVacunaNOMIVACQty: 0,
        dosisUsadosEnPlanes: {},
        vacunasUsadasEnPlanes: {},
        motivosUsadosEnPlanes: {},
        esquemasUsadosEnPlanes: {},
      };
    } else {
      CIPRES = {
        ...{
          date: "",
          tkn: "",
          establecimientoSISARUPES: {},
          dosis: {},
          motivos: {},
          esquemas: {},
          planVacunacionesVacunaNOMIVAC: {},
          planVacunacionesVacunaNOMIVACQty: 0,
          dosisUsadosEnPlanes: {},
          vacunasUsadasEnPlanes: {},
          motivosUsadosEnPlanes: {},
          esquemasUsadosEnPlanes: {},
        },
        ...checkIsValidJson(CIPRES),
      };
    }
    // verifica token y recarga (duracion token 3 hs -> 180 => recarga cada 2hs 55m -> 175m )
    if (!CIPRES.tkn || new Date().getTime() - CIPRES.date >= 175 * 60 * 1000) {
      CIPRES = {
        date: "",
        tkn: "",
        establecimientoSISARUPES: {},
        dosis: {},
        motivos: {},
        esquemas: {},
        planVacunacionesVacunaNOMIVAC: {},
        planVacunacionesVacunaNOMIVACQty: 0,
        dosisUsadosEnPlanes: {},
        vacunasUsadasEnPlanes: {},
        motivosUsadosEnPlanes: {},
        esquemasUsadosEnPlanes: {},
      };

      let respuesta = await axios.post(
        `${process.env.CIPRES_URL}/login`,
        {
          username: process.env.CIPRES_USR,
          password: process.env.CIPRES_PSR,
          realusername: "Api Moreno SIGISESAM",
        },
        {headers: {"content-type": "application/json"}}
      );
      if (respuesta?.data?.token) {
        CIPRES.tkn = respuesta.data.token;
        CIPRES.date = new Date().getTime();
      }

      // dosis;
      respuesta = await axios.get(`${process.env.CIPRES_URL}/api/vacunacion/dosis`, {
        headers: {Authorization: `Bearer ${CIPRES.tkn}`},
      });
      if (respuesta?.data?.["hydra:member"]) {
        CIPRES.dosis = respuesta.data["hydra:member"];
        // format {descripcion : @id}
        CIPRES.dosis = CIPRES.dosis.reduce(
          (acc, curr) => ((acc[curr.descripcionDosis] = curr["@id"]), acc),
          {}
        );
      }

      // motivos;
      respuesta = await axios.get(`${process.env.CIPRES_URL}/api/vacunacion/motivos`, {
        headers: {Authorization: `Bearer ${CIPRES.tkn}`},
      });
      if (respuesta?.data?.["hydra:member"]) {
        CIPRES.motivos = respuesta.data["hydra:member"];
        // format {descripcion : @id}
        CIPRES.motivos = CIPRES.motivos.reduce(
          (acc, curr) => ((acc[curr.descripcionMotivo] = curr["@id"]), acc),
          {}
        );
      }

      // esquemas;
      respuesta = await axios.get(`${process.env.CIPRES_URL}/api/vacunacion/esquemas`, {
        headers: {Authorization: `Bearer ${CIPRES.tkn}`},
      });
      if (respuesta?.data?.["hydra:member"]) {
        CIPRES.esquemas = respuesta.data["hydra:member"];
        // format {descripcion : @id}
        CIPRES.esquemas = CIPRES.esquemas.reduce(
          (acc, curr) => ((acc[curr.descripcionEsquema] = curr["@id"]), acc),
          {}
        );
      }

      // establecimiento (Vacunatorios con SISA);
      // Buscar en mi DB area vacunatorios con SISA { id : SISA } y no (RUPES) CIPRES
      respuesta = await Area.aggregate()
        .collation({locale: "es", numericOrdering: true})
        .match({vacunatorio: "true", SISA: {$exists: true}, RUPES: {$exists: false}})
        .project({
          _id: 1,
          area: 1,
          SISA: 1,
          RUPES: 1,
        })
        .sort({area: 1})
        .exec();
      // loop en mi DB -> establecimientoSISARUPES { SISA : localDescripcion, descripcion, RUPES, id }
      await Promise.all(
        respuesta.map(async (area) => {
          let temp = await axios.get(
            `${process.env.CIPRES_URL}/api/establecimiento/establecimientos?codigoSisa=${area.SISA}`,
            {
              headers: {Authorization: `Bearer ${CIPRES.tkn}`},
            }
          );

          CIPRES.establecimientoSISARUPES[area.SISA] = {
            localDescripcion: area.area,
          };
          if (temp?.data?.["hydra:member"]?.[0]) {
            // format { SISA : area, descripcion, RUPES, id }
            CIPRES.establecimientoSISARUPES[area.SISA].descripcion =
              temp.data["hydra:member"][0]["descripcion"];
            CIPRES.establecimientoSISARUPES[area.SISA].RUPES = temp.data["hydra:member"][0]["id"];
            CIPRES.establecimientoSISARUPES[area.SISA].id = temp.data["hydra:member"][0]["@id"];
          }
        })
      );

      // planVacunacion;
      // recorrer paginas hasta que este vacio
      let page = 0;
      CIPRES.planVacunacionesVacunaNOMIVAC = [];
      while (true) {
        page++;
        respuesta = await axios.get(
          `${process.env.CIPRES_URL}/api/vacunacion/planes_vacunacion?page=${page}`,
          {
            headers: {Authorization: `Bearer ${CIPRES.tkn}`},
          }
        );
        if (respuesta?.data?.["hydra:member"].length > 0) {
          CIPRES.planVacunacionesVacunaNOMIVAC.push(...respuesta.data["hydra:member"]);
        } else {
          break;
        }
      }
      // formato planVacunacionesVacunaNOMIVAC {vacuna(id) : {...}}
      CIPRES.planVacunacionesVacunaNOMIVAC = CIPRES.planVacunacionesVacunaNOMIVAC.map((plan) => {
        CIPRES.vacunasUsadasEnPlanes[plan.vacuna.descripcionVacuna] = plan.vacuna.idNomivac;
        CIPRES.motivosUsadosEnPlanes[plan.motivo.descripcionMotivo] = plan.idMotivoNomivac;
        CIPRES.esquemasUsadosEnPlanes[plan.esquema.descripcionEsquema] = plan.idEsquemaNomivac;
        return {
          id: plan.id,
          descripcionPlan: plan.descripcionPlan,
          vacuna: {
            id: plan.vacuna.id,
            descripcionVacuna: plan.vacuna.descripcionVacuna,
            idNomivac: plan.vacuna.idNomivac,
            codSnomed: plan.vacuna.codSnomed,
          },
          descDosisAdministrada: plan.dosisAdministrada.descDosisAdministrada,
          descripcionMotivo: plan.motivo.descripcionMotivo,
          idMotivoNomivac: plan.idMotivoNomivac,
          descripcionEsquema: plan.esquema.descripcionEsquema,
          idEsquemaNomivac: plan.idEsquemaNomivac,
          descripcionPoblacion: plan.poblacionObjetivo.descripcionPoblacion,
          planVacunacionDosis: plan.planVacunacionDosis.map((dosis) => {
            CIPRES.dosisUsadosEnPlanes[dosis.dosis.descripcionDosis] = dosis.dosis.id;
            return {
              id: dosis.id,
              dosis: {id: dosis.dosis.id, descripcionDosis: dosis.dosis.descripcionDosis},
              edadDesde: dosis.edadDesde,
              edadHasta: dosis.edadHasta,
            };
          }),
          planVacunacionDosisQty: plan.planVacunacionDosis.length,
        };
      });
      // Agrupar por id de vacuna nomivac
      CIPRES.planVacunacionesVacunaNOMIVAC = groupBy({
        array: CIPRES.planVacunacionesVacunaNOMIVAC,
        keys: ["vacuna.idNomivac"],
      });
      CIPRES.planVacunacionesVacunaNOMIVACQty = Object.keys(
        CIPRES.planVacunacionesVacunaNOMIVAC
      ).length;

      // actualizar archivo -> CIPRES.json
      await guardarFile({
        fileName: "CIPRES",
        fileExtension: "json",
        route: "../file_server/opciones",
        content: JSON.stringify(CIPRES),
        flags: "w",
      });
    }
    return CIPRES;
  } catch (error) {
    return {
      error,
    };
  }
};

const errorCIPRES = ({respuesta}) => {
  // {
  //   "code": 401,
  //   "message": "Expired JWT Token"
  // }
  // {
  //   "type": "https://tools.ietf.org/html/rfc2616#section-10",
  //   "title": "An error occurred",
  //   "detail": "Query parameter \"numeroDocumento\" is required"
  // }
  // {
  //   "@context": "/api/contexts/Error",
  //   "@type": "hydra:Error",
  //   "hydra:title": "An error occurred",
  //   "hydra:description": "Access Denied."
  // }
  if (respuesta?.data?.message) {
    return {message: `CIPRES: ${respuesta.data.message}.`, status: 503};
  }
  if (respuesta?.data?.detail) {
    return {message: `CIPRES: ${respuesta.data.detail}.`, status: 503};
  }
  if (respuesta?.data?.["hydra:description"]) {
    return {message: `CIPRES: ${respuesta.data["hydra:description"]}.`, status: 503};
  }
  return {message: "Servicio de CIPRES no accesible, re-intente mas tarde.", status: 503};
};

const matchCIPRES = async ({vacunacionDB, CIPRES}) => {
  // {miDosis : descripcionDosis}
  const miDosisToCipres = {
    Unica: "UNICA DOSIS",
    "1era": "1º DOSIS",
    "2da": "2º DOSIS",
    "3era": "3º DOSIS",
    "4ta": "4º DOSIS",
    "5ta": "5º DOSIS",
    "6ta": "6º DOSIS",
    "7ma": "7º DOSIS",
    "8va": "8° DOSIS",
    "9na": "9° DOSIS",
    "10ma": "10° DOSIS",
    Anual: "DOSIS ANUAL",
    Refuerzo: "REFUERZO",
    "Refuerzo 2do": "2º REFUERZO",
    "Refuerzo 3ero": "3º REFUERZO",
    Adicional: "ADICIONAL",
    "Dosis Cero": "DOSIS CERO",

    // Ex PSMoreno - Adaptacion no se usan mas
    Neonatal: "1º DOSIS",
    "Refuerzo 4to": "REFUERZO",

    // CIPRES, no SISA (NOMIVAC)
    // "MEDIA DOSIS"
    // "MEDIA 1° DOSIS"
    // "MEDIA 2° DOSIS"
    // "DOSIS EXTRA"
  };
  // estrategia: { name: descripcion, clase: (Esquema|Motivo) },
  const miEstrategiaToCipres = {
    Calendario: {name: "Regular", clase: "esquemas"},
    Campaña: {name: "Campaña", clase: "motivos"},
    Atrasado: {name: "Recupero", clase: "esquemas"},
    "Prescripcion Medica": {name: "Prescripcion", clase: "esquemas"},
    "Grupo de Riesgo": {name: "Riesgo", clase: "esquemas"},
    "Post Exposicion": {name: "Exposicion", clase: "motivos"},
    "Por excepcion": {name: "Excepcion", clase: "esquemas"},

    // Ex PSMoreno - Adaptacion no se usan mas
    Contactos: {name: "Exposicion", clase: "motivos"},
    Terreno: {name: "Campaña", clase: "motivos"},
    Internacion: {name: "Prescripcion", clase: "esquemas"},
    "Pre Exposicion": {name: "Excepcion", clase: "esquemas"},
  };

  let registro = {
    fechaAplicacion: vacunacionDB.fecha
      ? new Date(vacunacionDB.fecha).toISOString().slice(0, 10)
      : "",
    fechaVencimiento: vacunacionDB.vencimiento
      ? new Date(vacunacionDB.vencimiento).toISOString().slice(0, 10)
      : "",
    lote: vacunacionDB.lote,
    paciente: "",
    establecimiento: "",
    dosis: CIPRES.dosis[miDosisToCipres[vacunacionDB.dosis]],
    planVacunacion: "",
  };

  // paciente (CIPRES => (buscar) documento/tipo_doc/sexo -> id;
  // [RECIEN NACIDOS | SIN DOCUMENTO | EXTRANJEROS] NI IDEA COMO CARGAR...
  registro.paciente = (
    await axios.get(`${process.env.CIPRES_URL}/api/patient`, {
      params: {
        numeroDocumento: vacunacionDB.documento ?? vacunacionDB.doc_responsable,
        sexo: vacunacionDB.sexo[0].toUpperCase(),
        esDocumentoArgentino: vacunacionDB.tipo_doc === "DNI" ? true : false,
        esDocumentoPropio: vacunacionDB.documento ? true : false,
        incluirRelaciones: false,
        incluirDomicilio: false,
        // tipoDocumento: "",
        // establecimiento: "",
      },
      headers: {Authorization: `Bearer ${CIPRES.tkn}`},
    })
  )?.data?.["hydra:member"]?.[0]?.paciente?.["@id"];
  // ###########
  // DESARROLLAR
  // ###########
  // BUSCAR PACIENTE documento -> no existe (crearlo) / existe (bien)
  // BUSCAR PACIENTE documento(responsable) -> no existe responsable (crear ambos) / existe responsable -> no existe nombre (crearlo) / existe (bien)
  // ###########

  // BUSCAR ESTABLECIMIENTO CIPRES
  registro.establecimiento = `/api/establecimiento/dependencia/${
    vacunacionDB.origen.RUPES ?? CIPRES.establecimientoSISARUPES[vacunacionDB.origen.SISA]?.RUPES
  }`;

  // BUSCAR planVacunacion CIPRES
  // selectPlanVacunacionCIPRES({vacuna,dosis,estrategia(esquema|motivo),poblacionEspecial}) => id
  // {
  //   vacuna.idNomivac;
  //   planVacunacionDosis[dosis.id];
  //   descripcionEsquema | descripcionMotivo;
  //   descripcionPoblacion -> Embarazo, Puerperio, Grupos de riesgo, Personal de salud, Personal esencial
  // }

  // Caracteristica especial de poblacion
  // vacunacionDB => embarazada_semana; puerpera; riesgo; personal_salud; personal_esencial;
  let poblacion = {Default: []};
  if (vacunacionDB.embarazada_semana > 0) {
    poblacion["Embarazo"] = [];
  }
  if (vacunacionDB.puerpera) {
    poblacion["Puerperio"] = [];
  }
  if (vacunacionDB.riesgo) {
    poblacion["Grupos de Riesgo"] = [];
  }
  if (vacunacionDB.personal_salud) {
    poblacion["Personal de Salud"] = [];
  }
  if (vacunacionDB.personal_esencial) {
    poblacion["Personal Esencial"] = [];
  }

  // recorrer planes de la vacuna (id_Nomivac)
  for (
    let index = 0;
    index < CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac]?.length;
    index++
  ) {
    // console.log("########################");
    // console.log("## planVacunaciones index", index);
    // console.log("########################");

    // seleccionar con dosis
    // console.log("vacunacionDB.dosis", miDosisToCipres[vacunacionDB.dosis]);
    // console.log(
    //   "CIPRES.dosis",
    //   CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
    //     .planVacunacionDosis
    // );
    if (
      CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][
        index
      ].planVacunacionDosis.some(
        (dosis) => dosis.dosis.descripcionDosis === miDosisToCipres[vacunacionDB.dosis]
      ) === false
    ) {
      // dosis no coincide, continua con siguiente plan
      // console.log("dosis no existe");
      continue;
    }

    // seleccionar con estrategia (esquema|motivo)
    let estrategia = [];
    // separar cadena de texto CIPRES en palabras del
    // descripcionEsquema;
    if (miEstrategiaToCipres[vacunacionDB.estrategia].clase === "esquemas") {
      estrategia.push(
        ...CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][
          index
        ].descripcionEsquema.split(" ")
      );
    }
    // descripcionMotivo;
    if (miEstrategiaToCipres[vacunacionDB.estrategia].clase === "motivos") {
      estrategia.push(
        ...CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][
          index
        ].descripcionMotivo.split(" ")
      );
    }
    // comparar si alguna de las palabras es de nuestra estrategia
    for (let index2 = 0; index2 < estrategia.length; index2++) {
      if (
        // Case-insensitive and accent-insensitive comparison
        estrategia[index2].localeCompare(
          miEstrategiaToCipres[vacunacionDB.estrategia].name,
          undefined,
          {
            sensitivity: "base",
          }
        ) === 0
      ) {
        estrategia = true;
        break;
      }
    }
    // console.log("vacunacionDB.estrategia", miEstrategiaToCipres[vacunacionDB.estrategia]);
    // console.log(
    //   "descripcionEsquema",
    //   CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index].descripcionEsquema
    // );
    // console.log(
    //   "descripcionMotivo",
    //   CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index].descripcionMotivo
    // );
    // console.log("estrategia", estrategia);
    if (estrategia !== true) {
      // estrategia no coincide, continua con siguiente plan
      // console.log("estrategia no existe");
      continue;
    }

    // separar por poblacion
    switch (
      CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
        .descripcionPoblacion
    ) {
      case "Embarazo":
        poblacion["Embarazo"]?.push(
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index].id
        );
        break;

      case "Puerperio":
        poblacion["Puerperio"]?.push(
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index].id
        );
        break;

      case "Grupos de riesgo":
        poblacion["Grupos de Riesgo"]?.push(
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index].id
        );
        break;

      case "Personal de salud":
        poblacion["Personal de Salud"]?.push(
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index].id
        );
        break;

      case "Personal esencial":
        poblacion["Personal Esencial"]?.push(
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index].id
        );
        break;

      default:
        if (
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
            .descripcionEsquema === "Grupos de Riesgo"
        ) {
          poblacion["Grupos de Riesgo"]?.push(
            CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index].id
          );
          break;
        }
        if (
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
            .descripcionMotivo === "Grupos de Riesgo"
        ) {
          poblacion["Grupos de Riesgo"]?.push(
            CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index].id
          );
          break;
        }
        poblacion["Default"].push(
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
        );
        break;
    }
  }

  registro.planVacunacion = {
    poblacion: "",
    res: [],
  };

  // Prioridad de Seleccion => Embarazo > Puerperio > Grupos de riesgo > Personal de Salud > Personal Esencial
  if (poblacion["Embarazo"]?.length > 0) {
    registro.planVacunacion.poblacion = "Embarazo";
    registro.planVacunacion.res = poblacion["Embarazo"];
  } else if (poblacion["Puerperio"]?.length > 0) {
    registro.planVacunacion.poblacion = "Puerperio";
    registro.planVacunacion.res = poblacion["Puerperio"];
  } else if (poblacion["Grupos de Riesgo"]?.length > 0) {
    registro.planVacunacion.poblacion = "Grupos de Riesgo";
    registro.planVacunacion.res = poblacion["Grupos de Riesgo"];
  } else if (poblacion["Personal de Salud"]?.length > 0) {
    registro.planVacunacion.poblacion = "Personal de Salud";
    registro.planVacunacion.res = poblacion["Personal de Salud"];
  } else if (poblacion["Personal Esencial"]?.length > 0) {
    registro.planVacunacion.poblacion = "Personal Esencial";
    registro.planVacunacion.res = poblacion["Personal Esencial"];
  } else {
    registro.planVacunacion.poblacion = "Default";
    registro.planVacunacion.res = poblacion["Default"];
  }

  // si quedo un array con un solo elemento autoseleccionarlo
  if (registro.planVacunacion.res.length === 1) {
    registro.planVacunacion = `/api/vacunacion/plan_vacunacion/${registro.planVacunacion.res[0].id}`;
  }
  // tiene mas de un plan que coincide con los datos
  else if (registro.planVacunacion.res.length > 1) {
    registro.planVacunacion.err = `Plan de Vacunacion: Mas de un plan encontrado (${registro.planVacunacion.res.length}) en CIPRES.\nDatos-> Vac: ${vacunacionDB.insumo.nombre}(${vacunacionDB.insumo.id_Nomivac}). Dosis: ${vacunacionDB.dosis}. Est: ${vacunacionDB.estrategia}. Poblacion: ${registro.planVacunacion.poblacion}.\n`;
  }
  // ningun plan coincide con los datos
  else {
    registro.planVacunacion.err = `Plan de Vacunacion: Ningun plan encontrado en CIPRES.\nDatos-> Vac: ${vacunacionDB.insumo.nombre}(${vacunacionDB.insumo.id_Nomivac}). Dosis: ${vacunacionDB.dosis}. Est: ${vacunacionDB.estrategia}. Poblacion: ${registro.planVacunacion.poblacion}.\n`;
  }

  // console.log("planesPoblacion", poblacion);
  // console.log("planVacunacion", registro.planVacunacion);

  return registro;
};

const verificaMatchCIPRES = ({registro}) => {
  let errorMessage = "";
  if (!registro.fechaAplicacion) {
    errorMessage += "Falta fechaAplicacion.\n";
  }
  if (!registro.fechaVencimiento) {
    errorMessage += "Falta fechaVencimiento.\n";
  }
  if (!registro.lote) {
    errorMessage += "Falta lote.\n";
  }
  if (!registro.paciente) {
    errorMessage += "Paciente: No encontrado en CIPRES.\n";
  }
  if (
    !registro.establecimiento.split("/").at(-1) ||
    registro.establecimiento.split("/").at(-1) === "undefined"
  ) {
    errorMessage += "Establecimiento: Sin codigo RUPES.\n";
  }
  if (!registro.dosis) {
    errorMessage += "Dosis: No encontrada en CIPRES.\n";
  }
  if (!registro.planVacunacion) {
    errorMessage += "Plan de Vacunacion: No encontrado en CIPRES.\n";
  }
  if (registro.planVacunacion.err) {
    errorMessage += registro.planVacunacion.err;
  }
  if (errorMessage)
    return {
      error: {message: errorMessage.substring(0, errorMessage.length - 1), status: 412},
    };
  return true;
};

// ============
//  C.I.PRE.S.
// ============
app.put(
  "/vacunas/cipres/registrar",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "vacunas.cipres"},
        {prop: "vacunas.general.cipres", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let body = isVacio({
        dato: req.body,
        //     vacioCero: true, // false,
        vacioBoolean: true, // false,
        inArr: true, // false,
        inObj: true, // false,
        borrar: true, // false,
      });
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      // obetener datos de la Aplicacion con el ID
      let vacunacionDB = await VacunaAplicacion.findOne({
        _id: body.vacunacion,
      })
        .populate({path: "origen", select: "area SISA RUPES"})
        .populate({path: "insumo", select: "nombre id_Nomivac"})
        .exec();
      // verificar que vacunacion exista
      if (!vacunacionDB) {
        return errorMessage(res, {message: "Aplicacion no encontrada."}, 404);
      }
      // verificar que no haya sido registrada, si aplicacion ya se encuentra en la BD registrada => informar
      if (vacunacionDB.cipres_msg === "registrada") {
        return res.json({
          ok: true,
          message: `${vacunacionDB.cipres_fecha} - ${vacunacionDB.cipres_id}\nLa aplicacion esta registrada en CIPRES.\n${cipres_msg}`,
        });
      }
      // verificar permisos que sea admin o que "origen" sea de sus CIPRES vacunas.
      if (
        !(
          req.usuario.vacunas.general?.cipres === 1 ||
          req.usuario.vacunas.cipres?.includes(vacunacionDB.origen.id)
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      // obtener datos estructurales de CIPRES para el matcheo
      let CIPRES = await getDataBaseCipres();
      if (CIPRES.error) {
        // SI CIPRES RESPONDE CON ERROR DARLE FORMATO
        if (CIPRES.error.response) {
          CIPRES.error = errorCIPRES({respuesta: CIPRES.error.response});
        }
        return errorMessage(res, {message: CIPRES.error.message}, CIPRES.error.status);
      }

      // matchear y formato para registrar en cipres; (vacunacionDB <-> CIPRES)
      let registro = await matchCIPRES({vacunacionDB, CIPRES});

      // verificar datos del registro antes de enviar al CIPRES
      let verifica = verificaMatchCIPRES({registro});
      if (verifica.error)
        return errorMessage(res, {message: verifica.error.message}, verifica.error.status);

      // registrar aplicacion en CIPRES.
      registro = await axios.post(
        `${process.env.CIPRES_URL}/api/vacunacion/vacunaciones`,
        registro,
        {headers: {"content-type": "application/json", Authorization: `Bearer ${CIPRES.tkn}`}}
      );
      // respuestas de registro
      // if (registro?.data?.bien) {
      // }
      console.log("registro:", registro);
      console.log("###########");
      console.log("### DESARROLLAR SEGUIR CON EL REGISTRO");
      console.log("### VER EL ALTA DE PACIENTES... (MAIL CIPRES)");
      console.log("### BORRAR REGISTROS)?... (MAIL CIPRES)");
      console.log("###########");

      // guardar respuesta de CIPRES con el ID de la aplicacion
      // vacunacionDB = await VacunaAplicacion.findOneAndUpdate(
      //   {
      //     _id: body.vacunacion,
      //   },
      //   {cipres_id: "", cipres_fecha: new Date(), cipres_msg: ""},
      //   {
      //     new: true,
      //     runValidators: true,
      //   }
      // ).exec();

      // console.log("###########");
      // console.log("DUDAS WIP");
      // NO DEJAR BORRAR SI ESTA CARGADO EN CIPRES

      return res.json({
        ok: true,
        message: registro,
        CIPRES,
        vacunacionDB,
      });
    } catch (err) {
      console.log("### YO TIRE ERROR catch REGISTRO CIPRES");
      // SI CIPRES RESPONDE CON ERROR DARLE FORMATO
      if (err.response) {
        err = errorCIPRES({respuesta: err.response});
      }
      return errorMessage(res, err, err.status ?? err.code);
    }
  }
);

module.exports = app;
