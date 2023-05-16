const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require("../../middlewares/autenticacion");
const {errorMessage} = require("../../tools/errorHandler");
const modificarStockInc = require("./farmaciaHelper");
const FarmaciaTransferencia = require("./models/farmacia_transferencia");
const FarmaciaDescarte = require("./models/farmacia_descarte");
const InsumoEntrega = require("./models/insumo_entrega");
const {isVacio, isObjectIdValid, sumarProps} = require("../../tools/object");
// const {objectSetUnset} = require("../../tools/object");

const app = express();

let listaSalida = [
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

  // descarte
  "motivo",

  // transferencia (clearing)
  "destino",
  "remito",
  "observacion",
  "fec_planificada",
];

// ============================
// Mostrar Insumos Estadistica, Salieron segun area filtros, entre fechas.
// Descartes(Motivos) + Entregas + Transferencias(retirados y pendientes)
// Posibilidad de seleccionar los modelos de la DB
// ============================
app.get(
  "/farmacia/salidas/estadistica",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "farmacia.entregas"},
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
      // para seleccionar los modelos || entregas; descartes; transferencias;
      let modelos = JSON.parse(req.query.mod);

      // para transferencias
      let filtro = {};
      // para entregas/descartes
      let filtroIndividual = {};
      if (req.query.areas && req.query.areas !== "[]") {
        filtro.origen = {
          $in: JSON.parse(req.query.areas),
        };
        for (const [index, area] of filtro.origen.$in.entries()) {
          // verificar Acceso a las areas.
          if (
            // existe en general/reportes o en general/admin o en entregas o en gestion
            // o modelo entregas para verlas todas.
            !(
              modelos.entr ||
              req.usuario.farmacia.general?.reportes === 1 ||
              req.usuario.farmacia.general?.admin === 1 ||
              req.usuario.farmacia.entregas?.includes(area) ||
              req.usuario.farmacia.gestion?.includes(area)
            )
          ) {
            return errorMessage(res, {message: "Acceso Denegado."}, 401);
          }
          // regresa mongoose.Types.ObjectId(area);
          filtro.origen.$in[index] = isObjectIdValid(area);
        }
        filtroIndividual.origen = filtro.origen;
      } else if (
        !(req.usuario.farmacia.general?.reportes === 1 || req.usuario.farmacia.general?.admin === 1)
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }
      if (req.query.insumos && req.query.insumos !== "[]") {
        filtro.insumos = {
          $elemMatch: {
            insumo: {
              $in: JSON.parse(req.query.insumos),
            },
          },
        };
        filtro.insumos.$elemMatch.insumo.$in.forEach((insumo, index) => {
          // regresa mongoose.Types.ObjectId(area);
          filtro.insumos.$elemMatch.insumo.$in[index] = isObjectIdValid(insumo);
        });
        filtroIndividual.insumo = filtro.insumos.$elemMatch.insumo;
      }
      if (req.query.procedencias && req.query.procedencias !== "[]") {
        filtro.insumos = {
          $elemMatch: {
            ...(filtro.insumos?.$elemMatch || {}),
            procedencia: {
              $in: JSON.parse(req.query.procedencias),
            },
          },
        };
        filtroIndividual.procedencia = filtro.insumos.$elemMatch.procedencia;
      }
      if (req.query.desde && req.query.hasta) {
        filtro.fecha = {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)};
        if (isNaN(filtro.fecha.$gte) || isNaN(filtro.fecha.$lte)) {
          return errorMessage(res, {message: "La fecha de Busqueda no es valida."}, 400);
        }
        filtroIndividual.fecha = filtro.fecha;
      }

      // Entregas
      let entregasDB = [];
      if (modelos?.entr) {
        let detallado = modelos.entr.nd
          ? null
          : {
              detalle_entregas: {
                $push: {
                  fecha: {$dateToString: {format: "%Y-%m-%d", date: "$fecha"}},
                  pacienteDB: "$pacienteDB",
                  pacienteDocDB: "$pacienteDocDB",
                  pacienteOSocDB: "$pacienteOSocDB",
                  procedencia: "$procedencia",
                  cantidad: "$cantidad",
                  lote: "$lote",
                  vencimiento: {$dateToString: {format: "%Y-%m-%d", date: "$vencimiento"}},
                },
              },
            };

        entregasDB = await InsumoEntrega.aggregate()
          .match(filtroIndividual)
          .sort({fecha: 1, _id: 1})
          .lookup({
            from: "pacientes",
            localField: "paciente",
            foreignField: "_id",
            as: "pacienteDB",
          })
          .unwind({path: "$pacienteDB"})
          .addFields({
            pacienteOSocDB: "$pacienteDB.oSocial",
            pacienteDocDB: {
              $concat: ["$pacienteDB.tipo_doc", " ", "$pacienteDB.documento"],
            },
            pacienteDB: {
              $concat: ["$pacienteDB.apellido", ", ", "$pacienteDB.nombre"],
            },
          })
          .group({
            ...{
              _id: {area: "$origen", insumo: "$insumo"},
              total: {$sum: "$cantidad"},
            },
            ...detallado,
          })
          .project({
            _id: 0,
            area: "$_id.area",
            insumo: "$_id.insumo",
            total: 1,
            detalle_entregas: 1,
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
            total_entregas: "$total",
          })
          .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});
      }

      // Descartes
      let descartesDB = [];
      if (modelos?.desc) {
        let detallado = modelos.desc.nd
          ? null
          : {
              detalle_descartes: {
                $push: {
                  fecha: {$dateToString: {format: "%Y-%m-%d", date: "$fecha"}},
                  motivo: "$motivo",
                  procedencia: "$procedencia",
                  cantidad: "$cantidad",
                  lote: "$lote",
                  vencimiento: {$dateToString: {format: "%Y-%m-%d", date: "$vencimiento"}},
                },
              },
            };

        descartesDB = await FarmaciaDescarte.aggregate()
          .match(filtroIndividual)
          .sort({fecha: 1, _id: 1})
          .group({
            ...{
              _id: {area: "$origen", insumo: "$insumo"},
              total: {$sum: "$cantidad"},
              subtotal_utilizado: {
                $sum: {
                  $cond: [
                    {
                      $eq: ["$motivo", "Utilizado"],
                    },
                    "$cantidad",
                    0,
                  ],
                },
              },
              subtotal_vencido: {
                $sum: {
                  $cond: [
                    {
                      $eq: ["$motivo", "Vencimiento"],
                    },
                    "$cantidad",
                    0,
                  ],
                },
              },
              subtotal_otros: {
                $sum: {
                  $cond: [
                    {
                      $and: [
                        {
                          $ne: ["$motivo", "Utilizado"],
                        },
                        {
                          $ne: ["$motivo", "Vencimiento"],
                        },
                      ],
                    },
                    "$cantidad",
                    0,
                  ],
                },
              },
            },
            ...detallado,
          })
          .project({
            _id: 0,
            area: "$_id.area",
            insumo: "$_id.insumo",
            total: 1,
            subtotal_utilizado: 1,
            subtotal_vencido: 1,
            subtotal_otros: 1,
            detalle_descartes: 1,
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
            total_descartes: "$total",
          })
          .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});
      }

      // Egresos Transferencias Remitos (clearing)
      let transferenciaOutDB = [];
      if (modelos?.tran) {
        let detallado = modelos.tran.nd
          ? null
          : {
              detalle_transferencia_out: {
                $push: {
                  fecha: {$dateToString: {format: "%Y-%m-%d", date: "$fecha"}},
                  destino: "$destino",
                  destinoDB: "$destinoDB",
                  procedencia: "$insumos.procedencia",
                  lote: "$insumos.lote",
                  vencimiento: {$dateToString: {format: "%Y-%m-%d", date: "$insumos.vencimiento"}},
                  cantidad: "$insumos.cantidad",
                },
              },
            };

        transferenciaOutDB = await FarmaciaTransferencia.aggregate()
          .match(filtro)
          .sort({fecha: 1, _id: 1})
          // buscar nombres de DestinosDB
          .lookup({
            from: "areas",
            localField: "destino",
            foreignField: "_id",
            as: "destinoDB",
          })
          .unwind({path: "$destinoDB"})
          .addFields({
            destinoDB: "$destinoDB.area",
          })
          // descomprimir
          .unwind({path: "$insumos"})
          // encontrar retirados
          .match({
            "insumos.retirado": {$ne: null},
            "insumos.insumo": filtro.insumos?.$elemMatch.insumo || {$exists: true},
            "insumos.procedencia": filtro.insumos?.$elemMatch.procedencia || {$exists: true},
          })
          // agrupar - area/insumo, sumar por insumo.
          .group({
            ...{
              _id: {area: "$origen", insumo: "$insumos.insumo"},
              total: {$sum: "$insumos.cantidad"},
            },
            ...detallado,
          })
          .project({
            _id: 0,
            area: "$_id.area",
            insumo: "$_id.insumo",
            total: 1,
            detalle_transferencia_out: 1,
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
            total_transferencia_out: "$total",
          })
          .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});
      }

      // INTEGRAR EGRESOS
      // ENTREGAS
      let egresosDB = [...entregasDB];
      // DESCARTES
      // si egresos sigue vacio agregar los descartes.
      if (egresosDB.length === 0) {
        egresosDB = [...descartesDB];
      }
      // sino recorrer descartesDB y sumarProps
      else {
        for (let index = 0; index < descartesDB.length; index++) {
          let existe = egresosDB.findIndex((egreso) => egreso._id === descartesDB[index]._id);
          if (existe > -1) {
            // sumarProps
            egresosDB[existe] = sumarProps(egresosDB[existe], descartesDB[index]);
          } else {
            // agregarlo
            egresosDB.push(descartesDB[index]);
          }
        }
      }
      // TRANSFERENCIA OUT
      // si egresos sigue vacio agregar los egresos de transferencia.
      if (egresosDB.length === 0) {
        egresosDB = [...transferenciaOutDB];
      }
      // sino recorrer transferenciaOutDB y sumarProps
      else {
        for (let index = 0; index < transferenciaOutDB.length; index++) {
          let existe = egresosDB.findIndex(
            (egreso) => egreso._id === transferenciaOutDB[index]._id
          );
          if (existe > -1) {
            // sumarProps
            egresosDB[existe] = sumarProps(egresosDB[existe], transferenciaOutDB[index]);
          } else {
            // agregarlo
            egresosDB.push(transferenciaOutDB[index]);
          }
        }
      }

      return res.status(200).json({
        ok: true,
        egresos: egresosDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

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
      if (req.query.desde && req.query.hasta) {
        filtro.fecha = {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)};
        if (isNaN(filtro.fecha.$gte) || isNaN(filtro.fecha.$lte)) {
          return errorMessage(res, {message: "La fecha de Busqueda no es valida."}, 400);
        }
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
          pacienteOSocDB: "$pacienteDB.oSocial",
          pacienteDocDB: {
            $concat: ["$pacienteDB.tipo_doc", " ", "$pacienteDB.documento"],
          },
          pacienteDB: {
            $concat: ["$pacienteDB.apellido", ", ", "$pacienteDB.nombre"],
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
      // false (no borra, los vacios)
      let body = isVacio(_pick(req.body, listaSalida), false);
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
          new Date(entregaDB.fecha).toISOString().slice(0, 10) === hoy
        )
      ) {
        return errorMessage(
          res,
          {
            message: `Actividad no autorizada. La fecha de la entrega debe ser ${hoy}`,
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
      if (req.query.desde && req.query.hasta) {
        filtro.fecha = {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)};
        if (isNaN(filtro.fecha.$gte) || isNaN(filtro.fecha.$lte)) {
          return errorMessage(res, {message: "La fecha de Busqueda no es valida."}, 400);
        }
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
        .unwind({path: "$origenDB"})
        .addFields({
          origenDB: "$origenDB.area",
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
      // false (no borra, los vacios)
      let body = isVacio(_pick(req.body, listaSalida), false);
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

      let errors = [];
      let descarteDB = null;
      body.retirado = new Date();
      body.usuario_creador = req.usuario.id;

      // recorrer array de insumos
      for (const insumo of body.insumos) {
        descarteDB = null;
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
          new Date(descarteDB.fecha).toISOString().slice(0, 10) === hoy
        )
      ) {
        return errorMessage(
          res,
          {
            message: `Actividad no autorizada. La fecha del descarte debe ser ${hoy}`,
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

// ============================
// TITULO ¿?¿?¿?¿?
// ============================

// ============================
// XXXXXX  Desarrollar  XXXXXXX
// ============================
// ============================
// XXXXXXXXXXXXXXXXXXXXXXXXXXXX
// ============================

module.exports = app;
