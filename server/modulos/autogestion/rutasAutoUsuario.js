const express = require("express");

const bcrypt = require("bcrypt");
const _pick = require("lodash/pick");

const {verificaToken, verificaAdmin_Role} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {mailTransporter} = require(process.env.MAIN_FOLDER + "/mailer");

const AutoUsuario = require("./models/autoUsuario");
const VerificationCode = require("./models/codeTemp");

const app = express();

let listaUsuario = [
  "documento",
  "password",
  "email",

  // Datos
  "nombre",
  "apellido",
  "fec_nac",
  "sexo",
  "telefono",
  "dir_calle",
  "dir_numero",
  "dir_piso",
  "dir_depto",
  "dir_barrio",
  "dir_localidad",
  "zona",
  "oSocial",

  // datos para verificar email
  "estadoEmail",
  "documentoConfirmado",
  "estado",
  "lastLogin",
];

// Indice
//
// Buscar por documento (Admin)
// Todos los usuarios (Admin)
// Un usuario por ID (Admin)
// Un usuario por ID (Perfil)
// Crear usuario Correo (All)

// Verificar Correo (All)
// Verificar Datos Documento (All)
// Nuevo Code Correo (All)

// Modificar usuario Correo (Admin)
// Modificar usuario Correo (Perfil)
// 'Borrar' usuario (Admin)

// ===========================
//  EJEMPLO DE BUSQUEDA... Buscar usuario por documento
// ===========================
app.get(
  "/autoUsuario/documento/:termino",
  [verificaToken, verificaAdmin_Role],
  async (req, res) => {
    try {
      let termino = req.params.termino || "";

      // no caseSensitive.. 'i'..
      let regex = new RegExp(termino, "i");

      let usuariosDB = await AutoUsuario.find({documento: regex}).exec();

      return res.json({
        ok: true,
        usuarios: usuariosDB,
      });
    } catch (err) {
      // Respuesta para el Front en caso de error
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar todos los usuarios con un desde y con limite(opcional para paginar respuesta).
// ============================
app.get("/autoUsuario", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    let desde = req.query.desde || 0;
    try {
      desde = Number(desde);
    } catch (error) {
      desde = 0;
    }

    let limite = req.query.limite || 0;
    try {
      limite = Number(limite);
    } catch (error) {
      limite = 0;
    }

    // segundo parametro que propiedades mostrar ,'usuario nombre email telefono role especialidad estado'
    let usuarios = await AutoUsuario.find({}).skip(desde).limit(limite).sort("apellido").exec();

    return res.json({
      ok: true,
      usuarios,
    });
  } catch (err) {
    // Respuesta para el Front en caso de error
    return errorMessage(res, err, err.code);
  }
});

// =================================
// Mostrar un usuario por ID. ADMIN
// =================================
app.get("/autoUsuario/:id", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    let id = req.params.id;

    if (!id) {
      return errorMessage(res, {message: "Falta información para proceder."}, 412);
    }

    let usuarioDB = await AutoUsuario.findOne({_id: id}).exec();

    if (!usuarioDB) {
      return errorMessage(res, {message: "Usuario no encontrado."}, 404);
    }

    return res.json({
      ok: true,
      usuario: usuarioDB,
    });
  } catch (err) {
    // Respuesta para el Front en caso de error
    return errorMessage(res, err, err.code);
  }
});

