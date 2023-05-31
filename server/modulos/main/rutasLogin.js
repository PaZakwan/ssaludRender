const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");

const Usuario = require("./models/usuario");

const app = express();

app.post("/login", async (req, res) => {
  try {
    let body = req.body;
    if (!body.password || !body.usuario) {
      return errorMessage(res, {message: "Usuario y/o contraseña requeridos."}, 400);
    }

    let usuarioDB = await Usuario.findOne({usuario: body.usuario}).exec();

    if (!usuarioDB) {
      return errorMessage(res, {message: "Usuario y/o contraseña incorrectos."}, 400);
    }
    if (usuarioDB.estado === false) {
      return errorMessage(
        res,
        {message: "Usuario desactivado.\n Comuníquese con un administrador."},
        400
      );
    }
    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return errorMessage(res, {message: "Usuario y/o contraseña incorrectos."}, 400);
    }

    // Actualizar lastLogin
    let usuarioLoginDB = await Usuario.findOneAndUpdate(
      {usuario: body.usuario},
      {lastLogin: Date.now()},
      {new: true, runValidators: true}
    ).exec();

    if (!usuarioLoginDB) {
      return errorMessage(res, {message: "Usuario y/o contraseña incorrectos."}, 400);
    }

    return res.status(201).json({
      ok: true,
      usuario: usuarioLoginDB,
      token: jwt.sign(
        {
          usuario: usuarioLoginDB,
        },
        process.env.SEED,
        {expiresIn: process.env.CADUCIDAD_TOKEN}
      ),
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

module.exports = app;
