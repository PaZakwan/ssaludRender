const express = require("express");
const axios = require("axios");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, getDiferenciaDias, objectSetUnset, isObjectIdValid} = require(process.env
  .MAIN_FOLDER + "/tools/object");
const {guardarFile, leerFile} = require(process.env.MAIN_FOLDER + "/tools/file");
const {groupBy} = require(process.env.MAIN_FOLDER + "/tools/object");
const {checkIsValidJson} = require(process.env.MAIN_FOLDER + "/tools/string");

const Area = require(process.env.MAIN_FOLDER + "/modulos/main/models/area");
const Paciente = require(process.env.MAIN_FOLDER + "/modulos/paciente/models/paciente");
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
// "paciente": "api/paciente/{id}",

// // establecimiento => (archivo temporal) SISA (codigoRefes) (origen.area.SISA) -> id (origen.area.RUPES) (id_cipres) (id_IRA)
// "establecimiento": "/api/establecimiento/dependencia/{id}",

// // dosis => (archivo temporal) descripcionDosis -> id
// "dosis": "/api/vacunacion/dosis/{id}",

// // planVacunacion => (archivo temporal) vacuna, dosis, estrategia(motivo/esquema), poblacion -> id
// // descDosisAdministrada (solo antigripales??)
// // "Dosis completa", "Media dosis" (hasta 8 años (1139 dias?)), "Doble dosis" (despues de los 8 años (1139 dias?))
// // Adulto -> "Media dosis" (hasta 8 años (1139 dias?))
// // Pediatrica -> "Doble dosis" (despues de los 8 años (1139 dias?))
// "planVacunacion": "/api/vacunacion/plan_vacunacion/{id}"
// }

let CIPRES_TKN = "";
let CIPRES_Date = "";

// ============
//  C.I.PRE.S.
// ============
app.put(
  "/vacunas/cipres/registrar",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "vacunas.gestion"},
        {prop: "vacunas.general.gestion", value: 1},
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
        .populate({
          path: "paciente",
          select: "tipo_doc documento doc_responsable fec_nac nombre apellido sexo cipres_id",
        })
        .exec();
      // verificar que vacunacion exista
      if (!vacunacionDB) {
        return errorMessage(res, {message: "Aplicacion no encontrada."}, 404);
      }
      // verificar que no haya sido registrada, si aplicacion ya se encuentra en la BD registrada => informar
      if (vacunacionDB.cipres_id) {
        return res.json({
          ok: true,
          message: `Aplicacion Registrada en CIPRES.\n${new Date(vacunacionDB.cipres_fecha)}\nid: ${
            vacunacionDB.cipres_id
          }.`,
        });
      }
      // verificar permisos que sea admin(CIPRES o Gestion) o que "origen" sea de sus CIPRES vacunas o que sea su Vacuna.
      if (
        !(
          req.usuario.vacunas.general?.gestion === 1 ||
          req.usuario.vacunas.general?.cipres === 1 ||
          req.usuario._id.toString() === vacunacionDB.usuario_creador.toString() ||
          req.usuario.vacunas.cipres?.includes(vacunacionDB.origen.id)
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      // calcular edad al momento de la aplicacion (edad_days_aplicacion)
      vacunacionDB.paciente.edad_days_aplicacion = getDiferenciaDias({
        date: vacunacionDB.ps_fecha_nacimiento ?? vacunacionDB.paciente.fec_nac,
        dateHasta: vacunacionDB.fecha,
      });

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
      if (verifica.error) {
        // guardar error
        await VacunaAplicacion.findOneAndUpdate(
          {
            _id: req.body.vacunacion,
          },
          {
            cipres_fecha: new Date(),
            cipres_msg: verifica.error.message,
          },
          {
            new: true,
            runValidators: true,
          }
        ).exec();
        return errorMessage(res, {message: verifica.error.message}, verifica.error.status);
      }

      // registrar aplicacion en CIPRES.
      registro = await axios.post(
        `${process.env.CIPRES_URL}/api/vacunacion/vacunaciones`,
        registro,
        {headers: {"content-type": "application/json", Authorization: `Bearer ${CIPRES_TKN}`}}
      );
      if (registro?.data?.["id"]) {
        // guardar respuesta de CIPRES con el ID de la aplicacion
        vacunacionDB = await VacunaAplicacion.findOneAndUpdate(
          {
            _id: body.vacunacion,
          },
          {
            $set: {
              cipres_id: registro.data["id"],
              cipres_fecha: new Date(),
            },
            $unset: {cipres_msg: 1},
          },
          {
            new: true,
            runValidators: true,
          }
        ).exec();

        return res.json({
          ok: true,
          message: `Aplicacion Registrada en CIPRES.\nFecha: ${new Date(
            vacunacionDB.cipres_fecha
          ).toLocaleString("es-AR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            // hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          })}\nID: ${vacunacionDB.cipres_id}.`,
        });
      }

      return errorMessage(res, {message: "Error no contemplado."}, 400);
    } catch (err) {
      // SI CIPRES RESPONDE CON ERROR DARLE FORMATO
      if (err.response) {
        err = errorCIPRES({respuesta: err.response});
        // guardar respuesta de CIPRES
        await VacunaAplicacion.findOneAndUpdate(
          {
            _id: req.body.vacunacion,
          },
          {
            cipres_fecha: new Date(),
            cipres_msg: err.message,
          },
          {
            new: true,
            runValidators: true,
          }
        ).exec();
      }
      return errorMessage(res, err, err.status ?? err.code);
    }
  }
);

