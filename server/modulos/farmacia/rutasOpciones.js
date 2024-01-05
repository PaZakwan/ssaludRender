const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, isObjectIdValid} = require(process.env.MAIN_FOLDER + "/tools/object");
const FarmaciaOpcion = require("./models/farmacia_opciones");

const app = express();

let listaOpciones = ["_id", "area", "insumo", "cant_min", "opciones", "destinos"];

// ============================
// Mostrar Opciones por area
// ============================
app.get(
  "/farmacia/opciones",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.general.opciones", value: 1},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let opciones = null;

      opciones = await FarmaciaOpcion.aggregate()
        .match({area: isObjectIdValid(req.query.area)})
        .group({
          _id: {area: "$area"},
          opciones: {
            $push: {
              insumo: "$insumo",
              cant_min: "$cant_min",
            },
          },
        })
        .project({
          _id: 0,
          area: "$_id.area",
          opciones: 1,
        });

      res.json({
        ok: true,
        opciones: opciones[0],
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Modificar o Crear Opciones
// ============================
app.put(
  "/farmacia/opciones",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.general.opciones", value: 1},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let body = isVacio({
        dato: _pick(req.body, listaOpciones),
      });
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      if (body.destinos) {
        body.destinos = [...new Set([body.area, ...body.destinos])];
      } else {
        body.destinos = [body.area];
      }

      let respuesta = {error: [], ok: []};

      for (let index = 0; index < body.destinos.length; index++) {
        // borrar opciones en cada destino
        let opcionesBorradas = await FarmaciaOpcion.deleteMany({area: body.destinos[index]}).exec();

        if (!opcionesBorradas) {
          respuesta.error.push(body.destinos[index]);
          break;
        }

        let saveTemp = body.opciones.map(({insumo, cant_min}) => ({
          insumo,
          cant_min,
          area: body.destinos[index],
        }));

        // y guardar las nuevas opciones
        let opcionesGuardadas = await FarmaciaOpcion.insertMany(saveTemp);

        if (opcionesGuardadas.length > 0) {
          respuesta.ok.push(body.destinos[index]);
        } else {
          respuesta.error.push(body.destinos[index]);
        }
      }

      if (respuesta.error.length > 0) {
        return errorMessage(res, {message: "Error al guardar las Opciones."}, 400);
      }

      return res.status(201).json({
        ok: true,
        respuesta: respuesta,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Borrar las opciones del area
// ============================
app.delete(
  "/farmacia/opciones/:area",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.general.opciones", value: 1},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let opcionesBorradas = await FarmaciaOpcion.deleteMany({area: req.params.area}).exec();

      if (opcionesBorradas.deletedCount == 0) {
        return errorMessage(res, {message: "Opciones no encontradas."}, 404);
      }
      // return errorMessage(res, {message: "En Desarrollo."}, 404);

      return res.json({
        ok: true,
        opcionesBorradas,
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
