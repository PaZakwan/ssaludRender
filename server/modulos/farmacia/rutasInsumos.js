const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectSetUnset} = require(process.env.MAIN_FOLDER + "/tools/object");

const Insumo = require("./models/insumo");
const FarmaciaDescarte = require("./models/farmacia_descarte");
const FarmaciaEstadistica = require("./models/farmacia_estadistica");
const FarmaciaIngreso = require("./models/farmacia_ingreso");
const FarmaciaOpcion = require("./models/farmacia_opciones");
const FarmaciaSolicitud = require("./models/farmacia_solicitud");
const FarmaciaStock = require("./models/farmacia_stock");
const FarmaciaTransferencia = require("./models/farmacia_transferencia");
const InsumoEntrega = require("./models/insumo_entrega");
const HistorialMedicacion = require("../historial_clinico/models/historial_medicacion");

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

    if (req.usuario.role !== "ADMIN_ROLE") {
      filtro.estado = true;
    }

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

      if (!insumoDB) {
        return errorMessage(res, {message: "Error al guardar el Insumo."}, 400);
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
// Borrar el Insumo si no se utilizo
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
      // FarmaciaEstadistica;
      let insumoBorrado = await FarmaciaEstadistica.findOne({insumo: req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado, no borrable."}, 412);
      }
      // HistorialMedicacion; FALTA TESTEAR
      insumoBorrado = await HistorialMedicacion.findOne({medicamento: req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado MED, no borrable."}, 412);
      }
      // FarmaciaIngreso;
      insumoBorrado = await FarmaciaIngreso.findOne({"insumos.insumo": req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado, no borrable."}, 412);
      }
      // FarmaciaOpcion; FALTA TESTEAR
      insumoBorrado = await FarmaciaOpcion.findOne({insumo: req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado OPC, no borrable."}, 412);
      }
      // FarmaciaSolicitud;
      insumoBorrado = await FarmaciaSolicitud.findOne({"insumos.insumo": req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado, no borrable."}, 412);
      }
      // FarmaciaStock;
      insumoBorrado = await FarmaciaStock.findOne({insumo: req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado, no borrable."}, 412);
      }
      // FarmaciaTransferencia;
      insumoBorrado = await FarmaciaTransferencia.findOne({"insumos.insumo": req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado, no borrable."}, 412);
      }
      // InsumoEntrega;
      insumoBorrado = await InsumoEntrega.findOne({insumo: req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado, no borrable."}, 412);
      }
      // FarmaciaDescarte;
      insumoBorrado = await FarmaciaDescarte.findOne({insumo: req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado, no borrable."}, 412);
      }

      insumoBorrado = await Insumo.findOneAndDelete({_id: req.params.id}).exec();

      if (!insumoBorrado) {
        return errorMessage(res, {message: "Insumo no encontrado."}, 404);
      }
      // return errorMessage(res, {message: "En Desarrollo."}, 404);

      return res.json({
        ok: true,
        insumoBorrado,
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
