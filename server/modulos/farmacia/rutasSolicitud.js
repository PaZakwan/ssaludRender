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
// Diferenciados por Estado(Pendiente / Aceptadas/ Rechazadas) y Motivo (Rutina / Urgencia / Emergencia)
// ============================
// XXXXXX  Desarrollar  XXXXXXX
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
      let areasID = req.query.areas || JSON.stringify([]);
      try {
        areasID = JSON.parse(areasID);
      } catch (error) {
        return errorMessage(res, {message: "Las areas para buscar no son validas."}, 400);
      }
      for (const [index, area] of areasID.entries()) {
        // verificar que las areas sean de su gestion.
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
        areasID[index] = isObjectIdValid(area);
      }

      // Buscar Solicitudes
      // XXXXXX  Desarrollar  XXXXXXX
      let solicitudesDB = [];
      solicitudesDB = await FarmaciaSolicitud.aggregate()
        .match({
          fecha: {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)},
          origen: {$in: areasID},
        })
        // descomprimir
        .unwind({path: "$insumos"})
        // agrupar - area/insumo, sumar por insumo.
        // procedencia lote vencimiento cant
        .group({
          _id: {area: "$destino", insumo: "$insumos.insumo"},
          total: {$sum: "$insumos.cantidad"},
          // detalle: {
          //   $push: {
          //     procedencia: "$insumos.procedencia",
          //     lote: "$insumos.lote",
          //     vencimiento: {$dateToString: {format: "%Y-%m-%d", date: "$insumos.vencimiento"}},
          //     cantidad: "$insumos.cantidad",
          //   },
          // },
        })
        .project({
          _id: 0,
          area: "$_id.area",
          insumo: "$_id.insumo",
          total: 1,
          // detalle: 1,
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
          total_ingreso_pr: "$total",
        })
        .sort({categoriaDB: 1, areaDB: 1, insumoDB: 1});

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
// Mostrar Solicitudes por area(origen, o destino), entre fecha
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
        filtro.areas = {
          $in: JSON.parse(req.query.areas),
        };
        for (const [index, area] of filtro.areas.$in.entries()) {
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
          filtro.areas.$in[index] = isObjectIdValid(area);
        }
      } else if (
        // no es general/reportes o general/admin
        !(req.usuario.farmacia.general?.reportes === 1 || req.usuario.farmacia.general?.admin === 1)
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      if (req.query.desde && req.query.hasta) {
        filtro.fecha = {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)};
      } else {
        return errorMessage(
          res,
          {message: "El rango de fechas de busqueda es necesario para proceder."},
          412
        );
      }
      if (filtro.areas.$in) {
        filtro = {
          $and: [
            {
              $or: [
                {destino: {$exists: false}},
                {
                  origen: {
                    $in: filtro.areas.$in,
                  },
                },
                {
                  destino: {
                    $in: filtro.areas.$in,
                  },
                },
              ],
            },
            {fecha: {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)}},
          ],
        };
      }

      let solicitudesDB = await FarmaciaSolicitud.aggregate()
        .match(filtro)
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
// TITULO ¿?¿?¿?¿?
// ============================
// ============================
// XXXXXX  Desarrollar  XXXXXXX
// ============================

module.exports = app;
