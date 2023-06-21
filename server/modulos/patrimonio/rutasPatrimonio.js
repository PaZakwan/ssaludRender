const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectSetUnset, objectToFind, isObjectIdValid} = require(process.env.MAIN_FOLDER +
  "/tools/object");

const Patrimonio = require("./models/patrimonio");

const app = express();

const listaPatrimonio = [
  // 'usuario_creador',
  // Primeros 5 no modificables por usuario normal
  "inventario", // No Insumos
  "area",
  "cantidad", // insumos
  "cantidad_deposito", // insumos

  "categoria",
  "serie", // no insumos / no muebles

  "marca",
  "modelo",
  "dependencia",
  "fec_alta",
  "ubicacion",
  "detalle",
  "funciona",

  "resumen_percance",
  "fec_percance",

  "motivo_baja",
  "fec_baja",

  "verificado",
  "usuario_verifico",
  "fec_verifico",

  "motivo_eliminacion",
  "usuario_eliminacion",
  "fec_eliminacion",

  // PCs
  "micro",
  "mother",
  "memoria_tipo",
  "memoria",
  "disco_tipo",
  "disco",
  "fuente",

  // Monitor
  "PC",
  "pulgadas",
  "tipoPantalla",

  // Impresora
  "impresora_tipo",
  "impresora_multifuncion",

  // Telefono
  "telefono_interno",

  // Insumos
  "subcategoria",
  "compatibilidad",

  //todos
  "estado",
];

