const express = require("express");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isObjectIdValid, dateUTC, arrayFromSumarPropsInArrays} = require(process.env.MAIN_FOLDER +
  "/tools/object");

const FarmaciaStock = require("./models/farmacia_stock");
const FarmaciaSolicitud = require("./models/farmacia_solicitud");
const FarmaciaOpcion = require("./models/farmacia_opciones");
const FarmaciaIngreso = require("./models/farmacia_ingreso");
const FarmaciaTransferencia = require("./models/farmacia_transferencia");
const InsumoEntrega = require("./models/insumo_entrega");
const FarmaciaDescarte = require("./models/farmacia_descarte");
const VacunaAplicacion = require("./models/vacuna_aplicacion");

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

      let filtroRecibido = {...filtroIndividual};
      delete filtroRecibido.origen;
      if (filtroIndividual.fecha) {
        delete filtroRecibido.fecha;
        filtroRecibido["insumos.recibido"] = filtroIndividual.fecha;
      }
      if (filtroIndividual.insumo) {
        delete filtroRecibido.insumo;
        filtroRecibido["insumos.insumo"] = filtroIndividual.insumo;
      }
      if (filtroIndividual.procedencia) {
        delete filtroRecibido.procedencia;
        filtroRecibido["insumos.procedencia"] = filtroIndividual.procedencia;
      }

      let filtroRetirado = {...filtroRecibido};
      if (filtroRecibido["insumos.recibido"]) {
        delete filtroRetirado["insumos.recibido"];
        filtroRetirado["insumos.retirado"] = filtroRecibido["insumos.recibido"];
      }

      let filtroIndividualRetirado = {...filtroIndividual};
      if (filtroIndividual.fecha) {
        delete filtroIndividualRetirado.fecha;
        filtroIndividualRetirado.retirado = filtroIndividual.fecha;
      }

      // SI insumo no esta en stock / solicitud / minimos.. no reporta ningun movimiento.
      //       REVEER.

      let stock = FarmaciaStock.aggregate()
        .match(filtroStock)
        .project({
          _id: 0,
          area: 1,
          insumo: 1,
          stock: "$cantidad",
        })
        .group({
          _id: {area: "$area", insumo: "$insumo"},
          total_stock: {$sum: "$stock"},
        })
        .project({
          _id: {
            $concat: [
              {
                $toString: "$_id.area",
              },
              "-",
              {
                $toString: "$_id.insumo",
              },
            ],
          },
          area: "$_id.area",
          insumo: "$_id.insumo",
          total_stock: 1,
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
        .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1})
        .exec();

      let solicitudes = FarmaciaSolicitud.aggregate()
        .match({
          ...filtroSolicitud,
          estado: "Pendiente",
        })
        .project({_id: 0, origen: 1, insumos: 1})
        .unwind({path: "$insumos"})
        .match(filtroSolicitud)
        .project({
          area: "$origen",
          insumo: "$insumos.insumo",
          solicitado: "$insumos.cantidad",
        })
        .group({
          _id: {area: "$area", insumo: "$insumo"},
          total_solicitado: {$sum: "$solicitado"},
        })
        .project({
          _id: {
            $concat: [
              {
                $toString: "$_id.area",
              },
              "-",
              {
                $toString: "$_id.insumo",
              },
            ],
          },
          area: "$_id.area",
          insumo: "$_id.insumo",
          total_solicitado: 1,
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
        .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1})
        .exec();

      let minimos = FarmaciaOpcion.aggregate()
        .match({
          area: filtroIndividual.origen,
          insumo: filtroIndividual.insumo || {$exists: true},
        })
        .project({
          _id: {
            $concat: [
              {
                $toString: "$area",
              },
              "-",
              {
                $toString: "$insumo",
              },
            ],
          },
          area: 1,
          insumo: 1,
          cant_min: {$cond: [{$eq: ["$cant_min", 0]}, "$noRetornaNada", "$cant_min"]},
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
        .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1})
        .exec();

      let ingresos = FarmaciaIngreso.aggregate()
        .match({
          ...filtroRecibido,
          destino: filtroIndividual.origen,
        })
        .project({
          _id: 0,
          destino: 1,
          "insumos.insumo": 1,
          "insumos.procedencia": 1,
          "insumos.cantidad": 1,
          "insumos.recibido": 1,
        })
        .unwind({path: "$insumos"})
        .match(filtroRecibido)
        .project({
          area: "$destino",
          insumo: "$insumos.insumo",
          ingreso: "$insumos.cantidad",
        })
        .group({
          _id: {area: "$area", insumo: "$insumo"},
          ingreso: {$sum: "$ingreso"},
        })
        .project({
          _id: {
            $concat: [
              {
                $toString: "$_id.area",
              },
              "-",
              {
                $toString: "$_id.insumo",
              },
            ],
          },
          area: "$_id.area",
          insumo: "$_id.insumo",
          ingreso: 1,
          total_ingreso: "$ingreso",
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
        .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1})
        .exec();

      let transferenciaIn = FarmaciaTransferencia.aggregate()
        .match({
          ...filtroRecibido,
          destino: filtroIndividual.origen,
        })
        .project({
          _id: 0,
          destino: 1,
          "insumos.insumo": 1,
          "insumos.procedencia": 1,
          "insumos.cantidad": 1,
          "insumos.recibido": 1,
        })
        .unwind({path: "$insumos"})
        .match(filtroRecibido)
        .project({
          area: "$destino",
          insumo: "$insumos.insumo",
          transferenciaIn: "$insumos.cantidad",
        })
        .group({
          _id: {area: "$area", insumo: "$insumo"},
          transferenciaIn: {$sum: "$transferenciaIn"},
        })
        .project({
          _id: {
            $concat: [
              {
                $toString: "$_id.area",
              },
              "-",
              {
                $toString: "$_id.insumo",
              },
            ],
          },
          area: "$_id.area",
          insumo: "$_id.insumo",
          transferenciaIn: 1,
          total_ingreso: "$transferenciaIn",
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
        .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1})
        .exec();

      let transferenciaOut = FarmaciaTransferencia.aggregate()
        .match({
          ...filtroRetirado,
          origen: filtroIndividual.origen,
        })
        .project({
          _id: 0,
          origen: 1,
          "insumos.insumo": 1,
          "insumos.procedencia": 1,
          "insumos.cantidad": 1,
          "insumos.retirado": 1,
        })
        .unwind({path: "$insumos"})
        .match(filtroRetirado)
        .project({
          area: "$origen",
          insumo: "$insumos.insumo",
          transferenciaOut: "$insumos.cantidad",
        })
        .group({
          _id: {area: "$area", insumo: "$insumo"},
          transferenciaOut: {$sum: "$transferenciaOut"},
        })
        .project({
          _id: {
            $concat: [
              {
                $toString: "$_id.area",
              },
              "-",
              {
                $toString: "$_id.insumo",
              },
            ],
          },
          area: "$_id.area",
          insumo: "$_id.insumo",
          transferenciaOut: 1,
          egreso_otros: "$transferenciaOut",
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
        .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1})
        .exec();

      let entregas = InsumoEntrega.aggregate()
        .match(filtroIndividualRetirado)
        .project({
          _id: 0,
          origen: 1,
          insumo: 1,
          cantidad: 1,
        })
        .group({
          _id: {area: "$origen", insumo: "$insumo"},
          entregas: {$sum: "$cantidad"},
        })
        .project({
          _id: {
            $concat: [
              {
                $toString: "$_id.area",
              },
              "-",
              {
                $toString: "$_id.insumo",
              },
            ],
          },
          area: "$_id.area",
          insumo: "$_id.insumo",
          entregas: 1,
          egreso_consumido: "$entregas",
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
        .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1})
        .exec();

      let descartes = FarmaciaDescarte.aggregate()
        .match(filtroIndividualRetirado)
        .project({
          _id: 0,
          origen: 1,
          insumo: 1,
          cantidad: 1,
          motivo: 1,
        })
        .group({
          _id: {area: "$origen", insumo: "$insumo"},
          descartes_consumido: {
            $sum: {$cond: [{$eq: ["$motivo", "Utilizado"]}, "$cantidad", 0]},
          },
          descartes_otros: {$sum: {$cond: [{$ne: ["$motivo", "Utilizado"]}, "$cantidad", 0]}},
        })
        .project({
          _id: {
            $concat: [
              {
                $toString: "$_id.area",
              },
              "-",
              {
                $toString: "$_id.insumo",
              },
            ],
          },
          area: "$_id.area",
          insumo: "$_id.insumo",
          descartes_consumido: 1,
          descartes_otros: 1,
          egreso_consumido: "$descartes_consumido",
          egreso_otros: "$descartes_otros",
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
        .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1})
        .exec();

      let vacunaciones = VacunaAplicacion.aggregate()
        // buscar por fecha de retirado porque es reporte de stock
        .match(filtroIndividualRetirado)
        .project({
          _id: 0,
          origen: 1,
          insumo: 1,
          vacunaName: 1,
          retirado: 1,
        })
        .group({
          _id: {area: "$origen", insumo: {$ifNull: ["$insumo", "$vacunaName"]}},
          vacunaciones_stk: {
            $sum: {$cond: [{$not: ["$retirado"]}, 0, 1]},
          },
          // vacunaciones_no_provista: {
          //   $sum: {$cond: [{$not: ["$retirado"]}, 1, 0]},
          // },
        })
        .project({
          _id: {
            $concat: [
              {
                $toString: "$_id.area",
              },
              "-",
              {
                $toString: "$_id.insumo",
              },
            ],
          },
          area: "$_id.area",
          insumo: "$_id.insumo",
          vacunaciones_stk: 1,
          // vacunaciones_no_provista: 1,
          egreso_consumido: "$vacunaciones_stk",
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
        .unwind({path: "$insumoDB", preserveNullAndEmptyArrays: true})
        .addFields({
          categoriaDB: "Vacuna",
          insumoDB: {$ifNull: ["$insumoDB.nombre", "$insumo"]},
        })
        .sort({areaDB: 1, insumoDB: 1})
        .exec();

      // Ejecutar todas las solicitudes y sumar objetos
      let reporte = arrayFromSumarPropsInArrays({
        arrays: await Promise.all([
          stock,
          solicitudes,
          minimos,
          ingresos,
          transferenciaIn,
          transferenciaOut,
          entregas,
          descartes,
          vacunaciones,
        ]),
        compare: (a, b) => a._id === b._id,
      });

      // resetear arrays para liberar memoria)?)?
      stock = [];
      solicitudes = [];
      minimos = [];
      ingresos = [];
      transferenciaIn = [];
      transferenciaOut = [];
      entregas = [];
      descartes = [];
      vacunaciones = [];
      // Si hay problemas de memoria.. ir arrayFromSumarPropsInArrays uno por uno.. con un solo array temporal)?)?

      // .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});
      // a.areaDB.localeCompare(b.areaDB) para comparar string
      // b.price - a.price para comparar numeros
      reporte.sort(
        (a, b) =>
          a.areaDB.localeCompare(b.areaDB) ||
          a.categoriaDB.localeCompare(b.categoriaDB) ||
          a.insumoDB.localeCompare(b.insumoDB)
      );

      return res.status(200).json({
        ok: true,
        reporte,
      });

      // let reporte = await FarmaciaStock.aggregate()
      //   .match(filtroStock)
      //   // unionWith() => Stock, Solicitudes, Minimos
      //   // Stock
      //   .project({
      //     _id: 0,
      //     area: 1,
      //     insumo: 1,
      //     stock: "$cantidad",
      //   })
      //   // Solicitudes
      //   .unionWith({
      //     coll: "FarmaciaSolicitudes",
      //     pipeline: [
      //       {
      //         $match: {
      //           ...filtroSolicitud,
      //           estado: "Pendiente",
      //         },
      //       },
      //       {$project: {_id: 0, origen: 1, insumos: 1}},
      //       {$unwind: "$insumos"},
      //       {$match: filtroSolicitud},
      //       {
      //         $project: {
      //           area: "$origen",
      //           insumo: "$insumos.insumo",
      //           solicitado: "$insumos.cantidad",
      //         },
      //       },
      //     ],
      //   })
      //   // Opciones Minimos
      //   .unionWith({
      //     coll: "FarmaciaOpciones",
      //     pipeline: [
      //       {
      //         $match: {
      //           area: filtroIndividual.origen,
      //           insumo: filtroIndividual.insumo || {$exists: true},
      //         },
      //       },
      //       {$project: {_id: 0, area: 1, insumo: 1, cant_min: 1}},
      //     ],
      //   })
      //   // group() => area - insumo.
      //   .group({
      //     _id: {area: "$area", insumo: "$insumo"},
      //     total_stock: {$sum: "$stock"},
      //     total_solicitado: {$sum: "$solicitado"},
      //     cant_min: {$sum: "$cant_min"},
      //   })
      //   .project({
      //     _id: 0,
      //     area: "$_id.area",
      //     insumo: "$_id.insumo",
      //     total_stock: 1,
      //     total_solicitado: 1,
      //     cant_min: {$cond: [{$eq: ["$cant_min", 0]}, "$noRetornaNada", "$cant_min"]},
      //   })
      //   // lookup() => Ingresos (Recibidos). [Ingreso / Transferencia(in)]
      //   .lookup({
      //     from: "FarmaciaIngresos",
      //     let: {
      //       areaTmp: "$area",
      //       insumoTmp: "$insumo",
      //     },
      //     pipeline: [
      //       {
      //         $match: {
      //           $and: [
      //             {
      //               $expr: {
      //                 $and: [
      //                   {
      //                     $eq: ["$destino", "$$areaTmp"],
      //                   },
      //                   {$in: ["$$insumoTmp", "$insumos.insumo"]},
      //                 ],
      //               },
      //             },
      //             {
      //               "insumos.procedencia": filtroIndividual.procedencia || {$exists: true},
      //               "insumos.recibido": filtroIndividual.fecha,
      //             },
      //           ],
      //         },
      //       },
      //       {
      //         $project: {
      //           _id: 0,
      //           "insumos.insumo": 1,
      //           "insumos.cantidad": 1,
      //           "insumos.procedencia": 1,
      //           "insumos.recibido": 1,
      //         },
      //       },
      //       // UNIR Transferencia(in) RECIBIDAS.
      //       {
      //         $unionWith: {
      //           coll: "FarmaciaTransferencias",
      //           pipeline: [
      //             {
      //               $match: {
      //                 $and: [
      //                   {
      //                     $expr: {
      //                       $and: [
      //                         {
      //                           $eq: ["$destino", "$$areaTmp"],
      //                         },
      //                         {$in: ["$$insumoTmp", "$insumos.insumo"]},
      //                       ],
      //                     },
      //                   },
      //                   {
      //                     "insumos.procedencia": filtroIndividual.procedencia || {$exists: true},
      //                     "insumos.recibido": filtroIndividual.fecha,
      //                   },
      //                 ],
      //               },
      //             },
      //             {
      //               $project: {
      //                 _id: 0,
      //                 "insumos.insumo": 1,
      //                 "insumos.cantidad": 1,
      //                 "insumos.procedencia": 1,
      //                 "insumos.recibido": 1,
      //               },
      //             },
      //           ],
      //         },
      //       },
      //       {$unwind: "$insumos"},
      //       {
      //         $match: {
      //           $and: [
      //             {
      //               $expr: {
      //                 $eq: ["$insumos.insumo", "$$insumoTmp"],
      //               },
      //             },
      //             {
      //               "insumos.procedencia": filtroIndividual.procedencia || {$exists: true},
      //               "insumos.recibido": filtroIndividual.fecha,
      //             },
      //           ],
      //         },
      //       },
      //       {
      //         $group: {
      //           _id: {insumo: "$insumos.insumo"},
      //           cantidad: {$sum: "$insumos.cantidad"},
      //         },
      //       },
      //     ],
      //     as: "total_ingreso",
      //   })
      //   .addFields({
      //     total_ingreso: {$ifNull: [{$first: "$total_ingreso.cantidad"}, 0]},
      //   })
      //   // lookup() => Egresos. (Retirados)
      //   // FarmaciaTransferencias
      //   .lookup({
      //     from: "FarmaciaTransferencias",
      //     let: {
      //       areaTmp: "$area",
      //       insumoTmp: "$insumo",
      //     },
      //     pipeline: [
      //       {
      //         $match: {
      //           $and: [
      //             {
      //               $expr: {
      //                 $and: [
      //                   {
      //                     $eq: ["$origen", "$$areaTmp"],
      //                   },
      //                   {$in: ["$$insumoTmp", "$insumos.insumo"]},
      //                 ],
      //               },
      //             },
      //             {
      //               "insumos.procedencia": filtroIndividual.procedencia || {$exists: true},
      //               "insumos.retirado": filtroIndividual.fecha,
      //             },
      //           ],
      //         },
      //       },
      //       {
      //         $project: {
      //           _id: 0,
      //           "insumos.insumo": 1,
      //           "insumos.cantidad": 1,
      //           "insumos.procedencia": 1,
      //           "insumos.retirado": 1,
      //         },
      //       },
      //       {$unwind: "$insumos"},
      //       {
      //         $match: {
      //           $and: [
      //             {
      //               $expr: {
      //                 $eq: ["$insumos.insumo", "$$insumoTmp"],
      //               },
      //             },
      //             {
      //               "insumos.procedencia": filtroIndividual.procedencia || {$exists: true},
      //               "insumos.retirado": filtroIndividual.fecha,
      //             },
      //           ],
      //         },
      //       },
      //       {
      //         $group: {
      //           _id: {insumo: "$insumos.insumo"},
      //           cantidad: {$sum: "$insumos.cantidad"},
      //         },
      //       },
      //     ],
      //     as: "transferenciaOut",
      //   })
      //   .addFields({
      //     transferenciaOut: {$first: "$transferenciaOut.cantidad"},
      //   })
      //   // InsumoEntregas
      //   .lookup({
      //     from: "InsumoEntregas",
      //     let: {
      //       areaTmp: "$area",
      //       insumoTmp: "$insumo",
      //     },
      //     pipeline: [
      //       {
      //         $match: {
      //           $and: [
      //             {
      //               $expr: {
      //                 $and: [
      //                   {
      //                     $eq: ["$origen", "$$areaTmp"],
      //                   },
      //                   {
      //                     $eq: ["$insumo", "$$insumoTmp"],
      //                   },
      //                 ],
      //               },
      //             },
      //             {
      //               procedencia: filtroIndividual.procedencia || {$exists: true},
      //               retirado: filtroIndividual.fecha,
      //             },
      //           ],
      //         },
      //       },
      //       {
      //         $project: {
      //           _id: 0,
      //           insumo: 1,
      //           cantidad: 1,
      //         },
      //       },
      //       {
      //         $group: {
      //           _id: {insumo: "$insumo"},
      //           cantidad: {$sum: "$cantidad"},
      //         },
      //       },
      //     ],
      //     as: "entregas",
      //   })
      //   .addFields({
      //     entregas: {$first: "$entregas.cantidad"},
      //   })
      //   // Vacuna Aplicaciones
      //   .lookup({
      //     from: "VacunaAplicaciones",
      //     let: {
      //       areaTmp: "$area",
      //       insumoTmp: "$insumo",
      //     },
      //     pipeline: [
      //       {
      //         $match: {
      //           $and: [
      //             {
      //               $expr: {
      //                 $and: [
      //                   {
      //                     $eq: ["$origen", "$$areaTmp"],
      //                   },
      //                   {
      //                     $eq: ["$insumo", "$$insumoTmp"],
      //                   },
      //                 ],
      //               },
      //             },
      //             {
      //               procedencia: filtroIndividual.procedencia || {$exists: true},
      //               fecha: filtroIndividual.fecha,
      //             },
      //           ],
      //         },
      //       },
      //       {
      //         $project: {
      //           _id: 0,
      //           insumo: 1,
      //         },
      //       },
      //       {
      //         $group: {
      //           _id: {insumo: "$insumo"},
      //           cantidad: {$sum: 1},
      //         },
      //       },
      //     ],
      //     as: "vacunaciones",
      //   })
      //   .addFields({
      //     vacunaciones: {$first: "$vacunaciones.cantidad"},
      //   })
      //   // FarmaciaDescartes "Motivos"
      //   .lookup({
      //     from: "FarmaciaDescartes",
      //     let: {
      //       areaTmp: "$area",
      //       insumoTmp: "$insumo",
      //     },
      //     pipeline: [
      //       {
      //         $match: {
      //           $and: [
      //             {
      //               $expr: {
      //                 $and: [
      //                   {
      //                     $eq: ["$origen", "$$areaTmp"],
      //                   },
      //                   {
      //                     $eq: ["$insumo", "$$insumoTmp"],
      //                   },
      //                 ],
      //               },
      //             },
      //             {
      //               procedencia: filtroIndividual.procedencia || {$exists: true},
      //               retirado: filtroIndividual.fecha,
      //             },
      //           ],
      //         },
      //       },
      //       {
      //         $project: {
      //           _id: 0,
      //           insumo: 1,
      //           cantidad: 1,
      //           motivo: 1,
      //         },
      //       },
      //       {
      //         $group: {
      //           _id: {insumo: "$insumo"},
      //           cantidad_consumido: {
      //             $sum: {$cond: [{$eq: ["$motivo", "Utilizado"]}, "$cantidad", 0]},
      //           },
      //           cantidad_otros: {$sum: {$cond: [{$ne: ["$motivo", "Utilizado"]}, "$cantidad", 0]}},
      //         },
      //       },
      //     ],
      //     as: "descartes_otros",
      //   })
      //   .addFields({
      //     descartes_consumido: {$first: "$descartes_otros.cantidad_consumido"},
      //     descartes_otros: {$first: "$descartes_otros.cantidad_otros"},
      //   })
      //   .addFields({
      //     // egreso_consumido (entregas / vacunaciones / descarte(utilizado))
      //     egreso_consumido: {
      //       $add: [
      //         {$ifNull: ["$entregas", 0]},
      //         {$ifNull: ["$vacunaciones", 0]},
      //         {$ifNull: ["$descartes_consumido", 0]},
      //       ],
      //     },
      //     // egreso_otros (descarte(otros)/transferencia(out))
      //     egreso_otros: {
      //       $add: [{$ifNull: ["$descartes_otros", 0]}, {$ifNull: ["$transferenciaOut", 0]}],
      //     },
      //   })
      //   // populate area - insumo.
      //   .lookup({
      //     from: "areas",
      //     localField: "area",
      //     foreignField: "_id",
      //     as: "areaDB",
      //   })
      //   .unwind({path: "$areaDB"})
      //   .addFields({
      //     areaDB: "$areaDB.area",
      //   })
      //   .lookup({
      //     from: "Insumos",
      //     localField: "insumo",
      //     foreignField: "_id",
      //     as: "insumoDB",
      //   })
      //   .unwind({path: "$insumoDB"})
      //   .addFields({
      //     categoriaDB: "$insumoDB.categoria",
      //     insumoDB: "$insumoDB.nombre",
      //   })
      //   .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
