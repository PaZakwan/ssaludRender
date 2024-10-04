const express = require("express");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isObjectIdValid, sumarProps, dateUTC} = require(process.env.MAIN_FOLDER + "/tools/object");

const VacunaAplicacion = require("./models/vacuna_aplicacion");
const VacunaDescarte = require("./models/vacuna_descarte");
const VacunaTransferencia = require("./models/vacuna_transferencia");

const app = express();

// ============================
// Mostrar Insumos Estadistica, Salieron segun area filtros, entre fechas.
// Descartes(Motivos) + Aplicaciones + Transferencias(retirados)
// Posibilidad de seleccionar los modelos de la DB
// ============================
app.get(
  "/vacunas/estadistica/salidas",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "vacunas.gestion"},
        {prop: "vacunas.lectura"},
        {prop: "vacunas.general.gestion", value: 1},
        {prop: "vacunas.general.lectura", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // ###########
      // filtrar por fecha...
      // aplicaciones/descartes segun fecha(no timezone) y existe retirado.
      // transferenciaIn segun insumo.retirado (timezone) y haya sido recibido.
      // transferenciaOut segun insumo.retirado (timezone).
      // ###########
      // VER EL TEMA DEL $elemMatch Y UNIFICAR FILTROS CON ESTADISTICA GENERAL...
      // ###########
      // para seleccionar los modelos || aplicaciones; descartes; transferencias;
      let modelos = JSON.parse(req.query.mod);

      // para transferencias
      let filtro = {};
      // para aplicaciones/descartes
      let filtroIndividual = {};
      if (req.query.areas && req.query.areas !== "[]") {
        filtro.origen = {
          $in: JSON.parse(req.query.areas),
        };
        for (const [index, area] of filtro.origen.$in.entries()) {
          // verificar Acceso a las areas.
          if (
            // existe en general/lectura o en general/gestion o en gestion/lectura
            // o modelo vacunas para verlas todas.
            !(
              modelos.vac ||
              req.usuario.vacunas.general?.lectura === 1 ||
              req.usuario.vacunas.general?.gestion === 1 ||
              req.usuario.vacunas.gestion?.includes(area) ||
              req.usuario.vacunas.lectura?.includes(area)
            )
          ) {
            return errorMessage(res, {message: "Acceso Denegado."}, 401);
          }
          // regresa mongoose.Types.ObjectId(area);
          filtro.origen.$in[index] = isObjectIdValid(area);
        }
        filtroIndividual.origen = filtro.origen;
      } else if (
        !(req.usuario.vacunas.general?.lectura === 1 || req.usuario.vacunas.general?.gestion === 1)
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

      // Vacuna Aplicaciones;
      let vacunacionesDB = [];
      if (modelos?.vac) {
        let detallado = {
          detalle_vacunaciones: {
            $push: {
              fecha: {$dateToString: {format: "%Y-%m-%d", date: "$fecha"}},
              pacienteDB: "$pacienteDB",
              pacienteDocDB: "$pacienteDocDB",
              pacienteOSocDB: "$pacienteOSocDB",
              oSocial: "$oSocial",
              procedencia: "$procedencia",
              cantidad: "$cantidad",
              lote: "$lote",
              vencimiento: {$dateToString: {format: "%Y-%m-%d", date: "$vencimiento"}},
              dosis: "$dosis",
            },
          },
        };
        if (modelos.vac.nd) {
          detallado = null;
          // no tiene en cuenta las aplicaciones que no salieron de stock.. (como las de procedencia "Paciente" e "Historial")
          filtroIndividual.retirado = {
            $exists: true,
          };
        }

        vacunacionesDB = await VacunaAplicacion.aggregate()
          .match(filtroIndividual)
          .sort({fecha: 1, _id: 1})
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
                  $concat: ["$pacienteDB.apellido", ", ", "$pacienteDB.nombre"],
                },
                {
                  $concat: [{$ifNull: ["$ps_nombreC", ""]}, " (", "$ps_paciente", ")"],
                },
                {$toString: "$paciente"},
              ],
            },
            pacienteDocDB: {
              $ifNull: [
                {
                  $concat: ["$tipo_doc", " ", "$documento"],
                },
                {
                  $concat: ["$pacienteDB.tipo_doc", " ", "$pacienteDB.documento"],
                },
                {
                  $concat: ["Resp ", "$doc_responsable"],
                },
                {
                  $concat: ["Resp ", "$pacienteDB.doc_responsable"],
                },
                "$vacio",
              ],
            },
            pacienteOSocDB: "$pacienteDB.oSocial",
          })
          .group({
            ...{
              _id: {area: "$origen", insumo: {$ifNull: ["$insumo", "$vacunaName"]}},
              total: {$sum: 1},
            },
            ...detallado,
          })
          .project({
            _id: 0,
            area: "$_id.area",
            insumo: "$_id.insumo",
            total: 1,
            detalle_vacunaciones: 1,
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
            from: "VacunaInsumos",
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
            total_vacunaciones: "$total",
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

        descartesDB = await VacunaDescarte.aggregate()
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
          .unwind({path: "$areaDB", preserveNullAndEmptyArrays: true})
          .addFields({
            areaDB: {$ifNull: ["$areaDB.area", {$toString: "$area"}]},
          })
          .lookup({
            from: "VacunaInsumos",
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
          .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});
      }

      // Egresos Transferencias Remitos (clearing) retirados
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

        transferenciaOutDB = await VacunaTransferencia.aggregate()
          .match(filtro)
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
          })
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
            from: "VacunaInsumos",
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
          .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});
      }

      // INTEGRAR EGRESOS
      // VACUNACIONES
      let egresosDB = [...vacunacionesDB];
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
// TITULO ¿?¿?¿?¿?
// ============================

// ============================
// XXXXXX  Desarrollar  XXXXXXX
// ============================
// ============================
// XXXXXXXXXXXXXXXXXXXXXXXXXXXX
// ============================

module.exports = app;
