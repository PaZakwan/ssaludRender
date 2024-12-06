const express = require("express");
const axios = require("axios");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectSetUnset, isObjectIdValid} = require(process.env.MAIN_FOLDER +
  "/tools/object");
const {guardarFile, leerFile} = require(process.env.MAIN_FOLDER + "/tools/file");
const {capitalize, checkIsValidJson} = require(process.env.MAIN_FOLDER + "/tools/string");

const Area = require(process.env.MAIN_FOLDER + "/modulos/main/models/area");
const VacunaAplicacion = require("./models/vacuna_aplicacion");

const app = express();

// SISTEMA CIPRES... (Provincia)
// https://www.youtube.com/watch?v=KngcLXJFo9Q
// SISTEMA NOMIVAC... SISA (NACION)
// https://sisa.msal.gov.ar/sisadoc/docs/050203/nomivac_intro.jsp

let listaVacunacionesCipres = [
  // establecimiento
  "codigoSisa",
  "establecimientoCipres",
  "descripcionCipres",
  // Vacuna
  "idNomivac",
  "codSnomed",
  // MotivoVacunacion
  // embarazo, exposicion, brote, calendario, grupo riesgo, personal salud, etc...
  "motivo",
  // "extramuro" -> cuando se vacuna fuera de la sala (campañas moviles)
  // descripcionEsquema
  "esquema",
  // APLICACION
  // "dosis": "/api/vacunacion/dosis/{id}", (crear archivo temporal) descripcionDosis -> id
  // https://apisalud-sb.ms.gba.gov.ar/api/vacunacion/dosis
  // "lote": "SASASASA",
  // "fechaAplicacion": "2023-02-12",
  // "fechaVencimiento": "2025-02-12",
  // "paciente": "api/paciente/{id}", DOCUMENTO -> id

  // "establecimiento": "/api/establecimiento/dependencia/{id}", (crear archivo temporal) codigoSISA (codigoRefes) -> id (PERMISOS)
  // "codigoRefes": 50065602202622 (SISA) -> id (id_IRA) (id_cipres)
  // "planVacunacion": "/api/vacunacion/plan_vacunacion/429" (crear archivo temporal)
  //  SEGUIR DE ACA...
  "dosis",
  "lote",
  "fechaAplicacion",
  "fechaVencimiento",
  "paciente",
  "establecimiento",
  "planVacunacion",
  // CIPRES
  "idCipres",
  "respuestaCipres",
  "fechaEnvioCipres",

  // DESARROLLANDO

  "_id",
  "fecha",
  "origen",
  "paciente",
  // "vacunador",
  "vacunadorName",
  "fecha_futura_cita",

  "tipo_doc",
  "documento",
  "doc_responsable",
  "sexo",
  "edad_valor",
  "edad_unidad",
  "zona_sanitaria",
  "embarazada_semana",
  "puerpera",
  "prematuro",
  "peso_nacer_menor_2500",
  "peso_nacer_mayor_3800",
  "inmunodeprimida",
  "fuma",
  "antecedentes_patologicos",
  "oSocial",
  "riesgo",
  "personal_salud",
  "personal_esencial",

  "No_Provista",
  "insumos",
  // "insumo",
  // "vacunaName",
  "vacuna",
  // "procedencia",
  // "lote",
  "vencimiento",
  // "dosis",
  // "completa",
  // "estrategia",
  // "No_Provista",
  // "retirado",

  "retirado",
];

