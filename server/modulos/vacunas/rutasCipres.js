const express = require("express");
const axios = require("axios");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage, errorAxios} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
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
          select:
            "tipo_doc documento fec_nac nombre apellido sexo cipres_id resp_apellido resp_nombre resp_tipo_doc doc_responsable resp_sexo resp_fec_nac",
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

      if (vacunacionDB.paciente.edad_days_aplicacion.error) {
        return errorMessage(res, {message: "Error al calcular la Edad del Paciente (Dias)."}, 412);
      }

      // obtener datos estructurales de CIPRES para el matcheo
      let CIPRES = await getDataBaseCipres();
      if (CIPRES.error) {
        // SI CIPRES RESPONDE CON ERROR DARLE FORMATO
        if (CIPRES.error.response) {
          CIPRES.error = errorCIPRES({respuesta: CIPRES.error.response});
        }
        // SI CIPRES NO RESPONDE DARLE FORMATO
        if (CIPRES.error.request && CIPRES.error.isAxiosError) {
          CIPRES.error = errorAxios({serverName: "CIPRES", code: CIPRES.error.code});
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
            message: verifica.error.planError
              ? [
                  verifica.error.message,
                  "\n\nPlanes Existentes de la Vacuna en CIPRES ->",
                  ...registro.planesVacunasCipres,
                ]
              : [verifica.error.message],
          },
          verifica.error.status
        );
      }

      // registrar aplicacion en CIPRES.
      registro = await axios.post(
        `${process.env.CIPRES_URL}/api/vacunacion/vacunaciones`,
        registro,
        {
          headers: {"content-type": "application/json", Authorization: `Bearer ${CIPRES_TKN}`},
          timeout: 5 * 60 * 1000, // 300.000 (300seg = 5min) default is `0` (no timeout)
        }
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
        {
          headers: {"content-type": "application/json"},
          timeout: 5 * 60 * 1000, // 300.000 (300seg = 5min) default is `0` (no timeout)
        }
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
        poblacionesUsadasEnPlanes: {},
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
          poblacionesUsadasEnPlanes: {},
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
        poblacionesUsadasEnPlanes: {},
        dosisAdministradaUsadasEnPlanes: {},
        VacunaNomivacOpciones: {},
      };

      // dosis;
      respuesta = await axios.get(`${process.env.CIPRES_URL}/api/vacunacion/dosis`, {
        headers: {Authorization: `Bearer ${CIPRES_TKN}`},
        timeout: 5 * 60 * 1000, // 300.000 (300seg = 5min) default is `0` (no timeout)
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
        timeout: 5 * 60 * 1000, // 300.000 (300seg = 5min) default is `0` (no timeout)
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
        timeout: 5 * 60 * 1000, // 300.000 (300seg = 5min) default is `0` (no timeout)
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
              timeout: 5 * 60 * 1000, // 300.000 (300seg = 5min) default is `0` (no timeout)
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
            timeout: 5 * 60 * 1000, // 300.000 (300seg = 5min) default is `0` (no timeout)
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
        CIPRES.motivosUsadosEnPlanes[plan.motivo.descripcionMotivo] =
          (CIPRES.motivosUsadosEnPlanes[plan.motivo.descripcionMotivo] ?? 0) + 1;
        CIPRES.esquemasUsadosEnPlanes[plan.esquema.descripcionEsquema] =
          (CIPRES.esquemasUsadosEnPlanes[plan.esquema.descripcionEsquema] ?? 0) + 1;
        CIPRES.poblacionesUsadasEnPlanes[plan.poblacionObjetivo.descripcionPoblacion] =
          (CIPRES.poblacionesUsadasEnPlanes[plan.poblacionObjetivo.descripcionPoblacion] ?? 0) + 1;
        CIPRES.dosisAdministradaUsadasEnPlanes[plan.dosisAdministrada.descDosisAdministrada] =
          (CIPRES.dosisAdministradaUsadasEnPlanes[plan.dosisAdministrada.descDosisAdministrada] ??
            0) + 1;
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
            CIPRES.dosisUsadosEnPlanes[dosis.dosis.descripcionDosis] =
              (CIPRES.dosisUsadosEnPlanes[dosis.dosis.descripcionDosis] ?? 0) + 1;
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
    // filtrar y ver si quedan coincidencias con 100
    registro.planVacunacion = registro.planVacunacion.filter((plan) => plan.coincidencias === 100);
    if (registro.planVacunacion.length >= 1) {
      // selecciona el primero segun como fue ordenado y filtrado
      // ordenado por poblacion_especial (descendente), edad_desde (descendente), edad_hasta (ascendente) y coincidencias === 100.
      registro.planVacunacion = `/api/vacunacion/plan_vacunacion/${registro.planVacunacion[0].id_plan}`;
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
          : vacunacionDB.riesgo || vacunacionDB.estrategia === "Grupo de Riesgo"
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

  // paciente -> "tipo_doc documento fec_nac nombre apellido sexo cipres_id resp_apellido resp_nombre resp_tipo_doc doc_responsable resp_sexo resp_fec_nac";
  // PS MIGRACION -> ps_tipo_doc, ps_doc, ps_doc_resp, ps_fecha_nacimiento, ps_nombreC;
  paciente.tipo_doc = paciente?.tipo_doc ?? ps_tipo_doc;
  paciente.documento = paciente?.documento ?? ps_doc;
  paciente.doc_responsable = paciente?.doc_responsable ?? ps_doc_resp;
  paciente.fec_nac = new Date(paciente?.fec_nac ?? ps_fecha_nacimiento).toISOString().slice(0, 10);
  paciente.apellido = paciente?.apellido ?? ps_nombreC?.split(",")[0];
  paciente.nombre = paciente?.nombre ?? ps_nombreC?.split(",")[1];
  try {
    let pacienteCipres = await axios.get(`${process.env.CIPRES_URL}/api/patient`, {
      params: {
        numeroDocumento: paciente.documento ?? paciente.doc_responsable,
        sexo: paciente.documento
          ? paciente.sexo[0].toUpperCase()
          : paciente.resp_sexo[0].toUpperCase(),
        esDocumentoArgentino: paciente.documento
          ? paciente.tipo_doc === "DNI" || !paciente.tipo_doc
            ? true
            : false
          : paciente.resp_tipo_doc === "DNI" || !paciente.resp_tipo_doc
          ? true
          : false,
        esDocumentoPropio: true,
        incluirRelaciones: paciente.doc_responsable && !paciente.documento ? true : false,
        tipoDocumento: `/api/paciente/referencias/tipo_documento/${
          paciente.documento
            ? paciente.tipo_doc === "DNI"
              ? "1"
              : "0"
            : paciente.resp_tipo_doc === "DNI"
            ? "1"
            : "0"
        }`,
        incluirDomicilio: false,
        // establecimiento: "",
      },
      headers: {
        Authorization: `Bearer ${CIPRES_TKN}`,
        timeout: 5 * 60 * 1000, // 300.000 (300seg = 5min) default is `0` (no timeout)
      },
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
        let responsableDB = await Paciente.findOne(
          paciente.resp_sexo
            ? {
                sexo: paciente.resp_sexo,
                tipo_doc: paciente.resp_tipo_doc ?? "DNI",
                documento: paciente.doc_responsable,
              }
            : {tipo_doc: paciente.resp_tipo_doc ?? "DNI", documento: paciente.doc_responsable}
        )
          .select("apellido nombre tipo_doc documento sexo fec_nac cipres_id")
          .exec();

        let responsable = {};
        responsable.apellido = paciente.resp_apellido ?? responsableDB.apellido;
        responsable.nombre = paciente.resp_nombre ?? responsableDB.nombre;
        responsable.tipo_doc = paciente.resp_tipo_doc ?? responsableDB.tipo_doc;
        responsable.documento = paciente.doc_responsable ?? responsableDB.documento;
        responsable.sexo = paciente.resp_sexo ?? responsableDB.sexo;
        responsable.fec_nac = paciente.resp_fec_nac ?? responsableDB.fec_nac;

        if (
          !responsable.apellido ||
          !responsable.nombre ||
          !responsable.fec_nac ||
          !responsable.sexo
        ) {
          return {
            err:
              "Paciente: Faltan datos del Responsable para poder Registrarlo en CIPRES." +
              `\nDatos Responsable-> Documento: ${responsable.documento}. ` +
              `Apellido: ${responsable.apellido}. Nombre: ${responsable.nombre}. ` +
              `Nacimiento: ${responsable.fec_nac}. Sexo: ${responsable.sexo}.\n`,
          };
        }
        responsable.fec_nac = new Date(responsable.fec_nac).toISOString().slice(0, 10);

        // comparar fecha de nacimiento del responsable => DIA-MES-AÑO -> AÑO-MES-DIA
        if (
          pacienteCipres.data["hydra:member"][0].paciente?.fechaNacimiento
            ?.split("-")
            .reverse()
            .join("-") !== responsable.fec_nac
        ) {
          return {
            err:
              "Paciente: Fecha de Nacimiento del Responsable no coincide con la del CIPRES." +
              `\nDatos -> Documento Responsable: ${responsable.documento}. ` +
              `\nCIPRES: ${pacienteCipres.data["hydra:member"][0].paciente?.fechaNacimiento
                ?.split("-")
                .reverse()
                .join("-")}. LOCAL: ${responsable.fec_nac}\n`,
          };
        }

        // buscar "hijos" del responsable si tiene
        if (pacienteCipres.data["hydra:member"][0].hijos?.length > 0) {
          pacienteCipres = await axios.get(`${process.env.CIPRES_URL}/api/patient`, {
            params: {
              numeroDocumento: responsable.documento,
              sexo: responsable.sexo[0].toUpperCase(),
              esDocumentoArgentino:
                responsable.tipo_doc === "DNI" || !responsable.tipo_doc ? true : false,
              esDocumentoPropio: false,
              incluirRelaciones: true,
              tipoDocumento: `/api/paciente/referencias/tipo_documento/${
                responsable.tipo_doc === "DNI" ? "1" : "0"
              }`,
              incluirDomicilio: false,
              // establecimiento: "",
            },
            headers: {
              Authorization: `Bearer ${CIPRES_TKN}`,
              timeout: 5 * 60 * 1000, // 300.000 (300seg = 5min) default is `0` (no timeout)
            },
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
                numeroDocumento: responsable.documento,
                sexo: responsable.sexo[0].toUpperCase(),
                esDocumentoArgentino: true,
                esDocumentoPropio: true,
                incluirRelaciones: false,
                tipoDocumento: `/api/paciente/referencias/tipo_documento/${
                  responsable.tipo_doc === "DNI" ? "1" : "0"
                }`,
                incluirDomicilio: false,
              },
              headers: {
                Authorization: `Bearer ${CIPRES_TKN}`,
                timeout: 5 * 60 * 1000, // 300.000 (300seg = 5min) default is `0` (no timeout)
              },
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
          {
            headers: {"content-type": "application/json", Authorization: `Bearer ${CIPRES_TKN}`},
            timeout: 5 * 60 * 1000, // 300.000 (300seg = 5min) default is `0` (no timeout)
          }
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
        let responsableDB = await Paciente.findOne(
          paciente.resp_sexo
            ? {
                sexo: paciente.resp_sexo,
                tipo_doc: paciente.resp_tipo_doc ?? "DNI",
                documento: paciente.doc_responsable,
              }
            : {tipo_doc: paciente.resp_tipo_doc ?? "DNI", documento: paciente.doc_responsable}
        )
          .select("apellido nombre tipo_doc documento sexo fec_nac cipres_id")
          .exec();

        let responsable = {};
        responsable.apellido = paciente.resp_apellido ?? responsableDB.apellido;
        responsable.nombre = paciente.resp_nombre ?? responsableDB.nombre;
        responsable.tipo_doc = paciente.resp_tipo_doc ?? responsableDB.tipo_doc;
        responsable.documento = paciente.doc_responsable ?? responsableDB.documento;
        responsable.sexo = paciente.resp_sexo ?? responsableDB.sexo;
        responsable.fec_nac = paciente.resp_fec_nac ?? responsableDB.fec_nac;

        if (
          !responsable.apellido ||
          !responsable.nombre ||
          !responsable.fec_nac ||
          !responsable.sexo
        ) {
          return {
            err:
              "Paciente: Faltan datos del Responsable para poder Registrarlo en CIPRES." +
              `\nDatos Responsable-> Documento: ${responsable.documento}. ` +
              `Apellido: ${responsable.apellido}. Nombre: ${responsable.nombre}. ` +
              `Nacimiento: ${responsable.fec_nac}. Sexo: ${responsable.sexo}.\n`,
          };
        }
        responsable.fec_nac = new Date(responsable.fec_nac).toISOString().slice(0, 10);

        // Registrar responsable
        let pacienteCipres = await axios.post(
          `${process.env.CIPRES_URL}/api/patient`,
          {
            tipoDocumento: `/api/paciente/referencias/tipo_documento/${
              responsable.tipo_doc === "DNI" ? "1" : "0"
            }`,
            numeroDocumento: responsable.documento,
            fechaNacimiento: responsable.fec_nac,
            apellido: responsable.apellido,
            nombre: responsable.nombre,
            sexo: `/api/paciente/referencias/sexo/${
              responsable.sexo[0].toUpperCase() === "M"
                ? "1"
                : responsable.sexo[0].toUpperCase() === "F"
                ? "2"
                : "0"
            }`,
            nacionalidad: "/api/referencias/nacionalidades/4",
          },
          {
            headers: {"content-type": "application/json", Authorization: `Bearer ${CIPRES_TKN}`},
            timeout: 5 * 60 * 1000, // 300.000 (300seg = 5min) default is `0` (no timeout)
          }
        );

        // console.log("# no responsable, registrado", pacienteCipres?.data, responsable);
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
          {
            headers: {"content-type": "application/json", Authorization: `Bearer ${CIPRES_TKN}`},
            timeout: 5 * 60 * 1000, // 300.000 (300seg = 5min) default is `0` (no timeout)
          }
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
        {
          headers: {"content-type": "application/json", Authorization: `Bearer ${CIPRES_TKN}`},
          timeout: 5 * 60 * 1000, // 300.000 (300seg = 5min) default is `0` (no timeout)
        }
      );

      // console.log("# no encontrado paciente", pacienteCipres?.data);
      return pacienteCipres?.data?.["@id"];
    }
    if (error.response?.data) {
      return {
        err: `Paciente: CIPRES ${error.response.data["hydra:description"]}.\n`,
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
  // estrategia: { name: descripcion, clase: (esquemas|motivos|alguno) },
  const miEstrategiaToCipres = {
    Calendario: {name: "Regular", clase: "alguno"},
    Campaña: {name: "Campaña", clase: "motivos"},
    Atrasado: {name: "Recupero", clase: "esquemas"},
    "Prescripcion Medica": {name: "Prescripción", clase: "alguno"},
    "Grupo de Riesgo": {name: "Riesgo", clase: "alguno"},
    "Post Exposicion": {name: "Exposicion", clase: "motivos"},
    "Por excepcion": {name: "Excepcion", clase: "alguno"},

    // Ex PSMoreno - Adaptacion no se usan mas
    Contactos: {name: "Exposicion", clase: "motivos"},
    Terreno: {name: "Campaña", clase: "motivos"},
    Internacion: {name: "Prescripción", clase: "alguno"},
    "Pre Exposicion": {name: "Pre", clase: "motivos"},
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
      // SI CIPRES NO RESPONDE DARLE FORMATO
      if (planCipres.error.request && planCipres.error.isAxiosError) {
        planCipres.error = errorAxios({serverName: "CIPRES", code: planCipres.error.code});
      }
      return {
        error: planCipres.error.message,
        status: planCipres.error.status,
      };
    }
    planCipres = planCipres.planVacunacionesVacunaNOMIVAC?.[vacunacionDB.id_Nomivac] ?? [];
  }

  // Recorrer planes de la vacuna -> marcar coincidencias
  for (let index = 0; index < planCipres.length; index++) {
    let planTemp = {
      id_plan: planCipres[index]["id"],
      coincidencias: 0,
      // poblacion especial -> peso de seleccion
      poblacion_especial: 0,
      edad_desde: 0,
      edad_hasta: 0,
      si: {},
      no: {},
      tal_vez: {},
      descripcion: ` ● Plan: ${planCipres[index]["descripcionPlan"] ?? "Sin Nombre"} (${
        planCipres[index]["id"]
      }).`,
    };

    // SELECCIONAR con qty_dosis (DosisAdministrada) si existe (Media dosis|Doble dosis) o si no existe con dosis Completa
    if (
      (!vacunacionDB.qty_dosis && planCipres[index].descDosisAdministrada !== "Dosis completa") ||
      (vacunacionDB.qty_dosis && planCipres[index].descDosisAdministrada !== vacunacionDB.qty_dosis)
    ) {
      // qty_dosis no coincide
      planTemp.no["Dosis Administrada"] = planCipres[index].descDosisAdministrada;
      planTemp.descripcion += `\n   Dosis Administrada: ${planCipres[index]["descDosisAdministrada"]}. ☐`;
    } else {
      // qty_dosis coincide
      planTemp.si["Dosis Administrada"] = planCipres[index].descDosisAdministrada;
      planTemp.descripcion += `\n   Dosis Administrada: ${planCipres[index]["descDosisAdministrada"]}. ☑`;
    }

    // SELECCIONAR con estrategia (motivo|esquema|alguno[riesgo-poblacion])
    // descripcionMotivo;
    if (
      miEstrategiaToCipres[vacunacionDB.estrategia].clase === "motivos" ||
      miEstrategiaToCipres[vacunacionDB.estrategia].clase === "alguno"
    ) {
      // Dividir palabras -> chequar palabra -> si o no
      if (
        // separar cadena de texto CIPRES en palabras
        planCipres[index].descripcionMotivo.split(" ").some((motivo) => {
          // comparar si alguna de las palabras es de nuestra estrategia
          return (
            // Case-insensitive and accent-insensitive comparison
            motivo.localeCompare(miEstrategiaToCipres[vacunacionDB.estrategia].name, undefined, {
              sensitivity: "base",
            }) === 0
          );
        })
      ) {
        planTemp.si.Motivo = planCipres[index].descripcionMotivo;
      } else {
        planTemp.no.Motivo = planCipres[index].descripcionMotivo;
      }
    }

    // descripcionEsquema;
    if (
      miEstrategiaToCipres[vacunacionDB.estrategia].clase === "esquemas" ||
      miEstrategiaToCipres[vacunacionDB.estrategia].clase === "alguno"
    ) {
      // Dividir palabras -> chequar palabra -> si o no
      if (
        // separar cadena de texto CIPRES en palabras
        planCipres[index].descripcionEsquema.split(" ").some((esquema) => {
          // comparar si alguna de las palabras es de nuestra estrategia
          return (
            // Case-insensitive and accent-insensitive comparison
            esquema.localeCompare(miEstrategiaToCipres[vacunacionDB.estrategia].name, undefined, {
              sensitivity: "base",
            }) === 0
          );
        })
      ) {
        planTemp.si.Esquema = planCipres[index].descripcionEsquema;
      } else {
        planTemp.no.Esquema = planCipres[index].descripcionEsquema;
      }
    }

    // EN BASE A miEstrategiaToCipres.clase modificar los no por tal vez
    if (miEstrategiaToCipres[vacunacionDB.estrategia].clase === "alguno") {
      if (planTemp.si.Motivo && planTemp.si.Esquema) {
        planTemp.poblacion_especial += 5;
      } else if (planTemp.si.Motivo && planTemp.no.Esquema) {
        planTemp.tal_vez.Esquema = planCipres[index].descripcionEsquema;
        delete planTemp.no.Esquema;
      } else if (planTemp.no.Motivo && planTemp.si.Esquema) {
        planTemp.tal_vez.Motivo = planCipres[index].descripcionMotivo;
        delete planTemp.no.Motivo;
      } else if (planTemp.no.Motivo && planTemp.no.Esquema) {
        planTemp.no.Estrategia = `Motivo: ${planTemp.no.Motivo}; Esquema: ${planTemp.no.Esquema}`;
        delete planTemp.no.Motivo;
        delete planTemp.no.Esquema;
      }
    } else if (miEstrategiaToCipres[vacunacionDB.estrategia].clase === "motivos") {
      planTemp.tal_vez.Esquema = planCipres[index].Esquema;
    } else if (miEstrategiaToCipres[vacunacionDB.estrategia].clase === "esquemas") {
      planTemp.tal_vez.Motivo = planCipres[index].descripcionMotivo;
    }

    // completar descripcion en base al resultado obtenido
    if (planTemp.si.Motivo) {
      planTemp.descripcion += `\n   Motivo: ${planCipres[index]["descripcionMotivo"]}. ☑`;
    } else if (planTemp.tal_vez.Motivo) {
      planTemp.descripcion += `\n   Motivo: ${planCipres[index]["descripcionMotivo"]}. ⊡`;
    } else {
      planTemp.descripcion += `\n   Motivo: ${planCipres[index]["descripcionMotivo"]}. ☐`;
    }
    if (planTemp.si.Esquema) {
      planTemp.descripcion += `\n   Esquema: ${planCipres[index]["descripcionEsquema"]}. ☑`;
    } else if (planTemp.tal_vez.Esquema) {
      planTemp.descripcion += `\n   Esquema: ${planCipres[index]["descripcionEsquema"]}. ⊡`;
    } else {
      planTemp.descripcion += `\n   Esquema: ${planCipres[index]["descripcionEsquema"]}. ☐`;
    }

    // SELECCIONAR por poblacion especial
    // descripcionPoblacion (embarazo 100 | puerpera 90 | riesgo 80/40 | salud 70 | esencial 60 | Default 50)
    switch (planCipres[index].descripcionPoblacion) {
      case "Embarazo":
        if (vacunacionDB.embarazada_semana) {
          // poblacion coincide
          planTemp.si.Poblacion = planCipres[index].descripcionPoblacion;
          planTemp.poblacion_especial += 100;
        } else {
          // poblacion no coincide
          planTemp.no.Poblacion = planCipres[index].descripcionPoblacion;
        }
        break;

      case "Puerperio":
        if (vacunacionDB.puerpera) {
          // poblacion coincide
          planTemp.si.Poblacion = planCipres[index].descripcionPoblacion;
          planTemp.poblacion_especial += 90;
        } else {
          // poblacion no coincide
          planTemp.no.Poblacion = planCipres[index].descripcionPoblacion;
        }
        break;

      case "Grupos de riesgo":
        if (vacunacionDB.riesgo || vacunacionDB.estrategia === "Grupo de Riesgo") {
          // poblacion coincide
          planTemp.si.Poblacion = planCipres[index].descripcionPoblacion;
          planTemp.poblacion_especial += 80;
        } else {
          // poblacion no coincide
          planTemp.no.Poblacion = planCipres[index].descripcionPoblacion;
          planTemp.poblacion_especial += 40;
        }
        break;

      case "Personal de salud":
        if (vacunacionDB.personal_salud) {
          // poblacion coincide
          planTemp.si.Poblacion = planCipres[index].descripcionPoblacion;
          planTemp.poblacion_especial += 70;
        } else {
          // poblacion no coincide
          planTemp.no.Poblacion = planCipres[index].descripcionPoblacion;
        }
        break;

      case "Personal esencial":
        if (vacunacionDB.personal_esencial) {
          // poblacion coincide
          planTemp.si.Poblacion = planCipres[index].descripcionPoblacion;
          planTemp.poblacion_especial += 60;
        } else {
          // poblacion no coincide
          planTemp.no.Poblacion = planCipres[index].descripcionPoblacion;
        }
        break;

      default:
        if (
          planCipres[index].descripcionEsquema === "Grupo de Riesgo" ||
          planCipres[index].descripcionMotivo === "Grupos de Riesgo"
        ) {
          if (vacunacionDB.riesgo || vacunacionDB.estrategia === "Grupo de Riesgo") {
            // poblacion coincide
            planTemp.si.Poblacion = planCipres[index].descripcionPoblacion;
            planTemp.poblacion_especial += 80;
          } else {
            // poblacion no coincide
            planTemp.no.Poblacion = planCipres[index].descripcionPoblacion;
            planTemp.poblacion_especial += 40;
          }
          break;
        }

        planTemp.tal_vez.Poblacion = planCipres[index].descripcionPoblacion;
        planTemp.poblacion_especial += 50;
        break;
    }

    // completar descripcion en base al resultado obtenido
    if (planTemp.si.Poblacion) {
      planTemp.descripcion += `\n   Poblacion: ${planCipres[index]["descripcionPoblacion"]}. ☑`;
    } else if (planTemp.tal_vez.Poblacion) {
      planTemp.descripcion += `\n   Poblacion: ${planCipres[index]["descripcionPoblacion"]}. ⊡`;
    } else {
      planTemp.descripcion += `\n   Poblacion: ${planCipres[index]["descripcionPoblacion"]}. ☐`;
    }

    // SELECCIONAR con dosis y edad
    // Tratarlo como un solo dato (conjunto) siendo mas prioritario la edad.
    let tempDosis = {dosis: null, edad_days_aplicacion: null, caso: null};
    for (const dosis of planCipres[index].planVacunacionDosis) {
      if (
        dosis.dosis.descripcionDosis === miDosisToCipres[vacunacionDB.dosis] &&
        dosis.edadDesde <= vacunacionDB.edad_days_aplicacion &&
        vacunacionDB.edad_days_aplicacion <= dosis.edadHasta
      ) {
        // EDAD
        planTemp.descripcion += `\n » Desde: ${dosis["edadDesde"]} - Hasta: ${dosis["edadHasta"]} (dias). ☑`;
        // DOSIS
        planTemp.descripcion += `\n   Dosis: ${dosis["dosis"]["descripcionDosis"]}. ☑`;

        tempDosis.caso = "ambos";
        tempDosis.dosis = dosis["dosis"]["descripcionDosis"];
        tempDosis.edad_days_desde = `${dosis["edadDesde"]} (dias).`;
        tempDosis.edad_days_hasta = `${dosis["edadHasta"]} (dias).`;
        planTemp.edad_desde = dosis["edadDesde"];
        planTemp.edad_hasta = dosis["edadHasta"];

        // console.log("## SI dosis: ", dosis.dosis.descripcionDosis);
      } else if (
        dosis.edadDesde <= vacunacionDB.edad_days_aplicacion &&
        vacunacionDB.edad_days_aplicacion <= dosis.edadHasta
      ) {
        // EDAD
        planTemp.descripcion += `\n » Desde: ${dosis["edadDesde"]} - Hasta: ${dosis["edadHasta"]} (dias). ☑`;
        // NO DOSIS
        planTemp.descripcion += `\n   Dosis: ${dosis["dosis"]["descripcionDosis"]}. ⊡`;

        if (tempDosis.caso !== "ambos") {
          tempDosis.caso = "edad";
          tempDosis.dosis = dosis["dosis"]["descripcionDosis"];
          tempDosis.edad_days_desde = `${dosis["edadDesde"]} (dias).`;
          tempDosis.edad_days_hasta = `${dosis["edadHasta"]} (dias).`;
        }

        // console.log("## No dosis: ", dosis.dosis.descripcionDosis);
      } else if (dosis.dosis.descripcionDosis === miDosisToCipres[vacunacionDB.dosis]) {
        // NO EDAD
        planTemp.descripcion += `\n » Desde: ${dosis["edadDesde"]} - Hasta: ${dosis["edadHasta"]} (dias). ⊡`;
        // DOSIS
        planTemp.descripcion += `\n   Dosis: ${dosis["dosis"]["descripcionDosis"]}. ☑`;

        if (tempDosis.caso === "ninguna" || tempDosis.caso === null) {
          tempDosis.caso = "dosis";
          tempDosis.dosis = dosis["dosis"]["descripcionDosis"];
          tempDosis.edad_days_desde = `${dosis["edadDesde"]} (dias).`;
          tempDosis.edad_days_hasta = `${dosis["edadHasta"]} (dias).`;
        }

        // console.log("## No Edad: ", `Desde: ${dosis["edadDesde"]} - Hasta: ${dosis["edadHasta"]}.`);
      } else {
        // NO EDAD
        planTemp.descripcion += `\n » Desde: ${dosis["edadDesde"]} - Hasta: ${dosis["edadHasta"]} (dias). ☐`;
        // NO DOSIS
        planTemp.descripcion += `\n   Dosis: ${dosis["dosis"]["descripcionDosis"]}. ☐`;

        if (tempDosis.caso === null) {
          tempDosis.caso = "ninguna";
          tempDosis.dosis = dosis["dosis"]["descripcionDosis"];
          tempDosis.edad_days_desde = `${dosis["edadDesde"]} (dias).`;
          tempDosis.edad_days_hasta = `${dosis["edadHasta"]} (dias).`;
        }

        // console.log(
        //   "## No NADA: ",
        //   dosis.dosis.descripcionDosis,
        //   `Desde: ${dosis["edadDesde"]} - Hasta: ${dosis["edadHasta"]}.`
        // );
      }
    }
    switch (tempDosis.caso) {
      case "ambos":
        planTemp.si.Dosis = tempDosis.dosis;
        break;
      case "edad":
        planTemp.no.Dosis = tempDosis.dosis;
        break;
      case "dosis":
        planTemp.no["Edad Desde"] = tempDosis.edad_days_desde;
        planTemp.no["Edad Hasta"] = tempDosis.edad_days_hasta;
        break;
      case "ninguna":
        planTemp.no["Edad Desde"] = tempDosis.edad_days_desde;
        planTemp.no["Edad Hasta"] = tempDosis.edad_days_hasta;
        planTemp.no.Dosis = tempDosis.dosis;
        break;
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

  // ordenar los planes por poblacion_especial (descendente), edad_desde (descendente), edad_hasta (ascendente) y por mayores coincidencias (descendente).
  planCipres.sort(
    (a, b) =>
      b.poblacion_especial - a.poblacion_especial ||
      b.edad_desde - a.edad_desde ||
      a.edad_hasta - b.edad_hasta ||
      b.coincidencias - a.coincidencias
  );

  // console.error("### planCipres: ", planCipres);
  return planCipres;
};

const verificaMatchCIPRES = ({registro}) => {
  let errorMessage = "";
  let planError = false;
  if (!registro.fechaAplicacion) {
    errorMessage += "Falta la Fecha de la aplicacion.\n";
  }
  if (!registro.fechaVencimiento) {
    errorMessage += "Falta la Fecha de Vencimiento de la vacuna.\n";
  }
  if (!registro.lote) {
    errorMessage += "Falta el Lote de la vacuna.\n";
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
    planError = true;
  } else if (
    !registro.planVacunacion.split("/").at(-1) ||
    registro.planVacunacion.split("/").at(-1) === "undefined"
  ) {
    errorMessage += "Plan de Vacunacion: No encontrado en CIPRES.\n";
    planError = true;
  }
  if (errorMessage)
    return {
      error: {message: errorMessage.substring(0, errorMessage.length - 1), status: 412, planError},
    };
  return true;
};

module.exports = app;
