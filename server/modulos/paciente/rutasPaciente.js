const express = require("express");
const axios = require("axios");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectSetUnset, isObjectIdValid, objectToFind} = require(process.env.MAIN_FOLDER +
  "/tools/object");
const {capitalize} = require(process.env.MAIN_FOLDER + "/tools/string");
const Paciente = require("./models/paciente");

// Para Borrar, verificar donde se usa ref: "Paciente"
const FarmaciaEntrega = require(process.env.MAIN_FOLDER +
  "/modulos/farmacia/models/insumo_entrega");
const VacunaAplicacion = require(process.env.MAIN_FOLDER +
  "/modulos/vacunas/models/vacuna_aplicacion");
const HistorialClinico = require(process.env.MAIN_FOLDER +
  "/modulos/historial_clinico/models/historial_clinico_universal");
const Turno = require(process.env.MAIN_FOLDER + "/modulos/turnero/models/turno");

const app = express();

let listaPaciente = [
  // 'usuario_modifico',
  "_id",
  "apellido",
  "nombre",
  "tipo_doc",
  "documento",
  "dir_calle",
  "dir_numero",
  "dir_piso",
  "dir_depto",
  "dir_barrio",
  "dir_localidad",
  "dir_municipio",
  "dir_descripcion",
  "telefono",
  "telefono_alt",
  "email",
  "fec_nac",
  "sexo",
  "hist_salitas",
  "fec_fallecimiento",
  "validadoRENAPER",
  "doc_responsable",

  "oSocial",
  "oSocialNumero",

  // PS
  // "ps_id",

  //todos
  "estado",
];

const verificacionArrayLectura = [
  {prop: "farmacia"},
  {prop: "vacunas"},
  {prop: "historial_clinico", value: 1},
  {prop: "turnero", value: 1},
  {prop: "tuberculosis", value: 1},
];

const verificacionArrayEdit = [
  {prop: "farmacia.entregas"},
  {prop: "farmacia.general.admin", value: 1},
  {prop: "vacunas.gestion"},
  {prop: "vacunas.general.gestion", value: 1},
  {prop: "historial_clinico", value: 2},
  {prop: "turnero", value: 2},
  {prop: "tuberculosis", value: 2},
];

