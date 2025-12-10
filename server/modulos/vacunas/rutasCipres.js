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
        return errorMessage(
          res,
          {
            message: [
              verifica.error.message,
              "\n\nPlanes Existentes de la Vacuna en CIPRES ->",
              ...registro.planesVacunasCipres,
            ],
          },
          verifica.error.status
        );
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

app.post(
  "/vacunas/cipres/planes_aplicacion",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "vacunas"}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
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

    let planesVacunasCipres = await matchPlanesVacunasCIPRES({vacunacionDB: body});

    if (planesVacunasCipres.error) {
      return errorMessage(res, {message: planesVacunasCipres.error}, planesVacunasCipres.status);
    }

    return res.json({
      ok: true,
      planesVacunasCipres,
    });
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
    "Dosis Extra": "DOSIS EXTRA",

    // Ex PSMoreno - Adaptacion no se usan mas
    Neonatal: "1º DOSIS",
    "Refuerzo 4to": "REFUERZO",

    // CIPRES, no SISA (NOMIVAC)
    // "MEDIA DOSIS"
    // "MEDIA 1° DOSIS"
    // "MEDIA 2° DOSIS"
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
  // matchPlanesVacunasCIPRES({vacuna,dosis,estrategia(esquema|motivo),poblacionEspecial}) => id
  // {
  //   vacuna.idNomivac;
  //   planVacunacionDosis[dosis.id];
  //   descripcionEsquema | descripcionMotivo;
  //   descripcionPoblacion -> Embarazo, Puerperio, Grupos de riesgo, Personal de salud, Personal esencial
  // }
  registro.planVacunacion = await matchPlanesVacunasCIPRES({
    vacunacionDB: {
      id_Nomivac: vacunacionDB.insumo.id_Nomivac,
      edad_days_aplicacion: vacunacionDB.paciente.edad_days_aplicacion,
      estrategia: vacunacionDB.estrategia,
      dosis: vacunacionDB.dosis,
      qty_dosis: vacunacionDB.qty_dosis,
      embarazada_semana: vacunacionDB.embarazada_semana,
      puerpera: vacunacionDB.puerpera,
      riesgo: vacunacionDB.riesgo,
      personal_salud: vacunacionDB.personal_salud,
      personal_esencial: vacunacionDB.personal_esencial,
    },
    CIPRES,
  });

  if (!registro.planVacunacion.err) {
    registro.planesVacunasCipres = [
      ...registro.planVacunacion.map((plan) => `\n\n${plan.descripcion}`),
    ];
    // filtrar y ver si queda uno solo con coincidencia 100
    registro.planVacunacion = registro.planVacunacion.filter((plan) => plan.coincidencias === 100);
    if (registro.planVacunacion.length === 1) {
      // si quedo un solo elemento autoseleccionarlo
      registro.planVacunacion = `/api/vacunacion/plan_vacunacion/${registro.planVacunacion[0].id}`;
    } else if (registro.planVacunacion.length > 1) {
      // tiene mas de un plan que coincide con los datos
      registro.planVacunacion.err = `Plan de Vacunacion: Mas de un plan coincidente encontrado (${registro.planVacunacion.length}) en CIPRES.`;
    } else {
      // ningun plan coincidio con los datos
      registro.planVacunacion.err =
        "Plan de Vacunacion: Ningun plan coincidente encontrado en CIPRES.";
    }
  }

  if (registro.planVacunacion.err) {
    registro.planVacunacion.err +=
      "\nDatos Enviados ->" +
      `\nVacuna: ${vacunacionDB.insumo.nombre} (${vacunacionDB.insumo.id_Nomivac}).` +
      `\nDosis Administrada: ${vacunacionDB.qty_dosis ?? "Dosis completa"}.` +
      `\nEstrategia: ${vacunacionDB.estrategia}. (Motivo|Esquema CIPRES)` +
      `\nPoblacion: ${
        vacunacionDB.embarazada_semana
          ? "Embarazada"
          : vacunacionDB.puerpera
          ? "Puerpera"
          : vacunacionDB.riesgo
          ? "Grupo de Riesgo"
          : vacunacionDB.personal_salud
          ? "Personal de Salud"
          : vacunacionDB.personal_esencial
          ? "Personal de Esencial"
          : "Default"
      }.` +
      `\nDosis: ${vacunacionDB.dosis}.` +
      `\nEdad Paciente: ${vacunacionDB.paciente.edad_days_aplicacion} (dias).\n`;
  }

  // registro.planVacunacion.err += "\nPlanes Existentes de la Vacuna en CIPRES ->";
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

