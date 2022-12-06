const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require("../../middlewares/autenticacion");
const {errorMessage} = require("../../tools/errorHandler");
const {isVacio, objectSetUnset} = require("../../tools/object");
const Insumo = require("./models/insumo");

const app = express();

let listaInsumo = ["_id", "nombre", "categoria", "descripcion", "unique_code", "estado"];

// ============================
// Mostrar Insumo segun filtros
// ============================
app.get("/farmacia/insumo", [verificaToken], async (req, res) => {
  try {
    let filtro = req.query.filtro || "todos";
    if (filtro !== "todos") {
      try {
        filtro = JSON.parse(filtro);
        if (filtro !== "todos" && typeof filtro !== "object") {
          return errorMessage(res, {message: "El dato de Filtro no es valido."}, 400);
        }
        if (!!filtro.nombre && typeof filtro.nombre === "string") {
          filtro.nombre = {
            $regex: `(?i)${filtro.nombre}`,
          };
        }
        if (!!filtro.descripcion && typeof filtro.descripcion === "string") {
          filtro.descripcion = {
            $regex: `(?i)${filtro.descripcion}`,
          };
        }
        if (!!filtro.unique_code && typeof filtro.unique_code === "string") {
          filtro.unique_code = {
            $regex: `(?i)${filtro.unique_code}`,
          };
        }
        if (!!filtro.categoria && typeof filtro.categoria === "string") {
          filtro.categoria = {
            $regex: `(?i)${filtro.categoria}`,
          };
        }
      } catch (error) {
        return errorMessage(res, {message: "El dato de Filtro no es valido."}, 400);
      }
    } else {
      filtro = {};
    }

    let select = req.query.select || "";
    try {
      select = select.toString();
    } catch (error) {
      return errorMessage(res, {message: "El dato de Select no es valido."}, 400);
    }

    let orden = req.query.orden || JSON.stringify({nombre: 1});
    try {
      orden = JSON.parse(orden);
    } catch (error) {
      return errorMessage(res, {message: "El dato para Ordenar no es valido."}, 400);
    }

    let limite = req.query.limite || 0;
    try {
      limite = Number(limite);
    } catch (error) {
      return errorMessage(res, {message: "El dato para Limite no es valido."}, 400);
    }

    let insumos = null;

    insumos = await Insumo.find(filtro)
      .collation({locale: "es", numericOrdering: true})
      .select(select)
      .sort(orden)
      .limit(limite)
      .exec();

    res.json({
      ok: true,
      insumos,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Modificar Insumo o crearlo en caso de no existir
// ============================
app.put(
  "/farmacia/insumo",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.insumos", value: 1},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // false (no borra, los vacios)
      let body = isVacio(_pick(req.body, listaInsumo), false);
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      let insumoDB = null;
      if (body._id) {
        body = objectSetUnset(body, "unsetCero").dato;
        let _id = body.$set._id;
        delete body.$set._id;
        // update
        insumoDB = await Insumo.findOneAndUpdate({_id}, body, {
          new: true,
          runValidators: true,
        }).exec();
      } else {
        // nuevo
        insumoDB = await new Insumo(body).save();
      }

      return res.status(201).json({
        ok: true,
        insumo: insumoDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Borrar el Insumo (estado a false)
// ============================
app.delete(
  "/farmacia/insumo/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.insumos", value: 1},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let insumoBorrado = null;

      insumoBorrado = await Insumo.findOneAndUpdate(
        {_id: req.params.id},
        {
          estado: false,
        },
        {new: true}
      ).exec();

      if (!insumoBorrado) {
        return errorMessage(res, {message: "Insumo no encontrado."}, 404);
      }

      return res.json({
        ok: true,
        insumo: insumoBorrado,
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
