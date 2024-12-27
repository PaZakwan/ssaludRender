const express = require("express");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isObjectIdValid, sumarProps, dateUTC} = require(process.env.MAIN_FOLDER + "/tools/object");

const FarmaciaTransferencia = require("./models/farmacia_transferencia");
const FarmaciaDescarte = require("./models/farmacia_descarte");
const InsumoEntrega = require("./models/insumo_entrega");

const app = express();

// ============================
// Mostrar Insumos Estadistica, Salieron segun area filtros, entre fechas.
// Descartes(Motivos) + Entregas + Transferencias(retirados)
// Posibilidad de seleccionar los modelos de la DB
// ============================
app.get(
  "/farmacia/estadistica/salidas",
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
      // ###########
      // filtrar por fecha...
      // entregas/descartes segun fecha(no timezone) y existe retirado.
      // transferenciaIn segun insumo.retirado (timezone) y haya sido recibido.
      // transferenciaOut segun insumo.retirado (timezone).
      // ###########
      // VER EL TEMA DEL $elemMatch Y UNIFICAR FILTROS CON ESTADISTICA GENERAL...
      // ###########
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
              req.usuario.farmacia.gestion?.includes(area) ||
              req.usuario.farmacia.entregas?.includes(area)
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
      if (req.query.desde) {
        let temp = dateUTC({
          date: req.query.desde,
          hours: "00:00:00.000",
          timezone: req.get("timezoneoffset"),
        });
        if (temp.error) {
          return errorMessage(res, {message: temp.error}, 400);
        }
        (filtro["insumos.retirado"] ??= {}).$gte = temp;
        (filtroIndividual.fecha ??= {}).$gte = dateUTC({
          date: req.query.desde,
          hours: "00:00:00.000",
        });
      }
      if (req.query.hasta) {
        let temp = dateUTC({
          date: req.query.hasta,
          hours: "23:59:59.999",
          timezone: req.get("timezoneoffset"),
        });
        if (temp.error) {
          return errorMessage(res, {message: temp.error}, 400);
        }
        (filtro["insumos.retirado"] ??= {}).$lte = temp;
        (filtroIndividual.fecha ??= {}).$lte = dateUTC({
          date: req.query.hasta,
          hours: "23:59:59.999",
        });
      }
      filtroIndividual.retirado = {
        $exists: true,
      };

      // Total Nominal - Entregas
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
                  pacienteTelefonoDB: "$pacienteTelefonoDB",
                  oSocial: "$oSocial",
                  procedencia: "$procedencia",
                  cantidad: "$cantidad",
                  lote: "$lote",
                  vencimiento: {$dateToString: {format: "%Y-%m-%d", date: "$vencimiento"}},
                },
              },
            };

        entregasDB = InsumoEntrega.aggregate().match(filtroIndividual);

        if (detallado !== null) {
          entregasDB
            .sort({fecha: 1, _id: 1})
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
                  {$toString: "$paciente"},
                ],
              },
              pacienteDocDB: {
                $ifNull: [
                  {
                    $concat: ["$pacienteDB.tipo_doc", " ", "$pacienteDB.documento"],
                  },
                  {
                    $concat: ["Resp ", "$pacienteDB.doc_responsable"],
                  },
                  "$vacio",
                ],
              },
              pacienteTelefonoDB: {
                $ifNull: ["$pacienteDB.telefono", "$pacienteDB.telefono_alt", "$vacio"],
              },
            });
        }

        entregasDB
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
          .unwind({path: "$areaDB", preserveNullAndEmptyArrays: true})
          .addFields({
            areaDB: {$ifNull: ["$areaDB.area", {$toString: "$area"}]},
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
          })
          .addFields({
            _id: {$concat: ["$areaDB", "-", "$insumoDB"]},
            total_nominal: "$total",
            total_entregas: "$total",
          })
          .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});

        // Excel detallado
        if (modelos.entr.ex && !modelos.entr.nd) {
          entregasDB
            // borrar props
            .project({
              total: 0,
              total_nominal: 0,
              total_entregas: 0,
              area: 0,
              insumo: 0,
            })
            .unwind({path: "$detalle_entregas", preserveNullAndEmptyArrays: true})
            .addFields({
              fecha: {$ifNull: ["$detalle_entregas.fecha", "$noRetornaNada"]},
              pacienteDB: {$ifNull: ["$detalle_entregas.pacienteDB", "$noRetornaNada"]},
              pacienteDocDB: {$ifNull: ["$detalle_entregas.pacienteDocDB", "$noRetornaNada"]},
              pacienteTelefonoDB: {
                $ifNull: ["$detalle_entregas.pacienteTelefonoDB", "$noRetornaNada"],
              },
              oSocial: {$ifNull: ["$detalle_entregas.oSocial", "$noRetornaNada"]},
              procedencia: {$ifNull: ["$detalle_entregas.procedencia", "$noRetornaNada"]},
              lote: {$ifNull: ["$detalle_entregas.lote", "$noRetornaNada"]},
              vencimiento: {$ifNull: ["$detalle_entregas.vencimiento", "$noRetornaNada"]},
              cantidad: {$ifNull: ["$detalle_entregas.cantidad", 0]},
            })
            .addFields({
              cant_min: {$cond: [{$eq: ["$cantidad", 0]}, "$cant_min", "$noRetornaNada"]},
            })
            // borrar detalle
            .project({
              detalle_entregas: 0,
            });
        }

        entregasDB = entregasDB.exec();
      }

      // Total Descartes - subtotal_utilizado - subtotal_otros
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

        descartesDB = FarmaciaDescarte.aggregate().match(filtroIndividual);

        if (detallado !== null) {
          descartesDB.sort({fecha: 1, _id: 1});
        }
        descartesDB
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
              // subtotal_vencido: {
              //   $sum: {
              //     $cond: [
              //       {
              //         $eq: ["$motivo", "Vencimiento"],
              //       },
              //       "$cantidad",
              //       0,
              //     ],
              //   },
              // },
              subtotal_otros: {
                $sum: {
                  $cond: [
                    {
                      $and: [
                        {
                          $ne: ["$motivo", "Utilizado"],
                        },
                        // {
                        //   $ne: ["$motivo", "Vencimiento"],
                        // },
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
            // subtotal_vencido: 1,
            subtotal_otros: 1,
            detalle_descartes: 1,
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
          })
          .addFields({
            _id: {$concat: ["$areaDB", "-", "$insumoDB"]},
            total_descartes: "$total",
          })
          .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1})
          .exec();
      }

      // Total Transferencias Out - Remitos (clearing) retirados
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

        transferenciaOutDB = FarmaciaTransferencia.aggregate().match(filtro);

        if (detallado !== null) {
          transferenciaOutDB
            .sort({fecha: 1, _id: 1})
            // buscar nombres de DestinosDB
            .lookup({
              from: "areas",
              localField: "destino",
              foreignField: "_id",
              as: "destinoDB",
            })
            .unwind({path: "$destinoDB", preserveNullAndEmptyArrays: true})
            .addFields({
              destinoDB: {$ifNull: ["$destinoDB.area", {$toString: "$destino"}]},
            });
        }

        transferenciaOutDB
          // descomprimir
          .unwind({path: "$insumos", preserveNullAndEmptyArrays: true})
          // encontrar retirados
          .match({
            "insumos.retirado": filtro["insumos.retirado"],
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
          .unwind({path: "$areaDB", preserveNullAndEmptyArrays: true})
          .addFields({
            areaDB: {$ifNull: ["$areaDB.area", {$toString: "$area"}]},
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
          })
          .addFields({
            _id: {$concat: ["$areaDB", "-", "$insumoDB"]},
            total_transferencia_out: "$total",
          })
          .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1})
          .exec();
      }

      // Esperar que se concluyan las consultas a la BD
      [entregasDB, descartesDB, transferenciaOutDB] = await Promise.all([
        entregasDB,
        descartesDB,
        transferenciaOutDB,
      ]);

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

      // .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});
      // a.areaDB.localeCompare(b.areaDB) para comparar string
      // b.price - a.price para comparar numeros
      egresosDB.sort(
        (a, b) =>
          (a.areaDB ?? "").localeCompare(b.areaDB ?? "") ||
          (a.categoriaDB ?? "").localeCompare(b.categoriaDB ?? "") ||
          (a.insumoDB ?? "").localeCompare(b.insumoDB ?? "")
      );

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
// TITULO ¿?¿?¿?¿?
// ============================

// ============================
// XXXXXX  Desarrollar  XXXXXXX
// ============================
// ============================
// XXXXXXXXXXXXXXXXXXXXXXXXXXXX
// ============================

module.exports = app;
