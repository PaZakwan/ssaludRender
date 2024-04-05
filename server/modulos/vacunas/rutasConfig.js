const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, isObjectIdValid} = require(process.env.MAIN_FOLDER + "/tools/object");
const VacunaConfig = require("./models/vacuna_config");

const app = express();

let listaOpciones = ["_id", "area", "insumo", "cant_min", "opciones", "destinos"];

// ============================
// Mostrar Opciones por area
// ============================
app.get(
  "/vacunas/opciones",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "vacunas.config", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let opciones = null;

      opciones = await VacunaConfig.aggregate()
        .match({area: isObjectIdValid(req.query.area)})
        .group({
          _id: {area: "$area"},
          opciones: {
            $push: {
              _id: "$_id",
              insumo: "$insumo",
              cant_min: "$cant_min",
            },
          },
        })
        .project({
          _id: 0,
          area: "$_id.area",
          opciones: 1,
        });

      return res.status(200).json({
        ok: true,
        opciones: opciones[0] ?? {area: req.query.area, opciones: []},
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar cant_min en el area de los [insumos] solicitados.
// ============================
app.get(
  "/vacunas/opciones/solicitud",
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

      let opcionesDB = await VacunaConfig.aggregate()
        .match(filtro)
        .project({
          _id: 0,
          insumo: 1,
          cant_min: 1,
        })
        .sort({insumo: -1});

      return res.status(200).json({
        ok: true,
        opciones: opcionesDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Modificar o Crear Opciones
// ============================
app.put(
  "/vacunas/opciones",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "vacunas.config", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let body = isVacio({
        dato: _pick(req.body, listaOpciones),
      });
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      if (body.destinos) {
        body.destinos = [...new Set([body.area, ...body.destinos])];
      } else {
        body.destinos = [body.area];
      }

      let respuesta = {error: [], ok: []};

      for (let index = 0; index < body.destinos.length; index++) {
        // destino body.destinos[index]
        for (let opc of body.opciones) {
          // opc.insumo opc.cant_min
          let opcionesGuardadas = await VacunaConfig.findOneAndUpdate(
            {area: body.destinos[index], insumo: opc.insumo},
            {
              area: body.destinos[index],
              insumo: opc.insumo,
              cant_min: opc.cant_min,
            },
            {
              new: true,
              upsert: true,
              setDefaultsOnInsert: true,
            }
          ).exec();
          if (!opcionesGuardadas) {
            respuesta.error.push({area: body.destinos[index], insumo: opc.insumo});
          } else {
            respuesta.ok.push({
              area: body.destinos[index],
              insumo: opc.insumo,
              cant_min: opc.cant_min,
            });
          }
        }
      }

      if (respuesta.error.length > 0) {
        return errorMessage(res, {message: "Error al guardar las Opciones."}, 400);
      }

      return res.status(201).json({
        ok: true,
        respuesta: respuesta,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Borrar la opcion del insumo en el area
// ============================
app.delete(
  "/vacunas/opciones/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "vacunas.config", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let opcionBorrada = await VacunaConfig.deleteOne({_id: req.params.id}).exec();

      if (opcionBorrada?.deletedCount == 0) {
        return errorMessage(res, {message: "Opcion no encontrada."}, 404);
      }

      return res.json({
        ok: true,
        opcionBorrada,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Borrar las opciones del area
// ============================
// app.delete(
//   "/vacunas/opciones/:area",
//   [
//     verificaToken,
//     (req, res, next) => {
//       req.verificacionArray = [{prop: "vacunas.config", value: 1}];
//       next();
//     },
//     verificaArrayPropValue,
//   ],
//   async (req, res) => {
//     try {
//       let opcionesBorradas = await VacunaConfig.deleteMany({area: req.params.area}).exec();

//       if (opcionesBorradas.deletedCount == 0) {
//         return errorMessage(res, {message: "Opciones no encontradas."}, 404);
//       }
//       // return errorMessage(res, {message: "En Desarrollo."}, 404);

//       return res.json({
//         ok: true,
//         opcionesBorradas,
//       });
//     } catch (err) {
//       return errorMessage(res, err, err.code);
//     }
//   }
// );

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