const matchPlanesVacunasCIPRES = async ({vacunacionDB, CIPRES}) => {
  // Comparar planes de CIPRES con los datos recibidos, retornar todos los planes de la vacuna
  // pero marcando opciones coincidentes y ordenados por mayor coincidencia
  // Prioridad de Seleccion => Embarazo > Puerperio > Grupos de riesgo > Personal de Salud > Personal Esencial ?

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
    "Dosis Extra": "DOSIS EXTRA",

    // Ex PSMoreno - Adaptacion no se usan mas
    Neonatal: "1º DOSIS",
    "Refuerzo 4to": "REFUERZO",

    // CIPRES, no SISA (NOMIVAC)
    // "MEDIA DOSIS"
    // "MEDIA 1° DOSIS"
    // "MEDIA 2° DOSIS"
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

  // Verificar datos recibidos
  if (
    !vacunacionDB.id_Nomivac ||
    !vacunacionDB.estrategia ||
    !vacunacionDB.dosis ||
    !vacunacionDB.edad_days_aplicacion
    // vacunacionDB.qty_dosis
  ) {
    return {error: "Plan de Vacunacion: Falta información para proceder.", status: 412};
  }

  let poblacion_especial = false;
  // Opcionales
  // especialidades (embarazo | puerpera | salud | esencial | riesgo) comparar -> descripcionPoblacion;
  if (
    vacunacionDB.embarazada_semana ||
    vacunacionDB.puerpera ||
    vacunacionDB.riesgo ||
    vacunacionDB.personal_salud ||
    vacunacionDB.personal_esencial
  ) {
    poblacion_especial = true;
  }

  // Obtener datos de planes del CIPRES para detectar coincidencias
  let planCipres = null;
  if (CIPRES?.planVacunacionesVacunaNOMIVAC) {
    planCipres = CIPRES.planVacunacionesVacunaNOMIVAC?.[vacunacionDB.id_Nomivac] ?? [];
  } else {
    planCipres = await getDataBaseCipres();
    if (planCipres.error) {
      // SI CIPRES RESPONDE CON ERROR DARLE FORMATO
      if (planCipres.error.response) {
        planCipres.error = errorCIPRES({respuesta: planCipres.error.response});
      }
      return errorMessage(res, {message: planCipres.error.message}, planCipres.error.status);
    }
    planCipres = planCipres.planVacunacionesVacunaNOMIVAC?.[vacunacionDB.id_Nomivac] ?? [];
  }

  // Recorrer planes de la vacuna -> marcar coincidencias
  for (let index = 0; index < planCipres.length; index++) {
    let planTemp = {
      id_plan: planCipres[index]["id"],
      coincidencias: 0,
      si: {},
      no: {},
      tal_vez: {},
      descripcion: ` ● Plan: ${planCipres[index]["descripcionPlan"] ?? "Sin Nombre"} (${
        planCipres[index]["id"]
      }).`,
    };

    // seleccionar con qty_dosis (DosisAdministrada) si existe (Media dosis|Doble dosis) o si no existe con dosis Completa
    if (
      (!vacunacionDB.qty_dosis && "Dosis completa" !== planCipres[index].descDosisAdministrada) ||
      (vacunacionDB.qty_dosis && vacunacionDB.qty_dosis !== planCipres[index].descDosisAdministrada)
    ) {
      // qty_dosis no coincide
      planTemp.no.descDosisAdministrada = planCipres[index].descDosisAdministrada;
      planTemp.descripcion += `\n   Dosis Administrada: ${planCipres[index]["descDosisAdministrada"]}. ☐`;
    } else {
      // qty_dosis coincide
      planTemp.si.descDosisAdministrada = planCipres[index].descDosisAdministrada;
      planTemp.descripcion += `\n   Dosis Administrada: ${planCipres[index]["descDosisAdministrada"]}. ☑`;
    }

    // seleccionar con estrategia (esquema|motivo)
    let estrategia = [];
    // separar cadena de texto CIPRES en palabras del
    if (miEstrategiaToCipres[vacunacionDB.estrategia].clase === "esquemas") {
      // descripcionEsquema;
      estrategia.push(...planCipres[index].descripcionEsquema.split(" "));
    } else {
      // descripcionMotivo;
      estrategia.push(...planCipres[index].descripcionMotivo.split(" "));
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

    if (estrategia === true) {
      if (miEstrategiaToCipres[vacunacionDB.estrategia].clase === "esquemas") {
        // esquema coincide
        planTemp.tal_vez.descripcionMotivo = planCipres[index].descripcionMotivo;
        planTemp.descripcion += `\n   Motivo: ${planCipres[index]["descripcionMotivo"]}. ⊡`;
        planTemp.si.descripcionEsquema = planCipres[index].descripcionEsquema;
        planTemp.descripcion += `\n   Esquema: ${planCipres[index]["descripcionEsquema"]}. ☑`;
      } else {
        // motivo coincide
        planTemp.si.descripcionMotivo = planCipres[index].descripcionMotivo;
        planTemp.descripcion += `\n   Motivo: ${planCipres[index]["descripcionMotivo"]}. ☑`;
        planTemp.tal_vez.descripcionEsquema = planCipres[index].descripcionEsquema;
        planTemp.descripcion += `\n   Esquema: ${planCipres[index]["descripcionEsquema"]}. ⊡`;
      }
    } else {
      if (miEstrategiaToCipres[vacunacionDB.estrategia].clase === "esquemas") {
        // esquema no coincide
        planTemp.tal_vez.descripcionMotivo = planCipres[index].descripcionMotivo;
        planTemp.descripcion += `\n   Motivo: ${planCipres[index]["descripcionMotivo"]}. ⊡`;
        planTemp.no.descripcionEsquema = planCipres[index].descripcionEsquema;
        planTemp.descripcion += `\n   Esquema: ${planCipres[index]["descripcionEsquema"]}. ☐`;
      } else {
        // motivo no coincide
        planTemp.no.descripcionMotivo = planCipres[index].descripcionMotivo;
        planTemp.descripcion += `\n   Motivo: ${planCipres[index]["descripcionMotivo"]}. ☐`;
        planTemp.tal_vez.descripcionEsquema = planCipres[index].descripcionEsquema;
        planTemp.descripcion += `\n   Esquema: ${planCipres[index]["descripcionEsquema"]}. ⊡`;
      }
    }
    estrategia = null;

    // seleccionar por poblacion
    // especialidades (embarazo | puerpera | salud | esencial | riesgo) comparar -> descripcionPoblacion;
    switch (planCipres[index].descripcionPoblacion) {
      case "Embarazo":
        if (vacunacionDB.embarazada_semana) {
          // poblacion coincide
          planTemp.si.descripcionPoblacion = planCipres[index].descripcionPoblacion;
        } else {
          // poblacion no coincide
          planTemp.no.descripcionPoblacion = planCipres[index].descripcionPoblacion;
        }
        break;

      case "Puerperio":
        if (vacunacionDB.puerpera) {
          // poblacion coincide
          planTemp.si.descripcionPoblacion = planCipres[index].descripcionPoblacion;
        } else {
          // poblacion no coincide
          planTemp.no.descripcionPoblacion = planCipres[index].descripcionPoblacion;
        }
        break;

      case "Grupos de riesgo":
        if (vacunacionDB.riesgo) {
          // poblacion coincide
          planTemp.si.descripcionPoblacion = planCipres[index].descripcionPoblacion;
        } else {
          // poblacion no coincide
          planTemp.no.descripcionPoblacion = planCipres[index].descripcionPoblacion;
        }
        break;

      case "Personal de salud":
        if (vacunacionDB.personal_salud) {
          // poblacion coincide
          planTemp.si.descripcionPoblacion = planCipres[index].descripcionPoblacion;
        } else {
          // poblacion no coincide
          planTemp.no.descripcionPoblacion = planCipres[index].descripcionPoblacion;
        }
        break;

      case "Personal esencial":
        if (vacunacionDB.personal_esencial) {
          // poblacion coincide
          planTemp.si.descripcionPoblacion = planCipres[index].descripcionPoblacion;
        } else {
          // poblacion no coincide
          planTemp.no.descripcionPoblacion = planCipres[index].descripcionPoblacion;
        }
        break;

      default:
        if (
          planCipres[index].descripcionEsquema === "Grupos de Riesgo" ||
          planCipres[index].descripcionMotivo === "Grupos de Riesgo"
        ) {
          if (vacunacionDB.riesgo) {
            // poblacion coincide
            planTemp.si.descripcionPoblacion = planCipres[index].descripcionPoblacion;
            break;
          }
          // poblacion no coincide
          planTemp.no.descripcionPoblacion = planCipres[index].descripcionPoblacion;
          break;
        }

        if (poblacion_especial) {
          planTemp.no.descripcionPoblacion = planCipres[index].descripcionPoblacion;
        } else {
          planTemp.tal_vez.descripcionPoblacion = planCipres[index].descripcionPoblacion;
        }
        break;
    }

    if (planTemp.si.descripcionPoblacion) {
      planTemp.descripcion += `\n   Poblacion: ${planCipres[index]["descripcionPoblacion"]}. ☑`;
    } else if (planTemp.tal_vez.descripcionPoblacion) {
      planTemp.descripcion += `\n   Poblacion: ${planCipres[index]["descripcionPoblacion"]}. ⊡`;
    } else {
      planTemp.descripcion += `\n   Poblacion: ${planCipres[index]["descripcionPoblacion"]}. ☐`;
    }

    // seleccionar con dosis y edad
    for (const dosis of planCipres[index].planVacunacionDosis) {
      if (
        dosis.dosis.descripcionDosis === miDosisToCipres[vacunacionDB.dosis] &&
        dosis.edadDesde <= vacunacionDB.edad_days_aplicacion &&
        vacunacionDB.edad_days_aplicacion <= dosis.edadHasta
      ) {
        // si dosis y edad
        planTemp.si.dosis = dosis["dosis"]["descripcionDosis"];
        planTemp.si.edad_days_aplicacion = `${dosis["edadDesde"]} - ${dosis["edadHasta"]} (dias).`;
        delete planTemp.tal_vez.dosis;
        delete planTemp.tal_vez.edad_days_aplicacion;
        delete planTemp.no.dosis;
        delete planTemp.no.edad_days_aplicacion;
        planTemp.descripcion += `\n » Dosis: ${dosis["dosis"]["descripcionDosis"]}. ☑`;
        planTemp.descripcion += `\n   Desde: ${dosis["edadDesde"]} - Hasta: ${dosis["edadHasta"]} (dias). ☑`;
      } else {
        if (dosis.dosis.descripcionDosis === miDosisToCipres[vacunacionDB.dosis]) {
          // talvez dosis
          if (!planTemp.si.dosis) {
            planTemp.tal_vez.dosis = dosis["dosis"]["descripcionDosis"];
            delete planTemp.no.dosis;
          }
          planTemp.descripcion += `\n » Dosis: ${dosis["dosis"]["descripcionDosis"]}. ⊡`;
        } else {
          // no dosis
          if (!(planTemp.si.dosis || planTemp.tal_vez.dosis)) {
            planTemp.no.dosis = dosis["dosis"]["descripcionDosis"];
          }
          planTemp.descripcion += `\n » Dosis: ${dosis["dosis"]["descripcionDosis"]}. ☐`;
        }

        if (
          dosis.edadDesde <= vacunacionDB.edad_days_aplicacion &&
          vacunacionDB.edad_days_aplicacion <= dosis.edadHasta
        ) {
          // talvez edad
          if (!planTemp.si.edad_days_aplicacion) {
            planTemp.tal_vez.edad_days_aplicacion = `${dosis["edadDesde"]} - ${dosis["edadHasta"]} (dias).`;
            delete planTemp.no.edad_days_aplicacion;
          }
          planTemp.descripcion += `\n   Desde: ${dosis["edadDesde"]} - Hasta: ${dosis["edadHasta"]} (dias). ⊡`;
        } else {
          // no edad
          if (!(planTemp.si.edad_days_aplicacion || planTemp.tal_vez.edad_days_aplicacion)) {
            planTemp.no.edad_days_aplicacion = `${dosis["edadDesde"]} - ${dosis["edadHasta"]} (dias).`;
          }
          planTemp.descripcion += `\n   Desde: ${dosis["edadDesde"]} - Hasta: ${dosis["edadHasta"]} (dias). ☐`;
        }
      }
    }

    planTemp.coincidencias =
      ((Object.keys(planTemp.si).length * 10 + Object.keys(planTemp.tal_vez).length) /
        (Object.keys(planTemp.si).length * 10 +
          Object.keys(planTemp.tal_vez).length +
          Object.keys(planTemp.no).length * 10)) *
      100;
    planTemp.descripcion =
      ` ▲ Coincidencias: ${planTemp.coincidencias.toFixed(2)}%.\n` + planTemp.descripcion;
    planCipres[index] = planTemp;
  }
  if (!planCipres?.length) {
    return {
      error: "Plan de Vacunacion: No existen planes para esta Vacuna en CIPRES.",
      status: 404,
    };
  }

  // ordenar los planes por mayores coincidencias (descendente)
  planCipres.sort((a, b) => b.coincidencias - a.coincidencias);
  return planCipres;
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