// "fechaAplicacion" (fecha)
// "fechaVencimiento" (vencimiento)
// "lote" (lote)
// "paciente" (buscar id) (tipo_doc/documento/sexo)
// "dosis" (buscar id) (dosis)
// "establecimiento" (buscar id) (origen)
// "planVacunacion" (buscar id) (vacuna)
const VerificaBody = ({body}) => {
  let errorMessage = "";
  if (!body.tipo_doc) {
    errorMessage += "Falta tipo_doc.\n";
  }
  if (!body.documento) {
    errorMessage += "Falta documento.\n";
  }
  if (!body.sexo) {
    errorMessage += "Falta sexo.\n";
  }
  if (!body.origen) {
    errorMessage += "Falta origen.\n";
  }
  if (!body.fecha) {
    errorMessage += "Falta fecha.\n";
  }
  if (!body.vencimiento) {
    errorMessage += "Falta vencimiento.\n";
  }
  if (!body.lote) {
    errorMessage += "Falta lote.\n";
  }
  if (!body.dosis) {
    errorMessage += "Falta dosis.\n";
  }
  if (!body.vacuna) {
    errorMessage += "Falta vacuna.\n";
  }
  if (errorMessage) return {errorMessage: errorMessage.substring(0, errorMessage.length - 2)};
  return true;
};

// {miDosis : Cipres}
const dosisCipres = {
  Unica: "/api/vacunacion/dosis/1",
  Neonatal: null,
  "1era": "/api/vacunacion/dosis/2",
  "2da": "/api/vacunacion/dosis/3",
  "3era": "/api/vacunacion/dosis/4",
  "4ta": "/api/vacunacion/dosis/5",
  "5ta": "/api/vacunacion/dosis/8",
  "6ta": "/api/vacunacion/dosis/9",
  "7ma": "/api/vacunacion/dosis/10",
  Anual: "/api/vacunacion/dosis/6",
  Refuerzo: "/api/vacunacion/dosis/7",
  "Refuerzo 2do": "/api/vacunacion/dosis/11",
  "Refuerzo 3ero": null,
  "Refuerzo 4to": null,

  // "8° DOSIS": "/api/vacunacion/dosis/12",
  // "9° DOSIS": "/api/vacunacion/dosis/13",
  // "10° DOSIS": "/api/vacunacion/dosis/14",
  // "DOSIS CERO": "/api/vacunacion/dosis/15",
  // ADICIONAL: "/api/vacunacion/dosis/16",
};

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
const errorCIPRES = ({respuesta}) => {
  if (respuesta?.data?.message) {
    return errorMessage(res, {message: `CIPRES: ${respuesta.data.message}.`}, 503);
  }
  if (respuesta?.data?.detail) {
    return errorMessage(res, {message: `CIPRES: ${respuesta.data.detail}.`}, 503);
  }
  if (respuesta?.data?.["hydra:description"]) {
    return errorMessage(res, {message: `CIPRES: ${respuesta.data["hydra:description"]}.`}, 503);
  }
  return errorMessage(
    res,
    {message: "Servicio de CIPRES no accesible, re-intente mas tarde."},
    503
  );
};

