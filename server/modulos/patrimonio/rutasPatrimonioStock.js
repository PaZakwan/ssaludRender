const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, isObjectIdValid} = require(process.env.MAIN_FOLDER + "/tools/object");

const Patrimonio = require("./models/patrimonio");
const PatrimonioStock = require("./models/patrimonioStock");

const app = express();

const listaPatrimonioStock = [
  // STOCK
  // 'usuario_modifico',
  "id_objeto",
  "area_solicita",
  "modelo_impresora",
  "inventario_consume",
  "fec_solicitud",
  "motivo",
  "persona_solicitante",
  "persona_legajo",
  "orden_compra",
  "cantidad",
  "operacion",

  "estado",
];

// ============================
// MODIFICAR cantidad/cantidad_deposito de Objeto Insumo por id {sumar, restar}
// ============================
app.put(
  "/patrimonioStockDeposito/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "informatica", value: 2}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // false (no borra, los vacios)
      let body = isVacio(_pick(req.body, ["sumar", "restar"]), false);
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      let update = {
        verificado: false,
      };

      // si sumar existe => sumar.. cantidad_deposito.. y restar.. cantidad
      if (body["sumar"]) {
        update["$inc"] = {
          cantidad_deposito: Number(+body["sumar"]),
          cantidad: Number(-body["sumar"]),
        };
      }
      // si restar existe => restar.. cantidad_deposito.. y sumar.. cantidad
      if (body["restar"]) {
        update["$inc"] = {
          cantidad_deposito: Number(-body["restar"]),
          cantidad: Number(-body["restar"]),
        };
      }

      let objetoDB = null;
      // buscar objeto ID.
      objetoDB = await Patrimonio.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        update,
        {
          new: true,
          runValidators: true,
        }
      ).exec();

      // no existe mostrar error
      if (!objetoDB) {
        return errorMessage(res, {message: "Objeto no encontrado."}, 404);
      }

      // regresar objeto.
      return res.status(202).json({
        ok: true,
        objeto: objetoDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// MODIFICA Insumo
// ============================
app.post(
  "/patrimonioStock",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "informatica", value: 2}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // true (borra, los vacios)
      let body = isVacio(_pick(req.body, listaPatrimonioStock), true);
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      body["usuario_modifico"] = req.usuario._id;

      let id = body._id || null;

      let patrimonioStockDB = null;
      if (id) {
        delete body._id;
        patrimonioStockDB = await PatrimonioStock.findOneAndUpdate({_id: id}, body, {
          new: true,
          runValidators: true,
        }).exec();
      } else {
        patrimonioStockDB = await new PatrimonioStock(body).save();
      }
      if (!patrimonioStockDB) {
        return errorMessage(res, {message: "Registro no cargado."}, 400);
      }

      let update = {
        verificado: false,
      };
      if (body["operacion"] === "resta") {
        update["$inc"] = {cantidad: Number(-body["cantidad"])};
      } else {
        // insertMany para las ordenes de compra.
        update["$inc"] = {cantidad: Number(+body["cantidad"])};
      }

      let objetoActualizado = null;
      objetoActualizado = await Patrimonio.findOneAndUpdate({_id: body.id_objeto}, update, {
        new: true,
        runValidators: true,
      }).exec();
      if (!objetoActualizado) {
        return errorMessage(res, {message: "Objeto no encontrado."}, 404);
      }

      return res.json({
        ok: true,
        objeto: objetoActualizado,
        CambioStock: patrimonioStockDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Carga Orden de compra
// ============================
app.post(
  "/patrimonioOrdenCompra",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "informatica", value: 2}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let body = req.body;

      let todovacio = true;
      try {
        if (body.length !== 0) {
          todovacio = false;
          body.forEach((element) => {
            element.usuario_modifico = req.usuario._id;
          });
        }
      } catch (error) {
        return errorMessage(res, {message: "No se envió una lista de objetos."}, 412);
      }
      if (todovacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }

      let exitosos = "";
      let errores = "";
      let totales = {
        exitosos: 0,
        errores: 0,
      };

      let patrimonioStockDB = null;
      patrimonioStockDB = await PatrimonioStock.insertMany(body);
      if (!patrimonioStockDB) {
        return errorMessage(res, {message: "Ordenes no cargadas."}, 400);
      }

      let update = {
        verificado: false,
      };

      for (let index = 0; index < body.length; index++) {
        if (body[index]["operacion"] === "resta") {
          update["$inc"] = {cantidad: Number(-body[index]["cantidad"])};
        } else {
          update["$inc"] = {cantidad: Number(+body[index]["cantidad"])};
        }

        let patrimonioUpdate = await Patrimonio.findOneAndUpdate(
          {_id: body[index].id_objeto},
          update,
          {
            new: true,
          }
        )
          .exec()
          .catch((err) => {
            errores = `${errores}Objeto ID: ${body[index].id_objeto}, Error: ${err.message}\r\n\t`;
            totales.errores += 1;
          });

        if (patrimonioUpdate) {
          exitosos = `${exitosos}Objeto ID: ${body[index].id_objeto}, Actualizado: ${body[index].operacion} ${body[index].cantidad}.\r\n\t`;
          totales.exitosos += 1;
        }

        update["$inc"] = 0;
      }

      return res.json({
        ok: true,
        data: {exitosos, errores, totales},
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar todos los cambios de Stock de un objeto por su id
// ============================
app.get(
  "/patrimonioStock/buscar",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "informatica", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let filtro = {};

      if (req.query.obj && !isObjectIdValid(req.query.obj)) {
        return errorMessage(res, {message: "El ID de Busqueda no es valido."}, 400);
      } else if (req.query.obj) {
        filtro.id_objeto = req.query.obj;
      }

      let inicio = req.query.inicio || false;
      if (inicio) {
        try {
          inicio = new Date(inicio);
          inicio.toISOString();
        } catch (error) {
          return errorMessage(res, {message: "Fecha 'desde' no valida."}, 412);
        }
        //  "inicio" =< "fec_solicitud" =< "fin"
        filtro.fec_solicitud = {$gte: inicio};
      }

      let fin = req.query.fin || false;
      if (fin) {
        try {
          fin = new Date(fin);
          fin.toISOString();
        } catch (error) {
          return errorMessage(res, {message: "Fecha 'hasta' no valida."}, 412);
        }
        //  "inicio" =< "fec_solicitud" =< "fin"
        if (filtro.fec_solicitud) {
          filtro.fec_solicitud.$lte = fin;
        } else {
          filtro.fec_solicitud = {$lte: fin};
        }
      }

      if (req.query.area && !isObjectIdValid(req.query.area)) {
        return errorMessage(res, {message: "El Area no es valida."}, 400);
      } else if (req.query.area) {
        filtro.area_solicita = req.query.area;
      }

      let movimientosDB = await PatrimonioStock.find(filtro)
        .collation({locale: "es", numericOrdering: true})
        .sort({fec_solicitud: -1, id_objeto: 1, area_solicita: 1, _id: -1})
        .populate("id_objeto", "modelo")
        .populate("area_solicita", "area")
        .exec();

      return res.json({
        ok: true,
        movimientos: movimientosDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
