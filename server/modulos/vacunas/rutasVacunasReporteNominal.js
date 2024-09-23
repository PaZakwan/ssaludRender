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
// Mostrar Vacunaciones con datos del paciente - CIPRES => GroupBy: fecha - area - paciente. entre fechas.
//    Vacunatorio -> fec_apl + Datos del Paciente (apynm,doc(tip,num),domicilio,telefono,municipio,fec.nac,edad(v,u),sexo)
//             vacuna/vucunaName-dosis(valor - estrategia), total dosis por paciente.
//      subtotales -> "pacientes" (diferentes), por vacuna/vucunaName-dosis. dosis Totales.
//          OPCIONALES ->
//            "Menores de 15",
//            "Masculinos",
//            "Femeninos",
//            "Embarazadas",
//            "Puerperas",
//            "Grupo de Riesgo",
//            "Estrategia - Campaña",
//            "Estrategia - Contactos",
//            "Municipio - Moreno",
//            "Personal de Salud",
//            "Personal Esencial"
// ============================
app.get(
  "/vacunas/reporte/nominal",
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
        filtro.insumo = {
          $in: JSON.parse(req.query.insumos),
        };
        filtro.insumo.$in.forEach((insumo, index) => {
          // regresa mongoose.Types.ObjectId(area);
          filtro.insumo.$in[index] = isObjectIdValid(insumo);
        });
        // Consulta a BD -> insumosDB "nombre"
        if (modelos?.pre) {
          insumosDB = VacunaInsumo.aggregate()
            .collation({locale: "es", numericOrdering: true})
            .match({_id: filtro.insumo})
            .project({
              _id: 0,
              nombre: 1,
            })
            .sort({nombre: 1})
            .exec();
        }
      }
      if (req.query.procedencias && req.query.procedencias !== "[]") {
        filtro.procedencia = {
          $in: JSON.parse(req.query.procedencias),
        };
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

      // Generar Reporte
      // OPCIONALES
      // generar consulta para mongoDB en mongoose en base las opciones seleccionadas :D
      if (req.query.opciones && req.query.opciones !== "[]") {
        let opcionesTemp = JSON.parse(req.query.opciones);
        opcionesTemp.forEach((opcion) => {
          switch (opcion) {
            case "Menores de 15":
              opcionalesTotales.menores_15 = true;
              break;

            case "Masculinos":
              opcionalesTotales.masculinos = true;
              break;

            case "Femeninos":
              opcionalesTotales.femeninos = true;
              break;

            case "Embarazadas":
              opcionalesProyect.embarazada_semana = 1;
              opcionalesGroup.embarazada_semana = {$first: "$embarazada_semana"};
              break;

            case "Puerperas":
              opcionalesProyect.puerpera = 1;
              opcionalesGroup.puerpera = {$first: "$puerpera"};
              break;

            case "Grupo de Riesgo":
              opcionalesProyect.riesgo = 1;
              opcionalesGroup.riesgo = {$first: "$riesgo"};
              break;

            case "Estrategia - Campaña":
              opcionalesGroup.campaña = {
                $sum: {
                  $cond: [{$eq: ["$estrategia", "Campaña"]}, 1, 0],
                },
              };
              break;

            case "Estrategia - Contactos":
              opcionalesGroup.contactos = {
                $sum: {
                  $cond: [{$eq: ["$estrategia", "Contactos"]}, 1, 0],
                },
              };
              break;

            case "Municipio - Moreno":
              opcionalesPopulatePaciente.pacienteMunicipioDB = "$pacienteDB.dir_municipio";
              break;

            case "Personal de Salud":
              opcionalesProyect.personal_salud = 1;
              opcionalesGroup.personal_salud = {$first: "$personal_salud"};
              break;

            case "Personal Esencial":
              opcionalesProyect.personal_esencial = 1;
              opcionalesGroup.personal_esencial = {$first: "$personal_esencial"};
              break;

            default:
              break;
          }
        });
      }

      // REPORTE
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
        // fec_apl + Datos del Paciente (apynm,doc(tip,num),domicilio,telefono,municipio, fec.nac,edad(v,u),sexo)
        //             vacuna/vucunaName-dosis(valor - estrategia), total dosis por paciente.
        .project({
          _id: 0,
          origen: 1,
          fecha: 1,
          paciente: 1,
          ps_paciente: 1,
          ps_nombreC: 1,
          ps_doc_responsable: 1,
          edad_valor: 1,
          edad_unidad: 1,
          sexo: 1,
          insumo: 1,
          vacunaName: 1,
          procedencia: 1,
          lote: 1,
          vencimiento: 1,
          dosis: 1,
          estrategia: 1,
          ...opcionalesProyect,
        })
        // populate insumo (VACUNA).
        .lookup({
          from: "VacunaInsumos",
          localField: "insumo",
          foreignField: "_id",
          as: "insumoDB",
        })
        .unwind({path: "$insumoDB", preserveNullAndEmptyArrays: true})
        .addFields({
          insumoDB: {$ifNull: ["$insumoDB.nombre", "$vacunaName"]},
        })
        // agrupar para reporte
        .group({
          _id: {
            fecha: "$fecha",
            area: "$origen",
            paciente: {
              $ifNull: [
                "$paciente",
                {
                  $concat: [{$ifNull: ["$ps_nombreC", ""]}, " (", "$ps_paciente", ")"],
                },
              ],
            },
          },
          //            "Menores de 15",
          edad_valor: {$first: "$edad_valor"},
          edad_unidad: {$first: "$edad_unidad"},
          //            "Masculinos",
          //            "Femeninos",
          sexo: {$first: "$sexo"},
          ps_doc_responsable: {$first: "$ps_doc_responsable"},
          vacunacionesDB: {
            $push: {
              vacuna: {$concat: [{$ifNull: ["$insumoDB", "Sin Dato"]}, " - ", "$dosis"]},
              procedencia: "$procedencia",
              lote: "$lote",
              vencimiento: {$dateToString: {format: "%Y-%m-%d", date: "$vencimiento"}},
              estrategia: "$estrategia",
              //            "Estrategia - Campaña",
              //            "Estrategia - Contactos",
            },
          },
          vacunacionesTemp: {
            $push: {
              k: {$concat: [{$ifNull: ["$insumoDB", "Sin Dato"]}, " - ", "$dosis"]},
              v: "$estrategia",
            },
          },
          total_dosis: {$sum: 1},
          //            "Embarazadas",
          //            "Puerperas",
          //            "Grupo de Riesgo",
          //            "Personal de Salud",
          //            "Personal Esencial"
          ...opcionalesGroup,
        })
        // format + vacunacionesObject
        .addFields({
          _id: {
            $concat: [
              {
                $toString: "$_id.area",
              },
              "-",
              {
                $toString: "$_id.paciente",
              },
            ],
          },
          fecha: {$dateToString: {format: "%Y-%m-%d", date: "$_id.fecha"}},
          area: "$_id.area",
          paciente: "$_id.paciente",
          // ...{"vacuna-dosis":"estrategia"}...
          vacunacionesObject: {$arrayToObject: "$vacunacionesTemp"},
        })
        .project({vacunacionesTemp: 0})
        // Buscar AREA y PERSONA
        // populate area - paciente.
        .lookup({
          from: "areas",
          localField: "area",
          foreignField: "_id",
          as: "areaDB",
        })
        .unwind({path: "$areaDB", preserveNullAndEmptyArrays: true})
        .addFields({
          areaDB: "$areaDB.area",
        })
        // paciente;
        .lookup({
          from: "pacientes",
          localField: "paciente",
          foreignField: "_id",
          as: "pacienteDB",
        })
        .unwind({path: "$pacienteDB", preserveNullAndEmptyArrays: true})
        .addFields({
          // Datos del Paciente ( apynm, doc(tip,num), domicilio, telefono, municipio, fec.nac, sexo sino existe)
          pacienteDB: {
            $ifNull: [
              {
                $concat: ["$pacienteDB.apellido", ", ", "$pacienteDB.nombre"],
              },
              "$paciente",
            ],
          },
          pacienteDocDB: {
            $ifNull: [
              {
                $concat: ["$pacienteDB.tipo_doc", " ", "$pacienteDB.documento"],
              },
              {
                $ifNull: [
                  {
                    $concat: ["Resp ", "$pacienteDB.doc_responsable"],
                  },
                  {
                    $ifNull: [
                      {
                        $concat: ["Resp ", "$ps_doc_responsable"],
                      },
                      "$vacio",
                    ],
                  },
                ],
              },
            ],
          },
          pacienteDireccionDB: {
            $ifNull: [
              {
                $concat: ["$pacienteDB.dir_calle", " ", {$toString: "$pacienteDB.dir_numero"}],
              },
              "$vacio",
            ],
          },
          pacienteTelefonoDB: "$pacienteDB.telefono",
          pacienteFec_nacDB: "$pacienteDB.fec_nac",
          sexo: {$ifNull: ["$sexo", "$pacienteDB.sexo"]},
          ...opcionalesPopulatePaciente,
        })
        .sort({areaDB: 1, fecha: 1, pacienteDB: 1})
        .exec();

      // Vacunas Header
      if (modelos?.pre) {
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
          // populate insumo (VACUNA).
          .lookup({
            from: "VacunaInsumos",
            localField: "insumo",
            foreignField: "_id",
            as: "insumoDB",
          })
          .unwind({path: "$insumoDB", preserveNullAndEmptyArrays: true})
          .addFields({
            insumoDB: {$ifNull: ["$insumoDB.nombre", "$vacunaName"]},
          })
          .group({
            _id: null,
            vacunasHeader: {
              $addToSet: {$concat: [{$ifNull: ["$insumoDB", "Sin Dato"]}, " - ", "$dosis"]},
            },
          })
          // sort
          .unwind({path: "$vacunasHeader", preserveNullAndEmptyArrays: true})
          .sort({vacunasHeader: 1})
          .group({
            _id: null,
            vacunasHeader: {$push: "$vacunasHeader"},
          })
          .exec();
      }

      // Esperar que se concluyan las consultas a la BD
      [reporte, vacunasHeader, insumosDB, areasDB] = await Promise.all([
        reporte,
        vacunasHeader,
        insumosDB,
        areasDB,
      ]);

      // Reporte raw -> TOTALES
      if (modelos?.pre) {
        totales.Total_de_Pacientes_Vacunados = reporte.length;
        totales.Total_de_Dosis_Aplicadas = 0;
        totales.vacunaciones = {};

        // OPCIONALES
        if (opcionalesTotales.menores_15) {
          totales.Menores_de_15 = 0;
        }
        if (opcionalesTotales.masculinos) {
          totales.Sexo_Masculino = 0;
        }
        if (opcionalesTotales.femeninos) {
          totales.Sexo_Femenino = 0;
        }
        if (opcionalesProyect.embarazada_semana) {
          totales.Embarazadas = 0;
        }
        if (opcionalesProyect.puerpera) {
          totales.Puerperas = 0;
        }
        if (opcionalesProyect.riesgo) {
          totales.Grupo_de_Riesgo = 0;
        }
        if (opcionalesGroup.campaña) {
          totales.Estrategia_Campaña = 0;
        }
        if (opcionalesGroup.contactos) {
          totales.Estrategia_Contactos = 0;
        }
        if (opcionalesPopulatePaciente.pacienteMunicipioDB) {
          totales.Municipio_de_Moreno = 0;
        }
        if (opcionalesProyect.personal_salud) {
          totales.Personal_de_Salud = 0;
        }
        if (opcionalesProyect.personal_esencial) {
          totales.Personal_Esencial = 0;
        }

        for (let index = 0; index < reporte.length; index++) {
          // paciente = reporte[index];
          for (let key in reporte[index]) {
            switch (key) {
              case "edad_unidad":
                // Menores de 15
                if (
                  opcionalesTotales.menores_15 &&
                  reporte[index].edad_unidad &&
                  !(reporte[index].edad_unidad === "Año" && reporte[index].edad_valor > 15)
                ) {
                  totales.Menores_de_15 += 1;
                }
                break;

              case "sexo":
                if (reporte[index].sexo === "Masculino") {
                  // Masculinos
                  if (opcionalesTotales.masculinos) {
                    totales.Sexo_Masculino += 1;
                  }
                } else if (reporte[index].sexo === "Femenino") {
                  // Femeninos
                  if (opcionalesTotales.femeninos) {
                    totales.Sexo_Femenino += 1;
                  }
                }
                break;

              case "embarazada_semana":
                // Embarazadas
                if (reporte[index].embarazada_semana) {
                  totales.Embarazadas += 1;
                }
                break;
              case "puerpera":
                // Puerperas
                if (reporte[index].puerpera) {
                  totales.Puerperas += 1;
                }
                break;
              case "riesgo":
                // Grupo de Riesgo
                if (reporte[index].riesgo) {
                  totales.Grupo_de_Riesgo += 1;
                }
                break;

              case "campaña":
                // Estrategia - Campaña;
                totales.Estrategia_Campaña += reporte[index].campaña;
                break;
              case "contactos":
                // Estrategia - Contactos;
                totales.Estrategia_Contactos += reporte[index].contactos;
                break;

              case "pacienteMunicipioDB":
                // Municipio - Moreno;
                if (reporte[index].pacienteMunicipioDB === "Moreno") {
                  totales.Municipio_de_Moreno += 1;
                }
                break;

              case "personal_salud":
                // Personal de Salud
                if (reporte[index].personal_salud) {
                  totales.Personal_de_Salud += 1;
                }
                break;
              case "personal_esencial":
                // Personal Esencial
                if (reporte[index].personal_esencial) {
                  totales.Personal_Esencial += 1;
                }
                break;

              case "total_dosis":
                // Dosis Totales
                if (reporte[index].total_dosis) {
                  totales.Total_de_Dosis_Aplicadas += reporte[index].total_dosis;
                }
                break;

              case "vacunacionesObject":
                // Vacunas - Dosis -> recorrer
                for (let key in reporte[index].vacunacionesObject) {
                  totales.vacunaciones[key] = (totales.vacunaciones[key] ?? 0) + 1;
                }
                // ordenar keys del objeto para cuando se itera
                totales.vacunaciones = Object.fromEntries(
                  Object.entries(totales.vacunaciones).sort((a, b) => a[0].localeCompare(b[0]))
                );
                break;

              default:
                break;
            }
          }
        }
      }

      // Reporte raw -> obj (opcional) formato -> {area: [data]}
      if (modelos?.obj) {
        // recorremos y formateamos -> {area: [data]}
        reporte = reporte.reduce(
          // (acumulador, valor de iteracion)
          (objAreasTemp, value) => {
            (objAreasTemp[value.areaDB] ??= []).push(value);
            return objAreasTemp;
          },
          // acumulador inicial
          {}
        );
      }

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
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
