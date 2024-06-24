const express = require("express");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isObjectIdValid, dateUTC, arrayFromSumarPropsInArrays} = require(process.env.MAIN_FOLDER +
  "/tools/object");

const Area = require(process.env.MAIN_FOLDER + "/modulos/main/models/area");
const VacunaInsumo = require("./models/vacuna_insumo");
const VacunaAplicacion = require("./models/vacuna_aplicacion");

const app = express();

// ============================
// Mostrar Aplicaciones por Vacuna con su Grupo Etario - Dosis.
//  Filtro: Vacuna - Fecha Aplicacion
//  Out:    Vacunatorios - grupo etario/dosis con subtotales - Totales.
// ============================
app.get(
  "/vacunas/reporte/etario",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "vacunas.reportes", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // Reporte Vacuna -> por Vacunatorio con Grupo Etario y dosis y condiciones de reporte segun vacuna. +totales.
      //   Fecha del reporte, entre fechas seleccionadas.
      // filtro -> area - desde/hasta - insumos/procedencias - opciones.
      let filtro = {};
      let insumosDB = null;
      let areasDB = null;
      if (req.query.areas) {
        filtro.origen = {
          $in: JSON.parse(req.query.areas),
        };
        for (const [index, area] of filtro.origen.$in.entries()) {
          if (isObjectIdValid(area)) {
            // regresa mongoose.Types.ObjectId(area);
            filtro.origen.$in[index] = isObjectIdValid(area);
          } else {
            return errorMessage(
              res,
              {message: "Uno de los Vacunatorios para el Reporte no es valido."},
              400
            );
          }
        }
      }

      if (req.query.desde && req.query.hasta) {
        let temp = dateUTC({
          date: req.query.desde,
          hours: "00:00:00.000",
          timezone: req.get("timezoneoffset"),
        });
        if (temp.error) {
          return errorMessage(res, {message: temp.error}, 400);
        }
        (filtro.fecha ??= {}).$gte = temp;
        temp = dateUTC({
          date: req.query.hasta,
          hours: "23:59:59.999",
          timezone: req.get("timezoneoffset"),
        });
        if (temp.error) {
          return errorMessage(res, {message: temp.error}, 400);
        }
        (filtro.fecha ??= {}).$lte = temp;
      } else {
        return errorMessage(res, {message: "Faltan las Fechas del Filtro para proceder."}, 412);
      }

      // pre: payload.preCarga ?? false, // {areasDB, insumosDB, vacunasHeader, (raw) totales}
      // raw: payload.raw ?? false, // [data]
      // obj: payload.objAreas ?? false, // (raw) {area: [data]}
      let modelos = JSON.parse(req.query.mod);

      if (req.query.insumos && req.query.insumos !== "[]") {
        filtro.insumo = JSON.parse(req.query.insumos);
        if (filtro.insumo.length > 1) {
          return errorMessage(res, {message: "Solo se permite una vacuna por reporte."}, 412);
        }
        // regresa mongoose.Types.ObjectId(insumo);
        filtro.insumo = isObjectIdValid(filtro.insumo[0]);
        // Consulta a BD -> insumosDB "nombre"
        if (modelos?.pre) {
          insumosDB = VacunaInsumo.aggregate()
            .match({_id: filtro.insumo})
            .project({
              _id: 0,
              nombre: 1,
            })
            .exec();
        }
      } else {
        return errorMessage(res, {message: "Falta seleccionar la vacuna para proceder."}, 412);
      }

      let reporte = [];
      let vacunasHeader = null;
      let opcionalesProyect = {};
      let opcionalesGroup = {};
      let opcionalesTotales = {};
      let opcionalesPopulatePaciente = {};
      let totales = {};

      // Consulta a BD -> areasDB "nombres"
      if (modelos?.pre) {
        areasDB = Area.aggregate()
          .collation({locale: "es", numericOrdering: true})
          .match({_id: filtro.origen})
          .project({
            _id: 0,
            area: 1,
          })
          .sort({area: 1})
          .exec();
      }

      // Obtener grupo etario de la vacuna
      let etarioDB = VacunaInsumo.findById(filtro.insumo, "nombre grupo_etario").exec();
      let grupo_etarioDB = {};

      // Agrupar por vacunatorio - dosis -> + edad_unidad + edad_valor
      reporte = VacunaAplicacion.aggregate()
        .match(filtro)
        .group({
          _id: {area: "$origen", dosis: "$dosis"},
          total: {$sum: 1},
          aplicaciones: {
            $push: {
              // contar_separado)?
              edad_unidad: {$ifNull: ["$edad_unidad", null]},
              edad_valor: {$ifNull: ["$edad_valor", null]},
            },
          },
        })
        .project({
          _id: 0,
          area: "$_id.area",
          dosis: "$_id.dosis",
          total: 1,
          aplicaciones: 1,
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
        .sort({areaDB: 1, dosis: 1})
        .exec();

      // Esperar que se concluyan las consultas a la BD
      [etarioDB, reporte, vacunasHeader, insumosDB, areasDB] = await Promise.all([
        etarioDB,
        reporte,
        vacunasHeader,
        insumosDB,
        areasDB,
      ]);

      if (etarioDB.grupo_etario) {
        for (let eta of etarioDB.grupo_etario) {
          grupo_etarioDB[eta.unidad] = eta.boundaries;
        }
      }

      // reporte -> sumar aplicaciones
      for (let index = 0; index < reporte.length; index++) {
        reporte[index]["otras"] = 0;
        reporte[index]["no especifica"] = 0;
        // creando grupos en 0 del grupo_etarioDB de la vacuna
        Object.keys(grupo_etarioDB).forEach((unidad) => {
          reporte[index][unidad] = {};
          for (let index2 = 1; index2 < grupo_etarioDB[unidad].length; index2++) {
            reporte[index][unidad][
              `${grupo_etarioDB[unidad][index2 - 1]}-${grupo_etarioDB[unidad][index2] - 1}`
            ] = 0;
          }
        });
        // recorrer y contar aplicaciones => edad_unidad -> edad_valor
        for (let index2 = 0; index2 < reporte[index].aplicaciones.length; index2++) {
          let aplicacionTemp = reporte[index].aplicaciones[index2];
          if (aplicacionTemp.edad_unidad === null) {
            // primero ver si edad_unidad es null -> "no especifica"
            reporte[index]["no especifica"]++;
          } else if (Object.keys(grupo_etarioDB).includes(aplicacionTemp.edad_unidad)) {
            // segundo ver si edad_unidad esta en grupo_etarioDB key =>
            if (
              grupo_etarioDB[aplicacionTemp.edad_unidad].at(0) <= aplicacionTemp.edad_valor &&
              aplicacionTemp.edad_valor < grupo_etarioDB[aplicacionTemp.edad_unidad].at(-1)
            ) {
              // condicionar edad_valor con el grupo_etarioDB -> esta en el rango etario buscar el rango
              for (
                let index3 = 1;
                index3 < grupo_etarioDB[aplicacionTemp.edad_unidad].length;
                index3++
              ) {
                // rango etario
                if (
                  grupo_etarioDB[aplicacionTemp.edad_unidad][index3 - 1] <=
                    aplicacionTemp.edad_valor &&
                  aplicacionTemp.edad_valor < grupo_etarioDB[aplicacionTemp.edad_unidad][index3]
                ) {
                  reporte[index][aplicacionTemp.edad_unidad][
                    `${grupo_etarioDB[aplicacionTemp.edad_unidad][index3 - 1]}-${
                      grupo_etarioDB[aplicacionTemp.edad_unidad][index3] - 1
                    }`
                  ]++;
                  break;
                }
              }
            } else {
              // condicionar edad_valor con el grupo_etarioDB -> no esta en el rango etario "otras"
              reporte[index]["otras"]++;
            }
          } else {
            // tercero si no esta en edad_unidad -> "otras"
            reporte[index]["otras"]++;
          }
        }
        delete reporte[index].aplicaciones;
      }

      // ver los contadores a parte)?

      // agrupar para PDF¡?¡?
      // Vacunatorio -> Edad_unidad-valor[rango] -> DOSIS + *Subtotal ETARIO
      //             -> M[0-5] -> DOSIS + *Subtotal ETARIO
      //             -> M[6-12] -> DOSIS + *Subtotal ETARIO
      //             -> ...
      //             -> Otras Edades -> DOSIS + *Subtotal
      //             -> Edad No especificada -> DOSIS + *Subtotal
      //             -> TOTAL -> Subtotal DOSIS + *TOTAL

      // ver tipos de DOSIS para los headers del reporte

      // agrupar para Excel¡?¡?
      // Separar Año / Mes -> <index0> a <index1> <unidad>

      // pre: payload.preCarga ?? false, // {areasDB, insumosDB, vacunasHeader, (raw) totales}
      // raw: payload.raw ?? false, // [data]
      // obj: payload.objAreas ?? false, // (raw) {area: [data]}
      return res.status(200).json({
        ok: true,
        areasDB,
        insumosDB,
        vacunasHeader: vacunasHeader?.[0]?.vacunasHeader,
        totales,
        reporte: modelos?.raw ? reporte : null,
        reporteObj: modelos?.obj ? reporte : null,

        // ok: true,
        // reporte: aplicacionesDB,
        // vacunasHeader: "lala",
        // totales: "lolo",
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
