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
      // ###########
      // filtrar por fecha...
      // entregas/descartes segun fecha(no timezone) y existe retirado.
      // ingreso segun insumo.recibido (timezone).
      // transferenciaIn segun insumo.retirado (timezone) y haya sido recibido.
      // transferenciaOut segun insumo.retirado (timezone).
      // ###########
      // VER EL TEMA DEL $elemMatch Y UNIFICAR FILTROS CON ESTADISTICA SALIDAS...
      // ###########
      // para entregas/descartes
      let filtroIndividual = {};
      // otros
      let fechaTimezone = {};
      if (req.query.desde && req.query.hasta) {
        let temp = dateUTC({
          date: req.query.desde,
          hours: "00:00:00.000",
          timezone: req.get("timezoneoffset"),
        });
        if (temp.error) {
          return errorMessage(res, {message: temp.error}, 400);
        }
        fechaTimezone.$gte = temp;
        (filtroIndividual.fecha ??= {}).$gte = dateUTC({
          date: req.query.desde,
          hours: "00:00:00.000",
        });
        temp = dateUTC({
          date: req.query.hasta,
          hours: "23:59:59.999",
          timezone: req.get("timezoneoffset"),
        });
        if (temp.error) {
          return errorMessage(res, {message: temp.error}, 400);
        }
        fechaTimezone.$lte = temp;
        (filtroIndividual.fecha ??= {}).$lte = dateUTC({
          date: req.query.hasta,
          hours: "23:59:59.999",
        });
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

      let filtroStock = {};
      let filtroSolicitud = {};
      let filtroMinimos = {};
      let filtroRecibido = {};
      let filtroRetirado = {};
      // filtroIndividual -> fecha / origen / insumo / procedencia
      // filtroStock -> area / insumo / procedencia
      // filtroSolicitud -> origen / insumos.insumo
      // filtroMinimos -> origen / insumos.insumo
      // filtroRecibido -> insumos.recibido / destino / insumos.insumo / insumos.procedencia
      // filtroRetirado -> insumos.retirado / insumos.insumo / insumos.procedencia
      if (filtroIndividual.fecha) {
        filtroRecibido["insumos.recibido"] = fechaTimezone;
        filtroRetirado["insumos.retirado"] = fechaTimezone;
      }
      if (filtroIndividual.origen) {
        filtroStock.area = filtroIndividual.origen;
        filtroSolicitud.origen = filtroIndividual.origen;
        filtroMinimos["area"] = filtroIndividual.origen;
        filtroRecibido.destino = filtroIndividual.origen;
      }
      if (filtroIndividual.insumo) {
        filtroStock.insumo = filtroIndividual.insumo;
        filtroSolicitud["insumos.insumo"] = filtroIndividual.insumo;
        filtroMinimos.insumo = filtroIndividual.insumo;
        filtroRecibido["insumos.insumo"] = filtroIndividual.insumo;
        filtroRetirado["insumos.insumo"] = filtroIndividual.insumo;
      }
      if (filtroIndividual.procedencia) {
        filtroStock.procedencia = filtroIndividual.procedencia;
        filtroRecibido["insumos.procedencia"] = filtroIndividual.procedencia;
        filtroRetirado["insumos.procedencia"] = filtroIndividual.procedencia;
      }

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
        .match(filtroMinimos)
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

      // ingreso segun insumo.retirado (timezone)
      let ingresos = FarmaciaIngreso.aggregate()
        .match(filtroRecibido)
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

      // transferenciaIn segun insumo.retirado (timezone) y haya sido recibido
      let transferenciaIn = FarmaciaTransferencia.aggregate()
        .match({
          ...filtroRetirado,
          destino: filtroIndividual.origen,
          "insumos.recibido": {$exists: true},
        })
        .project({
          _id: 0,
          destino: 1,
          "insumos.insumo": 1,
          "insumos.procedencia": 1,
          "insumos.cantidad": 1,
          "insumos.recibido": 1,
          "insumos.retirado": 1,
        })
        .unwind({path: "$insumos"})
        .match({
          ...filtroRetirado,
          destino: filtroIndividual.origen,
          "insumos.recibido": {$exists: true},
        })
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

      // transferenciaOut segun insumo.retirado (timezone)
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
        .match({
          ...filtroRetirado,
          origen: filtroIndividual.origen,
        })
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

      // entregas/descartes segun fecha(no timezone) y existe retirado.
      let entregas = InsumoEntrega.aggregate()
        .match({
          ...filtroIndividual,
          retirado: {$exists: true},
        })
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

      // entregas/descartes segun fecha(no timezone) y existe retirado.
      let descartes = FarmaciaDescarte.aggregate()
        .match({
          ...filtroIndividual,
          retirado: {$exists: true},
        })
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
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
