const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaAdmin_Role} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectSetUnset} = require(process.env.MAIN_FOLDER + "/tools/object");

const Config = require("./models/config");

const app = express();

let listaConfig = [
  // 'usuario_modifico',
  "opcion",
  "datos",
];

// ============================
// Mostrar una config segun la opcion.
// ============================
app.get("/config/:opc", async (req, res) => {
  try {
    let configDB = await Config.findOne({opcion: req.params.opc}).exec();
    if (!configDB) {
      return errorMessage(res, {message: "Configuracion no encontrada."}, 404);
    }
    return res.json({
      ok: true,
      config: configDB,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Modificar Config segun la opcion y crearla en caso de no existir
// ============================
app.put("/config/:opc", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    let body = isVacio({
      dato: _pick(req.body, listaConfig),
    });
    if (body.vacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }
    body = body.dato;

    body["usuario_modifico"] = req.usuario._id;

    let configDB = await Config.findOne({opcion: req.params.opc}).exec();
    // Si no existe lo crea.
    if (!configDB) {
      body = isVacio({
        dato: body,
        borrar: true,
      }).dato;

      configDB = await new Config(body).save();
      return res.status(201).json({
        ok: true,
        config: configDB,
      });
    } else {
      // Delete del campo si esta como null / "" / undefined /array vacio o cero
      body = objectSetUnset({dato: body, unsetCero: true}).dato;

      // Modificando la BD
      configDB = await Config.findOneAndUpdate({_id: configDB.id}, body, {
        new: true,
        runValidators: true,
      }).exec();

      return res.json({
        ok: true,
        config: configDB,
      });
    }
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

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
