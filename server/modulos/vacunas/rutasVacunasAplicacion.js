const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, isObjectIdValid, dateUTC} = require(process.env.MAIN_FOLDER + "/tools/object");

const {modificarStockInc} = require("./vacunaHelper");
const VacunaAplicacion = require("./models/vacuna_aplicacion");
const VacunaDescarte = require("./models/vacuna_descarte");

const app = express();

let listaVacunaciones = [
  "_id",
  "fecha",
  "origen",
  "paciente",
  // "vacunador",
  "vacunadorName",
  "fecha_futura_cita",

  "fec_nac",
  "sexo",
  "edad_valor",
  "edad_unidad",
  "zona_sanitaria",
  "embarazada_semana",
  "puerpera",
  "prematuro",
  "peso_nacer_menor_2500",
  "peso_nacer_mayor_3800",
  "inmunodeprimida",
  "fuma",
  "antecedentes_patologicos",
  "oSocial",
  "riesgo",
  "personal_salud",
  "personal_esencial",

  "No_Provista",
  "insumos",
  // "insumo",
  // "vacunaName",
  // "procedencia",
  // "lote",
  // "vencimiento",
  // "dosis",
  // "qty_dosis",
  // "completa",
  // "estrategia",
  // "No_Provista",
  // "retirado",

  "retirado",
];

