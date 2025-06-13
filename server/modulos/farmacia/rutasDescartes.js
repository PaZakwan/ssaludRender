const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, isObjectIdValid, dateUTC} = require(process.env.MAIN_FOLDER + "/tools/object");

const {modificarStockInc} = require("./farmaciaHelper");
const FarmaciaDescarte = require("./models/farmacia_descarte");

const app = express();

let listaDescartes = [
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

  // descarte
  "motivo",
  "justificacion",
];

// ============================
// Mostrar Descartes por filtro (origen[areas], insumo, procedencia) entre fechas.
// ============================
app.get(
  "/farmacia/descarte",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.gestion"},
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
          if (
            // existe en general/reportes, en general/admin o en array/gestion
            !(
              req.usuario.farmacia.general?.reportes === 1 ||
              req.usuario.farmacia.general?.admin === 1 ||
              req.usuario.farmacia.gestion?.includes(area)
            )
          ) {
            return errorMessage(res, {message: "Acceso Denegado."}, 401);
          }
          // regresa mongoose.Types.ObjectId(area);
          filtro.origen.$in[index] = isObjectIdValid(area);
        }
      } else if (
        !(req.usuario.farmacia.general?.reportes === 1 || req.usuario.farmacia.general?.admin === 1)
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
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

      let descartesDB = await FarmaciaDescarte.aggregate()
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
          from: "Insumos",
          localField: "insumo",
          foreignField: "_id",
          as: "insumoDB",
        })
        .unwind({path: "$insumoDB", preserveNullAndEmptyArrays: true})
        .addFields({
          insumoDB: {$ifNull: ["$insumoDB.nombre", {$toString: "$insumo"}]},
          categoriaDB: {$ifNull: ["$insumoDB.categoria", "$vacio"]},
        });

      return res.status(200).json({
        ok: true,
        descartes: descartesDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Guardar Descarte
// ============================
app.put(
  "/farmacia/descarte",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.gestion"},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let body = isVacio({
        dato: _pick(req.body, listaDescartes),
      });
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      if (
        // verificar que sea admin o que "origen" sea de su gestion.
        !(
          req.usuario.farmacia.general?.admin === 1 ||
          req.usuario.farmacia.gestion?.includes(body.origen)
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      if (body.motivo === "Error") {
        if (!body.justificacion) {
          return errorMessage(res, {message: "Falta justificar para proceder."}, 412);
        }
      }
      // else {
      //   if (body.justificacion) {
      //     delete body.justificacion;
      //   }
      // }

      let errors = [];
      body.retirado = new Date();
      body.usuario_creador = req.usuario.id;

      // recorrer array de insumos
      for (const insumo of body.insumos) {
        let descarteDB = null;
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
          // modifico stock sin error (guarda descarte)
          descarteDB = await new FarmaciaDescarte({
            ...body,
            insumo: insumo.insumo.insumo,
            procedencia: insumo.insumo.procedencia,
            lote: insumo.insumo.lote,
            vencimiento: insumo.insumo.vencimiento,
            cantidad: insumo.cantidad,
          }).save();
          if (descarteDB === null) {
            errors.push({
              message: `${insumo.insumo.insumoDB} - Guardar Descarte Error`,
              type: "Guardar Descarte",
            });
          }
        }
      }

      return res.status(errors.length > 0 ? 500 : 201).json({
        ok: errors.length > 0 ? false : true,
        descarte: body.retirado,
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
// Borrar Descarte
// ============================
app.delete(
  "/farmacia/descarte/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.gestion"},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // buscar entrega
      let descarteDB = null;
      descarteDB = await FarmaciaDescarte.findOne({_id: req.params.id}).exec();
      if (!descarteDB) {
        return errorMessage(res, {message: "Descarte no encontrado."}, 404);
      }

      // comparar permisos (origen)
      if (
        !(
          req.usuario.farmacia.general?.admin === 1 ||
          req.usuario.farmacia.gestion?.includes(descarteDB.origen?.toString?.())
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      // comparar permisos (fecha)
      let hoy = new Date().toISOString().slice(0, 10);
      if (
        !(
          req.usuario.farmacia.general?.admin === 1 ||
          new Date(descarteDB.retirado).toISOString().slice(0, 10) === hoy
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
      if (descarteDB.retirado) {
        let stockDB = null;
        stockDB = await modificarStockInc(
          descarteDB.origen,
          {
            insumo: descarteDB.insumo,
            procedencia: descarteDB.procedencia,
            lote: descarteDB.lote,
            vencimiento: descarteDB.vencimiento,
          },
          descarteDB.cantidad
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
      let descarteBorrado = null;
      descarteBorrado = await FarmaciaDescarte.findOneAndDelete({_id: req.params.id}).exec();
      if (!descarteBorrado) {
        return errorMessage(res, {message: "Descarte no encontrado."}, 404);
      }

      // reponder
      return res.json({
        ok: true,
        descarteBorrado,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
