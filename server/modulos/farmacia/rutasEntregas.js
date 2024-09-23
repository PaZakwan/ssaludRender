const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, isObjectIdValid, dateUTC} = require(process.env.MAIN_FOLDER + "/tools/object");

const modificarStockInc = require("./farmaciaHelper");
const InsumoEntrega = require("./models/insumo_entrega");

const app = express();

let listaEntregas = [
  "_id",
  "fecha",
  "origen",
  "retirado",

  "insumos",
  // "insumo",
  // "cantidad",
  // "procedencia",
  // "lote",
  // "vencimiento",
  // "retirado",
  // "recibido",
  // "retirado",
  // "nombre", (para errores)

  // entrega
  "profesional",
  "paciente",
  "oSocial",
];

// ============================
// Mostrar Entregas por filtro (origen[areas], insumos, procedencias, paciente) entre fechas.
// ============================
app.get(
  "/farmacia/entrega",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.entregas"},
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

      let entregasDB = await InsumoEntrega.aggregate()
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
          origenDB: "$origenDB.area",
        })
        .lookup({
          from: "pacientes",
          localField: "paciente",
          foreignField: "_id",
          as: "pacienteDB",
        })
        .unwind({path: "$pacienteDB", preserveNullAndEmptyArrays: true})
        .addFields({
          pacienteDB: {
            $ifNull: [
              {$concat: ["$pacienteDB.apellido", ", ", "$pacienteDB.nombre"]},
              "$pacienteDB.ps_id",
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
                  "$vacio",
                ],
              },
            ],
          },
          pacienteTelefonoDB: {
            $ifNull: ["$pacienteDB.telefono", "$pacienteDB.telefono_alt"],
          },
        })
        .lookup({
          from: "Insumos",
          localField: "insumo",
          foreignField: "_id",
          as: "insumoDB",
        })
        .unwind({path: "$insumoDB", preserveNullAndEmptyArrays: true})
        .addFields({
          categoriaDB: "$insumoDB.categoria",
          insumoDB: "$insumoDB.nombre",
        });

      return res.status(200).json({
        ok: true,
        entregas: entregasDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Guardar Entrega
// ============================
app.put(
  "/farmacia/entrega",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.entregas"},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let body = isVacio({
        dato: _pick(req.body, listaEntregas),
      });
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      if (
        // verificar que sea admin o que "origen" sea de sus entregas.
        !(
          req.usuario.farmacia.general?.admin === 1 ||
          req.usuario.farmacia.entregas?.includes(body.origen)
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      let errors = [];
      let entregaDB = null;
      body.retirado = new Date();
      body.usuario_creador = req.usuario.id;

      // recorrer array de insumos
      for (const insumo of body.insumos) {
        entregaDB = null;
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
          // modifico stock sin error (guarda entrega)
          entregaDB = await new InsumoEntrega({
            ...body,
            insumo: insumo.insumo.insumo,
            procedencia: insumo.insumo.procedencia,
            lote: insumo.insumo.lote,
            vencimiento: insumo.insumo.vencimiento,
            cantidad: insumo.cantidad,
          }).save();
          if (entregaDB === null) {
            errors.push({
              message: `${insumo.insumo.insumoDB} - Guardar Entrega Error`,
              type: "Guardar Entrega",
            });
          }
        }
      }

      return res.status(errors.length > 0 ? 500 : 201).json({
        ok: errors.length > 0 ? false : true,
        entrega: body.retirado,
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
// Borrar Entrega
// ============================
app.delete(
  "/farmacia/entrega/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.entregas"},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // buscar entrega
      let entregaDB = null;
      entregaDB = await InsumoEntrega.findOne({_id: req.params.id}).exec();
      if (!entregaDB) {
        return errorMessage(res, {message: "Entrega no encontrada."}, 404);
      }

      // comparar permisos (origen)
      if (
        !(
          req.usuario.farmacia.general?.admin === 1 ||
          req.usuario.farmacia.entregas?.includes(entregaDB.origen?.toString?.())
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      // comparar permisos (fecha)
      let hoy = new Date().toISOString().slice(0, 10);
      if (
        !(
          req.usuario.farmacia.general?.admin === 1 ||
          new Date(entregaDB.retirado).toISOString().slice(0, 10) === hoy
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
      if (entregaDB.retirado) {
        let stockDB = null;
        stockDB = await modificarStockInc(
          entregaDB.origen,
          {
            insumo: entregaDB.insumo,
            procedencia: entregaDB.procedencia,
            lote: entregaDB.lote,
            vencimiento: entregaDB.vencimiento,
          },
          entregaDB.cantidad
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
      let entregaBorrada = null;
      entregaBorrada = await InsumoEntrega.findOneAndDelete({_id: req.params.id}).exec();
      if (!entregaBorrada) {
        return errorMessage(res, {message: "Entrega no encontrada."}, 404);
      }

      // reponder
      return res.json({
        ok: true,
        entregaBorrada,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
