const express = require("express");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isObjectIdValid, dateUTC} = require(process.env.MAIN_FOLDER + "/tools/object");

const Area = require(process.env.MAIN_FOLDER + "/modulos/main/models/area");
const VacunaInsumo = require("./models/vacuna_insumo");
const VacunaAplicacion = require("./models/vacuna_aplicacion");

const app = express();

// =================================================================================================
// crear vacunasHeader [Total Pacientes - especiales(opcionalesProyect) - aplicaciones(vacunasHeader) - Dosis Totales]
// =================================================================================================
const createHeader = ({opcionalesProyect, vacunasHeader}) => {
  let headerTemp = ["Total Pacientes"];

  // recorrer opcionalesProyect -> total_area_*especial*
  Object.keys(opcionalesProyect).forEach((header) => {
    headerTemp.push(header);
  });

  // recorrer vacunasHeader -> vacuna - dosis
  vacunasHeader.forEach((header) => {
    headerTemp.push(header.aplicacion);
  });

  // agregar Dosis Totales
  headerTemp.push("Dosis Totales");

  return headerTemp;
};

// ============================
// Mostrar Aplicaciones por Vacunas - Dosis de los Vacunatorios.
//  Filtro: Fecha Aplicacion
//  Out:    Vacunatorios -> pacientes / especiales /Vacunas dosis - Totales.
// ============================
app.get(
  "/vacunas/reporte/resumen",
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
      // Reporte Fecha -> por Vacunatorio totales de vacunas dosis aplicadas.
      //   Fecha del reporte, entre fechas seleccionadas.
      // filtro -> area - desde/hasta - insumos/procedencias - opciones.
      //          OPCIONALES ->
      //            "Menores de 15",
      //            "Municipio - Moreno",
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
      // pre: payload.preCarga ?? false, // {areasDB, insumosDB, vacunasHeader, (raw) totales}
      // raw: payload.raw ?? false, // [data]
      // obj: payload.objAreas ?? false, // (raw) {area: [data]}
      let modelos = JSON.parse(req.query.mod);

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

      let insumosDB = null;
      if (req.query.insumos && req.query.insumos !== "[]") {
        filtro.insumo = {
          $in: JSON.parse(req.query.insumos),
        };
        filtro.insumo.$in.forEach((insumo, index) => {
          // regresa mongoose.Types.ObjectId(area);
          filtro.insumo.$in[index] = isObjectIdValid(insumo);
        });
      }
      // Consulta a BD -> insumosDB "nombre"
      if (filtro.insumo) {
        insumosDB = await VacunaInsumo.aggregate()
          .collation({locale: "es", numericOrdering: true})
          .match({_id: filtro.insumo, categoria: "Vacuna"})
          .project({
            _id: 0,
            nombre: 1,
          })
          .sort({nombre: 1})
          .exec();
        if (insumosDB.length === 0) {
          // ERROR de los Insumos seleccionados no habian Vacunas
          return errorMessage(res, {message: "No se seleccionaron Vacunas en los Insumos."}, 400);
        }
      }

      // OPCIONALES
      let opcionalesDB = {};
      let opcionalesPopulatePaciente = {};
      let opcionalesProyect = {};
      let opcionalesGroup = {};
      // generar consulta para mongoDB en mongoose en base las opciones seleccionadas :D
      if (req.query.opciones && req.query.opciones !== "[]") {
        JSON.parse(req.query.opciones).forEach?.((opcion) => {
          switch (opcion) {
            case "Municipio - Moreno":
              opcionalesPopulatePaciente.pacienteMunicipioDB = "$pacienteDB.dir_municipio";
              opcionalesGroup["Municipio - Moreno"] = {
                $sum: {
                  $cond: [{$eq: ["$pacienteMunicipioDB", "Moreno"]}, 1, 0],
                },
              };
              opcionalesProyect["Municipio - Moreno"] = 1;
              break;

            case "Menores de 15":
              opcionalesDB.edad_unidad = {$first: "$edad_unidad"};
              opcionalesDB.edad_valor = {$first: "$edad_valor"};
              opcionalesGroup["Menores de 15"] = {
                $sum: {
                  $cond: [
                    {
                      $or: [
                        {$eq: ["$edad_unidad", null]},
                        {$and: [{$eq: ["$edad_unidad", "Año"]}, {$gt: ["$edad_valor", 15]}]},
                      ],
                    },
                    // Mayor a 15
                    0,
                    // Menor o igual a 15
                    1,
                  ],
                },
              };
              opcionalesProyect["Menores de 15"] = 1;
              break;

            case "Masculinos":
              opcionalesDB.sexo = {$first: "$sexo"};
              opcionalesPopulatePaciente.sexo = {
                $ifNull: ["$sexo", "$pacienteDB.sexo"],
              };
              opcionalesGroup["Masculino"] = {
                $sum: {
                  $cond: [{$eq: ["$sexo", "Masculino"]}, 1, 0],
                },
              };
              opcionalesProyect["Masculino"] = 1;
              break;

            case "Femeninos":
              opcionalesDB.sexo = {$first: "$sexo"};
              opcionalesPopulatePaciente.sexo = {
                $ifNull: ["$sexo", "$pacienteDB.sexo"],
              };
              opcionalesGroup["Femenino"] = {
                $sum: {
                  $cond: [{$eq: ["$sexo", "Femenino"]}, 1, 0],
                },
              };
              opcionalesProyect["Femenino"] = 1;
              break;

            case "Embarazadas":
              opcionalesDB.embarazada_semana = {$first: "$embarazada_semana"};
              opcionalesGroup["Embarazadas"] = {
                $sum: {
                  $cond: [{$gt: ["$embarazada_semana", 0]}, 1, 0],
                },
              };
              opcionalesProyect["Embarazadas"] = 1;
              break;

            case "Puerperas":
              opcionalesDB.puerpera = {$first: "$puerpera"};
              opcionalesGroup["Puerperas"] = {
                $sum: {
                  $cond: [{$eq: ["$puerpera", true]}, 1, 0],
                },
              };
              opcionalesProyect["Puerperas"] = 1;
              break;

            case "Grupo de Riesgo":
              opcionalesDB.riesgo = {$first: "$riesgo"};
              opcionalesGroup["Grupo de Riesgo"] = {
                $sum: {
                  $cond: [{$eq: ["$riesgo", true]}, 1, 0],
                },
              };
              opcionalesProyect["Grupo de Riesgo"] = 1;
              break;

            case "Personal de Salud":
              opcionalesDB.personal_salud = {$first: "$personal_salud"};
              opcionalesGroup["Personal de Salud"] = {
                $sum: {
                  $cond: [{$eq: ["$personal_salud", true]}, 1, 0],
                },
              };
              opcionalesProyect["Personal de Salud"] = 1;
              break;

            case "Personal Esencial":
              opcionalesDB.personal_esencial = {$first: "$personal_esencial"};
              opcionalesGroup["Personal Esencial"] = {
                $sum: {
                  $cond: [{$eq: ["$personal_esencial", true]}, 1, 0],
                },
              };
              opcionalesProyect["Personal Esencial"] = 1;
              break;

            default:
              break;
          }
        });
      }

      // Vacunas Header (Vacuna - Dosis)
      let vacunasHeader = null;
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
          insumo: 1,
          vacunaName: 1,
          dosis: 1,
        })
        // agrupar vacunas y dosis
        .group({_id: {vacuna: {$ifNull: ["$insumo", "$vacunaName"]}, dosis: "$dosis"}})
        // buscar nombres de vacunas
        .lookup({
          from: "VacunaInsumos",
          localField: "_id.vacuna",
          foreignField: "_id",
          as: "vacunaDB",
        })
        .unwind({path: "$vacunaDB", preserveNullAndEmptyArrays: true})
        // salida
        .project({
          _id: 0,
          // vacunaDB: {$ifNull: ["$vacunaDB.nombre", "$_id.vacuna"]},
          // dosis: "$_id.dosis",
          aplicacion: {
            $concat: [
              {
                $toString: {$ifNull: ["$vacunaDB.nombre", "$_id.vacuna"]},
              },
              " - ",
              {
                $toString: "$_id.dosis",
              },
            ],
          },
        })
        // sort
        .sort({aplicacion: 1})
        .exec();

      let vacunatorioAplicacionDB = [];
      let vacunatorioPacienteDB = [];
      if (modelos?.raw) {
        // columna vacuna - dosis
        // Agrupar por vacunatorio - vacuna - dosis -> total_area_vacuna_dosis -> Dosis Totales
        vacunatorioAplicacionDB = VacunaAplicacion.aggregate()
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
            _id: {area: "$origen", vacuna: {$ifNull: ["$insumo", "$vacunaName"]}, dosis: "$dosis"},
            total_area_vacuna_dosis: {$sum: 1},
          })
          // buscar nombres de vacunas
          .lookup({
            from: "VacunaInsumos",
            localField: "_id.vacuna",
            foreignField: "_id",
            as: "vacunaDB",
          })
          .unwind({path: "$vacunaDB", preserveNullAndEmptyArrays: true})
          // salida
          .project({
            _id: 0,
            area: "$_id.area",
            aplicacion: {
              $concat: [
                {
                  $toString: {$ifNull: ["$vacunaDB.nombre", "$_id.vacuna"]},
                },
                " - ",
                {
                  $toString: "$_id.dosis",
                },
              ],
            },
            total_area_vacuna_dosis: 1,
          })
          // buscar nombres de areas
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

        // columna pacientes + opcionales
        // Agrupar por vacunatorio - paciente -> Total Pacientes + Opcionales
        vacunatorioPacienteDB = VacunaAplicacion.aggregate()
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
          // agrupar area - paciente - fecha -> paciente atendido
          .group({
            _id: {
              area: "$origen",
              fecha: "$fecha",
              paciente: {
                $ifNull: ["$paciente", "$ps_paciente"],
              },
            },
            // datos necesarios para contar opcionalmente que se guardaron en aplicacion)?
            ...opcionalesDB,
          });
        if (Object.keys(opcionalesPopulatePaciente).length > 0) {
          // buscar datos de paciente.. -> datos de paciente para contar opcionalmente
          vacunatorioPacienteDB
            .lookup({
              from: "pacientes",
              localField: "_id.paciente",
              foreignField: "_id",
              as: "pacienteDB",
            })
            .unwind({path: "$pacienteDB", preserveNullAndEmptyArrays: true})
            .addFields({
              ...opcionalesPopulatePaciente,
            });
        }
        vacunatorioPacienteDB
          // agrupar area -> contar pacientes atendidos y opcionales
          .group({
            _id: {
              area: "$_id.area",
            },
            "Total Pacientes": {$sum: 1},
            ...opcionalesGroup,
            // Moreno, menores de 15, sexo M/F, embarazada, puerpera, Pers Salud/Esencial, grupo riesgo.
          })
          // salida
          .project({
            _id: 0,
            area: "$_id.area",
            "Total Pacientes": 1,
            ...opcionalesProyect,
          })
          // buscar nombres de areas
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
      [areasDB, vacunasHeader, vacunatorioAplicacionDB, vacunatorioPacienteDB] = await Promise.all([
        areasDB,
        vacunasHeader,
        vacunatorioAplicacionDB,
        vacunatorioPacienteDB,
      ]);

      // format vacunasHeader
      // vacunasHeader -> [Total Pacientes - especiales(opcionalesProyect) - aplicaciones(vacunasHeader) - Dosis Totales]
      vacunasHeader = createHeader({
        opcionalesProyect,
        vacunasHeader,
      });

      let totales = {};
      let reporte = [];

      if (modelos?.raw) {
        // crear objeto del reporte con el areaDB como key principal para despues pasarlo a array de un solo areaDB
        let reporteTemp = {};
        // reporteTemp -> key -> areaDB : {(vacuna - dosis/ opcionales / pacientes) : #, ...vacunasHeader... }
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

        // recorrer vacunatorioAplicacionDB y agregar la cantidad a reporteTemp de la "aplicacion".
        for (let index = 0; index < vacunatorioAplicacionDB.length; index++) {
          reporteTemp[vacunatorioAplicacionDB[index].areaDB][
            vacunatorioAplicacionDB[index].aplicacion
          ] += vacunatorioAplicacionDB[index]["total_area_vacuna_dosis"];
          // sumar aplicaciones
          reporteTemp[vacunatorioAplicacionDB[index].areaDB][`Dosis Totales`] +=
            vacunatorioAplicacionDB[index]["total_area_vacuna_dosis"];

          // TOTALES -> sumar al recorrer "vacunatorioAplicacionDB".
          totales[vacunatorioAplicacionDB[index].aplicacion] +=
            vacunatorioAplicacionDB[index]["total_area_vacuna_dosis"];
          totales[`Dosis Totales`] += vacunatorioAplicacionDB[index]["total_area_vacuna_dosis"];
        }
        // recorrer vacunatorioPacienteDB y agregar Total Pacientes + Especiales.
        for (let index = 0; index < vacunatorioPacienteDB.length; index++) {
          reporteTemp[vacunatorioPacienteDB[index].areaDB]["Total Pacientes"] +=
            vacunatorioPacienteDB[index]["Total Pacientes"];
          // TOTALES -> sumar al recorrer "vacunatorioPacienteDB".
          totales["Total Pacientes"] += vacunatorioPacienteDB[index]["Total Pacientes"];

          // RECORRER LAS KEYS Especiales / Opcionales
          Object.keys(opcionalesProyect).forEach((especial) => {
            reporteTemp[vacunatorioPacienteDB[index].areaDB][especial] =
              vacunatorioPacienteDB[index][especial];
            // TOTALES -> sumar al recorrer "vacunatorioPacienteDB".
            totales[especial] += vacunatorioPacienteDB[index][especial];
          });
        }

        // transformar reporteTemp {objeto} a [{array de objetos}]
        Object.keys(reporteTemp).forEach((key) => {
          reporte.push({areaDB: key, ...reporteTemp[key]});
        });
      }

      // agrupar para PDF¡?¡?
      // if (modelos?.obj) {}

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
