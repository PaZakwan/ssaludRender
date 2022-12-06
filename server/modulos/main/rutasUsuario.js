const express = require("express");

const bcrypt = require("bcrypt");
const _pick = require("lodash/pick");

const Usuario = require("./models/usuario");
const {verificaToken, verificaAdmin_Role} = require("../../middlewares/autenticacion");
const {errorMessage} = require("../../tools/errorHandler");
const {isVacio, objectSetUnset} = require("../../tools/object");

const app = express();

let listaUsuario = [
  "usuario",
  "nombre",
  "apellido",
  "area",
  "password",
  "actividad",
  "email",
  "telefono",
  // borra con splice(8)
  "role",
  "estado",
  //   permisos
  "bromatologia",
  "informatica",
  "patrimonio",
  "patrimonioArea",
  "tuberculosis",
  "turnero",
  "historial_clinico",
  "farmacia",
];

// ============================
// Mostrar todos los usuarios con un desde y con limite(opcional para paginar respuesta).
// ============================
app.get("/usuario", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    let desde = Number(req.query.desde) || 0;

    let limite = Number(req.query.limite) || 0;

    // segundo parametro que propiedades mostrar ,'usuario nombre email telefono role especialidad estado'
    let usuarios = await Usuario.find({})
      .sort({apellido: 1, nombre: 1})
      .skip(desde)
      .limit(limite)
      .populate("area", "area")
      .populate("farmacia.entregas", "area")
      .populate("farmacia.stock", "area")
      .populate("farmacia.gestion", "area")
      .exec();

    return res.json({
      ok: true,
      usuarios,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// =================================
// Mostrar un usuario por ID. ADMIN
// =================================
app.get("/usuario/:id", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    let usuarioDB = await Usuario.findOne({_id: req.params.id})
      .populate("area", "area")
      .populate("farmacia.entregas", "area")
      .populate("farmacia.stock", "area")
      .populate("farmacia.gestion", "area")
      .exec();

    if (!usuarioDB) {
      return errorMessage(res, {message: "Usuario no encontrado."}, 404);
    }

    return res.json({
      ok: true,
      usuario: usuarioDB,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// =================================
// Mostrar un usuario por ID. PERFIL
// =================================
app.get("/usuario/perfil/:id", [verificaToken], async (req, res) => {
  try {
    // Verifica que los datos consultados sean los suyos y no de otras personas.
    if (req.params.id !== req.usuario.id) {
      return errorMessage(res, {message: "Acceso Denegado."}, 401);
    }

    let usuarioDB = await Usuario.findOne({_id: req.params.id})
      .populate("area", "area")
      .populate("farmacia.entregas", "area")
      .populate("farmacia.stock", "area")
      .populate("farmacia.gestion", "area")
      .exec();

    if (!usuarioDB) {
      return errorMessage(res, {message: "Usuario no encontrado."}, 404);
    }

    return res.json({
      ok: true,
      usuario: usuarioDB,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Crear usuario NO TOKEN/ADMINS
// ============================
app.post("/usuario", async (req, res) => {
  try {
    let listaCrear = listaUsuario.slice();
    // Se quitan de la lista los valores del role y los usados para los derechos de los demás módulos. Por cuestión de seguridad al crear usuarios.
    listaCrear.splice(8);

    // Segundo parametro que propiedades tomar _pick(req.body, ['usuario', 'nombre', 'email', 'password', 'role', 'telefono', 'especialidad', 'estado']).
    let body = _pick(req.body, listaCrear);

    body = isVacio(body, true);
    if (body.vacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }
    body = body.dato;

    if (body.password) {
      body.password = bcrypt.hashSync(body.password, 10);
    }

    let usuario = new Usuario(body);

    usuario = await usuario.save();

    return res.status(201).json({
      ok: true,
      usuario,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Crear usuario ADMINS
// ============================
app.post("/usuario/admin", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    let body = _pick(req.body, listaUsuario);

    body = isVacio(body, true);
    if (body.vacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }
    body = body.dato;

    if (body.password) {
      body.password = bcrypt.hashSync(body.password, 10);
    }

    let usuario = new Usuario(body);

    usuario = await usuario.save();

    return res.status(201).json({
      ok: true,
      usuario,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ===============================
// Modificar usuario por id ADMINS
// ===============================
app.put("/usuario/:id", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    if (!req.params.id || req.params.id == "undefined") {
      return errorMessage(res, {message: "Falta información para proceder (ID)."}, 412);
    }

    let listaUsuarioUpdate = listaUsuario.slice();
    // Se quitan de la lista los valores que no serán modificables. Por cuestión de seguridad.
    listaUsuarioUpdate.splice(0, 1);

    let body = _pick(req.body, listaUsuarioUpdate);

    body = isVacio(body, false);
    if (body.vacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }
    body = body.dato;

    // Revisa que no se le saque el derecho de admin al user "admin"
    let usuarioDB = await Usuario.findOne({_id: req.params.id}).exec();

    if (!usuarioDB) {
      return errorMessage(res, {message: "Usuario no encontrado."}, 404);
    }

    if (usuarioDB.usuario === "admin") {
      if (body.role !== "ADMIN_ROLE") {
        return errorMessage(res, {message: "Usuario, Rol: Debe ser Administrador."}, 401);
      }
      if (body.estado !== "true") {
        return errorMessage(res, {message: "Usuario, Estado: Debe estar Activo."}, 401);
      }
      if (body.password) {
        return errorMessage(
          res,
          {message: "Usuario, Contraseña: Solo modificable desde su perfil."},
          401
        );
      }
      // body.role = "ADMIN_ROLE";
      // body.estado = true;
      // delete body.password;
    }

    if (body.password) {
      body.password = bcrypt.hashSync(body.password, 10);
    }

    // Delete del campo si esta como null / "" / undefined /array vacio
    body = objectSetUnset(body, "unsetCero").dato;

    // Modificacion de los datos
    usuarioDB = await Usuario.findOneAndUpdate({_id: req.params.id}, body, {
      new: true,
      runValidators: true,
    }).exec();

    return res.json({
      ok: true,
      usuario: usuarioDB,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ===============================
// Modificar usuario por id PERFIL
// ===============================
app.put("/usuario/perfil/:id", [verificaToken], async (req, res) => {
  try {
    if (!req.params.id || req.params.id == "undefined") {
      return errorMessage(res, {message: "Falta información para proceder (ID)."}, 412);
    }
    // Verifica que los datos a editar sean los suyos y no de otras personas.
    if (req.params.id !== req.usuario.id) {
      return errorMessage(res, {message: "Acceso Denegado."}, 401);
    }

    // Se selecciona de la lista los valores que serán modificables. Por cuestión de seguridad.
    let body = _pick(req.body, ["password_anterior", "password", "actividad", "email", "telefono"]);

    // Verifica que haya datos para editar.
    body = isVacio(body, false);
    if (body.vacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }
    body = body.dato;

    // Verifica que el password anterior haya sido enviado.
    if (!body.password_anterior) {
      return errorMessage(res, {message: "Falta Contraseña Anterior para proceder."}, 412);
    }

    // Verifica que el password anterior sea correcto.
    let usuarioDB = await Usuario.findOne({_id: req.params.id}).exec();

    if (!usuarioDB) {
      return errorMessage(res, {message: "Usuario no encontrado."}, 404);
    }

    if (!bcrypt.compareSync(body.password_anterior, usuarioDB.password)) {
      return errorMessage(res, {message: "Acceso Denegado, Contraseña Anterior incorrecta."}, 401);
    }

    // Encripta nuevo password de ser necesario.
    if (body.password) {
      body.password = bcrypt.hashSync(body.password, 10);
    }

    // Delete del campo si esta como null / "" / undefined /array vacio
    body = objectSetUnset(body, "unsetCero").dato;

    // Actualiza usuario.
    usuarioDB = await Usuario.findOneAndUpdate({_id: req.params.id}, body, {
      new: true,
      runValidators: true,
    }).exec();

    return res.json({
      ok: true,
      usuario: usuarioDB,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// "Borrar" edita estado a false de usuario por id
// ============================
app.delete("/usuario/:id", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    if (!req.params.id || req.params.id == "undefined") {
      return errorMessage(res, {message: "Falta información para proceder (ID)."}, 412);
    }
    let usuarioDB = await Usuario.findOne({_id: req.params.id}).exec();

    if (!usuarioDB) {
      return errorMessage(res, {message: "Usuario no encontrado."}, 404);
    }

    if (usuarioDB.usuario === "admin") {
      return errorMessage(res, {message: "Usuario no Modificable."}, 401);
    }

    let usuarioBorrado = await Usuario.findOneAndUpdate(
      {_id: req.params.id},
      {
        estado: false,
      },
      {new: true}
    ).exec();

    return res.json({
      ok: true,
      usuario: usuarioBorrado,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

module.exports = app;
