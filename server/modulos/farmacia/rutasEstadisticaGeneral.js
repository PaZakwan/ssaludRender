const express = require("express");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isObjectIdValid, dateUTC} = require(process.env.MAIN_FOLDER + "/tools/object");

const FarmaciaStock = require("./models/farmacia_stock");

const app = express();

// ============================
// Mostrar Resumen General => GroupBy: area - insumo.
//    Stock (actual), Solicitado (pendiente), Ingresos Recibido (cantidad entre fechas), Egresos (cantidad entre fechas).
// ============================
app.get(
  "/farmacia/estadistica/general",
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
      // para entregas/descartes
      let filtroIndividual = {};
      if (req.query.desde && req.query.hasta) {
        let temp = dateUTC({
          date: req.query.desde,
          hours: "00:00:00.000",
          timezone: req.get("timezoneoffset"),
        });
        if (temp.error) {
          return errorMessage(res, {message: temp.error}, 400);
        }
        (filtroIndividual.fecha ??= {}).$gte = temp;
        temp = dateUTC({
          date: req.query.hasta,
          hours: "23:59:59.999",
          timezone: req.get("timezoneoffset"),
        });
        if (temp.error) {
          return errorMessage(res, {message: temp.error}, 400);
        }
        (filtroIndividual.fecha ??= {}).$lte = temp;
      } else {
        return errorMessage(res, {message: "Faltan las Fechas del Filtro para proceder."}, 412);
      }

      if (req.query.areas) {
        filtroIndividual.origen = {
          $in: JSON.parse(req.query.areas),
        };
        for (const [index, area] of filtroIndividual.origen.$in.entries()) {
          // regresa mongoose.Types.ObjectId(area);
          filtroIndividual.origen.$in[index] = isObjectIdValid(area);
        }
      }
      if (req.query.insumos && req.query.insumos !== "[]") {
        filtroIndividual.insumo = {
          $in: JSON.parse(req.query.insumos),
        };
        filtroIndividual.insumo.$in.forEach((insumo, index) => {
          // regresa mongoose.Types.ObjectId(area);
          filtroIndividual.insumo.$in[index] = isObjectIdValid(insumo);
        });
      }
      if (req.query.procedencias && req.query.procedencias !== "[]") {
        filtroIndividual.procedencia = {
          $in: JSON.parse(req.query.procedencias),
        };
      }

      let filtroStock = {...filtroIndividual};
      delete filtroStock.fecha;
      delete filtroStock.origen;
      filtroStock.area = filtroIndividual.origen;

      let filtroSolicitud = {...filtroIndividual};
      delete filtroSolicitud.fecha;
      delete filtroSolicitud.procedencia;
      if (filtroIndividual.insumo) {
        delete filtroSolicitud.insumo;
        filtroSolicitud["insumos.insumo"] = filtroIndividual.insumo;
      }

      let reporte = await FarmaciaStock.aggregate()
        .match(filtroStock)
        // unionWith() => Stock, Solicitudes, Minimos
        // Stock
        .project({
          _id: 0,
          area: 1,
          insumo: 1,
          stock: "$cantidad",
        })
        // Solicitudes
        .unionWith({
          coll: "FarmaciaSolicitudes",
          pipeline: [
            {
              $match: {
                ...filtroSolicitud,
                estado: "Pendiente",
              },
            },
            {$project: {_id: 0, origen: 1, insumos: 1}},
            {$unwind: "$insumos"},
            {$match: filtroSolicitud},
            {
              $project: {
                area: "$origen",
                insumo: "$insumos.insumo",
                solicitado: "$insumos.cantidad",
              },
            },
          ],
        })
        // Opciones Minimos
        .unionWith({
          coll: "FarmaciaOpciones",
          pipeline: [
            {
              $match: {
                area: filtroIndividual.origen,
                insumo: filtroIndividual.insumo || {$exists: true},
              },
            },
            {$project: {_id: 0, area: 1, insumo: 1, cant_min: 1}},
          ],
        })
        // group() => area - insumo.
        .group({
          _id: {area: "$area", insumo: "$insumo"},
          total_stock: {$sum: "$stock"},
          total_solicitado: {$sum: "$solicitado"},
          cant_min: {$sum: "$cant_min"},
        })
        .project({
          _id: 0,
          area: "$_id.area",
          insumo: "$_id.insumo",
          total_stock: 1,
          total_solicitado: 1,
          cant_min: {$cond: [{$eq: ["$cant_min", 0]}, "$noRetornaNada", "$cant_min"]},
        })
        // lookup() => Ingresos (Recibidos). [Ingreso / Transferencia(in)]
        .lookup({
          from: "FarmaciaIngresos",
          let: {
            areaTmp: "$area",
            insumoTmp: "$insumo",
          },
          pipeline: [
            {
              $match: {
                $and: [
                  {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$destino", "$$areaTmp"],
                        },
                        {$in: ["$$insumoTmp", "$insumos.insumo"]},
                      ],
                    },
                  },
                  {
                    "insumos.procedencia": filtroIndividual.procedencia || {$exists: true},
                    "insumos.recibido": filtroIndividual.fecha,
                  },
                ],
              },
            },
            {
              $project: {
                _id: 0,
                "insumos.insumo": 1,
                "insumos.cantidad": 1,
                "insumos.procedencia": 1,
                "insumos.recibido": 1,
              },
            },
            // UNIR Transferencia(in) RECIBIDAS.
            {
              $unionWith: {
                coll: "FarmaciaTransferencias",
                pipeline: [
                  {
                    $match: {
                      $and: [
                        {
                          $expr: {
                            $and: [
                              {
                                $eq: ["$destino", "$$areaTmp"],
                              },
                              {$in: ["$$insumoTmp", "$insumos.insumo"]},
                            ],
                          },
                        },
                        {
                          "insumos.procedencia": filtroIndividual.procedencia || {$exists: true},
                          "insumos.recibido": filtroIndividual.fecha,
                        },
                      ],
                    },
                  },
                  {
                    $project: {
                      _id: 0,
                      "insumos.insumo": 1,
                      "insumos.cantidad": 1,
                      "insumos.procedencia": 1,
                      "insumos.recibido": 1,
                    },
                  },
                ],
              },
            },
            {$unwind: "$insumos"},
            {
              $match: {
                $and: [
                  {
                    $expr: {
                      $eq: ["$insumos.insumo", "$$insumoTmp"],
                    },
                  },
                  {
                    "insumos.procedencia": filtroIndividual.procedencia || {$exists: true},
                    "insumos.recibido": filtroIndividual.fecha,
                  },
                ],
              },
            },
            {
              $group: {
                _id: {insumo: "$insumos.insumo"},
                cantidad: {$sum: "$insumos.cantidad"},
              },
            },
          ],
          as: "total_ingreso",
        })
        .addFields({
          total_ingreso: {$ifNull: [{$first: "$total_ingreso.cantidad"}, 0]},
        })
        // lookup() => Egresos. (Retirados)
        // FarmaciaTransferencias
        .lookup({
          from: "FarmaciaTransferencias",
          let: {
            areaTmp: "$area",
            insumoTmp: "$insumo",
          },
          pipeline: [
            {
              $match: {
                $and: [
                  {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$origen", "$$areaTmp"],
                        },
                        {$in: ["$$insumoTmp", "$insumos.insumo"]},
                      ],
                    },
                  },
                  {
                    "insumos.procedencia": filtroIndividual.procedencia || {$exists: true},
                    "insumos.retirado": filtroIndividual.fecha,
                  },
                ],
              },
            },
            {
              $project: {
                _id: 0,
                "insumos.insumo": 1,
                "insumos.cantidad": 1,
                "insumos.procedencia": 1,
                "insumos.retirado": 1,
              },
            },
            {$unwind: "$insumos"},
            {
              $match: {
                $and: [
                  {
                    $expr: {
                      $eq: ["$insumos.insumo", "$$insumoTmp"],
                    },
                  },
                  {
                    "insumos.procedencia": filtroIndividual.procedencia || {$exists: true},
                    "insumos.retirado": filtroIndividual.fecha,
                  },
                ],
              },
            },
            {
              $group: {
                _id: {insumo: "$insumos.insumo"},
                cantidad: {$sum: "$insumos.cantidad"},
              },
            },
          ],
          as: "transferenciaOut",
        })
        .addFields({
          transferenciaOut: {$first: "$transferenciaOut.cantidad"},
        })
        // InsumoEntregas
        .lookup({
          from: "InsumoEntregas",
          let: {
            areaTmp: "$area",
            insumoTmp: "$insumo",
          },
          pipeline: [
            {
              $match: {
                $and: [
                  {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$origen", "$$areaTmp"],
                        },
                        {
                          $eq: ["$insumo", "$$insumoTmp"],
                        },
                      ],
                    },
                  },
                  {
                    procedencia: filtroIndividual.procedencia || {$exists: true},
                    retirado: filtroIndividual.fecha,
                  },
                ],
              },
            },
            {
              $project: {
                _id: 0,
                insumo: 1,
                cantidad: 1,
              },
            },
            {
              $group: {
                _id: {insumo: "$insumo"},
                cantidad: {$sum: "$cantidad"},
              },
            },
          ],
          as: "entregas",
        })
        .addFields({
          entregas: {$first: "$entregas.cantidad"},
        })
        // Vacuna Aplicaciones
        .lookup({
          from: "VacunaAplicaciones",
          let: {
            areaTmp: "$area",
            insumoTmp: "$insumo",
          },
          pipeline: [
            {
              $match: {
                $and: [
                  {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$origen", "$$areaTmp"],
                        },
                        {
                          $eq: ["$insumo", "$$insumoTmp"],
                        },
                      ],
                    },
                  },
                  {
                    procedencia: filtroIndividual.procedencia || {$exists: true},
                    retirado: filtroIndividual.fecha,
                  },
                ],
              },
            },
            {
              $project: {
                _id: 0,
                insumo: 1,
                cantidad: 1,
              },
            },
            {
              $group: {
                _id: {insumo: "$insumo"},
                cantidad: {$sum: "$cantidad"},
              },
            },
          ],
          as: "vacunaciones",
        })
        .addFields({
          vacunaciones: {$first: "$vacunaciones.cantidad"},
        })
        // FarmaciaDescartes "Motivos"
        .lookup({
          from: "FarmaciaDescartes",
          let: {
            areaTmp: "$area",
            insumoTmp: "$insumo",
          },
          pipeline: [
            {
              $match: {
                $and: [
                  {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$origen", "$$areaTmp"],
                        },
                        {
                          $eq: ["$insumo", "$$insumoTmp"],
                        },
                      ],
                    },
                  },
                  {
                    procedencia: filtroIndividual.procedencia || {$exists: true},
                    retirado: filtroIndividual.fecha,
                  },
                ],
              },
            },
            {
              $project: {
                _id: 0,
                insumo: 1,
                cantidad: 1,
                motivo: 1,
              },
            },
            {
              $group: {
                _id: {insumo: "$insumo"},
                cantidad_consumido: {
                  $sum: {$cond: [{$eq: ["$motivo", "Utilizado"]}, "$cantidad", 0]},
                },
                cantidad_otros: {$sum: {$cond: [{$ne: ["$motivo", "Utilizado"]}, "$cantidad", 0]}},
              },
            },
          ],
          as: "descartes_otros",
        })
        .addFields({
          descartes_consumido: {$first: "$descartes_otros.cantidad_consumido"},
          descartes_otros: {$first: "$descartes_otros.cantidad_otros"},
        })
        .addFields({
          // egreso_consumido (entregas / vacunaciones / descarte(utilizado))
          egreso_consumido: {
            $add: [
              {$ifNull: ["$entregas", 0]},
              {$ifNull: ["$vacunaciones", 0]},
              {$ifNull: ["$descartes_consumido", 0]},
            ],
          },
          // egreso_otros (descarte(otros)/transferencia(out))
          egreso_otros: {
            $add: [{$ifNull: ["$descartes_otros", 0]}, {$ifNull: ["$transferenciaOut", 0]}],
          },
        })
        // populate area - insumo.
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
        .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});

      return res.status(200).json({
        ok: true,
        reporte,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
