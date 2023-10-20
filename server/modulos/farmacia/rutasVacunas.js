const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, isObjectIdValid, dateUTC} = require(process.env.MAIN_FOLDER + "/tools/object");

const modificarStockInc = require("./farmaciaHelper");
const VacunaAplicacion = require("./models/vacuna_aplicacion");

const app = express();

let listaVacunaciones = [
  "_id",
  "fecha",
  "origen",
  "paciente",
  "vacunador",
  "fecha_futura_cita",

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

  "insumos",
  // "insumo",
  // "cantidad",
  // "procedencia",
  // "lote",
  // "vencimiento",
  // "dosis",
  // "estrategia"
  // "retirado",

  "retirado",
];

// ============================
// Mostrar Vacunaciones por filtro (origen[areas], insumos, procedencias, paciente) entre fechas.
// ============================
app.get(
  "/farmacia/vacunacion",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.vacunas"},
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
        .unwind({path: "$origenDB"})
        .addFields({
          origenDB: "$origenDB.area",
        })
        .lookup({
          from: "pacientes",
          localField: "paciente",
          foreignField: "_id",
          as: "pacienteDB",
        })
        .unwind({path: "$pacienteDB"})
        .addFields({
          pacienteDocDB: {
            $concat: ["$pacienteDB.tipo_doc", " ", "$pacienteDB.documento"],
          },
          pacienteDB: {
            $concat: ["$pacienteDB.apellido", ", ", "$pacienteDB.nombre"],
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
          // SI vacunador no existe, return null en vez de no return el documento
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          vacunadorDB: {
            $concat: ["$vacunadorDB.apellido", ", ", "$vacunadorDB.nombre"],
          },
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
        });

      if (req.query.select === "lite") {
        vacunacionesDB.project({
          _id: 1,
          fecha: 1,
          origen: 1,
          origenDB: 1,
          vacunadorDB: 1,
          pacienteDB: 1,
          pacienteDocDB: 1,
          oSocial: 1,
          insumoDB: 1,
          cantidad: 1,
          procedencia: 1,
          lote: 1,
          vencimiento: 1,
          dosis: 1,
          estrategia: 1,
          fecha_futura_cita: 1,
          retirado: 1,
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
  "/farmacia/vacunacion",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.vacunas"},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // false (no borra, los vacios)
      let body = isVacio(_pick(req.body, listaVacunaciones), false);
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      if (
        // verificar que sea admin o que "origen" sea de sus vacunas.
        !(
          req.usuario.farmacia.general?.admin === 1 ||
          req.usuario.farmacia.vacunas?.includes(body.origen)
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      let errors = [];
      let vacunacionesDB = null;
      body.retirado = new Date();
      body.usuario_creador = req.usuario.id;
      body.vacunador = req.usuario.id;

      // recorrer array de insumos
      for (const insumo of body.insumos) {
        vacunacionesDB = null;
        let stockDB = null;

        stockDB = await modificarStockInc(body.origen, insumo.insumo, insumo.cantidad, "resta");

        if (!stockDB || (stockDB && stockDB.err)) {
          // o si tira error..
          errors.push({
            message: `${insumo.insumo.insumoDB} - Modificar Stock - ${
              stockDB?.err ?? "No contemplado"
            }.`,
            type: "Modificar Stock",
          });
        } else {
          // modifico stock sin error (guarda vacunacion)
          vacunacionesDB = await new VacunaAplicacion({
            ...body,
            insumo: insumo.insumo.insumo,
            procedencia: insumo.insumo.procedencia,
            lote: insumo.insumo.lote,
            vencimiento: insumo.insumo.vencimiento,
            cantidad: insumo.cantidad,
            dosis: insumo.dosis,
            estrategia: insumo.estrategia,
          }).save();
          if (vacunacionesDB === null) {
            errors.push({
              message: `${insumo.insumo.insumoDB} - Guardar Vacunacion Error`,
              type: "Guardar Vacunacion",
            });
          }
        }
      }

      return res.status(errors.length > 0 ? 500 : 201).json({
        ok: errors.length > 0 ? false : true,
        vacunaciones: body.retirado,
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
  "/farmacia/vacunacion/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.vacunas"},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // buscar vacunas
      let vacunacionesDB = null;
      vacunacionesDB = await VacunaAplicacion.findOne({_id: req.params.id}).exec();
      if (!vacunacionesDB) {
        return errorMessage(res, {message: "Vacunacion no encontrada."}, 404);
      }

      // comparar permisos (origen)
      if (
        !(
          req.usuario.farmacia.general?.admin === 1 ||
          req.usuario.farmacia.vacunas?.includes(vacunacionesDB.origen?.toString?.())
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      // comparar permisos (fecha)
      let hoy = new Date().toISOString().slice(0, 10);
      if (
        !(
          req.usuario.farmacia.general?.admin === 1 ||
          new Date(vacunacionesDB.retirado).toISOString().slice(0, 10) === hoy
        )
      ) {
        return errorMessage(
          res,
          {
            message: `Actividad no autorizada. La fecha de Carga debe ser ${hoy}`,
          },
          403
        );
      }

      // recuperar stock
      if (vacunacionesDB.retirado) {
        let stockDB = null;
        stockDB = await modificarStockInc(
          vacunacionesDB.origen,
          {
            insumo: vacunacionesDB.insumo,
            procedencia: vacunacionesDB.procedencia,
            lote: vacunacionesDB.lote,
            vencimiento: vacunacionesDB.vencimiento,
          },
          vacunacionesDB.cantidad
        );
        // si hay un error Salir
        if (!stockDB || (stockDB && stockDB.err)) {
          return errorMessage(
            res,
            {message: "Problemas con la Base de Datos (recuperar el Stock)."},
            507
          );
        }
      }

      // buscar y borrar
      let vacunacionBorrada = null;
      vacunacionBorrada = await VacunaAplicacion.findOneAndDelete({_id: req.params.id}).exec();
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
