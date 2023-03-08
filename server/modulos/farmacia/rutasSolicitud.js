const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require("../../middlewares/autenticacion");
const {errorMessage} = require("../../tools/errorHandler");
const FarmaciaSolicitud = require("./models/farmacia_solicitud");
const {objectSetUnset, isObjectIdValid} = require("../../tools/object");

const app = express();

let listaSolicitud = [
  "_id",
  "fecha",
  "origen",
  "destino",

  "estado",
  "motivo",

  "fec_resolucion",
  "condicion_aceptada",
  "motivo_rechazo",

  "insumos",
  // "insumo",
  // "cantidad",
];

// ============================
// Mostrar Solicitudes Estadistica, Pedidos segun area filtros, entre fechas.
// Diferenciados por Estado(Pendiente / Aceptadas?/ Rechazadas?) y Motivo (Rutina / Urgencia / Emergencia)
// ============================
app.get(
  "/farmacia/solicitudes/estadistica",
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
          // verificar las areas.
          if (
            // existe en general/reportes o en general/admin o en gestion
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
      if (req.query.desde && req.query.hasta) {
        filtro.fecha = {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)};
        if (isNaN(filtro.fecha.$gte) || isNaN(filtro.fecha.$lte)) {
          return errorMessage(res, {message: "La fecha de Busqueda no es valida."}, 400);
        }
      }

      // Buscar Solicitudes
      let solicitudesDB = [];
      solicitudesDB = await FarmaciaSolicitud.aggregate()
        .match({
          fecha: filtro.fecha,
          origen: filtro.origen,
          "insumos.insumo": filtro.insumo || {$exists: true},
          estado: "Pendiente",
        })
        // descomprimir
        .unwind({path: "$insumos"})
        // encontrar insumo
        .match({
          "insumos.insumo": filtro.insumo || {$exists: true},
        })
        // agrupar - area/insumo, sumar por insumo.
        .group({
          _id: {area: "$origen", insumo: "$insumos.insumo"},
          total: {$sum: "$insumos.cantidad"},
          subtotal_rutina: {
            $sum: {
              $cond: [
                {
                  $eq: ["$motivo", "Rutina"],
                },
                "$insumos.cantidad",
                0,
              ],
            },
          },
          subtotal_urgencia: {
            $sum: {
              $cond: [
                {
                  $eq: ["$motivo", "Urgencia"],
                },
                "$insumos.cantidad",
                0,
              ],
            },
          },
          subtotal_emergencia: {
            $sum: {
              $cond: [
                {
                  $eq: ["$motivo", "Emergencia"],
                },
                "$insumos.cantidad",
                0,
              ],
            },
          },
        })
        .project({
          _id: 0,
          area: "$_id.area",
          insumo: "$_id.insumo",
          total: 1,
          subtotal_rutina: 1,
          subtotal_urgencia: 1,
          subtotal_emergencia: 1,
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
        .addFields({
          _id: {$concat: ["$areaDB", "-", "$insumoDB"]},
          total_pedidos: "$total",
        })
        .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});

      return res.status(200).json({
        ok: true,
        solicitudes: solicitudesDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar Solicitudes por area(origen, o destino), insumo, entre fecha
// ============================
app.get(
  "/farmacia/solicitudes",
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
        filtro.areasID = {
          $in: JSON.parse(req.query.areas),
        };
        for (const [index, area] of filtro.areasID.$in.entries()) {
          // verificar las areas.
          if (
            // existe en general/reportes o en general/admin o en gestion
            !(
              req.usuario.farmacia.general?.reportes === 1 ||
              req.usuario.farmacia.general?.admin === 1 ||
              req.usuario.farmacia.gestion?.includes(area)
            )
          ) {
            return errorMessage(res, {message: "Acceso Denegado."}, 401);
          }
          // regresa mongoose.Types.ObjectId(area);
          filtro.areasID.$in[index] = isObjectIdValid(area);
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
      if (req.query.desde && req.query.hasta) {
        filtro.fecha = {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)};
        if (isNaN(filtro.fecha.$gte) || isNaN(filtro.fecha.$lte)) {
          return errorMessage(res, {message: "La fecha de Busqueda no es valida."}, 400);
        }
      }

      let solicitudesDB = await FarmaciaSolicitud.aggregate()
        .match({
          $and: [
            {
              $or: [
                {destino: {$exists: false}},
                {
                  origen: filtro.areasID,
                },
                {
                  destino: filtro.areasID,
                },
              ],
            },
            {fecha: filtro.fecha},
            {"insumos.insumo": filtro.insumo || {$exists: true}},
          ],
        })
        .sort({fecha: -1, _id: -1})
        .addFields({
          fecha: {$dateToString: {format: "%Y-%m-%d", date: "$fecha"}},
          fec_resolucion: {$dateToString: {format: "%Y-%m-%d", date: "$fec_resolucion"}},
        })
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
          from: "areas",
          localField: "destino",
          foreignField: "_id",
          as: "destinoDB",
        })
        // para mantener los que no tienen destino
        .unwind({path: "$destinoDB", preserveNullAndEmptyArrays: true})
        .addFields({
          destinoDB: "$destinoDB.area",
        });

      return res.status(200).json({
        ok: true,
        solicitudes: solicitudesDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Guardar Solicitud
// ============================
app.put(
  "/farmacia/solicitud",
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
      let body = _pick(req.body, listaSolicitud);

      let todovacio = true;
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          if (body[key] !== "" && body[key] !== null) {
            todovacio = false;
            break;
          }
        }
      }
      if (todovacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }

      if (
        // verificar que sea admin o que su gestion este en "origen" o "destino".
        !(
          req.usuario.farmacia.general?.admin === 1 ||
          req.usuario.farmacia.gestion?.includes(body.origen) ||
          req.usuario.farmacia.gestion?.includes(body.destino)
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      let solicitudDB = null;

      if (body._id) {
        // Update de solicitud
        // Delete del campo si esta como null / "" / undefined /array vacio
        body = objectSetUnset(body, "unsetCero").dato;

        // Modificando la BD
        solicitudDB = await FarmaciaSolicitud.findOneAndUpdate({_id: body.$set._id}, body, {
          new: true,
          runValidators: true,
        }).exec();
      } else {
        // Nuevo
        solicitudDB = await new FarmaciaSolicitud(body).save();
      }

      if (!solicitudDB) {
        return errorMessage(res, {message: "Error al crear la Solicitud."}, 400);
      }

      return res.status(201).json({
        ok: true,
        solicitud: solicitudDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Borrar Solicitud
// ============================
app.delete(
  "/farmacia/solicitud/:id",
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
      let solicitudBorrada = await FarmaciaSolicitud.findOne({_id: req.params.id}).exec();

      if (
        // verificar que sea admin o que "origen" sea de su gestion.
        !(
          req.usuario.farmacia.general?.admin === 1 ||
          req.usuario.farmacia.gestion?.includes(solicitudBorrada.origen.toString())
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      // Verificar que todavia este pendiente...
      if (solicitudBorrada.estado !== "Pendiente") {
        return errorMessage(res, {message: "Solicitud Respondida, no editable."}, 401);
      }

      solicitudBorrada = await FarmaciaSolicitud.findOneAndDelete({
        _id: req.params.id,
      }).exec();

      if (!solicitudBorrada) {
        return errorMessage(res, {message: "Solicitud no encontrado."}, 404);
      }

      return res.json({
        ok: true,
        solicitud_borrada: solicitudBorrada.id,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// TITULO ¿?¿?¿?¿?
// ============================
// ============================
// XXXXXX  Desarrollar  XXXXXXX
// ============================

module.exports = app;
