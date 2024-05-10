const express = require("express");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isObjectIdValid, dateUTC, arrayFromSumarPropsInArrays} = require(process.env.MAIN_FOLDER +
  "/tools/object");

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
      let modelos = JSON.parse(req.query.mod);

      // filtros
      let filtro = {};
      if (req.query.areas && req.query.areas !== "[]") {
        filtro.origen = {
          $in: JSON.parse(req.query.areas),
        };
        for (const [index, area] of filtro.origen.$in.entries()) {
          // regresa mongoose.Types.ObjectId(area);
          filtro.origen.$in[index] = isObjectIdValid(area);
        }
      }

      if (req.query.insumos && req.query.insumos !== "[]") {
        filtro.insumo = JSON.parse(req.query.insumos);
        if (filtro.insumo.length > 1) {
          return errorMessage(res, {message: "Solo se permite una vacuna por reporte."}, 412);
        }
        // regresa mongoose.Types.ObjectId(insumo);
        filtro.insumo = isObjectIdValid(filtro.insumo[0]);
      } else {
        return errorMessage(res, {message: "Falta seleccionar la vacuna para proceder."}, 412);
      }

      if (req.query.procedencias && req.query.procedencias !== "[]") {
        filtro.procedencia = {$in: JSON.parse(req.query.procedencias)};
      }

      if (req.query.desde) {
        let temp = dateUTC({
          date: req.query.desde,
          hours: "00:00:00.000",
        });
        if (temp.error) {
          return errorMessage(res, {message: temp.error}, 400);
        }
        (filtro.fecha ??= {}).$gte = temp;
      }
      if (req.query.hasta) {
        let temp = dateUTC({
          date: req.query.hasta,
          hours: "23:59:59.999",
        });
        if (temp.error) {
          return errorMessage(res, {message: temp.error}, 400);
        }
        (filtro.fecha ??= {}).$lte = temp;
      }

      // Obtener grupo etario de la vacuna
      let etarioDB = await VacunaInsumo.findById(filtro.insumo, "nombre grupo_etario").exec();
      let grupo_etarioDB = {};
      if (etarioDB.grupo_etario) {
        for (let eta of etarioDB.grupo_etario) {
          grupo_etarioDB[eta.unidad] = eta.boundaries;
        }
      }

      // Agrupar por vacunatorio - dosis -> + edad_unidad + edad_valor
      let aplicacionesDB = await VacunaAplicacion.aggregate()
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

      // reporte -> sumar aplicaciones
      for (let index = 0; index < aplicacionesDB.length; index++) {
        aplicacionesDB[index]["otras"] = 0;
        aplicacionesDB[index]["no especifica"] = 0;
        // creando grupos en 0 del grupo_etarioDB de la vacuna
        Object.keys(grupo_etarioDB).forEach((unidad) => {
          aplicacionesDB[index][unidad] = {};
          for (let index2 = 1; index2 < grupo_etarioDB[unidad].length; index2++) {
            aplicacionesDB[index][unidad][
              `${grupo_etarioDB[unidad][index2 - 1]}-${grupo_etarioDB[unidad][index2] - 1}`
            ] = 0;
          }
        });
        // recorrer y contar aplicaciones => edad_unidad -> edad_valor
        for (let index2 = 0; index2 < aplicacionesDB[index].aplicaciones.length; index2++) {
          let aplicacionTemp = aplicacionesDB[index].aplicaciones[index2];
          if (aplicacionTemp.edad_unidad === null) {
            // primero ver si edad_unidad es null -> "no especifica"
            aplicacionesDB[index]["no especifica"]++;
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
                  aplicacionesDB[index][aplicacionTemp.edad_unidad][
                    `${grupo_etarioDB[aplicacionTemp.edad_unidad][index3 - 1]}-${
                      grupo_etarioDB[aplicacionTemp.edad_unidad][index3] - 1
                    }`
                  ]++;
                  break;
                }
              }
            } else {
              // condicionar edad_valor con el grupo_etarioDB -> no esta en el rango etario "otras"
              aplicacionesDB[index]["otras"]++;
            }
          } else {
            // tercero si no esta en edad_unidad -> "otras"
            aplicacionesDB[index]["otras"]++;
          }
        }
        delete aplicacionesDB[index].aplicaciones;
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
      //

      return res.status(200).json({
        ok: true,
        reporte: aplicacionesDB,
        vacunasHeader: "lala",
        totales: "lolo",
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
