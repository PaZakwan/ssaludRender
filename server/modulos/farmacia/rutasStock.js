const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require("../../middlewares/autenticacion");
const {errorMessage} = require("../../tools/errorHandler");
const modificarStockInc = require("./farmaciaHelper");
const FarmaciaStock = require("./models/farmacia_stock");
const FarmaciaTransferencia = require("./models/farmacia_transferencia");
const FarmaciaIngreso = require("./models/farmacia_ingreso");
const {isObjectIdValid} = require("../../tools/object");

const app = express();

// ============================
// Recibir la remito_compra/remito (recibir fecha)
// ============================
app.put(
  "/farmacia/recibir",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.gestion"},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let filtro = _pick(req.body, ["id", "remito_compra", "remito"]);
      let ingresoDB = null;

      // Buscar Ingresos
      if (filtro.remito) {
        ingresoDB = await FarmaciaTransferencia.findOne({
          _id: filtro.id,
        })
          .populate("insumos.insumo", "nombre")
          .exec();
      } else if (filtro.remito_compra) {
        ingresoDB = await FarmaciaIngreso.findOne({
          _id: filtro.id,
        })
          .populate("insumos.insumo", "nombre")
          .exec();
      }
      let errors = [];
      if (ingresoDB) {
        if (
          // verificar que sea admin o que "destino" sea de su gestion.
          !(
            req.usuario.farmacia.general?.admin === 1 ||
            req.usuario.farmacia.gestion?.includes(ingresoDB.destino.toString())
          )
        ) {
          return errorMessage(res, {message: "Acceso Denegado."}, 401);
        }
        let recibido = new Date();
        // recorrer insumos
        for (let index = 0; index < ingresoDB.insumos.length; index++) {
          // Modificar stock
          const ingreso = ingresoDB.insumos[index];
          let stockDB = null;
          stockDB = await modificarStockInc(
            ingresoDB.destino,
            {
              insumo: ingreso.insumo._id,
              procedencia: ingreso.procedencia,
              lote: ingreso.lote,
              vencimiento: ingreso.vencimiento,
              recibido: ingreso.recibido,
            },
            ingreso.cantidad
          );
          if (!stockDB || (stockDB && stockDB.err)) {
            errors.push({
              message: `${ingreso.insumo.nombre} - Modificar Stock${
                stockDB ? ` - ${stockDB.err}` : ""
              }`,
              type: "Modificar Stock",
            });
          } else {
            ingresoDB.insumos[index].recibido = recibido;
          }
        }
        let recibidoDB = null;
        // Recibir ingreso
        if (filtro.remito) {
          recibidoDB = await FarmaciaTransferencia.findOneAndUpdate(
            {
              _id: filtro.id,
            },
            {insumos: ingresoDB.insumos},
            {
              new: true,
              runValidators: true,
            }
          ).exec();
        } else if (filtro.remito_compra) {
          recibidoDB = await FarmaciaIngreso.findOneAndUpdate(
            {
              _id: filtro.id,
            },
            {insumos: ingresoDB.insumos},
            {
              new: true,
              runValidators: true,
            }
          ).exec();
        }
        if (recibidoDB === null) {
          errors.push({
            message: `${filtro.remito || filtro.remito_compra} - Recibir Ingreso Error`,
            type: "Ingreso Recibido",
          });
        }
      } else {
        return errorMessage(res, {message: "Ingreso no encontrado."}, 404);
      }

      return res.status(errors.length === ingresoDB.insumos.length ? 500 : 202).json({
        ok: errors.length === ingresoDB.insumos.length ? false : true,
        recibido: filtro.remito || filtro.remito_compra,
        err: {
          errors,
        },
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar Stock de areas segun filtro. (groupedBy area/insumo)
// ============================
app.get(
  "/farmacia/stock",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.gestion"},
        {prop: "farmacia.stock"},
        {prop: "farmacia.general.stock", value: 1},
        {prop: "farmacia.general.reportes", value: 1},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let filtro = {};
      if (req.query.areas && req.query.areas !== "[]") {
        filtro.area = {
          $in: JSON.parse(req.query.areas),
        };
        for (const [index, area] of filtro.area.$in.entries()) {
          // verificar las areas.
          if (
            // existe en general/stock, en general/reportes, en general/admin, en array/gestion o en array/stock
            !(
              req.usuario.farmacia.general?.stock === 1 ||
              req.usuario.farmacia.general?.reportes === 1 ||
              req.usuario.farmacia.general?.admin === 1 ||
              req.usuario.farmacia.gestion?.includes(area) ||
              req.usuario.farmacia.stock?.includes(area)
            )
          ) {
            return errorMessage(res, {message: "Acceso Denegado."}, 401);
          }
          // regresa mongoose.Types.ObjectId(area);
          filtro.area.$in[index] = isObjectIdValid(area);
        }
      } else if (
        !(
          req.usuario.farmacia.general?.stock === 1 ||
          req.usuario.farmacia.general?.reportes === 1 ||
          req.usuario.farmacia.general?.admin === 1
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }
      if (req.query.insumos && req.query.insumos !== "[]") {
        filtro.insumo = {
          $in: JSON.parse(req.query.insumos),
        };
        filtro.insumo.$in.forEach((insumo, index) => {
          // regresa mongoose.Types.ObjectId(area);
          filtro.insumo.$in[index] = isObjectIdValid(insumo);
        });
      }
      if (req.query.procedencias && req.query.procedencias !== "[]") {
        filtro.procedencia = {
          $in: JSON.parse(req.query.procedencias),
        };
      }

      let hoy = new Date();
      let porExpirar = new Date(new Date().setDate(hoy.getDate() + 90));

      let stockDB = await FarmaciaStock.aggregate()
        .match(filtro)
        .sort({vencimiento: 1, _id: -1})
        .addFields({
          expirado: {
            $cond: [
              {$not: ["$vencimiento"]},
              false,
              {
                $cond: [
                  {
                    $gt: ["$vencimiento", hoy],
                  },
                  false,
                  true,
                ],
              },
            ],
          },
        })
        .addFields({
          porExpirar: {
            $cond: [
              {$or: [{$not: ["$vencimiento"]}, "$expirado"]},
              false,
              {
                $cond: [
                  {
                    $gt: ["$vencimiento", porExpirar],
                  },
                  false,
                  true,
                ],
              },
            ],
          },
        })
        .group({
          _id: {area: "$area", insumo: "$insumo"},
          total: {$sum: "$cantidad"},
          total_expirado: {$sum: {$cond: ["$expirado", "$cantidad", 0]}},
          total_porExpirar: {$sum: {$cond: ["$porExpirar", "$cantidad", 0]}},
          detalle: {
            $push: {
              procedencia: "$procedencia",
              lote: "$lote",
              vencimiento: {$dateToString: {format: "%Y-%m-%d", date: "$vencimiento"}},
              cantidad: "$cantidad",
              expirado: "$expirado",
              porExpirar: "$porExpirar",
            },
          },
        })
        .project({
          _id: 0,
          area: "$_id.area",
          insumo: "$_id.insumo",
          total: 1,
          total_expirado: 1,
          total_porExpirar: 1,
          detalle: 1,
        })
        .lookup({
          from: "areas",
          localField: "area",
          foreignField: "_id",
          as: "areaDB",
        })
        .unwind({path: "$areaDB"})
        .addFields({
          areaDB: "$areaDB.area",
        })
        .lookup({
          from: "Insumos",
          localField: "insumo",
          foreignField: "_id",
          as: "insumoDB",
        })
        .unwind({path: "$insumoDB"})
        .addFields({
          categoriaDB: "$insumoDB.categoria",
          insumoDB: "$insumoDB.nombre",
        })
        .addFields({
          _id: {$concat: ["$areaDB", "-", "$insumoDB"]},
        })
        .sort({categoriaDB: 1, areaDB: 1, insumoDB: 1});
      // XXXXXX  Desarrollar  XXXXXXX
      // buscar cantidad minima cant_min
      // $unionWith
      // cant_min: 14,

      return res.status(200).json({
        ok: true,
        stock: stockDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar Stock de area para select de entregas.
// ============================
app.get(
  "/farmacia/stock/entregas",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.gestion"},
        {prop: "farmacia.entregas"},
        {prop: "farmacia.general.reportes", value: 1},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let filtro = {area: req.query.area || null};
      if (!filtro.area) {
        return errorMessage(res, {message: "No se envió ningún filtro/dato."}, 412);
      }
      // verificar que el area sea de su gestion o entrega.
      if (
        // existe en general/reportes, en general/admin, en array/gestion o en array/entregas
        !(
          req.usuario.farmacia.general?.reportes === 1 ||
          req.usuario.farmacia.general?.admin === 1 ||
          req.usuario.farmacia.gestion?.includes(filtro.area) ||
          req.usuario.farmacia.entregas?.includes(filtro.area)
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }
      filtro.area = isObjectIdValid(filtro.area);

      let hoy = new Date();
      let porExpirar = new Date(new Date().setDate(hoy.getDate() + 90));

      let stockDB = await FarmaciaStock.aggregate()
        .match(filtro)
        .sort({insumo: -1, vencimiento: 1, _id: -1})
        .addFields({
          expirado: {
            $cond: [
              {$not: ["$vencimiento"]},
              false,
              {
                $cond: [
                  {
                    $gt: ["$vencimiento", hoy],
                  },
                  false,
                  true,
                ],
              },
            ],
          },
        })
        .addFields({
          porExpirar: {
            $cond: [
              {$or: [{$not: ["$vencimiento"]}, "$expirado"]},
              false,
              {
                $cond: [
                  {
                    $gt: ["$vencimiento", porExpirar],
                  },
                  false,
                  true,
                ],
              },
            ],
          },
          vencimiento: {$dateToString: {format: "%Y-%m-%d", date: "$vencimiento"}},
        })
        .lookup({
          from: "areas",
          localField: "area",
          foreignField: "_id",
          as: "areaDB",
        })
        .unwind({path: "$areaDB"})
        .addFields({
          areaDB: "$areaDB.area",
        })
        .lookup({
          from: "Insumos",
          localField: "insumo",
          foreignField: "_id",
          as: "insumoDB",
        })
        .unwind({path: "$insumoDB"})
        .addFields({
          insumoDB: "$insumoDB.nombre",
          insumoCategoriaDB: "$insumoDB.categoria",
        });

      if (req.query.categoria !== "null" && stockDB.length > 0) {
        let categoria = JSON.parse(req.query.categoria);
        stockDB = stockDB.filter((insumo) =>
          categoria.includes(insumo.insumoCategoriaDB.toString())
        );
      }

      return res.status(200).json({
        ok: true,
        stock: stockDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Retirar el remito (retirado fecha)
// ============================
app.put(
  "/farmacia/retirar",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.gestion"},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let transferenciaDB = null;
      let errors = [];

      // Buscar Transferencia
      transferenciaDB = await FarmaciaTransferencia.findOne({
        remito: req.body.remito,
      })
        .populate("insumos.insumo", "nombre")
        .exec();
      if (transferenciaDB) {
        if (
          // verificar que sea admin o que "origen" sea de su gestion.
          !(
            req.usuario.farmacia.general?.admin === 1 ||
            req.usuario.farmacia.gestion?.includes(transferenciaDB.origen.toString())
          )
        ) {
          return errorMessage(res, {message: "Acceso Denegado."}, 401);
        }
        let retirado = new Date();
        // recorrer insumos
        for (let index = 0; index < transferenciaDB.insumos.length; index++) {
          // Modificar stock
          const insumo = transferenciaDB.insumos[index];
          let stockDB = null;
          stockDB = await modificarStockInc(
            transferenciaDB.origen,
            {
              insumo: insumo.insumo._id,
              procedencia: insumo.procedencia,
              lote: insumo.lote,
              vencimiento: insumo.vencimiento,
              retirado: insumo.retirado,
            },
            insumo.cantidad,
            {resta: true}
          );
          if (!stockDB || (stockDB && stockDB.err)) {
            errors.push({
              message: `${insumo.insumo.nombre} - Modificar Stock${
                stockDB ? ` - ${stockDB.err}` : ""
              }`,
              type: "Modificar Stock",
            });
          } else {
            transferenciaDB.insumos[index].retirado = retirado;
          }
        }

        let retiradoDB = null;
        // Retirado de origen
        retiradoDB = await FarmaciaTransferencia.findOneAndUpdate(
          {
            remito: req.body.remito,
          },
          {insumos: transferenciaDB.insumos},
          {
            new: true,
            runValidators: true,
          }
        ).exec();
        if (retiradoDB === null) {
          errors.push({
            message: `${req.body.remito} - Transferencia Retirada Error`,
            type: "Transferencia Retirar",
          });
        }
      } else {
        return errorMessage(res, {message: "Transferencia no encontrada."}, 404);
      }

      return res.status(errors.length === transferenciaDB.insumos.length ? 500 : 202).json({
        ok: errors.length === transferenciaDB.insumos.length ? false : true,
        retirado: req.body.remito,
        err: {
          errors,
        },
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

module.exports = app;