// ============
//  C.I.PRE.S.
// ============
app.put(
  "/vacunas/cipres/aplicar",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "vacunas.gestion"},
        {prop: "vacunas.general.gestion", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // verificar que el sistema cuenta con la APIKEY del CIPRES
      // process.env.CIPRES_USR;
      // process.env.CIPRES_PSR;
      if (!process.env.CIPRES_USR || !process.env.CIPRES_PSR) {
        return errorMessage(
          res,
          {message: "El sistema no cuenta con acceso a CIPRES al momento."},
          501
        );
      }

      let body = isVacio({
        dato: _pick(req.body, listaVacunacionesCipres),
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

      // VERIFICAR DATOS NECESARIOS DE CONSULTA.
      if (VerificaBody({body}).errorMessage)
        return errorMessage(res, {message: VerificaBody({body}).errorMessage}, 412);

      // verificar que no haya sido verificada, si aplicacion ya se encuentra en la BD Verificada => denegar
      if (
        await VacunaAplicacion.findOne({
          _id: body._id,
          respuestaCipres: true, //mensaje de exito)?
        }).exec()
      ) {
        return errorMessage(
          res,
          {message: "Actividad no autorizada, la aplicacion ya se encuentra cargada en CIPRES."},
          403
        );
      }

      // LEER LISTAS PARA DATOS CRUZADOS (RECARGA DIARIA TOKEN).
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
          dosis: {},
          establecimiento: {},
          planVacunacion: {},
        };
      } else {
        CIPRES = checkIsValidJson(CIPRES) ?? {
          date: "",
          tkn: "",
          dosis: {},
          establecimiento: {},
          planVacunacion: {},
        };
      }
      if (
        // !CIPRES.tkn ||
        // CIPRES.date !==
        //   new Date().toLocaleString("es-AR", {
        //     year: "numeric",
        //     month: "2-digit",
        //     day: "2-digit",
        //   })
        true
      ) {
        let respuesta = await axios.post(
          "https://apisalud-sb.ms.gba.gov.ar/login",
          {
            username: process.env.CIPRES_USR,
            password: process.env.CIPRES_PSR,
            realusername: "SIGISESAM",
          },
          {headers: {"content-type": "application/json"}}
        );

        if (respuesta?.data?.token) {
          CIPRES.tkn = respuesta.data.token;
          CIPRES.date = new Date().toLocaleString("es-AR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        } else {
          errorCIPRES({respuesta});
        }

        // dosis;
        respuesta = await axios.get("https://apisalud-sb.ms.gba.gov.ar/api/vacunacion/dosis", {
          headers: {Authorization: `Bearer ${CIPRES.tkn}`},
        });

        if (respuesta?.data?.["hydra:member"]) {
          CIPRES.dosis = respuesta.data["hydra:member"];
        } else {
          errorCIPRES({respuesta});
        }
        // format {descripcion : @id}
        CIPRES.dosis = CIPRES.dosis.reduce(
          (acc, curr) => ((acc[curr.descripcionDosis] = curr["@id"]), acc),
          {}
        );

        // establecimiento (Vacunatorios con SISA);
        // Buscar en mi DB area vacunatorios con SISA { id : SISA } y no (RUPES) CIPRES
        // let areasDB = await Area.aggregate()
        //   .collation({locale: "es", numericOrdering: true})
        //   .match({vacunatorio: "true", SISA: {$exists: true}, RUPES: {$exists: false}})
        //   .project({
        //     _id: 1,
        //     area: 1,
        //     SISA: 1,
        //     RUPES: 1,
        //   })
        //   .sort({area: 1})
        //   .exec();
        // loop en mi DB -> establecimiento { SISA : @id }
        // await Promise.all(
        //   areasDB.map(async (area) => {
        //       respuesta = await axios.get(
        //         `https://apisalud-sb.ms.gba.gov.ar/api/establecimiento/establecimientos?codigoSisa=${area.SISA}`,
        //         {
        //           headers: {Authorization: `Bearer ${CIPRES.tkn}`},
        //         }
        //       );
        //       if (respuesta?.data?.["hydra:member"]?.[0]) {
        //         // format {SISA : @id}
        //         CIPRES.establecimiento[respuesta.data["hydra:member"][0].codigoSisa] =
        //           respuesta.data["hydra:member"][0]["@id"];
        //       } else {
        //         errorCIPRES({respuesta});
        //       }
        //   })
        // );

        // planVacunacion;

        // actualizar archivo -> CIPRES.json
        await guardarFile({
          fileName: "CIPRES",
          fileExtension: "json",
          route: "../file_server/opciones",
          content: JSON.stringify(CIPRES),
          flags: "w",
        });
      }

      // VERIFICAR DATOS CRUZADOS. (body <-> CIPRES)

      // REGISTRAR APLICACION EN CIPRES. (AXIOS)
      // GUARDAR RESPUESTA DE CIPRES. (MongoDB)

      return res.json({
        ok: true,
        CIPRES: CIPRES,
      });
    } catch (err) {
      // console.log("catch", err);
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
