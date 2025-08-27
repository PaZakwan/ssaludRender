const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectSetUnset} = require(process.env.MAIN_FOLDER + "/tools/object");

const VacunaInsumo = require("./models/vacuna_insumo");
const VacunaDescarte = require("./models/vacuna_descarte");
const VacunaIngreso = require("./models/vacuna_ingreso");
const VacunaConfig = require("./models/vacuna_config");
const VacunaSolicitud = require("./models/vacuna_solicitud");
const VacunaStock = require("./models/vacuna_stock");
const VacunaTransferencia = require("./models/vacuna_transferencia");
const VacunaAplicacion = require("./models/vacuna_aplicacion");

const app = express();

let listaInsumo = [
  "_id",
  "nombre",
  "categoria",
  "descripcion",
  "id_Nomivac",
  "condiciones",
  "grupo_etario",
  "dosis_posibles",
  "qty_dosis_posibles",
  "estado",
];

// ============================
// Mostrar Insumo segun filtros
// ============================
app.get(
  "/vacunas/insumo",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "vacunas"}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
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
          if (!!filtro.id_Nomivac && typeof filtro.id_Nomivac === "string") {
            filtro.id_Nomivac = {
              $regex: `(?i)${filtro.id_Nomivac}`,
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

      insumos = await VacunaInsumo.find(filtro)
        .collation({locale: "es", numericOrdering: true})
        .select(select)
        .sort(orden)
        .limit(limite)
        .exec();

      return res.status(200).json({
        ok: true,
        insumos,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Modificar Insumo o crearlo en caso de no existir
// ============================
app.put(
  "/vacunas/insumo",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "vacunas.config", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let body = isVacio({
        dato: _pick(req.body, listaInsumo),
      });
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      let insumoDB = null;
      if (body._id) {
        body = objectSetUnset({dato: body, unsetCero: false}).dato;
        let _id = body.$set._id;
        delete body.$set._id;
        // update
        insumoDB = await VacunaInsumo.findOneAndUpdate({_id}, body, {
          new: true,
          runValidators: true,
          context: "query",
        }).exec();
      } else {
        // nuevo
        insumoDB = await new VacunaInsumo(body).save();
      }

      if (!insumoDB) {
        return errorMessage(res, {message: "Error al guardar el Insumo."}, 400);
      }

      // Verificar si hay aplicaciones con nombre similar y sin ID de INSUMO => si existe aplicacion agrega nuevo ID de Insumo Vacuna.
      // VacunaAplicacion => insumo (objectID) / vacunaName (str) <=> VacunaInsumo => _id (objectID) / nombre (str)
      if (insumoDB.categoria === "Vacuna") {
        await VacunaAplicacion.updateMany(
          {vacunaName: insumoDB.nombre, insumo: {$exists: false}},
          {$set: {insumo: insumoDB._id}},
          {
            runValidators: true,
            context: "query",
          }
        ).exec();
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
  "/vacunas/insumo/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "vacunas.config", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // VacunaIngreso;
      let insumoBorrado = await VacunaIngreso.findOne({"insumos.insumo": req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado (Ingreso), no borrable."}, 412);
      }
      // VacunaConfig;
      insumoBorrado = await VacunaConfig.findOne({insumo: req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado (Config), no borrable."}, 412);
      }
      // VacunaSolicitud;
      insumoBorrado = await VacunaSolicitud.findOne({"insumos.insumo": req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado (Solicitud), no borrable."}, 412);
      }
      // VacunaStock;
      insumoBorrado = await VacunaStock.findOne({insumo: req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado (Stock), no borrable."}, 412);
      }
      // VacunaTransferencia;
      insumoBorrado = await VacunaTransferencia.findOne({"insumos.insumo": req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado (Transferencia), no borrable."}, 412);
      }
      // VacunaAplicacion;
      insumoBorrado = await VacunaAplicacion.findOne({insumo: req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado (Aplicacion), no borrable."}, 412);
      }
      // VacunaDescarte;
      insumoBorrado = await VacunaDescarte.findOne({insumo: req.params.id}).exec();
      if (insumoBorrado) {
        return errorMessage(res, {message: "Insumo Utilizado (Descarte), no borrable."}, 412);
      }

      insumoBorrado = await VacunaInsumo.findOneAndDelete({_id: req.params.id}).exec();
      if (!insumoBorrado) {
        return errorMessage(res, {message: "Insumo no encontrado."}, 404);
      }

      return res.status(200).json({
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
