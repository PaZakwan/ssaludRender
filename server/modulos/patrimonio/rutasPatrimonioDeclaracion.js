const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectToFind} = require(process.env.MAIN_FOLDER + "/tools/object");

const PatrimonioDeclaracion = require("./models/patrimonioDeclaracion");

const app = express();

const listaPatrimonioDeclaracion = [
  // DECLARACION
  // 'usuario_modifico',
  "tipo",
  "fecha",
  "oficina",
  "oficina_nro",
  "custodia",
  "inventariador",
  "objetos",

  "estado",
];

// ============================
// Crear Declaracion
// ============================
app.post(
  "/patrimonioDeclaracion",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "patrimonio", value: 2},
        {prop: "patrimonioArea", value: 2},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let body = isVacio({
        dato: _pick(req.body, listaPatrimonioDeclaracion),
        borrar: true,
      });
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      // Revisa permisos del cliente
      if (
        (!req.usuario.patrimonio || req.usuario.patrimonio === 1) &&
        body["oficina"] !== req.usuario.area
      ) {
        return errorMessage(res, {message: "Actividad Denegada para Otras Oficinas."}, 403);
      }

      body["usuario_modifico"] = req.usuario._id;

      let id = body._id || null;

      let declaracionDB = null;
      if (id) {
        delete body._id;
        declaracionDB = await PatrimonioDeclaracion.findOneAndUpdate({_id: id}, body, {
          new: true,
          runValidators: true,
        }).exec();
      } else {
        declaracionDB = await new PatrimonioDeclaracion(body).save();
      }
      if (!declaracionDB) {
        return errorMessage(res, {message: "Declaracion no cargada."}, 400);
      }

      return res.status(201).json({
        ok: true,
        declaracion: declaracionDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar Declaracion por filtros
// ============================
app.get(
  "/patrimonioDeclaracion/buscar",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "patrimonio", value: 1},
        {prop: "patrimonioArea", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // Toma los datos Recibidos
      let filtro = req.query.busqueda || "todos";
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

      // Revisa permisos del cliente
      if (req.usuario.patrimonio !== 3 && req.usuario.patrimonioArea !== 3) {
        filtro.estado = true;
      }
      if (!req.usuario.patrimonio) {
        filtro["oficina"] = req.usuario.area;
      }

      // Realiza la busqueda en la BD
      let declaracionesDB = await PatrimonioDeclaracion.find(filtro)
        .collation({locale: "es", numericOrdering: true})
        .sort({fecha: -1, oficina: 1, tipo: 1, _id: 1})
        .populate("oficina", "area")
        .exec();

      return res.json({
        ok: true,
        declaraciones: declaracionesDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
