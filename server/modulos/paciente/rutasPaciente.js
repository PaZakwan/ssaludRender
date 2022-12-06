const express = require("express");

const _pick = require("lodash/pick");

const Paciente = require("./models/paciente");
const {verificaToken, verificaPaciente} = require("../../middlewares/autenticacion");
const {errorMessage} = require("../../tools/errorHandler");
const {isVacio, objectSetUnset} = require("../../tools/object");

const app = express();

let listaPaciente = [
  // 'usuario_modifico',
  "apellido",
  "nombre",
  "tipo_doc",
  "documento",
  "dir_calle",
  "dir_numero",
  "dir_piso",
  "dir_depto",
  "dir_barrio",
  "dir_localidad",
  "dir_descripcion",
  "telefono",
  "email",
  "fec_nac",
  "sexo",
  "oSocial",
  "oSocialNumero",
  "hist_salitas",

  //todos
  "estado",
];

function pacienteAdmin(usuario) {
  try {
    if (usuario.tuberculosis === 3 || usuario.turnero === 3 || usuario.historial_clinico === 3) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

function pacienteEdit(usuario) {
  try {
    if (
      usuario.tuberculosis > 1 ||
      usuario.turnero > 1 ||
      usuario.historial_clinico > 1 ||
      usuario.farmacia?.general?.admin ||
      (usuario.farmacia &&
        Array.isArray(usuario.farmacia.entregas) &&
        usuario.farmacia.entregas.length >= 1)
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

function tuberculosisBusqueda(filtro, todovacio) {
  if (filtro["hist_tuberculosis"]) {
    for (const key2 in filtro["hist_tuberculosis"]) {
      if (filtro["hist_tuberculosis"].hasOwnProperty(key2)) {
        // console.log(`key: ${key2} - value: ${filtro['hist_tuberculosis'][key2]}`);
        // console.log(`Type: ${typeof filtro['hist_tuberculosis'][key2]}`);

        if (filtro["hist_tuberculosis"][key2] === "$!exists") {
          todovacio = false;
          filtro[`hist_tuberculosis.${key2}`] = {$exists: false};
        } else if (filtro["hist_tuberculosis"][key2] === "$exists") {
          todovacio = false;
          filtro[`hist_tuberculosis.${key2}`] = {$exists: true};
        } else if (typeof filtro["hist_tuberculosis"][key2] !== "string" || key2 === "indice.id") {
          todovacio = false;
          filtro[`hist_tuberculosis.${key2}`] = filtro["hist_tuberculosis"][key2];
        } else if (
          filtro["hist_tuberculosis"][key2] !== "" &&
          filtro["hist_tuberculosis"][key2] !== null
        ) {
          todovacio = false;
          filtro[`hist_tuberculosis.${key2}`] = {
            $regex: `(?i)${filtro["hist_tuberculosis"][key2].toString()}`,
          };
        }
      }
    }
    delete filtro["hist_tuberculosis"];
    if (filtro["hist_tuberculosis.$exists"]) {
      filtro[`hist_tuberculosis`] = {$exists: true};
      delete filtro["hist_tuberculosis.$exists"];
    }
  }
  return (respuesta = {
    filtro,
    todovacio,
  });
}

function historialSalitasBusqueda(filtro, todovacio) {
  if (filtro["hist_salitas"]) {
    if (/^[a-fA-F\d]{24}$/.test(filtro["hist_salitas"]["area"])) {
      // ID de Mongo
      todovacio = false;
    } else {
      // delete filtro['propiedad']
      delete filtro["hist_salitas"]["area"];
    }
    if (!!filtro["hist_salitas"]["historial"]) {
      todovacio = false;
    } else {
      // delete filtro['propiedad']
      delete filtro["hist_salitas"]["historial"];
    }

    if (Object.keys(filtro["hist_salitas"]).length === 0) {
      delete filtro["hist_salitas"];
    } else if (Object.keys(filtro["hist_salitas"]).length >= 1) {
      filtro["hist_salitas"]["$elemMatch"] = {};
      if (!!filtro["hist_salitas"]["area"]) {
        filtro["hist_salitas"]["$elemMatch"]["area"] = filtro["hist_salitas"]["area"];
        delete filtro["hist_salitas"]["area"];
      }
      if (!!filtro["hist_salitas"]["historial"]) {
        filtro["hist_salitas"]["$elemMatch"]["historial"] = new RegExp(
          filtro["hist_salitas"]["historial"].toString(),
          "i"
        );
        delete filtro["hist_salitas"]["historial"];
      }
    }
  }

  return (respuesta = {
    filtro,
    todovacio,
  });
}

// ============================
// Mostrar todo los pacientes con un desde y con limite(opcional para paginar respuesta).
// ============================
app.get("/paciente", [verificaToken, verificaPaciente], async (req, res) => {
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

    let select = req.query.select || "";
    try {
      select = select.toString();
    } catch (error) {
      select = "";
    }

    // Revisa permisos del cliente
    let filtro = {};

    if (!pacienteAdmin(req.usuario)) {
      filtro = {estado: true};
    }

    let pacientes = await Paciente.find(filtro)
      .select(select)
      .skip(desde)
      .limit(limite)
      .sort("apellido")
      // .populate("usuario_modifico", "nombre apellido nombreC")
      .populate(
        "hist_tuberculosis.indice.id",
        "nombre apellido nombreC tipo_doc documento documentoC hist_tuberculosis.tratamiento"
      )
      .exec();

    return res.json({
      ok: true,
      pacientes,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Mostrar un Paciente por ID.
// ============================
app.get("/paciente/buscar/:id", [verificaToken, verificaPaciente], async (req, res) => {
  try {
    if (!req.params.id) {
      return errorMessage(res, {message: "Falta información para proceder."}, 412);
    }
    if (!/^[a-fA-F\d]{24}$/.test(req.params.id)) {
      return errorMessage(res, {message: "El ID de Busqueda no es valido."}, 400);
    }

    let pacienteDB = await Paciente.findOne({_id: req.params.id})
      // .populate("usuario_modifico", "nombre apellido nombreC")
      .populate(
        "hist_tuberculosis.indice.id",
        "nombre apellido nombreC tipo_doc documento documentoC hist_tuberculosis.tratamiento"
      )
      .exec();

    if (!pacienteDB) {
      return errorMessage(res, {message: "Paciente no encontrado."}, 404);
    }

    return res.json({
      ok: true,
      paciente: pacienteDB,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Mostrar select de Pacientes segun los filtros
// Agregar sort y limit para obtener solo el ultimo
// ============================
app.get("/paciente/buscar", [verificaToken, verificaPaciente], async (req, res) => {
  try {
    let filtro = req.query.filtro || "todos";
    if (filtro !== "todos") {
      try {
        filtro = JSON.parse(filtro);
        if (filtro !== "todos" && typeof filtro !== "object") {
          return errorMessage(res, {message: "El dato de Filtro no es valido."}, 400);
        }
      } catch (error) {
        return errorMessage(res, {message: "El dato de Filtro no es valido."}, 400);
      }
    }

    let select = req.query.select || "";
    try {
      select = select.toString();
    } catch (error) {
      return errorMessage(res, {message: "El dato de Select no es valido."}, 400);
    }

    let orden = req.query.orden || JSON.stringify({apellido: 1});
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

    let populate = req.query.populate || "si";

    // ver si buscar todos o por filtro
    if (filtro !== "todos") {
      // Revisa que se haya enviado por lo menos un filtro.
      let todovacio = true;
      for (const key in filtro) {
        if (filtro.hasOwnProperty(key)) {
          if (key === "hist_tuberculosis") {
            // Funcion filtro Tuberculosis
            let tuberculosis = tuberculosisBusqueda(filtro, todovacio);
            filtro = tuberculosis.filtro;
            todovacio = tuberculosis.todovacio;
          } else if (key === "hist_salitas") {
            // Funcion filtro historial de salitas
            let hist = historialSalitasBusqueda(filtro, todovacio);
            filtro = hist.filtro;
            todovacio = hist.todovacio;
          } else if (typeof filtro[key] !== "string") {
            todovacio = false;
            filtro[key] = filtro[key];
          } else if (/^[a-fA-F\d]{24}$/.test(filtro[key])) {
            // ID de Mongo
            todovacio = false;
            filtro[key] = filtro[key];
          } else if (filtro[key] !== "" && filtro[key] !== null) {
            todovacio = false;
            // name: { $regex: '(?i)+palabra' } (?i) es para buscar minusculas y mayusculas
            filtro[key] = {
              $regex: `(?i)${filtro[key].toString()}`,
            };
          } else {
            // Quita elementos vacios para realizar la futura busqueda
            // delete filtro['propiedad']
            delete filtro[key];
          }
        }
      }
      if (todovacio === true) {
        return errorMessage(res, {message: "No se envió ningún filtro."}, 412);
      }
    } else {
      filtro = {};
    }

    // Revisa permisos del cliente
    if (!pacienteAdmin(req.usuario)) {
      filtro.estado = true;
    }

    // Realiza la busqueda en la BD
    let pacientes = null;
    if (populate === "si") {
      pacientes = await Paciente.find(filtro)
        .collation({locale: "es", numericOrdering: true})
        .select(select)
        .sort(orden)
        .limit(limite)
        // .populate("usuario_modifico", "nombre apellido nombreC")
        .populate(
          "hist_tuberculosis.indice.id",
          "nombre apellido nombreC tipo_doc documento documentoC hist_tuberculosis.tratamiento"
        )
        .exec();
    } else {
      pacientes = await Paciente.find(filtro)
        .collation({locale: "es", numericOrdering: true})
        .select(select)
        .sort(orden)
        .limit(limite)
        .exec();
    }

    return res.json({
      ok: true,
      pacientes,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Registrar Paciente
// ============================
app.post("/paciente", [verificaToken, verificaPaciente], async (req, res) => {
  try {
    if (!pacienteEdit(req.usuario)) {
      return errorMessage(res, {message: "Acceso Denegado."}, 401);
    }

    let listaPacienteCrear = listaPaciente.slice();

    let body = _pick(req.body, listaPacienteCrear);

    body = isVacio(body, true);
    if (body.vacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }
    body = body.dato;

    body["usuario_modifico"] = req.usuario._id;

    let paciente = new Paciente(body);

    paciente = await paciente.save();

    return res.status(201).json({
      ok: true,
      paciente,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Modificar Paciente por id
// ============================
app.put("/paciente/:id", [verificaToken, verificaPaciente], async (req, res) => {
  try {
    if (!req.params.id || req.params.id == "undefined") {
      return errorMessage(res, {message: "Falta información para proceder (ID)."}, 412);
    }

    if (!pacienteEdit(req.usuario)) {
      return errorMessage(res, {message: "Acceso Denegado."}, 401);
    }

    let listaPacienteUpdate = listaPaciente.slice();

    let body = _pick(req.body, listaPacienteUpdate);

    body = isVacio(body, false);
    if (body.vacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }
    body = body.dato;

    body["usuario_modifico"] = req.usuario._id;

    // Delete del campo si esta como null / "" / undefined /array vacio
    body = objectSetUnset(body).dato;

    // Realiza la busqueda y el Update
    let pacienteDB = await Paciente.findOneAndUpdate({_id: req.params.id}, body, {
      new: true,
      runValidators: true,
    }).exec();

    if (!pacienteDB) {
      return errorMessage(res, {message: "Paciente no encontrado."}, 404);
    }

    return res.json({
      ok: true,
      paciente: pacienteDB,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Modificar hist_tuberculosis de Paciente por id
// ============================
app.put("/tuberculosis/paciente/:id", [verificaToken, verificaPaciente], (req, res) => {
  try {
    if (!req.params.id || req.params.id == "undefined") {
      return errorMessage(res, {message: "Falta información para proceder (ID)."}, 412);
    }

    if (req.usuario.tuberculosis < 2) {
      return errorMessage(res, {message: "Acceso Denegado."}, 401);
    }

    let listaPacienteTuberculosis = listaPaciente.slice();
    // Se Agrega hist_tuberculosis a la lista para su modificacion
    listaPacienteTuberculosis.push("hist_tuberculosis");

    let body = _pick(req.body, listaPacienteTuberculosis);

    // Revisa que se haya enviado por lo menos una propiedad en hist_tuberculosis.
    let todovacio = true;
    let $set = {};
    let $unset = {};
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        const element = body[key];
        if (key === "hist_tuberculosis") {
          // Delete del campo si esta como "null" o "" en hist_tuberculosis
          for (let key in body["hist_tuberculosis"]) {
            if (body["hist_tuberculosis"].hasOwnProperty(key)) {
              let element = body["hist_tuberculosis"][key];
              if (element === null || element === "" || element.length === 0) {
                delete body["hist_tuberculosis"][key];
              } else {
                todovacio = false;
              }
            }
          }
          $set["hist_tuberculosis"] = body["hist_tuberculosis"];
        } else {
          // Delete del campo si esta como "null" o "" en body
          if (element === null || element === "" || element.length === 0) {
            $unset[key] = 1;
          } else {
            $set[key] = element;
          }
        }
      }
    }
    if (todovacio === true) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "No se envió ningún dato.",
        },
      });
    }
    $set["usuario_modifico"] = req.usuario._id;
    $set["hist_tuberculosis"]["usuario_modifico"] = req.usuario._id;
    body = {$set, $unset};

    // Realiza la busqueda y el Update
    Paciente.findOneAndUpdate(
      {_id: req.params.id},
      body,
      {new: true, runValidators: true},
      (err, pacienteDB) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err,
          });
        }

        if (!pacienteDB) {
          return res.status(400).json({
            ok: false,
            err: {
              message: "Paciente no encontrado.",
            },
          });
        }

        res.json({
          ok: true,
          paciente: pacienteDB,
        });
      }
    );
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// "Borrar" edita estado a false del Paciente por id
// ============================

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