// =================================
// Mostrar un usuario por ID. PERFIL
// =================================
app.get("/autoUsuario/perfil/:id", [verificaToken], async (req, res) => {
  try {
    let idSolicitada = req.params.id || "";
    let idSolicitante = req.usuario.id || "";

    // Verifica que los datos consultados sean los suyos y no de otras personas.
    if (idSolicitada !== idSolicitante || idSolicitada === "" || idSolicitante === "") {
      return errorMessage(res, {message: "Acceso Denegado."}, 401);
    }

    let usuarioDB = await AutoUsuario.findOne({_id: idSolicitante}).exec();

    if (!usuarioDB) {
      return errorMessage(res, {message: "Usuario no encontrado."}, 404);
    }

    return res.json({
      ok: true,
      usuario: usuarioDB,
    });
  } catch (err) {
    // Respuesta para el Front en caso de error
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Crear usuario CORREO
// ============================
app.post("/autoUsuario", async (req, res) => {
  try {
    // REHACER... Enviar token con datos del usuario.. y cuando lo valide guardarlos con los datos del token)?
    let listaCrear = listaUsuario.slice();
    // Se quitan de la lista los valores del role y los usados para los derechos de los demás módulos. Por cuestión de seguridad al crear usuarios.
    listaCrear.splice(16);

    // Segundo parametro que propiedades tomar _pick(req.body, ['usuario', 'nombre', ..., ]).
    let body = _pick(req.body, listaCrear);

    let todovacio = true;
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        if (body[key] !== "") {
          todovacio = false;
          break;
        }
      }
    }

    if (todovacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }

    if (body.password) {
      body.password = bcrypt.hashSync(body.password, 10);
    }

    let usuario = new AutoUsuario(body);

    // GUARDA USUARIO EN LA BD
    let usuarioDB = await usuario.save();

    // CREA TOKEN PARA VERIFICAR MAIL
    let codeTemp = {};
    codeTemp["codigo"] = require("crypto").randomBytes(3).toString("hex");
    codeTemp["documento"] = usuarioDB["documento"];
    codeTemp["solicitante"] = usuarioDB["id"];

    codeTemp = new VerificationCode(codeTemp);

    // GUARDA TOKEN EN LA BD
    let codeDB = await codeTemp.save();

    // CREAR EMAIL
    let mailOptions = {
      to: `${usuarioDB.nombre} <${usuarioDB.email}>`,
      subject: "Verificacion de E-mail",
      text: `
                Buenos Dias ${usuarioDB.nombreC} (${usuarioDB.documento}).

                Ultimo paso del registro y podra comenzar a utilizar los servicios disponibles,
                por favor ingrese el siguiente CODIGO donde se lo requiera: ${codeDB.codigo}
                o dirigase al siguiente link: https://${process.env.BASE_URL}/autogestion/verify/${usuarioDB.documento}?code=${codeDB.codigo}

                En caso de que usted no haya solicitado acceso al servicio web de la Secretaria de Salud del Municipio de Moreno, ignore este Mensaje y disculpe las molestias.
            `,
      html: `<img src="cid:tituloUnico"/>
                <p> Buenos Dias <b> ${usuarioDB.nombreC} (${usuarioDB.documento}) </b>.</p>
                <p> Ultimo paso del registro y podra comenzar a utilizar los servicios disponibles, </p>
                <p> por favor ingrese el siguiente <b> codigo </b> donde se lo requiera <b>${codeDB.codigo}</b> </p>
                <p> o dirigase al siguiente link <b> <u> <a href="https://${process.env.BASE_URL}/autogestion/verify/${usuarioDB.documento}?code=${codeDB.codigo}" target="_blank">
                Verificar direccion de E - mail </a></u> </b></p>
                <br>
                <p> En caso de que usted no haya solicitado acceso al servicio web de la Secretaria de Salud del Municipio de Moreno, ignore este Mensaje y disculpe las molestias. </p>
            `,
    };

    // IMPORT DEL TRANSPORTADOR DE MAILS EN SENDER
    let sender = await mailTransporter;

    // ENVIAR MAIL
    let respuestaMail = await sender.sendMail(mailOptions);

    // Respuesta para el Front satisfactoria
    if (process.env.NODE_ENV === "dev") {
      console.log("mail:", respuestaMail.response);
      return res.status(201).json({
        ok: true,
        usuario: usuarioDB,
        mailDev: respuestaMail,
      });
    }

    return res.status(201).json({
      ok: true,
      usuario: usuarioDB,
    });
  } catch (err) {
    // Respuesta para el Front en caso de error
    return errorMessage(res, err, err.code);
  }
});

// ============================
// VERIFICAR E-MAIL ADMINS
// ============================

// ============================
// DESARROLLAR '/autoUsuario/verify/:id/:code'
// ============================

// ============================
// Nuevo Code E-MAIL
// ============================

// ============================
// DESARROLLAR '/autoUsuario/newCode/:id'
// ============================

// DESARROLLAR VER TODO DEBAJO DE ACA

// ===============================
// Modificar usuario por id ADMINS
// ===============================
app.put("/autoUsuario/:id", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    let listaUsuarioUpdate = listaUsuario.slice();
    // Se quitan de la lista los valores que no serán modificables. Por cuestión de seguridad.
    listaUsuarioUpdate.splice(0, 1);

    let body = _pick(req.body, listaUsuarioUpdate);

    let todovacio = true;
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        const element = body[key];
        if (element !== "") {
          todovacio = false;
          break;
        }
      }
    }
    if (todovacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }

    if (body.password) {
      body.password = bcrypt.hashSync(body.password, 10);
    }

    let usuarioDB = await AutoUsuario.findOneAndUpdate({_id: req.params.id}, body, {
      new: true,
      runValidators: true,
    }).exec();
    if (!usuarioDB) {
      return errorMessage(res, {message: "Usuario no encontrado."}, 404);
    }

    return res.status(200).json({
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
app.put("/autoUsuario/perfil/:id", [verificaToken], async (req, res) => {
  try {
    let idSolicitada = req.params.id;
    let idSolicitante = req.usuario.id;

    // Verifica que los datos a editar sean los suyos y no de otras personas.
    if (idSolicitada !== idSolicitante) {
      return errorMessage(res, {message: "Acceso Denegado."}, 401);
    }

    // Se selecciona de la lista los valores que serán modificables. Por cuestión de seguridad.
    let listaUsuarioUpdate = ["email", "telefono", "password", "password_anterior"];

    let body = _pick(req.body, listaUsuarioUpdate);

    // Verifica que haya datos para editar.
    let todovacio = true;
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        const element = body[key];
        if (element !== "") {
          todovacio = false;
          break;
        }
      }
    }
    if (todovacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }

    // Verifica que el password anterior haya sido enviado.
    if (!body.password_anterior) {
      return errorMessage(res, {message: "Falta información para proceder."}, 412);
    }

    let usuarioDB = await AutoUsuario.findOne({_id: idSolicitada}).exec();
    if (!usuarioDB) {
      return errorMessage(res, {message: "Usuario no encontrado."}, 404);
    }

    // Verifica que el password anterior sea correcto.
    if (!bcrypt.compareSync(body.password_anterior, usuarioDB.password)) {
      return errorMessage(res, {message: "Contraseña incorrecta."}, 401);
    }

    // Encripta nuevo password de ser necesario.
    if (body.password) {
      body.password = bcrypt.hashSync(body.password, 10);
    }

    // Actualiza usuario.
    let usuarioUpdateDB = await AutoUsuario.findOneAndUpdate({_id: idSolicitada}, body, {
      new: true,
      runValidators: true,
    }).exec();
    if (!usuarioUpdateDB) {
      return errorMessage(res, {message: "Usuario no Actualizado."}, 404);
    }

    return res.status(200).json({
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
app.delete("/autoUsuario/:id", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    let usuarioBorrado = await AutoUsuario.findOneAndUpdate(
      {_id: req.params.id},
      {
        estado: false,
      },
      {new: true}
    ).exec();

    if (!usuarioBorrado) {
      return errorMessage(res, {message: "Usuario no encontrado."}, 404);
    }

    return res.status(200).json({
      ok: true,
      usuario: usuarioBorrado,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

module.exports = app;
