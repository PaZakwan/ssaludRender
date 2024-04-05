const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isObjectIdValid} = require(process.env.MAIN_FOLDER + "/tools/object");

const modificarStockInc = require("./farmaciaHelper");
const FarmaciaStock = require("./models/farmacia_stock");
const FarmaciaTransferencia = require("./models/farmacia_transferencia");
const FarmaciaIngreso = require("./models/farmacia_ingreso");

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
        let recibido = Date.now();
        // recorrer insumos
        for (let index = 0; index < ingresoDB.insumos.length; index++) {
          // Modificar stock
          let stockDB = null;
          stockDB = await modificarStockInc(
            ingresoDB.destino,
            {
              insumo: ingresoDB.insumos[index].insumo._id,
              procedencia: ingresoDB.insumos[index].procedencia,
              lote: ingresoDB.insumos[index].lote,
              vencimiento: ingresoDB.insumos[index].vencimiento,
              recibido: ingresoDB.insumos[index].recibido,
            },
            ingresoDB.insumos[index].cantidad
          );
          if (!stockDB || (stockDB && stockDB.err)) {
            // o si tira error..
            errors.push({
              message: `${ingresoDB.insumos[index].insumo.nombre} - Modificar Stock - ${
                stockDB?.err ?? "No contemplado"
              }.`,
              type: "Modificar Stock",
            });
          } else {
            // si es exitoso..
            ingresoDB.insumos[index].recibido = recibido;
          }
        }
        // Recibir Update
        let recibidoDB = null;
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
            message: `${filtro.remito ?? filtro.remito_compra} - Recibir Ingreso Error`,
            type: "Ingreso Recibido",
          });
        }
      } else {
        return errorMessage(res, {message: "Ingreso no encontrado."}, 404);
      }

      return res.status(errors.length > 0 ? 500 : 202).json({
        ok: errors.length > 0 ? false : true,
        recibido: filtro.remito ?? filtro.remito_compra,
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
      let detallado = req.query.nd
        ? null
        : {
            detalle: {
              $push: {
                $cond: [
                  "$cantidad",
                  {
                    procedencia: "$procedencia",
                    lote: "$lote",
                    vencimiento: {$dateToString: {format: "%Y-%m-%d", date: "$vencimiento"}},
                    cantidad: "$cantidad",
                    expirado: "$expirado",
                    porExpirar: "$porExpirar",
                  },
                  "$$REMOVE",
                ],
              },
            },
          };

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
        // Opciones Minimos
        .unionWith({
          coll: "FarmaciaOpciones",
          pipeline: [
            {
              $match: {
                area: filtro.area,
                insumo: filtro.insumo || {$exists: true},
              },
            },
            {$project: {_id: 0, area: 1, insumo: 1, cant_min: 1}},
          ],
        })
        .group({
          ...{
            _id: {area: "$area", insumo: "$insumo"},
            total: {$sum: "$cantidad"},
            total_expirado: {$sum: {$cond: ["$expirado", "$cantidad", 0]}},
            total_porExpirar: {$sum: {$cond: ["$porExpirar", "$cantidad", 0]}},
            cant_min: {$sum: "$cant_min"},
          },
          ...detallado,
        })
        .project({
          _id: 0,
          area: "$_id.area",
          insumo: "$_id.insumo",
          total: 1,
          total_expirado: 1,
          total_porExpirar: 1,
          detalle: 1,
          cant_min: {$cond: [{$eq: ["$cant_min", 0]}, "$noRetornaNada", "$cant_min"]},
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
          total_buenos: {$subtract: ["$total", "$total_expirado"]},
        })
        .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});

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
// Mostrar Stock del area para los selects.
// ============================
app.get(
  "/farmacia/stock/selects",
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
      let filtro = {area: req.query.area};
      if (!filtro.area || filtro.area === "undefined") {
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

      let insumoSelect = {
        insumoDB: "$insumoDB.nombre",
        insumoCategoriaDB: "$insumoDB.categoria",
      };
      if (req.query.insumoSelect) {
        if (JSON.parse(req.query.insumoSelect)?.dosis) {
          insumoSelect.dosisDB = "$insumoDB.dosis_posibles";
        }
        if (JSON.parse(req.query.insumoSelect)?.condiciones) {
          insumoSelect.condicionesDB = "$insumoDB.condiciones";
        }
      }

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
        .addFields(insumoSelect);

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
// Mostrar Stock total en el area de los [insumos] solicitados.
// ============================
app.get(
  "/farmacia/stock/solicitud",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.gestion"},
        {prop: "farmacia.general.reportes", value: 1},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let filtro = {
        // regresa mongoose.Types.ObjectId(area);
        area: isObjectIdValid(req.query.area),
        insumo: {
          $in: JSON.parse(req.query.insumos),
        },
      };

      filtro.insumo.$in.forEach((insumo, index) => {
        // regresa mongoose.Types.ObjectId(area);
        filtro.insumo.$in[index] = isObjectIdValid(insumo);
      });

      if (
        filtro.area === false ||
        // todos false
        !filtro.insumo.$in.some((insumo) => insumo !== false)
      ) {
        return errorMessage(res, {message: "No se enviaron datos necesarios para proceder."}, 412);
      }

      let stockDB = await FarmaciaStock.aggregate()
        .match(filtro)
        .group({
          _id: {insumo: "$insumo"},
          total: {$sum: "$cantidad"},
        })
        .project({
          _id: 0,
          insumo: "$_id.insumo",
          total: 1,
        })
        .sort({insumo: -1});

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
// Mostrar Stock Total del sistema por Insumo.
// ============================
app.get(
  "/farmacia/stock/total",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
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
      if (req.query.insumos) {
        filtro.insumo = {
          $in: JSON.parse(req.query.insumos),
        };
        filtro.insumo.$in.forEach((insumo, index) => {
          // regresa mongoose.Types.ObjectId(area);
          filtro.insumo.$in[index] = isObjectIdValid(insumo);
        });
      }

      let stockDB = await FarmaciaStock.aggregate()
        .match(filtro)
        // Opciones Minimos
        .unionWith({
          coll: "FarmaciaOpciones",
          pipeline: [
            {
              $match: filtro,
            },
            {$project: {_id: 0, insumo: 1, cant_min: 1}},
          ],
        })
        .group({
          _id: {insumo: "$insumo"},
          // subtotal_Otros: {
          //   $sum: {
          //     $cond: [
          //       {
          //         $not: [
          //           {
          //             $in: [
          //               "$procedencia",
          //               ["Municipal", "Remediar", "SUMAR", "Region", "Nacion", "Donacion"],
          //             ],
          //           },
          //         ],
          //       },
          //       "$cantidad",
          //       0,
          //     ],
          //   },
          // },
          subtotal_Municipal: {
            $sum: {
              $cond: [{$eq: ["$procedencia", "Municipal"]}, "$cantidad", 0],
            },
          },
          subtotal_Remediar: {
            $sum: {
              $cond: [{$eq: ["$procedencia", "Remediar"]}, "$cantidad", 0],
            },
          },
          subtotal_SUMAR: {
            $sum: {
              $cond: [{$eq: ["$procedencia", "SUMAR"]}, "$cantidad", 0],
            },
          },
          subtotal_Region: {
            $sum: {
              $cond: [{$eq: ["$procedencia", "Region"]}, "$cantidad", 0],
            },
          },
          subtotal_Nacion: {
            $sum: {
              $cond: [{$eq: ["$procedencia", "Nacion"]}, "$cantidad", 0],
            },
          },
          subtotal_Donacion: {
            $sum: {
              $cond: [{$eq: ["$procedencia", "Donacion"]}, "$cantidad", 0],
            },
          },
          total: {$sum: "$cantidad"},
          cant_min_prom: {$avg: "$cant_min"},
        })
        .addFields({
          subtotal_Otros: {
            $subtract: [
              "$total",
              {
                $sum: [
                  "$subtotal_Municipal",
                  "$subtotal_Remediar",
                  "$subtotal_SUMAR",
                  "$subtotal_Region",
                  "$subtotal_Nacion",
                  "$subtotal_Donacion",
                ],
              },
            ],
          },
        })
        .lookup({
          from: "Insumos",
          localField: "_id.insumo",
          foreignField: "_id",
          as: "insumoDB",
        })
        .project({
          _id: 0,
        })
        .unwind({path: "$insumoDB"})
        .addFields({categoriaDB: "$insumoDB.categoria", insumoDB: "$insumoDB.nombre"})
        .sort({categoriaDB: 1, insumoDB: 1});

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
        let retirado = Date.now();
        // recorrer insumos
        for (let index = 0; index < transferenciaDB.insumos.length; index++) {
          // Modificar stock
          let stockDB = null;
          stockDB = await modificarStockInc(
            transferenciaDB.origen,
            {
              insumo: transferenciaDB.insumos[index].insumo._id,
              procedencia: transferenciaDB.insumos[index].procedencia,
              lote: transferenciaDB.insumos[index].lote,
              vencimiento: transferenciaDB.insumos[index].vencimiento,
              retirado: transferenciaDB.insumos[index].retirado,
            },
            transferenciaDB.insumos[index].cantidad,
            {resta: true}
          );
          if (!stockDB || (stockDB && stockDB.err)) {
            // o si tira error..
            errors.push({
              message: `${transferenciaDB.insumos[index].insumo.nombre} - Modificar Stock - ${
                stockDB?.err ?? "No contemplado"
              }.`,
              type: "Modificar Stock",
            });
          } else {
            // si es exitoso..
            transferenciaDB.insumos[index].retirado = retirado;
          }
        }

        // Retirar Update
        let retiradoDB = null;
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

      return res.status(errors.length > 0 ? 500 : 202).json({
        ok: errors.length > 0 ? false : true,
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