const getDataBaseCipres = async () => {
  // return datos temporales diarios de cipres { CIPRES } o { error }
  try {
    // verificar que el sistema cuenta con la APIKEY del CIPRES
    if (!process.env.CIPRES_URL || !process.env.CIPRES_USR || !process.env.CIPRES_PSR)
      return {
        error: {message: "El sistema no cuenta con acceso a CIPRES al momento.", status: 501},
      };

    // verifica token y lo recarga si proximo a vencer (duracion token 3 hs -> 180 => recarga cada 2hs 55m -> 175m )
    if (!CIPRES_TKN || new Date().getTime() - CIPRES_Date >= 175 * 60 * 1000) {
      let respuesta = await axios.post(
        `${process.env.CIPRES_URL}/login`,
        {
          username: process.env.CIPRES_USR,
          password: process.env.CIPRES_PSR,
          realusername: "API Moreno GISAM",
        },
        {headers: {"content-type": "application/json"}}
      );
      if (respuesta?.data?.token) {
        CIPRES_TKN = respuesta.data.token;
        CIPRES_Date = new Date().getTime();
      }
    }

    // leer archivo -> CIPRES.json
    let CIPRES = await leerFile({
      fileName: "CIPRES",
      fileExtension: "json",
      route: "../file_server/opciones",
    });
    if (CIPRES.error) {
      CIPRES = {
        date: "",
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
        dosisAdministradaUsadasEnPlanes: {},
        VacunaNomivacOpciones: {},
      };
    } else {
      CIPRES = {
        ...{
          date: "",
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
          dosisAdministradaUsadasEnPlanes: {},
          VacunaNomivacOpciones: {},
        },
        ...checkIsValidJson(CIPRES),
      };
    }

    // verifica fecha de la data de CIPRES y la actualiza si es otro dia
    if (!CIPRES.date || new Date().toISOString().slice(0, 10) !== CIPRES.date) {
      // actualiza CIPRES data
      CIPRES = {
        date: new Date().toISOString().slice(0, 10),
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
        dosisAdministradaUsadasEnPlanes: {},
        VacunaNomivacOpciones: {},
      };

      // dosis;
      respuesta = await axios.get(`${process.env.CIPRES_URL}/api/vacunacion/dosis`, {
        headers: {Authorization: `Bearer ${CIPRES_TKN}`},
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
        headers: {Authorization: `Bearer ${CIPRES_TKN}`},
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
        headers: {Authorization: `Bearer ${CIPRES_TKN}`},
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
              headers: {Authorization: `Bearer ${CIPRES_TKN}`},
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
            headers: {Authorization: `Bearer ${CIPRES_TKN}`},
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
        CIPRES.dosisAdministradaUsadasEnPlanes[plan.dosisAdministrada.descDosisAdministrada] =
          plan.dosisAdministrada.id;
        if (!CIPRES.VacunaNomivacOpciones[plan.vacuna.idNomivac]) {
          CIPRES.VacunaNomivacOpciones[plan.vacuna.idNomivac] = {
            descripcionVacuna: plan.vacuna.descripcionVacuna,
            descDosisAdministrada: [],
            descripcionMotivo: [],
            descripcionEsquema: [],
            descripcionPoblacion: [],
            dosis: [],
          };
        }
        CIPRES.VacunaNomivacOpciones[plan.vacuna.idNomivac].descDosisAdministrada = [
          ...new Set([
            ...CIPRES.VacunaNomivacOpciones[plan.vacuna.idNomivac].descDosisAdministrada,
            plan.dosisAdministrada.descDosisAdministrada,
          ]),
        ];
        CIPRES.VacunaNomivacOpciones[plan.vacuna.idNomivac].descripcionMotivo = [
          ...new Set([
            ...CIPRES.VacunaNomivacOpciones[plan.vacuna.idNomivac].descripcionMotivo,
            plan.motivo.descripcionMotivo,
          ]),
        ];
        CIPRES.VacunaNomivacOpciones[plan.vacuna.idNomivac].descripcionEsquema = [
          ...new Set([
            ...CIPRES.VacunaNomivacOpciones[plan.vacuna.idNomivac].descripcionEsquema,
            plan.esquema.descripcionEsquema,
          ]),
        ];
        CIPRES.VacunaNomivacOpciones[plan.vacuna.idNomivac].descripcionPoblacion = [
          ...new Set([
            ...CIPRES.VacunaNomivacOpciones[plan.vacuna.idNomivac].descripcionPoblacion,
            plan.poblacionObjetivo.descripcionPoblacion,
          ]),
        ];
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
            CIPRES.VacunaNomivacOpciones[plan.vacuna.idNomivac].dosis = [
              ...new Set([
                ...CIPRES.VacunaNomivacOpciones[plan.vacuna.idNomivac].dosis,
                dosis.dosis.descripcionDosis,
              ]),
            ];
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

  // paciente cipres_id existe y no es migracion del PS
  if (vacunacionDB.ps_id && vacunacionDB.paciente?.cipres_id) {
    // console.log("# encontrado paciente.cipres_id", vacunacionDB.paciente.cipres_id);
    registro.paciente = vacunacionDB.paciente.cipres_id;
  } else {
    // Buscar en CIPRES => paciente.documento/paciente.tipo_doc/sexo -> id;
    registro.paciente = await matchPacienteCIPRES(
      ({
        fec_nac,
        sexo,
        paciente,
        ps_tipo_doc,
        ps_doc,
        ps_doc_resp,
        ps_fecha_nacimiento,
        ps_nombreC,
      } = vacunacionDB)
    );
    if (vacunacionDB.paciente?._id && registro.paciente && !registro.paciente.err) {
      // guardar ID del CIPRES del paciente
      await Paciente.findOneAndUpdate(
        {
          _id: vacunacionDB.paciente._id,
        },
        {cipres_id: registro.paciente},
        {
          new: true,
          runValidators: true,
        }
      ).exec();
    }
  }

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

  // DESARROLLAR DOSIS ADMINISTRADA Y PLAN CON DIAS DE EDAD
  // console.error("########################");
  // Dosis Administrada -> Dosis completa, Media dosis, Doble dosis.

  // comparar fecha (aplicacion) - fec_nac -> dias

  // Adultos

  // Hepatitis B		4015+
  // Triple Viral SRP	4015+
  // Doble Viral SR		4015+
  // Fiebre Hemorragica	5475+
  // Doble Bacteriana (dT)	5840+
  // Antigripal Trivalente Adultos	Media dosis -> 180-809
  // Antigripal Trivalente Adultos	Media dosis -> riesgo + 750-1139
  // Antigripal Trivalente Adultos	mayores -> 23725+

  // Pediátrica

  // Antigripal Trivalente Pediátrica 	embarazada -> Doble dosis -> 4381+
  // Antigripal Trivalente Pediátrica 	p salud -> Doble dosis -> 6206+
  // Antigripal Trivalente Pediátrica 	puerpera -> Doble dosis -> 4381+
  // Antigripal Trivalente Pediátrica 	p esencial -> Doble dosis -> 6206+
  // Antigripal Trivalente Pediátrica 	riesgo -> Doble dosis -> 1080-3284
  // Antigripal Trivalente Pediátrica 	riesgo -> Doble dosis -> 3285+
  // Antigripal Trivalente Pediátrica 	mayores -> Doble dosis -> 23725+

  // Media dosis

  // Antigripal Trivalente Adultos	Media dosis -> 180-809
  // Antigripal Trivalente Adultos	Media dosis -> riesgo + 750-1139

  // Doble dosis -> descontar de stock 2 dosis y al borrar devolver 2.

  // Hepatitis B
  // Antigripal Trivalente Pediátrica 	mayores -> Doble dosis -> 23725+
  // Antigripal Trivalente Pediátrica 	embarazada -> Doble dosis -> 4381+
  // Antigripal Trivalente Pediátrica 	p salud -> Doble dosis -> 6206+
  // Antigripal Trivalente Pediátrica 	puerpera -> Doble dosis -> 4381+
  // Antigripal Trivalente Pediátrica 	p esencial -> Doble dosis -> 6206+
  // Antigripal Trivalente Pediátrica 	riesgo -> Doble dosis -> 1080-3284
  // Antigripal Trivalente Pediátrica 	riesgo -> Doble dosis -> 3285+

  // recorrer planes de la vacuna (id_Nomivac)
  for (
    let index = 0;
    index < CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac]?.length;
    index++
  ) {
    // console.log("########################");
    // console.log("## planVacunaciones index", index);
    // console.log("########################");

    // seleccionar con dosis y edad
    // console.log("vacunacionDB.dosis", miDosisToCipres[vacunacionDB.dosis]);
    // console.log(
    //   "vacunacionDB.paciente.edad_days_aplicacion",
    //   vacunacionDB.paciente.edad_days_aplicacion
    // );
    // console.log(
    //   "CIPRES.planVacunacionDosis",
    //   CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
    //     .planVacunacionDosis
    // );
    if (
      CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][
        index
      ].planVacunacionDosis.some(
        (dosis) =>
          dosis.dosis.descripcionDosis === miDosisToCipres[vacunacionDB.dosis] &&
          dosis.edadDesde <= vacunacionDB.paciente.edad_days_aplicacion &&
          vacunacionDB.paciente.edad_days_aplicacion <= dosis.edadHasta
      ) === false
    ) {
      // dosis no coincide, continua con siguiente plan
      // console.log("dosis y edad no existe");
      continue;
    }
    // console.log("dosis y edad existe");

    // seleccionar con qty_dosis (DosisAdministrada) si existe (Media dosis|Doble dosis)
    if (
      vacunacionDB.qty_dosis &&
      vacunacionDB.qty_dosis !==
        CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
          .descDosisAdministrada
    ) {
      // qty_dosis no coincide, continua con siguiente plan
      // console.log(
      //   "Dosis Administrada",
      //   CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
      //     .descDosisAdministrada
      // );
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
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
        );
        break;

      case "Puerperio":
        poblacion["Puerperio"]?.push(
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
        );
        break;

      case "Grupos de riesgo":
        poblacion["Grupos de Riesgo"]?.push(
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
        );
        break;

      case "Personal de salud":
        poblacion["Personal de Salud"]?.push(
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
        );
        break;

      case "Personal esencial":
        poblacion["Personal Esencial"]?.push(
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
        );
        break;

      default:
        if (
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
            .descripcionEsquema === "Grupos de Riesgo"
        ) {
          poblacion["Grupos de Riesgo"]?.push(
            CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
          );
          break;
        }
        if (
          CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
            .descripcionMotivo === "Grupos de Riesgo"
        ) {
          poblacion["Grupos de Riesgo"]?.push(
            CIPRES.planVacunacionesVacunaNOMIVAC[vacunacionDB.insumo.id_Nomivac][index]
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

  // console.log("Embarazo", poblacion["Embarazo"]);
  // console.log("Puerperio", poblacion["Puerperio"]);
  // console.log("Grupos", poblacion["Grupos de Riesgo"]);
  // console.log("Salud", poblacion["Personal de Salud"]);
  // console.log("Esencial", poblacion["Personal Esencial"]);
  // console.log("Default", poblacion["Default"]);

  // si quedo un array con un solo elemento autoseleccionarlo
  if (registro.planVacunacion.res.length === 1) {
    registro.planVacunacion = `/api/vacunacion/plan_vacunacion/${registro.planVacunacion.res[0].id}`;
  }
  // tiene mas de un plan que coincide con los datos
  else if (registro.planVacunacion.res.length > 1) {
    registro.planVacunacion.err = `Plan de Vacunacion: Mas de un plan encontrado (${registro.planVacunacion.res.length}) en CIPRES.`;
  }
  // ningun plan coincide con los datos
  else {
    registro.planVacunacion.err = "Plan de Vacunacion: Ningun plan encontrado en CIPRES.";
  }
  if (registro.planVacunacion.err) {
    registro.planVacunacion.err +=
      `\nDatos-> Vacuna: ${vacunacionDB.insumo.nombre} (${vacunacionDB.insumo.id_Nomivac}).` +
      `\nDosis: ${vacunacionDB.dosis}.` +
      ` Dosis Administrada: ${vacunacionDB.qty_dosis ?? "Dosis completa"}.` +
      `\nEstrategia: ${vacunacionDB.estrategia}.` +
      `\nPoblacion: ${registro.planVacunacion.poblacion}.` +
      ` Edad Paciente: ${vacunacionDB.paciente.edad_days_aplicacion}.\n`;
  }

  // console.error("########################");
  // console.log("planesPoblacion", poblacion);
  // console.log("registro.planVacunacion", registro.planVacunacion);

  return registro;
};

const matchPacienteCIPRES = async ({
  fec_nac,
  sexo,
  paciente,
  ps_tipo_doc,
  ps_doc,
  ps_doc_resp,
  ps_fecha_nacimiento,
  ps_nombreC,
}) => {
  // <= Posibilidades =>
  // Existe Doc o Responsable
  //    Doc -> Select ID
  //    Responsable -> Existe Hijo -> Select ID
  //    Responsable -> No Existe Hijo -> Registrar Hijo -> Select ID
  // No Existe Responsable (Dato)
  //    Registrar Responsable -> Registrar Hijo -> Select ID
  // No Existe Doc y NO DATO Responsable (Nuevos e indocumentados)
  //    Registrar -> Select ID

  // REGISTRAR ->
  // "tipoDocumento": "/api/paciente/referencias/tipo_documento/1", // 0 -> no documento / 1 -> DNI
  // "numeroDocumento": "n", //vacunacionDB.documento ?? vacunacionDB.doc_responsable
  // "fechaNacimiento": "1988-11-17", // vacunacionDB.fec_nac  / ps_fecha_nacimiento
  // "apellido": "Perez", // vacunacionDB.apellido / ps_nombreC
  // "nombre": "Juan", // vacunacionDB.nombre / ps_nombreC
  // "sexo": "/api/paciente/referencias/sexo/1", // M -> 1 | F -> 2 | no especifica -> 0
  // "nacionalidad": "/api/referencias/nacionalidades/4", // 4 -> ARG
  // "esDocumentoPropio": true,
  // // true -> retorna al paciente o 404 no encontrado
  // // false -> siempre retorna un array de los "hijos" exista o no el paciente.
  // "fechaFallecido": null,
  // "cuil": null

  // paciente -> "tipo_doc documento doc_responsable fec_nac nombre apellido cipres_id";
  // PS MIGRACION -> ps_tipo_doc, ps_doc, ps_doc_resp, ps_fecha_nacimiento, ps_nombreC;
  paciente.tipo_doc = ps_tipo_doc ?? paciente.tipo_doc;
  paciente.documento = ps_doc ?? paciente.documento;
  paciente.doc_responsable = ps_doc_resp ?? paciente.doc_responsable;
  paciente.fec_nac = new Date(ps_fecha_nacimiento ?? paciente.fec_nac).toISOString().slice(0, 10);
  paciente.apellido = ps_nombreC?.split(",")[0] ?? paciente.apellido;
  paciente.nombre = ps_nombreC?.split(",")[1] ?? paciente.nombre;
  try {
    let pacienteCipres = await axios.get(`${process.env.CIPRES_URL}/api/patient`, {
      params: {
        numeroDocumento: paciente.documento ?? paciente.doc_responsable,
        sexo: paciente.sexo[0].toUpperCase(),
        esDocumentoArgentino: paciente.tipo_doc === "DNI" || !paciente.tipo_doc ? true : false,
        esDocumentoPropio: true,
        incluirRelaciones: paciente.doc_responsable && !paciente.documento ? true : false,
        tipoDocumento: `/api/paciente/referencias/tipo_documento/${
          paciente.tipo_doc === "DNI" ? "1" : "0"
        }`,
        incluirDomicilio: false,
        // establecimiento: "",
      },
      headers: {Authorization: `Bearer ${CIPRES_TKN}`},
    });

    if (pacienteCipres?.data?.["hydra:member"]?.length > 0) {
      if (paciente.documento) {
        // encontrado paciente
        // console.log("# encontrado paciente", pacienteCipres?.data?.["hydra:member"]?.[0]?.paciente);

        // comparar fecha de nacimiento => DIA-MES-AÑO -> AÑO-MES-DIA
        if (
          pacienteCipres.data["hydra:member"][0].paciente?.fechaNacimiento
            ?.split("-")
            .reverse()
            .join("-") !== paciente.fec_nac
        ) {
          return {
            err:
              "Paciente: Fecha de Nacimiento no coincide con la del CIPRES." +
              `\nDatos -> Documento: ${paciente.documento}. ` +
              `\nCIPRES: ${pacienteCipres.data["hydra:member"][0].paciente?.fechaNacimiento
                ?.split("-")
                .reverse()
                .join("-")}. LOCAL: ${paciente.fec_nac}\n`,
          };
        }
        return pacienteCipres.data["hydra:member"][0].paciente?.["@id"];
      }
      if (paciente.doc_responsable) {
        // encontrado responsable

        // obetener datos locales del responsable con el documento
        let responsableDB = await Paciente.findOne({
          tipo_doc: "DNI",
          documento: paciente.doc_responsable,
        })
          .select("apellido nombre fec_nac sexo cipres_id")
          .exec();
        if (!responsableDB || !responsableDB.fec_nac) {
          return {
            err:
              "Paciente: Faltan datos del Responsable para poder Registrar en CIPRES." +
              `\nDatos Responsable-> Documento: ${paciente.doc_responsable}. ` +
              `\nDar de alta a la persona responsable en el sistema local.\n`,
          };
        }
        responsableDB.fec_nac = new Date(responsableDB.fec_nac).toISOString().slice(0, 10);

        // comparar fecha de nacimiento del responsable => DIA-MES-AÑO -> AÑO-MES-DIA
        if (
          pacienteCipres.data["hydra:member"][0].paciente?.fechaNacimiento
            ?.split("-")
            .reverse()
            .join("-") !== responsableDB.fec_nac
        ) {
          return {
            err:
              "Paciente: Fecha de Nacimiento del Responsable no coincide con la del CIPRES." +
              `\nDatos -> Documento Responsable: ${paciente.doc_responsable}. ` +
              `\nCIPRES: ${pacienteCipres.data["hydra:member"][0].paciente?.fechaNacimiento
                ?.split("-")
                .reverse()
                .join("-")}. LOCAL: ${responsableDB.fec_nac}\n`,
          };
        }

        // buscar "hijos" del responsable si tiene
        if (pacienteCipres.data["hydra:member"][0].hijos?.length > 0) {
          pacienteCipres = await axios.get(`${process.env.CIPRES_URL}/api/patient`, {
            params: {
              numeroDocumento: paciente.doc_responsable,
              sexo: paciente.sexo[0].toUpperCase(),
              esDocumentoArgentino:
                paciente.tipo_doc === "DNI" || !paciente.tipo_doc ? true : false,
              esDocumentoPropio: false,
              incluirRelaciones: true,
              tipoDocumento: `/api/paciente/referencias/tipo_documento/${
                paciente.tipo_doc === "DNI" ? "1" : "0"
              }`,
              incluirDomicilio: false,
              // establecimiento: "",
            },
            headers: {Authorization: `Bearer ${CIPRES_TKN}`},
          });

          // buscar si existe el paciente en los hijos del responsable
          pacienteCipres = pacienteCipres.data["hydra:member"][0].find?.(
            // datos -> apellido / nombre / fechaNacimiento (dia-mes-año) / sexo.inicial
            (hijo) =>
              hijo.sexo.inicial === paciente.sexo[0].toUpperCase() &&
              hijo.fechaNacimiento?.split("-").reverse().join("-") === paciente.fec_nac && // DIA-MES-AÑO -> AÑO-MES-DIA
              hijo.nombre.localeCompare(paciente.nombre, undefined, {
                sensitivity: "base",
              }) === 0 &&
              hijo.apellido.localeCompare(paciente.apellido, undefined, {
                sensitivity: "base",
              }) === 0
          );
          if (pacienteCipres) {
            // encontrado paciente hijo

            // console.log("# encontrado paciente hijo", pacienteCipres);
            return pacienteCipres["@id"];
          } else {
            // Recuperar ID del Responsable
            pacienteCipres = await axios.get(`${process.env.CIPRES_URL}/api/patient`, {
              params: {
                numeroDocumento: paciente.doc_responsable,
                sexo: paciente.sexo[0].toUpperCase(),
                esDocumentoArgentino: true,
                esDocumentoPropio: true,
                incluirRelaciones: false,
                tipoDocumento: "/api/paciente/referencias/tipo_documento/1",
                incluirDomicilio: false,
              },
              headers: {Authorization: `Bearer ${CIPRES_TKN}`},
            });
          }
        }

        // no encontrado paciente hijo -> Registrar paciente hijo
        pacienteCipres = await axios.post(
          `${process.env.CIPRES_URL}/api/patient`,
          {
            tipoDocumento: "/api/paciente/referencias/tipo_documento/0",
            numeroDocumento: null,
            fechaNacimiento: paciente.fec_nac,
            apellido: paciente.apellido,
            nombre: paciente.nombre,
            sexo: `/api/paciente/referencias/sexo/${
              paciente.sexo[0].toUpperCase() === "M"
                ? "1"
                : paciente.sexo[0].toUpperCase() === "F"
                ? "2"
                : "0"
            }`,
            nacionalidad: "/api/referencias/nacionalidades/4",
            responsable: {
              paciente: pacienteCipres?.data?.["hydra:member"]?.[0]?.paciente?.["@id"],
              // Masculino -> Padre / Femenino -> Madre / X -> Tutor
              tipoRelacion: `${
                pacienteCipres?.data?.["hydra:member"]?.[0]?.paciente?.sexo?.inicial === "M"
                  ? "P"
                  : pacienteCipres?.data?.["hydra:member"]?.[0]?.paciente?.sexo?.inicial === "F"
                  ? "M"
                  : "T"
              }`,
            },
          },
          {headers: {"content-type": "application/json", Authorization: `Bearer ${CIPRES_TKN}`}}
        );

        // console.log("# encontrado responsable registrado hijo", pacienteCipres?.data);
        return pacienteCipres?.data?.["@id"];
      }
    }
  } catch (error) {
    if (error.status === 404 || !(paciente.documento && paciente.doc_responsable)) {
      if (!paciente.documento && paciente.doc_responsable) {
        // no encontrado responsable
        // obetener datos locales del responsable con el documento
        let responsableDB = await Paciente.findOne({
          tipo_doc: "DNI",
          documento: paciente.doc_responsable,
        })
          .select("apellido nombre fec_nac sexo cipres_id")
          .exec();
        if (!responsableDB) {
          return {
            err:
              "Paciente: Faltan datos del Responsable para poder Registrarlo en CIPRES." +
              `\nDatos Responsable-> Documento: ${paciente.doc_responsable}. ` +
              `Dar de alta a la persona responsable en el sistema local.\n`,
          };
        }
        if (
          !responsableDB.apellido ||
          !responsableDB.nombre ||
          !responsableDB.fec_nac ||
          !responsableDB.sexo
        ) {
          return {
            err:
              "Paciente: Faltan datos del Responsable para poder Registrarlo en CIPRES." +
              `\nDatos Responsable-> Documento: ${paciente.doc_responsable}. ` +
              `Apellido: ${responsableDB.apellido}. Nombre: ${responsableDB.nombre}. ` +
              `Nacimiento: ${responsableDB.fec_nac}. Sexo: ${responsableDB.sexo}.\n`,
          };
        }
        responsableDB.fec_nac = new Date(responsableDB.fec_nac).toISOString().slice(0, 10);

        // Registrar responsable
        let pacienteCipres = await axios.post(
          `${process.env.CIPRES_URL}/api/patient`,
          {
            tipoDocumento: "/api/paciente/referencias/tipo_documento/1",
            numeroDocumento: paciente.doc_responsable,
            fechaNacimiento: responsableDB.fec_nac,
            apellido: responsableDB.apellido,
            nombre: responsableDB.nombre,
            sexo: `/api/paciente/referencias/sexo/${
              responsableDB.sexo[0].toUpperCase() === "M"
                ? "1"
                : responsableDB.sexo[0].toUpperCase() === "F"
                ? "2"
                : "0"
            }`,
            nacionalidad: "/api/referencias/nacionalidades/4",
          },
          {headers: {"content-type": "application/json", Authorization: `Bearer ${CIPRES_TKN}`}}
        );

        // console.log("# no responsable, registrado", pacienteCipres?.data, responsableDB);
        // Registrar paciente hijo
        pacienteCipres = await axios.post(
          `${process.env.CIPRES_URL}/api/patient`,
          {
            tipoDocumento: "/api/paciente/referencias/tipo_documento/0",
            numeroDocumento: null,
            fechaNacimiento: paciente.fec_nac,
            apellido: paciente.apellido,
            nombre: paciente.nombre,
            sexo: `/api/paciente/referencias/sexo/${
              paciente.sexo[0].toUpperCase() === "M"
                ? "1"
                : paciente.sexo[0].toUpperCase() === "F"
                ? "2"
                : "0"
            }`,
            nacionalidad: "/api/referencias/nacionalidades/4",
            responsable: {
              paciente: pacienteCipres?.data?.["@id"],
              // Masculino -> Padre / Femenino -> Madre / X -> Tutor
              tipoRelacion: `${
                pacienteCipres?.data?.sexo?.inicial === "M"
                  ? "P"
                  : pacienteCipres?.data?.sexo?.inicial === "F"
                  ? "M"
                  : "T"
              }`,
            },
          },
          {headers: {"content-type": "application/json", Authorization: `Bearer ${CIPRES_TKN}`}}
        );

        // console.log("# no responsable, registrado paciente hijo", pacienteCipres?.data);
        return pacienteCipres?.data?.["@id"];
      }

      // no encontrado paciente -> Registrar paciente (con/sin doc, extranjeros)
      pacienteCipres = await axios.post(
        `${process.env.CIPRES_URL}/api/patient`,
        {
          tipoDocumento: `/api/paciente/referencias/tipo_documento/${
            paciente.tipo_doc === "DNI" ? "1" : "0"
          }`,
          numeroDocumento: paciente.documento,
          fechaNacimiento: paciente.fec_nac,
          apellido: paciente.apellido,
          nombre: paciente.nombre,
          sexo: `/api/paciente/referencias/sexo/${
            paciente.sexo[0].toUpperCase() === "M"
              ? "1"
              : paciente.sexo[0].toUpperCase() === "F"
              ? "2"
              : "0"
          }`,
          nacionalidad: "/api/referencias/nacionalidades/4",
        },
        {headers: {"content-type": "application/json", Authorization: `Bearer ${CIPRES_TKN}`}}
      );

      // console.log("# no encontrado paciente", pacienteCipres?.data);
      return pacienteCipres?.data?.["@id"];
    }
    if (error.response?.data) {
      return {
        err: `Paciente: ${error.response.data["hydra:description"]}.\n`,
      };
    }
    return {
      err: `Paciente: ${error.message}.\n`,
    };
  }
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
  if (
    !registro.establecimiento.split("/").at(-1) ||
    registro.establecimiento.split("/").at(-1) === "undefined"
  ) {
    errorMessage += "Establecimiento: Sin codigo RUPES.\n";
  }
  if (!registro.dosis) {
    errorMessage += "Dosis: No encontrada en CIPRES.\n";
  }
  if (!registro.paciente) {
    errorMessage += "Paciente: No encontrado en CIPRES.\n";
  }
  if (registro.paciente?.err) {
    errorMessage += registro.paciente.err;
  }
  if (registro.planVacunacion?.err) {
    errorMessage += registro.planVacunacion.err;
  } else if (
    !registro.planVacunacion.split("/").at(-1) ||
    registro.planVacunacion.split("/").at(-1) === "undefined"
  ) {
    errorMessage += "Plan de Vacunacion: No encontrado en CIPRES.\n";
  }
  if (errorMessage)
    return {
      error: {message: errorMessage.substring(0, errorMessage.length - 1), status: 412},
    };
  return true;
};

module.exports = app;
