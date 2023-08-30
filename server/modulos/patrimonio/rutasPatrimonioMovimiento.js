const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, isObjectIdValid, objectSetUnset} = require(process.env.MAIN_FOLDER +
  "/tools/object");

const Patrimonio = require("./models/patrimonio");
const PatrimonioMovimiento = require("./models/patrimonioMovimiento");

const app = express();

const listaPatrimonioMovimiento = [
  // MOVIMIENTOS
  // 'usuario_modifico',
  "_id",
  "id_objeto",
  "fec_movio",
  "ubicacion_anterior",
  "ubicacion_destino",
  "lugar_anterior",
  "lugar_destino",
  "area_anterior",
  "area_destino",
  "usuario_movio",
  "usuario_legajo",
  "motivo_movio",
  "fec_entregado",
  "fec_patrimonio",

  "estado",
];

// ============================
// Realizar traslado de objeto
// ============================
app.post(
  "/patrimonioMover",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "informatica", value: 2},
        {prop: "patrimonio", value: 2},
        {prop: "patrimonioArea", value: 2},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // false (no borra, los vacios)
      let body = isVacio(_pick(req.body, listaPatrimonioMovimiento), false);
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      if (
        (!req.usuario.informatica || req.usuario.informatica === 1) &&
        (!req.usuario.patrimonio || req.usuario.patrimonio === 1) &&
        body["area_anterior"] !== req.usuario.area
      ) {
        return errorMessage(res, {message: "Actividad Denegada para Otras Areas."}, 403);
      }

      body["usuario_modifico"] = req.usuario._id;

      // UnSet del campo si esta como null / "" / undefined /array vacio
      body = objectSetUnset({dato: body}).dato;
      if (body.$set.fec_entregado) {
        body.$set.fec_entregado = new Date().toISOString().slice(0, 10);
      }
      if (body.$set.fec_patrimonio) {
        body.$set.fec_patrimonio = new Date().toISOString().slice(0, 10);
      }
      delete body.$set._id;

      let movimientoDB = null;
      if (req.body._id) {
        movimientoDB = await PatrimonioMovimiento.findOneAndUpdate({_id: req.body._id}, body, {
          new: true,
          runValidators: true,
        }).exec();
        if (body.$set.fec_patrimonio || body.$set.fec_entregado) {
          return res.json({
            ok: true,
            movimiento: movimientoDB,
            objeto: undefined,
          });
        }
      } else {
        movimientoDB = await new PatrimonioMovimiento(body.$set).save();
      }
      if (!movimientoDB) {
        return errorMessage(res, {message: "Movimiento no cargado."}, 400);
      }

      let objetoActualizado = await Patrimonio.findOneAndUpdate(
        {_id: req.body.id_objeto},
        objectSetUnset({
          dato: {
            area: req.body.area_destino,
            ubicacion: req.body.ubicacion_destino,
            lugar: req.body.lugar_destino,
            funciona: req.body.funciona,
            usuario_verifico: req.usuario._id,
            fec_verifico: Date.now(),
            verificado: true,
          },
        }).dato,
        {
          new: true,
          runValidators: true,
        }
      ).exec();
      if (!objetoActualizado) {
        return errorMessage(res, {message: "Objeto no encontrado."}, 404);
      }

      return res.json({
        ok: true,
        movimiento: movimientoDB,
        objeto: objetoActualizado,
      });
    } catch (err) {
      // Respuesta para el Front en caso de error
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar traslados de objetos
// ============================
app.get(
  "/patrimonioMover/buscar",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "informatica", value: 1},
        {prop: "patrimonio", value: 1},
        {prop: "patrimonioArea", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let filtro = {};
      if (req.query.id && !isObjectIdValid(req.query.id)) {
        return errorMessage(res, {message: "El ID de Busqueda no es valido."}, 400);
      } else if (req.query.id) {
        filtro.id_objeto = req.query.id;
      }

      let inicio = req.query.inicio || false;
      if (inicio) {
        try {
          inicio = new Date(inicio);
          inicio.toISOString();
        } catch (error) {
          return errorMessage(res, {message: "Fecha 'desde' no valida."}, 412);
        }
        //  "inicio" =< "fec_movio" =< "fin"
        filtro.fec_movio = {$gte: inicio};
      }

      let fin = req.query.fin || false;
      if (fin) {
        try {
          fin = new Date(fin);
          fin.toISOString();
        } catch (error) {
          return errorMessage(res, {message: "Fecha 'hasta' no valida."}, 412);
        }
        //  "inicio" =< "fec_movio" =< "fin"
        if (filtro.fec_movio) {
          filtro.fec_movio.$lte = fin;
        } else {
          filtro.fec_movio = {$lte: fin};
        }
      }

      if (req.query.from && !isObjectIdValid(req.query.from)) {
        return errorMessage(res, {message: "El Area Anterior no es valida."}, 400);
      } else if (req.query.from) {
        filtro.area_anterior = req.query.from;
      }

      if (req.query.destiny && !isObjectIdValid(req.query.destiny)) {
        return errorMessage(res, {message: "El Area Destino no es valida."}, 400);
      } else if (req.query.destiny) {
        filtro.area_destino = req.query.destiny;
      }

      if (req.query.l_from && !isObjectIdValid(req.query.l_from)) {
        return errorMessage(res, {message: "El Lugar Anterior no es valido."}, 400);
      } else if (req.query.l_from) {
        filtro.lugar_anterior = req.query.l_from;
      }

      if (req.query.l_destiny && !isObjectIdValid(req.query.l_destiny)) {
        return errorMessage(res, {message: "El Lugar Destino no es valido."}, 400);
      } else if (req.query.l_destiny) {
        filtro.lugar_destino = req.query.l_destiny;
      }

      let movimientos = await PatrimonioMovimiento.find(filtro)
        .collation({locale: "es", numericOrdering: true})
        .sort({fec_movio: -1, id_objeto: 1, _id: -1})
        .populate(
          "id_objeto",
          "inventario categoria marca modelo serie micro mother memoria memoria_tipo disco disco_tipo fuente pulgadas tipoPantalla"
        )
        .populate("area_anterior", "area oficina_nro")
        .populate("area_destino", "area oficina_nro")
        .populate("lugar_anterior", "nombre direccion ip")
        .populate("lugar_destino", "nombre direccion ip")
        .exec();

      return res.json({
        ok: true,
        movimientos,
      });
    } catch (err) {
      // Respuesta para el Front en caso de error
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