// ============================
// Mostrar select de Pacientes segun los filtros
// Agregar sort y limit para obtener solo el ultimo
// ============================
app.get(
  "/paciente/buscar",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = verificacionArrayLectura;
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let filtro = req.query.filtro || "todos";
      if (filtro === "todos") {
        filtro = {};
      } else {
        try {
          filtro = JSON.parse(filtro);
          if (typeof filtro !== "object") {
            return errorMessage(res, {message: "El dato de Filtro no es valido."}, 400);
          }
          filtro = isVacio({
            dato: filtro,
            inArr: true,
            inObj: true,
            borrar: true,
          });
          if (filtro.vacio === true) {
            return errorMessage(res, {message: "No se envió ningún dato."}, 412);
          }
          filtro = objectToFind({dato: filtro.dato});
          if (filtro.error) {
            return errorMessage(
              res,
              {message: `El formato del Filtro no es valido. ${filtro.error}`},
              400
            );
          }
        } catch (error) {
          return errorMessage(res, {message: "El dato de Filtro no es valido."}, 400);
        }
      }

      // Prepara la consulta para la BD
      let pacientesDB = Paciente.find(filtro).collation({locale: "es", numericOrdering: true});

      if (req.query.select) {
        try {
          pacientesDB.select(req.query.select.toString());
        } catch (error) {
          return errorMessage(res, {message: "El dato de Select no es valido."}, 400);
        }
      }

      if (req.query.orden) {
        try {
          pacientesDB.sort(JSON.parse(req.query.orden));
        } catch (error) {
          return errorMessage(res, {message: "El dato para Ordenar no es valido."}, 400);
        }
      }

      if (req.query.limite) {
        try {
          pacientesDB.limit(Number(req.query.limite));
        } catch (error) {
          return errorMessage(res, {message: "El dato para Limite no es valido."}, 400);
        }
      }

      let populate = JSON.parse(req.query.populate || null);
      if (populate?.tbc) {
        pacientesDB.populate(
          "hist_tuberculosis.indice.id",
          "nombre apellido nombreC tipo_doc documento documentoC hist_tuberculosis.tratamiento"
        );
      }
      if (populate?.umd) {
        pacientesDB.populate("usuario_modifico", "nombre apellido nombreC");
      }
      if (populate?.sal) {
        pacientesDB.populate("hist_salitas.area", "area");
      }

      // Realiza la busqueda en la BD
      pacientesDB = await pacientesDB.exec();

      if (req.query.limite === "1" && pacientesDB?.length === 0) {
        return errorMessage(res, {message: "Paciente no encontrado."}, 404);
      }

      return res.json({
        ok: true,
        pacientes: pacientesDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Guardar Paciente
// ============================
app.put(
  "/paciente",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = verificacionArrayEdit;
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let body = isVacio({
        dato: _pick(req.body, listaPaciente),
        borrar: req.body._id ? false : true,
      });
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      body["usuario_modifico"] = req.usuario._id;

      let pacienteDB = null;
      if (body._id) {
        // Update
        delete body._id;
        // Delete del campo si esta como null / "" / undefined /array vacio
        body = objectSetUnset({dato: body}).dato;
        // Modificando la BD
        pacienteDB = await Paciente.findOneAndUpdate({_id: req.body._id}, body, {
          new: true,
          runValidators: true,
        }).exec();
      } else {
        // Nuevo
        pacienteDB = await new Paciente(body).save();
      }

      if (!pacienteDB) {
        return errorMessage(res, {message: "Paciente no encontrado."}, 404);
      }

      return res.json({
        ok: true,
        paciente: pacienteDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Borrar Paciente por id si no se utilizo
// ============================
app.delete(
  "/paciente/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = verificacionArrayEdit;
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      if (!req.params.id) {
        return errorMessage(res, {message: "Falta información para proceder."}, 412);
      }
      if (!isObjectIdValid(req.params.id)) {
        return errorMessage(res, {message: "El ID del Paciente no es valido."}, 400);
      }

      // Farmacia Entregas;
      let pacienteBorrado = await FarmaciaEntrega.findOne({paciente: req.params.id}).exec();
      if (pacienteBorrado) {
        return errorMessage(
          res,
          {message: "Paciente Utilizado en Entregas de Farmacia, NO Borrable."},
          412
        );
      }

      // Vacunas Aplicaciones;
      pacienteBorrado = await VacunaAplicacion.findOne({paciente: req.params.id}).exec();
      if (pacienteBorrado) {
        return errorMessage(
          res,
          {message: "Paciente Utilizado en Aplicaciones de Vacunas, NO Borrable."},
          412
        );
      }

      // HICLEM;
      pacienteBorrado = await HistorialClinico.findOne({paciente: req.params.id}).exec();
      if (pacienteBorrado) {
        return errorMessage(
          res,
          {message: "Paciente Utilizado en el Historial Clinico del Sistema, NO Borrable."},
          412
        );
      }

      // Turnos;
      pacienteBorrado = await Turno.findOne({paciente: req.params.id}).exec();
      if (pacienteBorrado) {
        return errorMessage(res, {message: "Paciente Utilizado en el Turnero, NO Borrable."}, 412);
      }

      // Tuberculosis;
      pacienteBorrado = await Paciente.findOne({
        _id: req.params.id,
        hist_tuberculosis: {$exists: 1},
      }).exec();
      if (pacienteBorrado) {
        return errorMessage(
          res,
          {message: "Paciente Utilizado por el Sistema de Tuberculosis, NO Borrable."},
          412
        );
      }

      pacienteBorrado = await Paciente.findOneAndDelete({_id: req.params.id}).exec();
      if (!pacienteBorrado) {
        return errorMessage(res, {message: "Paciente no encontrado."}, 404);
      }

      return res.status(200).json({
        ok: true,
        pacienteBorrado,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// XXXXXX  Desarrollar  XXXXXXX
// ============================
// XXXXXXXXXXXXXXXXXXXXXXXXXXXX
// UNIFICAR FUSIONAR PACIENTES
// XXXXXXXXXXXXXXXXXXXXXXXXXXXX

// ============================
// TUBERCULOSIS Modificar hist_tuberculosis de Paciente por id
// BORRAR CUANDO HICLEM EXISTA
// ============================
app.put(
  "/tuberculosis/paciente/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = verificacionArrayLectura;
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      if (req.usuario.tuberculosis < 2) {
        return errorMessage(res, {message: "Actividad no autorizada."}, 403);
      }

      if (!req.params.id) {
        return errorMessage(res, {message: "Falta información para proceder."}, 412);
      }
      if (!isObjectIdValid(req.params.id)) {
        return errorMessage(res, {message: "El ID del Paciente no es valido."}, 400);
      }

      let listaPacienteTuberculosis = listaPaciente.slice();
      // Se Agrega hist_tuberculosis a la lista para su modificacion
      listaPacienteTuberculosis.push("hist_tuberculosis");

      let body = _pick(req.body, listaPacienteTuberculosis);

      // Revisa que se haya enviado por lo menos una propiedad en hist_tuberculosis y borra
      body["hist_tuberculosis"] = isVacio({
        dato: body["hist_tuberculosis"],
        inArr: true, // false,
        inObj: true, // false,
        borrar: true, // false,
      });
      if (body["hist_tuberculosis"].vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body["hist_tuberculosis"] = body["hist_tuberculosis"].dato;

      body["usuario_modifico"] = req.usuario._id;
      body["hist_tuberculosis"]["usuario_modifico"] = req.usuario._id;

      // Delete del campo si esta como null / "" / undefined /array vacio
      body = objectSetUnset({dato: body}).dato;

      // Realiza la busqueda y el Update
      let pacienteDB = await Paciente.findOneAndUpdate({_id: req.params.id}, body, {
        new: true,
        runValidators: true,
      }).exec();

      if (!pacienteDB) {
        return errorMessage(res, {message: "Paciente no encontrado."}, 404);
      }

      return res.status(200).json({
        ok: true,
        paciente: pacienteDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Buscar en RENAPER
// ============================
let RENAPER = {tkn: "", date: ""};
app.get(
  "/paciente/renaper/buscar",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = verificacionArrayEdit;
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // return errorMessage(res, {message: "El sistema no tiene usuario de RENAPER."}, 444);
      // verificar que el sistema cuanta con la APIKEY del renaper
      // process.env.RENAPER_USR;
      // process.env.RENAPER_PSR;
      if (!process.env.RENAPER_USR || !process.env.RENAPER_PSR) {
        return errorMessage(
          res,
          {message: "El sistema no cuenta con acceso a RENAPER al momento."},
          501
        );
      }

      // verificar que este la data necesaria
      // req.query.dni; req.query.sx
      if (!req.query.dni || !req.query.sx) {
        return errorMessage(res, {message: "Falta información para proceder (DNI y/o Sexo)."}, 412);
      }

      // verificar que no haya sido verificado, si el paciente ya se encuentra en la BD y Verificado => denegar
      if (
        await Paciente.findOne({
          documento: req.query.dni,
          sexo: req.query.sx,
          validadoRENAPER: true,
        }).exec()
      ) {
        return errorMessage(
          res,
          {message: "Actividad no autorizada, la persona ya se encuentra verificada."},
          403
        );
      }

      // sino existe token o fecha diferente/vencido... refresh token.
      if (
        !RENAPER.tkn ||
        RENAPER.date !==
          new Date().toLocaleString("es-AR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
      ) {
        let respuesta = await axios.post(
          "https://apirenaper.idear.gov.ar/CHUTROFINAL/API_ABIS/Autorizacion/token.php",
          {
            username: process.env.RENAPER_USR,
            password: process.env.RENAPER_PSR,
          },
          {headers: {"content-type": "application/x-www-form-urlencoded"}}
        );

        if (respuesta?.data?.data?.token) {
          RENAPER.tkn = respuesta?.data?.data?.token;
          RENAPER.date = new Date().toLocaleString("es-AR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        } else {
          if (respuesta?.data?.data?.mensaje) {
            return errorMessage(res, {message: `RENAPER: ${respuesta.data.data.mensaje}.`}, 503);
          }
          return errorMessage(
            res,
            {message: "Servicio de RENAPER no accesible, re-intente mas tarde."},
            503
          );
        }
      }

      // datos del paciente del renaper.
      let pacienteRENAPER = null;
      let respuesta = await axios.get(
        `https://apirenaper.idear.gov.ar/apidatos/porDniSexo.php?dni=${req.query.dni}&sexo=${req.query.sx}`,
        {
          headers: {
            Authorization: `Bearer ${RENAPER.tkn}`,
          },
        }
      );
      if (respuesta?.data?.apellido) {
        // darle formato a los datos necesarios
        // modificar ciudad (localidad)
        switch (respuesta.data.ciudad) {
          case "CUARTEL V":
            respuesta.data.ciudad = "Cuartel V";
            break;

          case "FRANCISCO ALVAREZ":
            respuesta.data.ciudad = "Francisco Alvarez";
            break;

          case "LA REJA":
            respuesta.data.ciudad = "La Reja";
            break;

          case "MORENO":
            respuesta.data.ciudad = "Moreno";
            break;

          case "PASO DEL REY":
            respuesta.data.ciudad = "Paso Del Rey";
            break;

          case "TRUJUI":
            respuesta.data.ciudad = "Trujui";
            break;

          default:
            respuesta.data.ciudad = "Otros";
            break;
        }
        if (respuesta.data.municipio) {
          respuesta.data.municipio = capitalize(respuesta.data.municipio);
        }
        pacienteRENAPER = {
          tipo_doc: "DNI",
          documento: req.query.dni,
          sexo: req.query.sx == "M" ? "Masculino" : "Femenino",

          apellido: respuesta.data.apellido,
          nombre: respuesta.data.nombres,
          fec_nac: respuesta.data.fecha_nacimiento.split("/").reverse().join("-"),

          dir_calle: respuesta.data.calle,
          dir_numero: respuesta.data.numero,
          dir_piso: respuesta.data.piso,
          dir_depto: respuesta.data.departamento,
          dir_barrio: respuesta.data.barrio,
          dir_localidad: respuesta.data.ciudad,
          dir_municipio: respuesta.data.municipio,

          fec_fallecimiento:
            respuesta.data.mensaje_fallecido === "SIN AVISO DE FALLECIMIENTO"
              ? ""
              : respuesta.data.mensaje_fallecido,

          validadoRENAPER: true,
        };
      } else {
        if (respuesta?.data?.mensaje) {
          return errorMessage(res, {message: `RENAPER: ${respuesta.data.mensaje}.`}, 503);
        }
        return errorMessage(
          res,
          {message: "Servicio de RENAPER no accesible, re-intente mas tarde."},
          503
        );
      }

      // {
      //   "id_tramite_principal": "3434355",
      //   "id_tramite_tarjeta_reimpresa": 0,
      //   "ejemplar": "B",
      //   "vencimiento": "12/11/2027",
      //   "emision": "12/11/2012",
      //   "cuil": "20XXXXXXX4",

      //   "apellido": "Perez",
      //   "nombres": "Juan",
      //   "fecha_nacimiento": "20/09/1955",

      //   "calle": "22",
      //   "numero": "S/N",
      //   "piso": "",
      //   "departamento": "",
      //   "barrio": "0",
      //   "ciudad": "LA PLATA",

      //   "monoblock": "",
      //   "municipio": "LA PLATA","MORENO"
      //   "provincia": "BUENOS AIRES",
      //   "pais": "ARGENTINA",

      //   "codigo_postal": "",
      //   "codigo_fallecido": 0,
      //   "mensaje_fallecido": "SIN AVISO DE FALLECIMIENTO",

      //   "id_ciudadano": "45789342",
      //   "codigo": 99,
      //   "mensaje": "DNI/PAS Firmado"
      // }

      return res.json({
        ok: true,
        paciente: pacienteRENAPER,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// TITULO ¿?¿?¿?¿?
// ============================

// ============================
// XXXXXX  Desarrollar  XXXXXXX
// ============================
// ============================
// XXXXXXXXXXXXXXXXXXXXXXXXXXXX
// ============================

module.exports = app;
