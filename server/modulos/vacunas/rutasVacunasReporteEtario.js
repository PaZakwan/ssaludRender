const express = require("express");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isObjectIdValid, dateUTC, getEdadUnidades, valorInMatriz} = require(process.env.MAIN_FOLDER +
  "/tools/object");

const Area = require(process.env.MAIN_FOLDER + "/modulos/main/models/area");
const VacunaInsumo = require("./models/vacuna_insumo");
const VacunaAplicacion = require("./models/vacuna_aplicacion");

const app = express();

// =================================================================================================
// crear vacunasHeader [grupo_etario/edad no especifica/otras edades/totales - dosis/subtotal/total]
// =================================================================================================
const createHeader = ({vacunasHeader, grupo_etarioDB, opcionalesProyect}) => {
  let headerTemp = [];

  // si vacuna tiene grupo etario
  if (Object.keys(grupo_etarioDB).length > 0) {
    // recorrer grupos etarios y dentro recorrer los nombres dosis.
    ["Hora", "Dia", "Semana", "Mes", "Año"].forEach((unidad) => {
      // [grupo_etario - dosis/subtotal]
      for (let rango = 0; rango < grupo_etarioDB[unidad]?.length; rango++) {
        // rango 0 a rango 1 unidad - dosis
        // recorrer nombre dosis
        for (let index = 0; index < vacunasHeader?.length; index++) {
          headerTemp.push(
            `${grupo_etarioDB[unidad][rango][0]} a ${
              grupo_etarioDB[unidad][rango][1] - 1
            } ${unidad} - ${vacunasHeader[index].dosis}`
          );
        }
        // si existe mas de un tipo de dosis agregar subtotales
        if (vacunasHeader?.length > 1) {
          headerTemp.push(
            `${grupo_etarioDB[unidad][rango][0]} a ${
              grupo_etarioDB[unidad][rango][1] - 1
            } ${unidad} - Subtotal`
          );
        }
      }
    });

    // recorrer totales especiales y dentro recorrer los nombres dosis.
    ["otras", "no especifica"].forEach((rango) => {
      // recorrer nombre dosis
      for (let index = 0; index < vacunasHeader?.length; index++) {
        // [rango - dosis]
        headerTemp.push(`${rango} - ${vacunasHeader[index].dosis}`);
      }
      // si existe mas de un tipo de dosis agregar subtotales
      if (vacunasHeader?.length > 1) {
        headerTemp.push(`${rango} - Subtotal`);
      }
    });
  }

  // totales
  // recorrer nombre dosis
  for (let index = 0; index < vacunasHeader?.length; index++) {
    // [rango - dosis]
    headerTemp.push(`total_area_dosis - ${vacunasHeader[index].dosis}`);
  }
  // si existe mas de un tipo de dosis agregar TOTAL de TOTALES
  if (vacunasHeader?.length > 1) {
    headerTemp.push("total_area_dosis - Total");
  }

  // recorrer totales opcionales y dentro recorrer los nombres dosis.
  Object.keys(opcionalesProyect).forEach((rango) => {
    // recorrer nombre dosis
    for (let index = 0; index < vacunasHeader?.length; index++) {
      // [rango - dosis]
      headerTemp.push(`${rango} - ${vacunasHeader[index].dosis}`);
    }
    // si existe mas de un tipo de dosis agregar subtotales
    if (vacunasHeader?.length > 1) {
      headerTemp.push(`${rango} - Subtotal`);
    }
  });

  return headerTemp;
};

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
      //          OPCIONALES ->
      //            "Masculinos",
      //            "Femeninos",
      //            "Embarazadas",
      //            "Puerperas",
      //            "Grupo de Riesgo",
      //            "Estrategia - Campaña",
      //            "Estrategia - Contactos",
      //            "Personal de Salud",
      //            "Personal Esencial"
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
          // timezone: req.get("timezoneoffset"),
        });
        if (temp.error) {
          return errorMessage(res, {message: temp.error}, 400);
        }
        (filtro.fecha ??= {}).$gte = temp;
        temp = dateUTC({
          date: req.query.hasta,
          hours: "23:59:59.999",
          // timezone: req.get("timezoneoffset"),
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
      } else {
        return errorMessage(res, {message: "Falta seleccionar la vacuna para proceder."}, 412);
      }

      let reporte = [];
      let vacunasHeader = null;
      let opcionalesProyect = {};
      let opcionalesGroup = {};
      let totales = {
        // temp: [],
      };

      // Consulta a BD -> areasDB "nombres"
      areasDB = Area.aggregate()
        .collation({locale: "es", numericOrdering: true})
        .match({_id: filtro.origen ?? {$exists: true}, vacunatorio: "true"})
        .project({
          _id: 0,
          area: 1,
        })
        .sort({area: 1})
        .exec();

      // OPCIONALES
      // generar consulta para mongoDB en mongoose en base las opciones seleccionadas :D
      if (req.query.opciones && req.query.opciones !== "[]") {
        let opcionesTemp = JSON.parse(req.query.opciones);
        opcionesTemp.forEach((opcion) => {
          switch (opcion) {
            case "Masculinos":
              opcionalesProyect.total_area_dosis_masculino = 1;
              opcionalesGroup.total_area_dosis_masculino = {
                $sum: {
                  $cond: [{$eq: ["$sexo", "Masculino"]}, 1, 0],
                },
              };
              break;

            case "Femeninos":
              opcionalesProyect.total_area_dosis_femenino = 1;
              opcionalesGroup.total_area_dosis_femenino = {
                $sum: {
                  $cond: [{$eq: ["$sexo", "Femenino"]}, 1, 0],
                },
              };
              break;

            case "Embarazadas":
              opcionalesProyect.total_area_dosis_embarazada = 1;
              opcionalesGroup.total_area_dosis_embarazada = {
                $sum: {
                  $cond: [{$gte: ["$embarazada_semana", 0]}, 1, 0],
                },
              };
              break;

            case "Puerperas":
              opcionalesProyect.total_area_dosis_puerpera = 1;
              opcionalesGroup.total_area_dosis_puerpera = {
                $sum: {
                  $cond: [{$eq: ["$puerpera", true]}, 1, 0],
                },
              };
              break;

            case "Grupo de Riesgo":
              opcionalesProyect.total_area_dosis_riesgo = 1;
              opcionalesGroup.total_area_dosis_riesgo = {
                $sum: {
                  $cond: [{$eq: ["$riesgo", true]}, 1, 0],
                },
              };
              break;

            case "Estrategia - Campaña":
              opcionalesProyect.total_area_dosis_campaña = 1;
              opcionalesGroup.total_area_dosis_campaña = {
                $sum: {
                  $cond: [{$eq: ["$estrategia", "Campaña"]}, 1, 0],
                },
              };
              break;

            case "Estrategia - Contactos":
              opcionalesProyect.total_area_dosis_contactos = 1;
              opcionalesGroup.total_area_dosis_contactos = {
                $sum: {
                  $cond: [{$eq: ["$estrategia", "Contactos"]}, 1, 0],
                },
              };
              break;

            case "Personal de Salud":
              opcionalesProyect.total_area_dosis_personal_salud = 1;
              opcionalesGroup.total_area_dosis_personal_salud = {
                $sum: {
                  $cond: [{$eq: ["$personal_salud", true]}, 1, 0],
                },
              };
              break;

            case "Personal Esencial":
              opcionalesProyect.total_area_dosis_personal_esencial = 1;
              opcionalesGroup.total_area_dosis_personal_esencial = {
                $sum: {
                  $cond: [{$eq: ["$personal_esencial", true]}, 1, 0],
                },
              };
              break;

            default:
              break;
          }
        });
      }

      // Obtener grupo etario de la vacuna
      let etarioDB = VacunaInsumo.findById(
        filtro.insumo,
        "nombre categoria grupo_etario dosis_posibles"
      ).exec();
      let grupo_etarioDB = {};

      // Vacunas Header
      vacunasHeader = VacunaAplicacion.aggregate()
        .match({
          $and: [
            filtro,
            // procedencia -> "Carga inicial" , "Region" , "Paciente" , "Historial" con ps_id ;
            {
              $or: [
                {
                  procedencia: {
                    $in: ["Carga inicial", "Region", "Paciente"],
                  },
                },
                {
                  procedencia: "Historial",
                  ps_id: {$exists: true},
                },
              ],
            },
          ],
        })
        .project({
          _id: 0,
          dosis: 1,
        })
        .group({
          _id: "$dosis",
        })
        .project({
          _id: 0,
          dosis: "$_id",
        })
        // sort
        .sort({dosis: 1})
        .exec();

      // Agrupar por vacunatorio - dosis -> + edad_unidad + edad_valor
      if (modelos?.raw) {
        reporte = VacunaAplicacion.aggregate()
          .match({
            $and: [
              filtro,
              // procedencia -> "Carga inicial" , "Region" , "Paciente" , "Historial" con ps_id ;
              {
                $or: [
                  {
                    procedencia: {
                      $in: ["Carga inicial", "Region", "Paciente"],
                    },
                  },
                  {
                    procedencia: "Historial",
                    ps_id: {$exists: true},
                  },
                ],
              },
            ],
          })
          .group({
            _id: {area: "$origen", dosis: "$dosis"},
            total_area_dosis: {$sum: 1},
            aplicaciones: {
              $push: {
                // contar_separado)?
                edad_unidad: {$ifNull: ["$edad_unidad", null]},
                edad_valor: {$ifNull: ["$edad_valor", null]},
              },
            },
            ...opcionalesGroup,
          })
          .project({
            _id: 0,
            area: "$_id.area",
            dosis: "$_id.dosis",
            total_area_dosis: 1,
            aplicaciones: 1,
            ...opcionalesProyect,
          })
          .lookup({
            from: "areas",
            localField: "area",
            foreignField: "_id",
            as: "areaDB",
          })
          .unwind({path: "$areaDB", preserveNullAndEmptyArrays: true})
          .addFields({
            areaDB: {$ifNull: ["$areaDB.area", {$toString: "$area"}]},
          })
          .exec();
      }

      // Esperar que se concluyan las consultas a la BD
      [areasDB, etarioDB, vacunasHeader, reporte] = await Promise.all([
        areasDB,
        etarioDB,
        vacunasHeader,
        reporte,
      ]);

      if (etarioDB.categoria !== "Vacuna") {
        // ERROR el Insumo seleccionado no es una Vacuna
        return errorMessage(res, {message: "El Insumo seleccionado no es una Vacuna."}, 400);
      }

      // insumosDB -> [{"nombre"}]
      if (modelos?.pre) {
        insumosDB = [{nombre: etarioDB.nombre}];
      }

      if (etarioDB.grupo_etario) {
        // formatear a objeto { unidad : [[min,max],..] }
        etarioDB.grupo_etario.forEach((grupo) => {
          (grupo_etarioDB[grupo.unidad] = grupo_etarioDB[grupo.unidad] || []).push(
            grupo.value ?? [0, 1]
          );
        });
        // ordenar matriz
        Object.keys(grupo_etarioDB).forEach((unidad) => {
          grupo_etarioDB[unidad]?.sort?.((a, b) => {
            if (a[0] === b[0]) {
              // ordenar por segundo elemento
              if (a[1] === b[1]) {
                return 0;
              } else {
                return a[1] < b[1] ? -1 : 1;
              }
            } else {
              return a[0] < b[0] ? -1 : 1;
            }
          });
        });
      }

      // format vacunasHeader
      // vacunasHeader -> [grupo_etario/edad no especifica/otras edades/totales - dosis/subtotal]
      vacunasHeader = createHeader({vacunasHeader, grupo_etarioDB, opcionalesProyect});

      if (modelos?.raw) {
        let reporteTemp = {};
        // reporteTemp -> key -> areaDB : {(rango - dosis/Subtotal/Total) : #, ...vacunasHeader... }
        // crear objeto del reporte con el areaDB como key principal para despues pasarlo a array de un solo areaDB
        // ese areaDB tendra como objeto las keys de vacunasHeader y los valores correspondientes que se cuentan.
        areasDB.forEach((area) => {
          // creando areas para reporte
          reporteTemp[area.area] = {};
          vacunasHeader.forEach((header) => {
            // creando areas en 0 de vacunasHeader
            reporteTemp[area.area][header] = 0;
            // creando totales en 0 de vacunasHeader
            totales[header] = 0;
          });
        });

        // reporte -> sumar aplicaciones
        // TOTALES -> sumar al recorrer "reporte" y agregarlo al final, despues de loopear.
        for (let index = 0; index < reporte.length; index++) {
          // recorrer y contar aplicaciones => edad_unidad -> edad_valor
          if (Object.keys(grupo_etarioDB).length > 0) {
            for (let index2 = 0; index2 < reporte[index].aplicaciones.length; index2++) {
              let aplicacionTemp = reporte[index].aplicaciones[index2];
              if (aplicacionTemp.edad_unidad === null) {
                // primero ver si edad_unidad es null -> "no especifica"
                reporteTemp[reporte[index].areaDB][`no especifica - ${reporte[index].dosis}`]++;
                reporteTemp[reporte[index].areaDB][`no especifica - Subtotal`]++;
                totales[`no especifica - ${reporte[index].dosis}`]++;
                totales[`no especifica - Subtotal`]++;
              } else if (Object.keys(grupo_etarioDB).includes(aplicacionTemp.edad_unidad)) {
                // segundo ver si edad_unidad esta en grupo_etarioDB key => y en que rango esta
                let rangoTemp = valorInMatriz({
                  valor: aplicacionTemp.edad_valor,
                  matriz: grupo_etarioDB[aplicacionTemp.edad_unidad],
                });
                if (rangoTemp) {
                  // esta en el rango
                  reporteTemp[reporte[index].areaDB][
                    `${rangoTemp[0]} a ${rangoTemp[1]} ${aplicacionTemp.edad_unidad} - ${reporte[index].dosis}`
                  ]++;
                  reporteTemp[reporte[index].areaDB][
                    `${rangoTemp[0]} a ${rangoTemp[1]} ${aplicacionTemp.edad_unidad} - Subtotal`
                  ]++;
                  totales[
                    `${rangoTemp[0]} a ${rangoTemp[1]} ${aplicacionTemp.edad_unidad} - ${reporte[index].dosis}`
                  ]++;
                  totales[
                    `${rangoTemp[0]} a ${rangoTemp[1]} ${aplicacionTemp.edad_unidad} - Subtotal`
                  ]++;
                } else {
                  // no esta en el rango
                  // obtener otras unidades
                  let aplicacionEdadUnidad = getEdadUnidades({
                    edad_valor: aplicacionTemp.edad_valor,
                    edad_unidad: aplicacionTemp.edad_unidad,
                  });
                  if (aplicacionEdadUnidad.error) {
                    // si error en edad_unidad -> "otras"
                    reporteTemp[reporte[index].areaDB][`otras - ${reporte[index].dosis}`]++;
                    reporteTemp[reporte[index].areaDB][`otras - Subtotal`]++;
                    totales[`otras - ${reporte[index].dosis}`]++;
                    totales[`otras - Subtotal`]++;
                    // totales["temp"].push({
                    //   razon: "error en edad_unidad" + aplicacionEdadUnidad.error,
                    //   edad_valor: aplicacionTemp.edad_valor,
                    //   edad_unidad: aplicacionTemp.edad_unidad,
                    // });
                  } else {
                    // recorrer las "otras unidades" del reporte de menor a mayor
                    Object.keys(grupo_etarioDB).some((unidad) => {
                      rangoTemp = valorInMatriz({
                        valor: aplicacionEdadUnidad[unidad],
                        matriz: grupo_etarioDB[unidad],
                      });
                      if (rangoTemp) {
                        // esta en el rango
                        reporteTemp[reporte[index].areaDB][
                          `${rangoTemp[0]} a ${rangoTemp[1]} ${unidad} - ${reporte[index].dosis}`
                        ]++;
                        reporteTemp[reporte[index].areaDB][
                          `${rangoTemp[0]} a ${rangoTemp[1]} ${unidad} - Subtotal`
                        ]++;
                        totales[
                          `${rangoTemp[0]} a ${rangoTemp[1]} ${unidad} - ${reporte[index].dosis}`
                        ]++;
                        totales[`${rangoTemp[0]} a ${rangoTemp[1]} ${unidad} - Subtotal`]++;
                      }
                      return rangoTemp;
                    });

                    if (!rangoTemp) {
                      // no esta en ningun rango del reporte
                      reporteTemp[reporte[index].areaDB][`otras - ${reporte[index].dosis}`]++;
                      reporteTemp[reporte[index].areaDB][`otras - Subtotal`]++;
                      totales[`otras - ${reporte[index].dosis}`]++;
                      totales[`otras - Subtotal`]++;
                      // totales["temp"].push({
                      //   razon: "esta en unidad de grupo etario del reporte, pero no en rango.",
                      //   edad_valor: aplicacionTemp.edad_valor,
                      //   edad_unidad: aplicacionTemp.edad_unidad,
                      // });
                    }
                  }
                }
              } else {
                // no esta edad_unidad del reporte
                // obtener otras unidades
                let aplicacionEdadUnidad = getEdadUnidades({
                  edad_valor: aplicacionTemp.edad_valor,
                  edad_unidad: aplicacionTemp.edad_unidad,
                });
                if (aplicacionEdadUnidad.error) {
                  // si error en edad_unidad -> "otras"
                  reporteTemp[reporte[index].areaDB][`otras - ${reporte[index].dosis}`]++;
                  reporteTemp[reporte[index].areaDB][`otras - Subtotal`]++;
                  totales[`otras - ${reporte[index].dosis}`]++;
                  totales[`otras - Subtotal`]++;
                  // totales["temp"].push({
                  //   razon: "error en edad_unidad" + aplicacionEdadUnidad.error,
                  //   edad_valor: aplicacionTemp.edad_valor,
                  //   edad_unidad: aplicacionTemp.edad_unidad,
                  // });
                } else {
                  // recorrer las "otras unidades" del reporte de menor a mayor
                  let rangoTemp = false;
                  Object.keys(grupo_etarioDB).some((unidad) => {
                    rangoTemp = valorInMatriz({
                      valor: aplicacionEdadUnidad[unidad],
                      matriz: grupo_etarioDB[unidad],
                    });
                    if (rangoTemp) {
                      // esta en el rango
                      reporteTemp[reporte[index].areaDB][
                        `${rangoTemp[0]} a ${rangoTemp[1]} ${unidad} - ${reporte[index].dosis}`
                      ]++;
                      reporteTemp[reporte[index].areaDB][
                        `${rangoTemp[0]} a ${rangoTemp[1]} ${unidad} - Subtotal`
                      ]++;
                      totales[
                        `${rangoTemp[0]} a ${rangoTemp[1]} ${unidad} - ${reporte[index].dosis}`
                      ]++;
                      totales[`${rangoTemp[0]} a ${rangoTemp[1]} ${unidad} - Subtotal`]++;
                    }
                    return rangoTemp;
                  });

                  if (!rangoTemp) {
                    // no esta en ningun rango del reporte
                    reporteTemp[reporte[index].areaDB][`otras - ${reporte[index].dosis}`]++;
                    reporteTemp[reporte[index].areaDB][`otras - Subtotal`]++;
                    totales[`otras - ${reporte[index].dosis}`]++;
                    totales[`otras - Subtotal`]++;
                    // totales["temp"].push({
                    //   razon: "no esta en rango etario",
                    //   edad_valor: aplicacionTemp.edad_valor,
                    //   edad_unidad: aplicacionTemp.edad_unidad,
                    // });
                  }
                }
              }
            }
          }

          // TOTALES
          reporteTemp[reporte[index].areaDB][`total_area_dosis - ${reporte[index].dosis}`] =
            reporte[index]["total_area_dosis"];
          reporteTemp[reporte[index].areaDB][`total_area_dosis - Total`] +=
            reporte[index]["total_area_dosis"];
          totales[`total_area_dosis - ${reporte[index].dosis}`] +=
            reporte[index]["total_area_dosis"];
          totales[`total_area_dosis - Total`] += reporte[index]["total_area_dosis"];

          // Sumando total de Opcionales
          Object.keys(opcionalesProyect).forEach((rango) => {
            reporteTemp[reporte[index].areaDB][`${rango} - ${reporte[index].dosis}`] =
              reporte[index][rango];
            reporteTemp[reporte[index].areaDB][`${rango} - Subtotal`] += reporte[index][rango];
            totales[`${rango} - ${reporte[index].dosis}`] += reporte[index][rango];
            totales[`${rango} - Subtotal`] += reporte[index][rango];
          });

          delete reporte[index].aplicaciones;
        }

        // transformar reporteTemp {objeto} a [{array de objetos}]
        reporte = [];
        Object.keys(reporteTemp).forEach((key) => {
          reporte.push({areaDB: key, ...reporteTemp[key]});
        });
      }

      // agrupar para PDF¡?¡?
      // Vacunatorio -> Edad_unidad-valor[rango] -> DOSIS + *Subtotal ETARIO
      //             -> M[0-5] -> DOSIS + *Subtotal ETARIO
      //             -> M[6-12] -> DOSIS + *Subtotal ETARIO
      //             -> ...
      //             -> Otras Edades -> DOSIS + *Subtotal
      //             -> Edad No especificada -> DOSIS + *Subtotal
      //             -> TOTAL -> Subtotal DOSIS + *TOTAL

      // pre: payload.preCarga ?? false, // {areasDB, insumosDB, vacunasHeader, (raw) totales}
      // raw: payload.raw ?? false, // [data]
      // obj: payload.objAreas ?? false, // (raw) {area: [data]}
      return res.status(200).json({
        ok: true,
        areasDB: modelos?.pre && filtro.origen ? areasDB : null,
        insumosDB: modelos?.pre ? insumosDB : null,
        vacunasHeader: modelos?.pre ? vacunasHeader : null,
        totales: modelos?.raw ? totales : null,
        reporte: modelos?.raw ? reporte : null,
        reporteObj: modelos?.obj ? reporte : null,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
