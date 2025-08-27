const {readFile} = require("fs/promises");
const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isObjectIdValid, arrayFromSumarPropsInArrays} = require(process.env.MAIN_FOLDER +
  "/tools/object");

const {modificarStockInc} = require("./vacunaHelper");
const Area = require(process.env.MAIN_FOLDER + "/modulos/main/models/area");
const VacunaInsumo = require("./models/vacuna_insumo");
const VacunaStock = require("./models/vacuna_stock");
const VacunaTransferencia = require("./models/vacuna_transferencia");
const VacunaIngreso = require("./models/vacuna_ingreso");

const app = express();

// ============================
// Recibir la remito_compra/remito (recibir fecha)
// ============================
app.put(
  "/vacunas/recibir",
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
      let filtro = _pick(req.body, ["id", "remito_compra", "remito"]);
      let ingresoDB = null;

      // Buscar Ingresos
      if (filtro.remito) {
        ingresoDB = await VacunaTransferencia.findOne({
          _id: filtro.id,
        })
          .populate("insumos.insumo", "nombre")
          .exec();
      } else if (filtro.remito_compra) {
        ingresoDB = await VacunaIngreso.findOne({
          _id: filtro.id,
        })
          .populate("insumos.insumo", "nombre")
          .exec();
      }
      let errors = [];
      if (ingresoDB) {
        if (
          // verificar que sea general.gestion o que "destino" sea de su gestion.
          !(
            req.usuario.vacunas.general?.gestion === 1 ||
            req.usuario.vacunas.gestion?.includes(ingresoDB.destino.toString())
          )
        ) {
          return errorMessage(res, {message: "Acceso Denegado."}, 401);
        }
        let recibido = Date.now();
        // recorrer insumos
        for (let index = 0; index < ingresoDB.insumos.length; index++) {
          // Modificar stock
          let stockDB = null;
          stockDB = await modificarStockInc(
            ingresoDB.destino,
            {
              insumo: ingresoDB.insumos[index].insumo._id,
              procedencia: ingresoDB.insumos[index].procedencia,
              lote: ingresoDB.insumos[index].lote,
              vencimiento: ingresoDB.insumos[index].vencimiento,
              recibido: ingresoDB.insumos[index].recibido,
            },
            ingresoDB.insumos[index].cantidad
          );
          if (!stockDB || stockDB?.err) {
            // o si tira error..
            errors.push({
              message: `${ingresoDB.insumos[index].insumo.nombre} - Modificar Stock - ${
                stockDB?.err ?? "No contemplado"
              }.`,
              type: "Modificar Stock",
            });
          } else {
            // si es exitoso..
            ingresoDB.insumos[index].recibido = recibido;
          }
        }
        // Recibir Update
        let recibidoDB = null;
        if (filtro.remito) {
          recibidoDB = await VacunaTransferencia.findOneAndUpdate(
            {
              _id: filtro.id,
            },
            {insumos: ingresoDB.insumos},
            {
              new: true,
              runValidators: true,
            }
          ).exec();
        } else if (filtro.remito_compra) {
          recibidoDB = await VacunaIngreso.findOneAndUpdate(
            {
              _id: filtro.id,
            },
            {insumos: ingresoDB.insumos},
            {
              new: true,
              runValidators: true,
            }
          ).exec();
        }
        if (recibidoDB === null) {
          errors.push({
            message: `${filtro.remito ?? filtro.remito_compra} - Recibir Ingreso Error`,
            type: "Ingreso Recibido",
          });
        }
      } else {
        return errorMessage(res, {message: "Ingreso no encontrado."}, 404);
      }

      return res.status(errors.length > 0 ? 500 : 202).json({
        ok: errors.length > 0 ? false : true,
        recibido: filtro.remito ?? filtro.remito_compra,
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
// Mostrar Stock de areas segun filtro. (groupedBy area/insumo)
// ============================
app.get(
  "/vacunas/stock",
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
      let filtro = {};
      if (req.query.areas && req.query.areas !== "[]") {
        filtro.area = {
          $in: JSON.parse(req.query.areas),
        };
        for (const [index, area] of filtro.area.$in.entries()) {
          // verificar las areas.
          if (
            // existe en general/lectura, en general/gestion, en array/gestion o en array/lectura
            !(
              req.usuario.vacunas.general?.lectura === 1 ||
              req.usuario.vacunas.general?.gestion === 1 ||
              req.usuario.vacunas.gestion?.includes(area) ||
              req.usuario.vacunas.lectura?.includes(area)
            )
          ) {
            return errorMessage(res, {message: "Acceso Denegado."}, 401);
          }
          // regresa mongoose.Types.ObjectId(area);
          filtro.area.$in[index] = isObjectIdValid(area);
        }
      } else if (
        !(req.usuario.vacunas.general?.lectura === 1 || req.usuario.vacunas.general?.gestion === 1)
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
      let detallado = req.query.nd
        ? null
        : {
            detalle: {
              $push: {
                $cond: [
                  "$cantidad",
                  {
                    procedencia: "$procedencia",
                    lote: "$lote",
                    vencimiento: {$dateToString: {format: "%Y-%m-%d", date: "$vencimiento"}},
                    cantidad: "$cantidad",
                    expirado: "$expirado",
                    porExpirar: "$porExpirar",
                  },
                  "$$REMOVE",
                ],
              },
            },
          };

      let hoy = new Date();
      let porExpirar = new Date(new Date().setDate(hoy.getDate() + 90));

      let stockDB = VacunaStock.aggregate()
        .match(filtro)
        .addFields({
          existVencimiento: {$gt: ["$vencimiento", null]},
        })
        .sort({existVencimiento: -1, vencimiento: 1, _id: -1})
        .project({
          existVencimiento: 0,
        })
        .addFields({
          expirado: {
            $cond: [
              {$not: ["$vencimiento"]},
              "$noRetornaNada",
              {
                $cond: [
                  {
                    $gt: ["$vencimiento", hoy],
                  },
                  "$noRetornaNada",
                  true,
                ],
              },
            ],
          },
        })
        .addFields({
          porExpirar: {
            $cond: [
              {$or: [{$not: ["$vencimiento"]}, "$expirado"]},
              "$noRetornaNada",
              {
                $cond: [
                  {
                    $gt: ["$vencimiento", porExpirar],
                  },
                  "$noRetornaNada",
                  true,
                ],
              },
            ],
          },
        })
        // Opciones Minimos
        .unionWith({
          coll: "VacunaConfigs",
          pipeline: [
            {
              $match: {
                area: filtro.area,
                insumo: filtro.insumo || {$exists: true},
              },
            },
            {$project: {_id: 0, area: 1, insumo: 1, cant_min: 1}},
          ],
        })
        .group({
          ...{
            _id: {area: "$area", insumo: "$insumo"},
            total: {$sum: "$cantidad"},
            total_expirado: {$sum: {$cond: ["$expirado", "$cantidad", 0]}},
            total_porExpirar: {$sum: {$cond: ["$porExpirar", "$cantidad", 0]}},
            cant_min: {$sum: "$cant_min"},
          },
          ...detallado,
        })
        .project({
          _id: {
            $concat: [
              {
                $toString: "$_id.area",
              },
              "-",
              {
                $toString: "$_id.insumo",
              },
            ],
          },
          area: "$_id.area",
          insumo: "$_id.insumo",
          total: 1,
          total_expirado: 1,
          total_porExpirar: 1,
          detalle: 1,
          cant_min: {$cond: [{$eq: ["$cant_min", 0]}, "$noRetornaNada", "$cant_min"]},
          total_buenos: {$subtract: ["$total", "$total_expirado"]},
        });

      // PREPARANDO RESPUESTA
      let respuesta = [];

      // si hay filtro en insumo -> area-insumo mostrar en 0
      if (filtro.insumo) {
        let [areaDB, insumosDB] = await Promise.all([
          Area.find(
            req.query.areas
              ? {
                  _id: JSON.parse(req.query.areas),
                }
              : {vacunatorio: true}
          ).exec(),
          VacunaInsumo.find({_id: JSON.parse(req.query.insumos)}).exec(),
        ]);
        areaDB.forEach((area) => {
          insumosDB.forEach((insumo) => {
            respuesta.push(
              // Excel detallado
              req.query.ex && !req.query.nd
                ? {
                    _id: `${area._id}-${insumo._id}`,
                    areaDB: area.area ?? area._id,
                    categoriaDB: insumo.categoria,
                    insumoDB: insumo.nombre ?? insumo._id,
                    cantidad: 0,
                  }
                : {
                    _id: `${area._id}-${insumo._id}`,
                    areaDB: area.area ?? area._id,
                    categoriaDB: insumo.categoria,
                    insumoDB: insumo.nombre ?? insumo._id,
                    total: 0,
                    total_expirado: 0,
                    total_porExpirar: 0,
                    detalle: [],
                    total_buenos: 0,
                  }
            );
          });
        });
      } else {
        // populate area - insumo. areaDB / categoriaDB / insumoDB
        stockDB
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
          });
      }

      // Excel detallado
      if (req.query.ex && !req.query.nd) {
        if (filtro.insumo) {
          stockDB
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
            });
        }
        stockDB
          .unwind({path: "$detalle", preserveNullAndEmptyArrays: true})
          .addFields({
            procedencia: {$ifNull: ["$detalle.procedencia", "$noRetornaNada"]},
            lote: {$ifNull: ["$detalle.lote", "$noRetornaNada"]},
            vencimiento: {$ifNull: ["$detalle.vencimiento", "$noRetornaNada"]},
            cantidad: {$ifNull: ["$detalle.cantidad", 0]},
            porExpirar: {$ifNull: ["$detalle.porExpirar", "$noRetornaNada"]},
            expirado: {$ifNull: ["$detalle.expirado", "$noRetornaNada"]},
          })
          .addFields({
            cant_min: {$cond: [{$eq: ["$cantidad", 0]}, "$cant_min", "$noRetornaNada"]},
          })
          // borrar props
          .project({
            detalle: 0,
            total: 0,
            total_expirado: 0,
            total_porExpirar: 0,
            total_buenos: 0,
            area: 0,
            insumo: 0,
          });
      }

      // Ejecutar todas las solicitudes y sumar objetos
      respuesta = await arrayFromSumarPropsInArrays({
        arrays: [respuesta, stockDB],
        compare:
          // Excel detallado, solo suma cuando el objeto es el mismo ID y alguno tiene cantidad 0
          req.query.ex && !req.query.nd
            ? (a, b) => a._id === b._id && (b.cantidad === 0 || a.cantidad === 0)
            : (a, b) => a._id === b._id,
      });

      if (respuesta.error) {
        return errorMessage(
          res,
          {name: "Stock.arrayFromSumarPropsInArrays", message: respuesta.error},
          500
        );
      }

      // .sort({areaDB: 1, categoriaDB: 1, insumoDB: 1});
      // a.areaDB.localeCompare(b.areaDB) para comparar string
      // b.price - a.price para comparar numeros
      respuesta.sort(
        (a, b) =>
          (a.areaDB ?? "").localeCompare(b.areaDB ?? "") ||
          (a.categoriaDB ?? "").localeCompare(b.categoriaDB ?? "") ||
          (a.insumoDB ?? "").localeCompare(b.insumoDB ?? "")
      );

      return res.status(200).json({
        ok: true,
        stock: respuesta,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar Stock del area para los selects.
// ============================
app.get(
  "/vacunas/stock/selects",
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
      let filtro = {area: req.query.area};
      if (!filtro.area || filtro.area === "undefined") {
        return errorMessage(res, {message: "No se envió ningún filtro/dato."}, 412);
      }
      // verificar que el area sea de su gestion o entrega.
      if (
        // existe en general/lectura, en general/gestion, en array/gestion o en array/lectura
        !(
          req.usuario.vacunas.general?.lectura === 1 ||
          req.usuario.vacunas.general?.gestion === 1 ||
          req.usuario.vacunas.gestion?.includes(filtro.area) ||
          req.usuario.vacunas.lectura?.includes(filtro.area)
        )
      ) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }
      filtro.area = isObjectIdValid(filtro.area);

      let hoy = new Date();
      let porExpirar = new Date(new Date().setDate(hoy.getDate() + 90));

      let insumoSelect = {
        insumoDB: {$ifNull: ["$insumoDB.nombre", {$toString: "$insumo"}]},
        insumoCategoriaDB: {$ifNull: ["$insumoDB.categoria", "$vacio"]},
      };
      if (req.query.insumoSelect) {
        if (JSON.parse(req.query.insumoSelect)?.dosis) {
          insumoSelect.dosisDB = {$ifNull: ["$insumoDB.dosis_posibles", "$vacio"]};
        }
        if (JSON.parse(req.query.insumoSelect)?.qty_dosis) {
          insumoSelect.qty_dosisDB = {$ifNull: ["$insumoDB.qty_dosis_posibles", "$vacio"]};
        }
        if (JSON.parse(req.query.insumoSelect)?.condiciones) {
          insumoSelect.condicionesDB = {$ifNull: ["$insumoDB.condiciones", "$vacio"]};
        }
      }

      let stockDB = await VacunaStock.aggregate()
        .match(filtro)
        .addFields({
          expirado: {
            $cond: [
              {$not: ["$vencimiento"]},
              "$noRetornaNada",
              {
                $cond: [
                  {
                    $gt: ["$vencimiento", hoy],
                  },
                  "$noRetornaNada",
                  true,
                ],
              },
            ],
          },
        })
        .addFields({
          porExpirar: {
            $cond: [
              {$or: [{$not: ["$vencimiento"]}, "$expirado"]},
              "$noRetornaNada",
              {
                $cond: [
                  {
                    $gt: ["$vencimiento", porExpirar],
                  },
                  "$noRetornaNada",
                  true,
                ],
              },
            ],
          },
          vencimiento: {$dateToString: {format: "%Y-%m-%d", date: "$vencimiento"}},
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
        .addFields(insumoSelect)
        .addFields({
          existVencimiento: {$gt: ["$vencimiento", null]},
        })
        .sort({
          areaDB: 1,
          insumoCategoriaDB: 1,
          insumoDB: 1,
          existVencimiento: -1,
          vencimiento: 1,
          _id: -1,
        })
        .project({
          existVencimiento: 0,
        });

      if (req.query.categoria !== "null" && stockDB.length > 0) {
        let categoria = JSON.parse(req.query.categoria);
        stockDB = stockDB.filter((insumo) =>
          categoria.includes(insumo.insumoCategoriaDB.toString())
        );
      }

      return res.status(200).json({
        ok: true,
        stock: stockDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar Stock total en el area de los [insumos] solicitados.
// ============================
app.get(
  "/vacunas/stock/solicitud",
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
      let filtro = {
        // regresa mongoose.Types.ObjectId(area);
        area: isObjectIdValid(req.query.area),
        insumo: {
          $in: JSON.parse(req.query.insumos),
        },
      };

      filtro.insumo.$in.forEach((insumo, index) => {
        // regresa mongoose.Types.ObjectId(area);
        filtro.insumo.$in[index] = isObjectIdValid(insumo);
      });

      if (
        filtro.area === false ||
        // todos false
        !filtro.insumo.$in.some((insumo) => insumo !== false)
      ) {
        return errorMessage(res, {message: "No se enviaron datos necesarios para proceder."}, 412);
      }

      let stockDB = await VacunaStock.aggregate()
        .match(filtro)
        .group({
          _id: {insumo: "$insumo"},
          total: {$sum: "$cantidad"},
        })
        .project({
          _id: 0,
          insumo: "$_id.insumo",
          total: 1,
        })
        .sort({insumo: -1});

      return res.status(200).json({
        ok: true,
        stock: stockDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar Stock Total del sistema por Insumo.
// ============================
app.get(
  "/vacunas/stock/total",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "vacunas.reportes", value: 1},
        {prop: "vacunas.general.lectura", value: 1},
        {prop: "vacunas.general.gestion", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let filtro = {};
      if (req.query.insumos) {
        filtro.insumo = {
          $in: JSON.parse(req.query.insumos),
        };
        filtro.insumo.$in.forEach((insumo, index) => {
          // regresa mongoose.Types.ObjectId(area);
          filtro.insumo.$in[index] = isObjectIdValid(insumo);
        });
      }

      // Leer datos de archivo public/static/options/vacunas-base.json
      let procedenciaSubtotal = [];
      let objectSubtotal = {};
      try {
        procedenciaSubtotal = JSON.parse(
          await readFile(
            process.env.MAIN_FOLDER + "/../public/static/options/vacunas-base.json",
            "utf8"
          )
        );
        // Quitar "Historial" y "Paciente"
        procedenciaSubtotal = procedenciaSubtotal?.json?.insumo_procedencia?.filter(
          (procedencia) => !["Historial", "Paciente"].includes(procedencia)
        );
        // Generar contadores para grupo -> subtotal_<prop> : { $sum: { $cond: [{$eq: ["$procedencia", "<prop>"]}, "$cantidad", 0], }}
        procedenciaSubtotal.forEach((procedencia) => {
          objectSubtotal[`subtotal_${procedencia}`] = {
            $sum: {$cond: [{$eq: ["$procedencia", `${procedencia}`]}, "$cantidad", 0]},
          };
        });
      } catch (err) {
        console.error(
          "rutasStock.js - /vacunas/stock/total -> no existe el archivo: vacunas-base.json"
        );
      }

      let stockDB = await VacunaStock.aggregate()
        .match(filtro)
        // Opciones Minimos
        .unionWith({
          coll: "VacunaConfigs",
          pipeline: [
            {
              $match: filtro,
            },
            {$project: {_id: 0, insumo: 1, cant_min: 1}},
          ],
        })
        // Insumos
        .unionWith({
          coll: "VacunaInsumos",
          pipeline: [
            {
              $match: filtro.insumo ? {_id: filtro.insumo} : {},
            },
            {
              $project: {
                _id: 0,
                insumo: "$_id",
                insumoDB: {$ifNull: ["$nombre", {$toString: "$_id"}]},
                categoriaDB: {$ifNull: ["$categoria", "$vacio"]},
              },
            },
          ],
        })
        .group({
          _id: {insumo: "$insumo"},
          // agregar los contadores al agrupado
          ...objectSubtotal,
          total: {$sum: "$cantidad"},
          cant_min_prom: {$avg: "$cant_min"},
          insumoDB: {$last: "$insumoDB"},
          categoriaDB: {$last: "$categoriaDB"},
        })
        .addFields({
          // subtotal_Otros -> total - ["$subtotal_<prop>"]
          subtotal_Otros: {
            $subtract: [
              "$total",
              {
                $sum: procedenciaSubtotal.map((procedencia) => `$subtotal_${procedencia}`),
              },
            ],
          },
        })
        .project({
          _id: 0,
        })
        .sort({categoriaDB: 1, insumoDB: 1});

      return res.status(200).json({
        ok: true,
        stock: stockDB,
        procedenciaSubtotal,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Retirar el remito (retirado fecha)
// ============================
app.put(
  "/vacunas/retirar",
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
      let transferenciaDB = null;
      let errors = [];

      // Buscar Transferencia
      transferenciaDB = await VacunaTransferencia.findOne({
        remito: req.body.remito,
      })
        .populate("insumos.insumo", "nombre")
        .exec();
      if (transferenciaDB) {
        if (
          // verificar que sea admin o que "origen" sea de su gestion.
          !(
            req.usuario.vacunas.general?.gestion === 1 ||
            req.usuario.vacunas.gestion?.includes(transferenciaDB.origen.toString())
          )
        ) {
          return errorMessage(res, {message: "Acceso Denegado."}, 401);
        }
        let retirado = Date.now();
        // recorrer insumos
        for (let index = 0; index < transferenciaDB.insumos.length; index++) {
          // Modificar stock
          let stockDB = null;
          stockDB = await modificarStockInc(
            transferenciaDB.origen,
            {
              insumo: transferenciaDB.insumos[index].insumo._id,
              procedencia: transferenciaDB.insumos[index].procedencia,
              lote: transferenciaDB.insumos[index].lote,
              vencimiento: transferenciaDB.insumos[index].vencimiento,
              retirado: transferenciaDB.insumos[index].retirado,
            },
            transferenciaDB.insumos[index].cantidad,
            {resta: true}
          );
          if (!stockDB || stockDB?.err) {
            // o si tira error..
            errors.push({
              message: `${transferenciaDB.insumos[index].insumo.nombre} - Modificar Stock - ${
                stockDB?.err ?? "No contemplado"
              }.`,
              type: "Modificar Stock",
            });
          } else {
            // si es exitoso..
            transferenciaDB.insumos[index].retirado = retirado;
          }
        }

        // Retirar Update
        let retiradoDB = null;
        retiradoDB = await VacunaTransferencia.findOneAndUpdate(
          {
            remito: req.body.remito,
          },
          {insumos: transferenciaDB.insumos},
          {
            new: true,
            runValidators: true,
          }
        ).exec();
        if (retiradoDB === null) {
          errors.push({
            message: `${req.body.remito} - Transferencia Retirada Error`,
            type: "Transferencia Retirar",
          });
        }
      } else {
        return errorMessage(res, {message: "Transferencia no encontrada."}, 404);
      }

      return res.status(errors.length > 0 ? 500 : 202).json({
        ok: errors.length > 0 ? false : true,
        retirado: req.body.remito,
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
// TITULO ¿?¿?¿?¿?
// ============================
// ============================
// XXXXXX  Desarrollar  XXXXXXX
// ============================

module.exports = app;