// ============================
// Mostrar Vacunaciones por filtro (origen[areas], insumos, procedencias, paciente) entre fechas.
// ============================
app.get(
  "/vacunas/aplicacion",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "historial_clinico", value: 1},
        {prop: "vacunas.gestion"},
        {prop: "vacunas.lectura"},
        {prop: "vacunas.cipres"},
        {prop: "vacunas.general.gestion", value: 1},
        {prop: "vacunas.general.lectura", value: 1},
        {prop: "vacunas.general.cipres", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
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
      if (req.query.paciente) {
        filtro.paciente = isObjectIdValid(req.query.paciente);
      }

      let vacunacionesDB = VacunaAplicacion.aggregate()
        .match(filtro)
        .sort({fecha: -1, _id: -1})
        .lookup({
          from: "areas",
          localField: "origen",
          foreignField: "_id",
          as: "origenDB",
        })
        .unwind({path: "$origenDB", preserveNullAndEmptyArrays: true})
        .addFields({
          origenDB: {$ifNull: ["$origenDB.area", {$toString: "$origen"}]},
        })
        .lookup({
          from: "pacientes",
          localField: "paciente",
          foreignField: "_id",
          as: "pacienteDB",
        })
        .unwind({
          path: "$pacienteDB",
          // SI paciente no existe, return null en vez de no existir
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          pacienteDB: {
            $ifNull: [
              {
                $concat: [{$ifNull: ["$ps_nombreC", ""]}, " (PS ", "$ps_paciente", ")"],
              },
              {
                $concat: ["$pacienteDB.apellido", ", ", "$pacienteDB.nombre"],
              },
              {$toString: "$paciente"},
            ],
          },
          pacienteDocDB: {
            $ifNull: [
              {
                $concat: ["$ps_tipo_doc", " ", "$ps_doc", " (PS)"],
              },
              {
                $concat: ["$pacienteDB.tipo_doc", " ", "$pacienteDB.documento"],
              },
              {
                $concat: ["Resp ", "$ps_doc_resp", " (PS)"],
              },
              {
                $concat: ["Resp ", "$pacienteDB.doc_responsable"],
              },
              "$vacio",
            ],
          },
          pacienteFecNacDB: {
            $ifNull: ["$ps_fecha_nacimiento", "$fec_nac", "$pacienteDB.fec_nac", "$vacio"],
          },
          pacienteDocRespDB: {
            $ifNull: [
              {
                $concat: ["$ps_doc_resp", " (PS)"],
              },
              "$pacienteDB.doc_responsable",
              "$vacio",
            ],
          },
        })
        .lookup({
          from: "usuarios",
          localField: "vacunador",
          foreignField: "_id",
          as: "vacunadorDB",
        })
        .unwind({
          path: "$vacunadorDB",
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          vacunadorDB: {
            $ifNull: [
              {
                $concat: ["$vacunadorDB.apellido", ", ", "$vacunadorDB.nombre"],
              },
              "$vacunadorName",
              {$toString: "$vacunador"},
            ],
          },
        })
        .lookup({
          from: "VacunaInsumos",
          localField: "insumo",
          foreignField: "_id",
          as: "insumoDB",
        })
        .unwind({path: "$insumoDB", preserveNullAndEmptyArrays: true})
        .addFields({
          insumoDB: {$ifNull: ["$insumoDB.nombre", {$toString: "$insumo"}, "$vacunaName"]},
          insumoNomivacDB: {$ifNull: ["$insumoDB.id_Nomivac", "$vacio"]},
        });

      if (req.query.select === "lite") {
        vacunacionesDB.project({
          _id: 1,
          usuario_creador: 1,
          fecha: 1,
          origen: 1,
          origenDB: 1,
          vacunadorDB: 1,
          pacienteDB: 1,
          pacienteDocDB: 1,
          pacienteFecNacDB: 1,
          pacienteDocRespDB: 1,
          oSocial: 1,
          insumoDB: 1,
          insumoNomivacDB: 1,
          procedencia: 1,
          lote: 1,
          vencimiento: 1,
          dosis: 1,
          qty_dosis: 1,
          // completa: 1,
          estrategia: 1,
          fecha_futura_cita: 1,
          cipres_fecha: 1,
          cipres_id: 1,
          cipres_msg: 1,
          retirado: 1,
          createdAt: 1,
        });
      }

      vacunacionesDB = await vacunacionesDB;

      return res.status(200).json({
        ok: true,
        vacunaciones: vacunacionesDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Guardar Vacunacion
// ============================
app.put(
  "/vacunas/aplicacion",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "vacunas.gestion"},
        {prop: "vacunas.general.gestion", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let body = isVacio({
        dato: _pick(req.body, listaVacunaciones),
        //     vacioCero: true, // false,
        vacioBoolean: true, // false,
        inArr: true, // false,
        inObj: true, // false,
        borrar: true, // false,
      });
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      if (
        // verificar que sea admin o que "origen" sea de sus vacunas.
        !(
          req.usuario.vacunas.general?.gestion === 1 ||
          req.usuario.vacunas.gestion?.includes(body.origen)
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      let errors = [];
      let retiradoDate = new Date();
      body.usuario_creador = req.usuario.id;
      if (!body.vacunadorName) {
        body.vacunador = req.usuario.id;
      }

      // recorrer array de insumos
      for (const insumo of body.insumos) {
        let vacunacionesDB = null;
        let descarteDB = null;
        let stockDB = null;

        if (insumo.qty_dosis === "Doble dosis") {
          insumo.cantidad = 2;
        }
        if (insumo.qty_dosis === "Dosis completa") {
          delete insumo.qty_dosis;
        }

        if (body.No_Provista || insumo.No_Provista) {
          stockDB = true;
        } else {
          stockDB = await modificarStockInc(
            body.origen,
            insumo.insumo,
            insumo.cantidad ?? 1,
            "resta"
          );
        }

        if (!stockDB || stockDB?.err) {
          // modificar stock tira error..
          errors.push({
            message: `${insumo.insumo.insumoDB} - Modificar Stock - ${
              stockDB?.err ?? "No contemplado"
            }.`,
            type: "Modificar Stock",
          });
        } else {
          // modifico stock sin error
          // es vacuna o body.No_Provista === "Paciente | Historial"
          if (body.No_Provista || insumo?.insumo?.insumoCategoriaDB === "Vacuna") {
            // si es Vacuna (guarda vacunacion)
            vacunacionesDB = await new VacunaAplicacion({
              ...body,
              vacunaName: insumo.insumo?.insumoDB ?? insumo.vacunaName,
              procedencia: insumo.insumo?.procedencia ?? body.No_Provista,
              insumo: insumo.insumo?.insumo ?? insumo.insumo?.id,
              lote: insumo.insumo?.lote ?? insumo.lote,
              vencimiento: insumo.insumo?.vencimiento ?? insumo.vencimiento,
              dosis: insumo.dosis,
              qty_dosis: insumo.qty_dosis ?? undefined,
              completa: insumo.completa ? true : undefined,
              estrategia: insumo.estrategia,
              retirado: body.No_Provista || insumo.No_Provista ? undefined : retiradoDate,
            }).save();
            if (vacunacionesDB === null) {
              errors.push({
                message: `${
                  insumo.insumo?.insumoDB ?? insumo.vacunaName
                } - Guardar Vacunacion Error`,
                type: "Guardar Vacunacion",
              });
            }
          } else {
            // si no es Vacuna (guardar descarte)
            descarteDB = await new VacunaDescarte({
              ...body,
              insumo: insumo.insumo?.insumo,
              procedencia: insumo.insumo?.procedencia,
              lote: insumo.insumo?.lote,
              vencimiento: insumo.insumo?.vencimiento,
              retirado: body.No_Provista || insumo.No_Provista ? undefined : retiradoDate,
              motivo: "Utilizado",
              cantidad: insumo.cantidad,
            }).save();
            if (descarteDB === null) {
              errors.push({
                message: `${insumo.insumo?.insumoDB} - Guardar Descarte Error`,
                type: "Guardar Descarte",
              });
            }
          }
        }
      }

      return res.status(errors.length > 0 ? 500 : 201).json({
        ok: errors.length > 0 ? false : true,
        vacunaciones: retiradoDate,
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
// Borrar Vacunacion
// ============================
app.delete(
  "/vacunas/aplicacion/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "vacunas.gestion"},
        {prop: "vacunas.general.gestion", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // buscar vacunas
      let vacunacionesDB = await VacunaAplicacion.findOne({_id: req.params.id}).exec();
      if (!vacunacionesDB) {
        return errorMessage(res, {message: "Vacunacion no encontrada."}, 404);
      }

      // comparar permisos (usuario creador)
      if (
        !(
          req.usuario.vacunas.general?.gestion === 1 ||
          req.usuario._id.toString() === vacunacionesDB.usuario_creador.toString()
        )
      ) {
        return errorMessage(
          res,
          {
            message: `Actividad no autorizada. No es el mismo usuario que realizo la aplicacion.`,
          },
          403
        );
      }

      if (vacunacionesDB.cipres_id) {
        return errorMessage(res, {message: "Vacunacion Registrada en CIPRES."}, 403);
      }

      // recuperar stock
      if (vacunacionesDB.retirado) {
        let stockDB = await modificarStockInc(
          vacunacionesDB.origen,
          {
            insumo: vacunacionesDB.insumo,
            procedencia: vacunacionesDB.procedencia,
            lote: vacunacionesDB.lote,
            vencimiento: vacunacionesDB.vencimiento,
          },
          vacunacionesDB.qty_dosis === "Doble dosis" ? 2 : 1
        );
        // si hay un error Salir
        if (!stockDB || stockDB?.err) {
          return errorMessage(
            res,
            {message: "Problemas con la Base de Datos (recuperar el Stock)."},
            507
          );
        }
      }

      // buscar y borrar
      let vacunacionBorrada = await VacunaAplicacion.findOneAndDelete({_id: req.params.id}).exec();
      if (!vacunacionBorrada) {
        return errorMessage(res, {message: "Vacunacion no encontrada."}, 404);
      }

      // reponder
      return res.json({
        ok: true,
        vacunacionBorrada,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