// ============================
// Crear Objeto de inventario
// ============================
app.post(
  "/patrimonio",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "informatica", value: 2},
        {prop: "patrimonio", value: 2},
        {prop: "patrimonioArea", value: 2},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // true (borra, los vacios)
      let body = isVacio(_pick(req.body, listaPatrimonio), true);
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      // Revisa permisos del cliente
      if (!req.usuario.informatica || req.usuario.informatica < 2) {
        if (body["categoria"] === "Insumos") {
          return errorMessage(res, {message: "Actividad no autorizada para Insumos."}, 403);
        }
        if (!req.usuario.patrimonio || req.usuario.patrimonio < 2) {
          if (body["area"] !== req.usuario.area) {
            return errorMessage(res, {message: "Actividad no autorizada para Otras Areas."}, 403);
          }
        }
      }

      body["usuario_creador"] = req.usuario._id;
      body["usuario_modifico"] = req.usuario._id;

      let objetoDB = null;
      objetoDB = await new Patrimonio(body).save();
      if (!objetoDB) {
        return errorMessage(res, {message: "Objeto no cargado."}, 400);
      }

      return res.status(201).json({
        ok: true,
        objeto: objetoDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Modificar Objeto por id
// ============================
app.put(
  "/patrimonio/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "informatica", value: 2},
        {prop: "patrimonio", value: 3},
        {prop: "patrimonioArea", value: 3},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // Se quitan de la lista los valores que no serán modificables. Por cuestión de seguridad.
      let listaPatrimonioUpdate = listaPatrimonio.slice();
      // Role Admin
      if (req.usuario.role !== "ADMIN_ROLE") {
        listaPatrimonioUpdate.splice(0, 4); // inventario, area, cantidad(insumos), cantidad_deposito(insumos)
      }

      // false (no borra, los vacios)
      let body = isVacio(_pick(req.body, listaPatrimonioUpdate), false);
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      // Revisa permisos del cliente
      if (!req.usuario.informatica || req.usuario.informatica < 2) {
        if (body["categoria"] === "Insumos") {
          return errorMessage(res, {message: "Actividad no autorizada para Insumos."}, 403);
        }
        if (!req.usuario.patrimonio || req.usuario.patrimonio < 3) {
          if (body["area"] !== req.usuario.area) {
            return errorMessage(res, {message: "Actividad no autorizada para Otras Areas."}, 403);
          }
        }
      }

      body["usuario_modifico"] = req.usuario._id;

      // si no es un insumo lo verifica al editar
      if (body["categoria"] !== "Insumos") {
        // opcion desverificar
        if (!req.body.verificar) {
          body["verificado"] = false;
        } else {
          body["verificado"] = true;
          body["usuario_verifico"] = req.usuario._id;
          body["fec_verifico"] = Date.now();
        }
      } else {
        if (req.usuario.informatica === 3) {
          // opcion desverificar para usuario de rango 3 y en insumos
          if (!req.body.verificar) {
            body["verificado"] = false;
          } else {
            body["verificado"] = false;
            body["usuario_verifico"] = req.usuario._id;
            body["fec_verifico"] = Date.now();
          }
        }
      }

      // Delete del campo si esta como null / "" / undefined /array vacio
      // los ceros los guarda para los casos de insumos con stock 0
      body = objectSetUnset(body, false).dato;

      let objetoDB = null;
      if (!isObjectIdValid(req.params.id)) {
        return errorMessage(res, {message: "El ID de Objeto no es valido."}, 400);
      }
      objetoDB = await Patrimonio.findOneAndUpdate({_id: req.params.id}, body, {
        new: true,
        runValidators: true,
      }).exec();
      if (!objetoDB) {
        return errorMessage(res, {message: "ObjetoDB no editado."}, 400);
      }

      return res.json({
        ok: true,
        objeto: objetoDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// "Valida" Objeto por id
// ============================
app.put(
  "/patrimonio/validar/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "informatica", value: 2},
        {prop: "patrimonio", value: 2},
        {prop: "patrimonioArea", value: 2},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let objetoDB = null;
      if (!isObjectIdValid(req.params.id)) {
        return errorMessage(res, {message: "El ID de Objeto no es valido."}, 400);
      }
      objetoDB = await Patrimonio.findOne({_id: req.params.id}).exec();
      if (!objetoDB) {
        return errorMessage(res, {message: "Objeto no encontrado."}, 404);
      }

      // Revisa permisos del cliente
      if (!req.usuario.informatica || req.usuario.informatica < 2) {
        if (objetoDB["categoria"] === "Insumos") {
          return errorMessage(res, {message: "Actividad no autorizada para Insumos."}, 403);
        }
        if (!req.usuario.patrimonio || req.usuario.patrimonio < 2) {
          if (objetoDB["area"] !== req.usuario.area) {
            return errorMessage(res, {message: "Actividad no autorizada para Otras Areas."}, 403);
          }
        }
      }

      if (!objetoDB.verificado || objetoDB["categoria"] === "Insumos") {
        // si no esta verificado o es insumo => validar
        let validar = {
          usuario_verifico: req.usuario._id,
          fec_verifico: Date.now(),
          verificado: true,
        };
        if (objetoDB["categoria"] === "Insumos") {
          validar["verificado"] = false;
        }

        objetoDB = await Patrimonio.findOneAndUpdate({_id: req.params.id}, validar, {
          new: true,
          runValidators: true,
        }).exec();

        return res.json({
          ok: true,
          objeto: objetoDB,
        });
      } else {
        return errorMessage(res, {message: "El Objeto ya estaba verificado."}, 403);
      }
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// "Borrar" edita estado a false del objeto por id
// ============================
app.delete(
  "/patrimonio/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "informatica", value: 3},
        {prop: "patrimonio", value: 3},
        {prop: "patrimonioArea", value: 3},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      if (!req.query.motivo) {
        return errorMessage(res, {message: "Motivo de Eliminacion Requerido."}, 412);
      }

      if (!isObjectIdValid(req.params.id)) {
        return errorMessage(res, {message: "El ID de Objeto no es valido."}, 400);
      }

      let eliminar = {
        usuario_eliminacion: req.usuario._id,
        fec_eliminacion: Date.now(),
        motivo_eliminacion: req.query.motivo,
        estado: false,

        usuario_verifico: req.usuario._id,
        fec_verifico: Date.now(),
        verificado: true,
      };

      let objetoBorrado = null;
      objetoBorrado = await Patrimonio.findOneAndUpdate({_id: req.params.id}, eliminar, {
        new: true,
        runValidators: true,
      }).exec();
      if (!objetoBorrado) {
        return errorMessage(res, {message: "Objeto no encontrado."}, 404);
      }

      return res.json({
        ok: true,
        objeto: objetoBorrado,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar Objetos de inventario segun filtro, "select", {orden}, "limite"
//    opcional: populate {area, usuario_eliminacion, usuario_verifico}
// ============================
app.get(
  "/patrimonio/buscar",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "informatica", value: 1},
        {prop: "patrimonio", value: 1},
        {prop: "patrimonioArea", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let filtro = req.query.filtro || "todos";
      if (filtro === "todos") {
        filtro = {};
      } else {
        try {
          filtro = JSON.parse(filtro);
          if (typeof filtro !== "object") {
            return errorMessage(res, {message: "El dato de Filtro no es valido."}, 400);
          }
          // true (borra, los vacios)
          filtro = isVacio(filtro, true);
          if (filtro.vacio === true) {
            return errorMessage(res, {message: "No se envió ningún dato."}, 412);
          }
          filtro = filtro.dato;
          filtro = objectToFind(filtro);
        } catch (error) {
          return errorMessage(res, {message: "El dato de Filtro no es valido."}, 400);
        }
      }

      // si no es admin solo los activos
      if (req.usuario.role !== "ADMIN_ROLE") {
        filtro.estado = true;
      }
      // no mostrar insumos a los no informatica.
      if (!(req.usuario.informatica >= 0)) {
        if (filtro.categoria?.$in) {
          // eliminar Insumos del array
          filtro.categoria.$in = filtro.categoria.$in.filter(
            (categoria) => categoria !== "Insumos"
          );
        } else if (!filtro.categoria || filtro.categoria === "Insumos") {
          filtro.categoria = {
            $ne: "Insumos",
          };
        }
      }

      let select = req.query.select || "";
      try {
        select = select.toString();
      } catch (error) {
        return errorMessage(res, {message: "El dato de Select no es valido."}, 400);
      }

      let orden = req.query.orden || JSON.stringify({_id: -1});
      try {
        orden = JSON.parse(orden);
      } catch (error) {
        return errorMessage(res, {message: "El dato para Ordenar no es valido."}, 400);
      }

      let limite = req.query.limite || 0;
      try {
        limite = Number(limite);
      } catch (error) {
        return errorMessage(res, {message: "El dato para Limite no es valido."}, 400);
      }

      let objetosDB = null;

      objetosDB = Patrimonio.find(filtro)
        .collation({locale: "es", numericOrdering: true})
        .select(select)
        .sort(orden)
        .limit(limite);

      let populate = JSON.parse(req.query.populate || null);
      if (populate?.area) {
        objetosDB.populate("area", "area subsecretaria");
      }
      if (populate?.usuario_eliminacion) {
        objetosDB.populate("usuario_eliminacion", "nombre apellido nombreC");
      }
      if (populate?.usuario_verifico) {
        objetosDB.populate("usuario_verifico", "nombre apellido nombreC");
      }
      objetosDB = await objetosDB.exec();

      return res.json({
        ok: true,
        objetos: objetosDB,
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
