const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require("../../middlewares/autenticacion");
const {errorMessage} = require("../../tools/errorHandler");
const modificarStockInc = require("./farmaciaHelper");
const FarmaciaTransferencia = require("./models/farmacia_transferencia");
const FarmaciaIngreso = require("./models/farmacia_ingreso");
const {objectSetUnset, isObjectIdValid, sumarProps} = require("../../tools/object");

const app = express();

let listaIngreso = [
  "_id",
  "fecha",
  "remito_compra",
  "proveedor",
  "destino",
  "orden_compra",

  "insumos",
  // "stockID",
  // "insumo",
  // "insumoDB",
  // "categoriaDB",
  // "cantidad",
  // "procedencia",
  // "lote",
  // "vencimiento",
  // "retirado",
  // "recibido",
  // "nombre", (para errores)

  "observacion",

  // transferencia (clearing)
  "origen",
  "remito",
  "fec_planificada",
];

// ============================
// Mostrar Insumos que ingresaron segun area filtros, entre fechas.
// Ingresos(orden de compra (recibidos y pendientes) / Carga Inicial) + Transferencias (recibidos y pendientes)
// ============================
app.get(
  "/farmacia/ingresos",
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
      let filtro = {};
      if (req.query.areas && req.query.areas !== "[]") {
        filtro.destino = {
          $in: JSON.parse(req.query.areas),
        };
        for (const [index, area] of filtro.destino.$in.entries()) {
          // verificar las areas.
          if (
            // existe en general/reportes o en general/admin o en gestion
            !(
              req.usuario.farmacia.general?.reportes === 1 ||
              req.usuario.farmacia.general?.admin === 1 ||
              req.usuario.farmacia.gestion?.includes(area)
            )
          ) {
            return errorMessage(res, {message: "Acceso Denegado."}, 401);
          }
          // regresa mongoose.Types.ObjectId(area);
          filtro.destino.$in[index] = isObjectIdValid(area);
        }
      } else if (
        !(req.usuario.farmacia.general?.reportes === 1 || req.usuario.farmacia.general?.admin === 1)
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }
      if (req.query.insumos && req.query.insumos !== "[]") {
        filtro.insumos = {
          $elemMatch: {
            insumo: {
              $in: JSON.parse(req.query.insumos),
            },
          },
        };
        filtro.insumos.$elemMatch.insumo.$in.forEach((insumo, index) => {
          // regresa mongoose.Types.ObjectId(area);
          filtro.insumos.$elemMatch.insumo.$in[index] = isObjectIdValid(insumo);
        });
      }
      if (req.query.procedencias && req.query.procedencias !== "[]") {
        filtro.insumos = {
          $elemMatch: {
            ...(filtro.insumos?.$elemMatch || {}),
            procedencia: {
              $in: JSON.parse(req.query.procedencias),
            },
          },
        };
      }
      if (req.query.desde && req.query.hasta) {
        filtro.fecha = {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)};
      }

      // Ingresos
      let ingresosOrdenDB = await FarmaciaIngreso.aggregate()
        .match(filtro)
        .sort({fecha: -1, _id: -1})
        .addFields({
          fecha: {$dateToString: {format: "%Y-%m-%d", date: "$fecha"}},
          // recibido si todos fueron recibidos...
          recibido: {
            $cond: [
              {
                $eq: [
                  {
                    $cond: [{$isArray: "$insumos"}, {$size: "$insumos"}, -1],
                  },
                  {
                    $cond: [{$isArray: "$insumos"}, {$size: "$insumos.recibido"}, -2],
                  },
                ],
              },
              // esta todo recibido
              {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: {$arrayElemAt: ["$insumos.recibido", -1]},
                },
              },
              // no esta todo recibido
              undefined,
            ],
          },
          // Permitir editar todo solamente si no tiene nada recibido.
          editable: {
            $cond: [
              {
                $gte: [
                  {
                    $cond: [{$isArray: "$insumos"}, {$size: "$insumos.recibido"}, -2],
                  },
                  1,
                ],
              },
              // 1 o mas se ha retirado
              false,
              // no hay nada retirado
              true,
            ],
          },
        })
        .lookup({
          from: "areas",
          localField: "destino",
          foreignField: "_id",
          as: "destinoDB",
        })
        .unwind({path: "$destinoDB"})
        .addFields({
          destinoDB: "$destinoDB.area",
        });

      // Transferencias Remitos (clearing)
      let transferenciaRemitoDB = await FarmaciaTransferencia.aggregate()
        .match(filtro)
        .addFields({
          fecha: {$dateToString: {format: "%Y-%m-%d", date: "$fecha"}},
          fec_planificada: {$dateToString: {format: "%Y-%m-%d", date: "$fec_planificada"}},
          // recibido si todos fueron recibidos...
          recibido: {
            $cond: [
              {
                $eq: [
                  {
                    $cond: [{$isArray: "$insumos"}, {$size: "$insumos"}, -1],
                  },
                  {
                    $cond: [{$isArray: "$insumos"}, {$size: "$insumos.recibido"}, -2],
                  },
                ],
              },
              // esta todo recibido
              {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: {$arrayElemAt: ["$insumos.recibido", -1]},
                },
              },
              // no esta todo recibido
              undefined,
            ],
          },
          // retirado si todos fueron retirados...
          retirado: {
            $cond: [
              {
                $eq: [
                  {
                    $cond: [{$isArray: "$insumos"}, {$size: "$insumos"}, -1],
                  },
                  {
                    $cond: [{$isArray: "$insumos"}, {$size: "$insumos.retirado"}, -2],
                  },
                ],
              },
              // esta todo retirado
              {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: {$arrayElemAt: ["$insumos.retirado", -1]},
                },
              },
              // no esta todo retirado
              undefined,
            ],
          },
          // Permitir editar todo solamente si no tiene nada retirado.
          editable: {
            $cond: [
              {
                $gte: [
                  {
                    $cond: [{$isArray: "$insumos"}, {$size: "$insumos.retirado"}, -2],
                  },
                  1,
                ],
              },
              // 1 o mas se ha retirado
              false,
              // no hay nada retirado
              true,
            ],
          },
        })
        // descomprimir para buscar los insumos
        .unwind({path: "$insumos"})
        .lookup({
          from: "Insumos",
          localField: "insumos.insumo",
          foreignField: "_id",
          as: "insumos.insumoDB",
        })
        .unwind({path: "$insumos.insumoDB"})
        .addFields({
          "insumos.insumoDB": "$insumos.insumoDB.nombre",
          "insumos.categoriaDB": "$insumos.insumoDB.categoria",
          "insumos.vencimiento": {
            $dateToString: {format: "%Y-%m-%d", date: "$insumos.vencimiento"},
          },
        })
        // recomprimir
        .sort({fecha: -1, _id: -1})
        .group({
          _id: "$_id",
          data: {$first: "$$ROOT"},
          insumos: {
            $push: "$insumos",
          },
        })
        .replaceRoot({$mergeObjects: ["$data", {insumos: "$insumos"}]})
        .lookup({
          from: "areas",
          localField: "destino",
          foreignField: "_id",
          as: "destinoDB",
        })
        .unwind({path: "$destinoDB"})
        .addFields({
          destinoDB: "$destinoDB.area",
        })
        .lookup({
          from: "areas",
          localField: "origen",
          foreignField: "_id",
          as: "origenDB",
        })
        .unwind({path: "$origenDB"})
        .addFields({
          origenDB: "$origenDB.area",
        });

      return res.status(200).json({
        ok: true,
        ingresos: ingresosOrdenDB.concat(transferenciaRemitoDB),
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Guardar Ingreso
// ============================
app.put(
  "/farmacia/ingreso",
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
      let body = _pick(req.body, listaIngreso);

      let todovacio = true;
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          if (body[key] !== "" && body[key] !== null) {
            todovacio = false;
            break;
          }
        }
      }
      if (todovacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }

      if (
        // verificar que sea admin o que "destino" sea de su gestion.
        !(
          req.usuario.farmacia.general?.admin === 1 ||
          req.usuario.farmacia.gestion?.includes(body.destino)
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      let ingresoDB = null;
      let errors = [];
      if (!body._id) {
        // Nuevo
        // Verifica que no se encuentra cargada misma orden de compra
        if (body.remito_compra !== "Carga inicial") {
          ingresoDB = await FarmaciaIngreso.findOne({remito_compra: body.remito_compra}).exec();
          if (ingresoDB) {
            return errorMessage(res, {message: "Remito de Compra existente."}, 401);
          }
        }
        ingresoDB = await new FarmaciaIngreso(body).save();

        // Si es Carga inicial autorecibir stock
        if (ingresoDB.remito_compra === "Carga inicial") {
          let recibido = new Date();
          for (let index = 0; index < body.insumos.length; index++) {
            const ingreso = body.insumos[index];
            let stockDB = null;
            stockDB = await modificarStockInc(
              body.destino,
              {
                insumo: ingreso.insumo,
                procedencia: ingreso.procedencia,
                lote: ingreso.lote,
                vencimiento: ingreso.vencimiento,
                recibido: ingreso.recibido,
              },
              ingreso.cantidad
            );
            if (stockDB.err) {
              // o si tira error..
              errors.push({
                message: `${ingreso.insumo} - Modificar Stock - ${stockDB.err}`,
                type: "Modificar Stock",
              });
            } else {
              // si es exitoso..
              body.insumos[index].recibido = recibido;
            }
          }
          //Update
          let recibidoDB = null;
          recibidoDB = await FarmaciaIngreso.findOneAndUpdate(
            {
              _id: ingresoDB.id,
            },
            {insumos: body.insumos},
            {
              new: true,
              runValidators: true,
            }
          ).exec();
          if (recibidoDB === null) {
            errors.push({
              message: `${ingresoDB.remito_compra} - Recibir Ingreso Error`,
              type: "Ingreso Recibido",
            });
          }
        }
      } else {
        // Update
        // Verificar que no se hayan recibido..
        ingresoDB = await FarmaciaIngreso.findOne({_id: body._id}).exec();
        if (ingresoDB.insumos.length === ingresoDB.insumos.filter((x) => x.recibido).length) {
          return errorMessage(res, {message: "Ya Recibido, no editable."}, 401);
        }

        // Delete del campo si esta como null / "" / undefined /array vacio
        body = objectSetUnset(body, "unsetCero").dato;

        // Modificando la BD
        ingresoDB = await FarmaciaIngreso.findOneAndUpdate({_id: body.$set._id}, body, {
          new: true,
          runValidators: true,
        }).exec();
      }

      return res.status(errors.length > 0 ? 500 : 201).json({
        ok: errors.length > 0 ? false : true,
        ingreso: ingresoDB.remito_compra,
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
// Mostrar Transferencias segun area filtros, entre fechas
// ============================
app.get(
  "/farmacia/transferencias",
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
      let areasID = {};
      if (req.query.areas && req.query.areas !== "[]") {
        areasID = {
          $in: JSON.parse(req.query.areas),
        };
        for (const [index, area] of areasID.$in.entries()) {
          // verificar las areas.
          if (
            // existe en general/reportes o en general/admin o en gestion
            !(
              req.usuario.farmacia.general?.reportes === 1 ||
              req.usuario.farmacia.general?.admin === 1 ||
              req.usuario.farmacia.gestion?.includes(area)
            )
          ) {
            return errorMessage(res, {message: "Acceso Denegado."}, 401);
          }
          // regresa mongoose.Types.ObjectId(area);
          areasID.$in[index] = isObjectIdValid(area);
        }
      } else if (
        !(req.usuario.farmacia.general?.reportes === 1 || req.usuario.farmacia.general?.admin === 1)
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }
      let filtro = {};
      if (req.query.insumos && req.query.insumos !== "[]") {
        filtro.insumos = {
          $elemMatch: {
            insumo: {
              $in: JSON.parse(req.query.insumos),
            },
          },
        };
        filtro.insumos.$elemMatch.insumo.$in.forEach((insumo, index) => {
          // regresa mongoose.Types.ObjectId(area);
          filtro.insumos.$elemMatch.insumo.$in[index] = isObjectIdValid(insumo);
        });
      }
      if (req.query.procedencias && req.query.procedencias !== "[]") {
        filtro.insumos = {
          $elemMatch: {
            ...(filtro.insumos?.$elemMatch || {}),
            procedencia: {
              $in: JSON.parse(req.query.procedencias),
            },
          },
        };
      }
      if (req.query.desde && req.query.hasta) {
        filtro.fecha = {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)};
      }

      // Transferencias Remitos (clearing)
      let transferenciasDB = await FarmaciaTransferencia.aggregate()
        .match({
          $and: [
            {
              $or: [
                {
                  origen: areasID,
                },
                {
                  destino: areasID,
                },
              ],
            },
            {...filtro},
          ],
        })
        .addFields({
          fecha: {$dateToString: {format: "%Y-%m-%d", date: "$fecha"}},
          fec_planificada: {$dateToString: {format: "%Y-%m-%d", date: "$fec_planificada"}},
          // recibido si todos fueron recibidos...
          recibido: {
            $cond: [
              {
                $eq: [
                  {
                    $cond: [{$isArray: "$insumos"}, {$size: "$insumos"}, -1],
                  },
                  {
                    $cond: [{$isArray: "$insumos"}, {$size: "$insumos.recibido"}, -2],
                  },
                ],
              },
              // esta todo recibido
              {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: {$arrayElemAt: ["$insumos.recibido", -1]},
                },
              },
              // no esta todo recibido
              undefined,
            ],
          },
          // retirado si todos fueron retirados...
          retirado: {
            $cond: [
              {
                $eq: [
                  {
                    $cond: [{$isArray: "$insumos"}, {$size: "$insumos"}, -1],
                  },
                  {
                    $cond: [{$isArray: "$insumos"}, {$size: "$insumos.retirado"}, -2],
                  },
                ],
              },
              // esta todo retirado
              {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: {$arrayElemAt: ["$insumos.retirado", -1]},
                },
              },
              // no esta todo retirado
              undefined,
            ],
          },
          // Permitir editar todo solamente si no tiene nada retirado.
          editable: {
            $cond: [
              {
                $gte: [
                  {
                    $cond: [{$isArray: "$insumos"}, {$size: "$insumos.retirado"}, -2],
                  },
                  1,
                ],
              },
              // 1 o mas se ha retirado
              false,
              // no hay nada retirado
              true,
            ],
          },
        })
        // descomprimir para buscar los insumos
        .unwind({path: "$insumos"})
        .lookup({
          from: "Insumos",
          localField: "insumos.insumo",
          foreignField: "_id",
          as: "insumos.insumoDB",
        })
        .unwind({path: "$insumos.insumoDB"})
        .addFields({
          "insumos.insumoDB": "$insumos.insumoDB.nombre",
          "insumos.categoriaDB": "$insumos.insumoDB.categoria",
          "insumos.vencimiento": {
            $dateToString: {format: "%Y-%m-%d", date: "$insumos.vencimiento"},
          },
        })
        // recomprimir
        .sort({fecha: -1, _id: -1, "insumos.categoriaDB": 1, "insumos.insumoDB": 1})
        .group({
          _id: "$_id",
          data: {$first: "$$ROOT"},
          insumos: {
            $push: "$insumos",
          },
        })
        .replaceRoot({$mergeObjects: ["$data", {insumos: "$insumos"}]})
        .lookup({
          from: "areas",
          localField: "destino",
          foreignField: "_id",
          as: "destinoDB",
        })
        .unwind({path: "$destinoDB"})
        .addFields({
          destinoDB: "$destinoDB.area",
        })
        .lookup({
          from: "areas",
          localField: "origen",
          foreignField: "_id",
          as: "origenDB",
        })
        .unwind({path: "$origenDB"})
        .addFields({
          origenDB: "$origenDB.area",
        });

      return res.status(200).json({
        ok: true,
        transferencias: transferenciasDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Guardar Transferencia (clearing)
// ============================
app.put(
  "/farmacia/transferencia",
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
      let body = _pick(req.body, listaIngreso);

      let todovacio = true;
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          if (body[key] !== "" && body[key] !== null) {
            todovacio = false;
            break;
          }
        }
      }
      if (todovacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }

      if (
        // verificar que sea admin o que "origen" sea de su gestion.
        !(
          req.usuario.farmacia.general?.admin === 1 ||
          req.usuario.farmacia.gestion?.includes(body.origen)
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }
      let transferenciaDB = null;
      let errors = [];

      if (!body._id) {
        // Nuevo
        // Generar Remito YYYY-000000001
        let remitoBase = [new Date().getFullYear().toString(), "1".padStart(9, "0")];
        let ultimaTransferencia = await FarmaciaTransferencia.findOne({})
          .select({remito: 1, _id: 0})
          .sort({_id: -1})
          .exec();
        // si existe y es del año actual
        if (ultimaTransferencia && ultimaTransferencia.remito.split("-")[0] === remitoBase[0]) {
          // mismo año autoincrementar remito
          remitoBase[1] = (Number(ultimaTransferencia.remito.split("-")[1]) + 1)
            .toString()
            .padStart(9, "0");
        }
        body.remito = remitoBase.join("-");

        transferenciaDB = await new FarmaciaTransferencia(body).save();
      } else {
        // Update
        // Verificar que no se hayan retirado..
        transferenciaDB = await FarmaciaTransferencia.findOne({_id: body._id}).exec();
        if (
          transferenciaDB.insumos.length ===
          transferenciaDB.insumos.filter((x) => x.retirado).length
        ) {
          return errorMessage(res, {message: "Ya Retirado, no editable."}, 401);
        }

        // Delete del campo si esta como null / "" / undefined /array vacio
        body = objectSetUnset(body, "unsetCero").dato;

        // Modificando la BD
        transferenciaDB = await FarmaciaTransferencia.findOneAndUpdate({_id: body.$set._id}, body, {
          new: true,
          runValidators: true,
        }).exec();
      }

      if (transferenciaDB === null) {
        errors.push({
          message: `${body.remito} - Guardar Transferencia Error`,
          type: "Guardar Transferencia",
        });
      }

      return res.status(errors.length > 0 ? 500 : 201).json({
        ok: errors.length > 0 ? false : true,
        transferencia: transferenciaDB,
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
// Mostrar Insumos Estadistica, Ingresaron segun area filtros, entre fechas.
// Ingresos(orden de compra (recibidos) / Carga Inicial) + Transferencias (recibidos)
// Posibilidad de seleccionar los modelos de la DB
// ============================
app.get(
  "/farmacia/ingresos/estadistica",
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
      let filtro = {};
      if (req.query.areas && req.query.areas !== "[]") {
        filtro.destino = {
          $in: JSON.parse(req.query.areas),
        };
        for (const [index, area] of filtro.destino.$in.entries()) {
          // verificar las areas.
          if (
            // existe en general/reportes o en general/admin o en gestion
            !(
              req.usuario.farmacia.general?.reportes === 1 ||
              req.usuario.farmacia.general?.admin === 1 ||
              req.usuario.farmacia.gestion?.includes(area)
            )
          ) {
            return errorMessage(res, {message: "Acceso Denegado."}, 401);
          }
          // regresa mongoose.Types.ObjectId(area);
          filtro.destino.$in[index] = isObjectIdValid(area);
        }
      } else if (
        !(req.usuario.farmacia.general?.reportes === 1 || req.usuario.farmacia.general?.admin === 1)
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }
      if (req.query.insumos && req.query.insumos !== "[]") {
        filtro.insumos = {
          $elemMatch: {
            insumo: {
              $in: JSON.parse(req.query.insumos),
            },
          },
        };
        filtro.insumos.$elemMatch.insumo.$in.forEach((insumo, index) => {
          // regresa mongoose.Types.ObjectId(area);
          filtro.insumos.$elemMatch.insumo.$in[index] = isObjectIdValid(insumo);
        });
      }
      if (req.query.procedencias && req.query.procedencias !== "[]") {
        filtro.insumos = {
          $elemMatch: {
            ...(filtro.insumos?.$elemMatch || {}),
            procedencia: {
              $in: JSON.parse(req.query.procedencias),
            },
          },
        };
      }
      if (req.query.desde && req.query.hasta) {
        filtro.fecha = {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)};
      }

      // Ingresos Proveedores/Carga inicial
      let ingresosOrdenDB = [];
      if (JSON.parse(req.query.modelos)?.ingresos) {
        ingresosOrdenDB = await FarmaciaIngreso.aggregate()
          .match(filtro)
          // descomprimir
          .unwind({path: "$insumos"})
          // encontrar recibidos
          .match({
            "insumos.recibido": {$ne: null},
            "insumos.insumo": filtro.insumos?.$elemMatch.insumo || {$exists: true},
            "insumos.procedencia": filtro.insumos?.$elemMatch.procedencia || {$exists: true},
            // $and: [{"insumos.recibido": {$ne: null}}, {...(filtro.insumos?.$elemMatch || {})}],
          })
          // sort vencimiento
          // .sort({"insumos.vencimiento": 1, _id: -1})
          // agrupar - area/insumo, sumar por insumo.
          // procedencia lote vencimiento cant
          .group({
            _id: {area: "$destino", insumo: "$insumos.insumo"},
            total: {$sum: "$insumos.cantidad"},
            // detalle: {
            //   $push: {
            //     procedencia: "$insumos.procedencia",
            //     lote: "$insumos.lote",
            //     vencimiento: {$dateToString: {format: "%Y-%m-%d", date: "$insumos.vencimiento"}},
            //     cantidad: "$insumos.cantidad",
            //   },
            // },
          })
          .project({
            _id: 0,
            area: "$_id.area",
            insumo: "$_id.insumo",
            total: 1,
            // detalle: 1,
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
            total_ingreso_pr: "$total",
          })
          .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});
      }

      // Ingresos Transferencias Remitos (clearing)
      let transferenciaInDB = [];
      if (JSON.parse(req.query.modelos)?.transferencias) {
        transferenciaInDB = await FarmaciaTransferencia.aggregate()
          .match(filtro)
          // descomprimir
          .unwind({path: "$insumos"})
          // encontrar recibidos
          .match({
            "insumos.recibido": {$ne: null},
            "insumos.insumo": filtro.insumos?.$elemMatch.insumo || {$exists: true},
            "insumos.procedencia": filtro.insumos?.$elemMatch.procedencia || {$exists: true},
          })
          // sort vencimiento
          // .sort({"insumos.vencimiento": 1, _id: -1})
          // agrupar - area/insumo, sumar por insumo.
          // procedencia lote vencimiento cant
          .group({
            _id: {area: "$destino", insumo: "$insumos.insumo"},
            total: {$sum: "$insumos.cantidad"},
            // detalle: {
            //   $push: {
            //     procedencia: "$insumos.procedencia",
            //     lote: "$insumos.lote",
            //     vencimiento: {$dateToString: {format: "%Y-%m-%d", date: "$insumos.vencimiento"}},
            //     cantidad: "$insumos.cantidad",
            //   },
            // },
          })
          .project({
            _id: 0,
            area: "$_id.area",
            insumo: "$_id.insumo",
            total: 1,
            // detalle: 1,
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
            total_transferencia_in: "$total",
          })
          .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});
      }

      // INTEGRAR INGRESOS
      // Ingresos Proveedores/Carga inicial
      let ingresosDB = [...ingresosOrdenDB];
      // TRANSFERENCIA IN
      // si ingresos sigue vacio agregar los ingresos de transferencia.
      if (ingresosDB.length === 0) {
        ingresosDB = [...transferenciaInDB];
      }
      // sino recorrer transferenciaInDB y sumarProps
      else {
        for (let index = 0; index < transferenciaInDB.length; index++) {
          let existe = ingresosDB.findIndex(
            (ingreso) => ingreso._id === transferenciaInDB[index]._id
          );
          if (existe > -1) {
            // sumarProps
            ingresosDB[existe] = sumarProps(ingresosDB[existe], transferenciaInDB[index]);
          } else {
            // agregarlo
            ingresosDB.push(transferenciaInDB[index]);
          }
        }
      }

      return res.status(200).json({
        ok: true,
        ingresos: ingresosDB,
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
