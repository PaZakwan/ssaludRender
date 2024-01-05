const express = require("express");
const axios = require("axios");

const _pick = require("lodash/pick");

const {verificaToken} = require(process.env.MAIN_FOLDER + "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectSetUnset} = require(process.env.MAIN_FOLDER + "/tools/object");

const Paciente = require("./models/paciente");

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
  "telefono_alt",
  "email",
  "fec_nac",
  "sexo",
  "oSocial",
  "oSocialNumero",
  "hist_salitas",
  "fec_fallecimiento",
  "validadoRENAPER",

  // PS
  // "ps_id",
  "doc_responsable",

  //todos
  "estado",
];

const verificaPacienteLectura = (req, res, next) => {
  let usuario = req.usuario;
  if (
    usuario.tuberculosis > 0 ||
    usuario.turnero > 0 ||
    usuario.historial_clinico > 0 ||
    usuario.farmacia?.general?.reportes ||
    usuario.farmacia?.general?.admin ||
    usuario.farmacia?.entregas?.length >= 1 ||
    usuario.farmacia?.vacunas?.length >= 1
  ) {
    return next();
  } else {
    return errorMessage(res, {message: "Actividad no autorizada."}, 403);
  }
};

const verificaPacienteAdmin = (usuario) => {
  try {
    if (
      usuario.tuberculosis === 3 ||
      usuario.turnero === 3 ||
      usuario.historial_clinico === 3 ||
      usuario.farmacia?.general?.admin
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const verificaPacienteEdit = (usuario) => {
  try {
    if (
      usuario.tuberculosis > 1 ||
      usuario.turnero > 1 ||
      usuario.historial_clinico > 1 ||
      usuario.farmacia?.general?.admin ||
      usuario.farmacia?.entregas?.length >= 1 ||
      usuario.farmacia?.vacunas?.length >= 1
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

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
  return {
    filtro,
    todovacio,
  };
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
app.get("/paciente", [verificaToken, verificaPacienteLectura], async (req, res) => {
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

    if (!verificaPacienteAdmin(req.usuario)) {
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
app.get("/paciente/buscar/:id", [verificaToken, verificaPacienteLectura], async (req, res) => {
  try {
    if (!req.params.id) {
      return errorMessage(res, {message: "Falta información para proceder."}, 412);
    }
    if (!/^[a-fA-F\d]{24}$/.test(req.params.id)) {
      return errorMessage(res, {message: "El ID de Busqueda no es valido."}, 400);
    }

    let filtro = {_id: req.params.id};
    // Revisa permisos del cliente
    if (!verificaPacienteAdmin(req.usuario)) {
      filtro.estado = true;
    }

    let pacienteDB = await Paciente.findOne(filtro)
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
app.get("/paciente/buscar", [verificaToken, verificaPacienteLectura], async (req, res) => {
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
    if (!verificaPacienteAdmin(req.usuario)) {
      filtro.estado = true;
    }

    // Prepara la consulta para la BD
    let pacientesDB = Paciente.find(filtro)
      .collation({locale: "es", numericOrdering: true})
      .select(select)
      .sort(orden)
      .limit(limite);
    if (populate === "si") {
      // pacientesDB.populate("usuario_modifico", "nombre apellido nombreC");
      pacientesDB.populate(
        "hist_tuberculosis.indice.id",
        "nombre apellido nombreC tipo_doc documento documentoC hist_tuberculosis.tratamiento"
      );
    }

    // Realiza la busqueda en la BD
    pacientesDB = await pacientesDB.exec();

    return res.json({
      ok: true,
      pacientes: pacientesDB,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Registrar Paciente
// ============================
app.post("/paciente", [verificaToken, verificaPacienteLectura], async (req, res) => {
  try {
    if (!verificaPacienteEdit(req.usuario)) {
      return errorMessage(res, {message: "Acceso Denegado."}, 401);
    }

    let listaPacienteCrear = listaPaciente.slice();

    let body = isVacio({
      dato: _pick(req.body, listaPacienteCrear),
      borrar: true,
    });
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
app.put("/paciente/:id", [verificaToken, verificaPacienteLectura], async (req, res) => {
  try {
    if (!verificaPacienteEdit(req.usuario)) {
      return errorMessage(res, {message: "Acceso Denegado."}, 401);
    }

    if (!req.params.id || req.params.id == "undefined") {
      return errorMessage(res, {message: "Falta información para proceder (ID)."}, 412);
    }

    let listaPacienteUpdate = listaPaciente.slice();

    let body = isVacio({
      dato: _pick(req.body, listaPacienteUpdate),
    });
    if (body.vacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }
    body = body.dato;

    body["usuario_modifico"] = req.usuario._id;

    // Delete del campo si esta como null / "" / undefined /array vacio
    body = objectSetUnset({dato: body}).dato;

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
app.put(
  "/tuberculosis/paciente/:id",
  [verificaToken, verificaPacienteLectura],
  async (req, res) => {
    try {
      if (req.usuario.tuberculosis < 2) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      if (!req.params.id || req.params.id == "undefined") {
        return errorMessage(res, {message: "Falta información para proceder (ID)."}, 412);
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
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      $set["usuario_modifico"] = req.usuario._id;
      $set["hist_tuberculosis"]["usuario_modifico"] = req.usuario._id;
      body = {$set, $unset};

      // Realiza la busqueda y el Update
      let pacienteDB = await Paciente.findOneAndUpdate({_id: req.params.id}, body, {
        new: true,
        runValidators: true,
      }).exec();

      if (!pacienteDB) {
        return errorMessage(res, {message: "Error al guardar el Paciente."}, 400);
      }

      return res.status(200).json({
        ok: true,
        paciente: pacienteDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// "Borrar" edita estado a false del Paciente por id
// ============================
// ============================
// XXXXXX  Desarrollar  XXXXXXX
// ============================

// ============================
// Buscar en RENAPER
// ============================
let RENAPER = {tkn: "", date: ""};
app.get("/paciente/renaper/buscar", [verificaToken, verificaPacienteLectura], async (req, res) => {
  try {
    // verificar que pueda modificar pacientes
    if (!verificaPacienteEdit(req.usuario)) {
      return errorMessage(res, {message: "Acceso Denegado."}, 401);
    }
    // return errorMessage(res, {message: "El sistema no tiene usuario de RENAPER."}, 444);
    // verificar que el sistema cuanta con la APIKEY del renaper
    // process.env.RENAPER_USR;
    // process.env.RENAPER_PSR;
    if (!process.env.RENAPER_USR || !process.env.RENAPER_PSR) {
      return errorMessage(
        res,
        {message: "El sistema no cuenta con acceso a RENAPER al momento."},
        403
      );
    }

    // verificar que este la data necesaria
    // req.query.dni; req.query.sx
    if (!req.query.dni || !req.query.sx) {
      return errorMessage(res, {message: "Falta información para proceder (DNI y/o Sexo)."}, 412);
    }

    // verificar que no haya sido verificado, si el paciente ya se encuentra en la BD y Verificado => denegar
    if (
      await Paciente.findOne({
        documento: req.query.dni,
        sexo: req.query.sx,
        validadoRENAPER: true,
      }).exec()
    ) {
      return errorMessage(
        res,
        {message: "Actividad no autorizada, persona se encuentra verificada."},
        403
      );
    }

    // sino existe token o fecha diferente/vencido... refresh token.
    if (
      !RENAPER.tkn ||
      RENAPER.date !==
        new Date().toLocaleString("es-AR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
    ) {
      let respuesta = await axios.post(
        "https://apirenaper.idear.gov.ar/CHUTROFINAL/API_ABIS/Autorizacion/token.php",
        {
          username: process.env.RENAPER_USR,
          password: process.env.RENAPER_PSR,
        },
        {headers: {"content-type": "application/x-www-form-urlencoded"}}
      );

      if (respuesta?.data?.data?.token) {
        RENAPER.tkn = respuesta?.data?.data?.token;
        RENAPER.date = new Date().toLocaleString("es-AR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      } else {
        if (respuesta?.data?.data?.mensaje) {
          return errorMessage(res, {message: `RENAPER: ${respuesta.data.data.mensaje}.`}, 503);
        }
        return errorMessage(
          res,
          {message: "Servicio de RENAPER no accesible, re-intente mas tarde."},
          503
        );
      }
    }

    // datos del paciente del renaper.
    let pacienteRENAPER = null;
    let respuesta = await axios.get(
      `https://apirenaper.idear.gov.ar/apidatos/porDniSexo.php?dni=${req.query.dni}&sexo=${req.query.sx}`,
      {
        headers: {
          Authorization: `Bearer ${RENAPER.tkn}`,
        },
      }
    );
    if (respuesta?.data?.apellido) {
      // darle formato a los datos necesarios
      // modificar ciudad (localidad)
      switch (respuesta.data.ciudad) {
        case "CUARTEL V":
          respuesta.data.ciudad = "Cuartel V";
          break;

        case "FRANCISCO ALVAREZ":
          respuesta.data.ciudad = "Francisco Alvarez";
          break;

        case "LA REJA":
          respuesta.data.ciudad = "La Reja";
          break;

        case "MORENO":
          respuesta.data.ciudad = "Moreno";
          break;

        case "PASO DEL REY":
          respuesta.data.ciudad = "Paso Del Rey";
          break;

        case "TRUJUI":
          respuesta.data.ciudad = "Trujui";
          break;

        default:
          respuesta.data.ciudad = "Otros";
          break;
      }
      pacienteRENAPER = {
        tipo_doc: "DNI",
        documento: req.query.dni,
        sexo: req.query.sx == "M" ? "Masculino" : "Femenino",

        apellido: respuesta.data.apellido,
        nombre: respuesta.data.nombres,
        fec_nac: respuesta.data.fecha_nacimiento.split("/").reverse().join("-"),

        dir_calle: respuesta.data.calle,
        dir_numero: respuesta.data.numero,
        dir_piso: respuesta.data.piso,
        dir_depto: respuesta.data.departamento,
        dir_barrio: respuesta.data.barrio,
        dir_localidad: respuesta.data.ciudad,

        fec_fallecimiento:
          respuesta.data.mensaje_fallecido === "SIN AVISO DE FALLECIMIENTO"
            ? ""
            : respuesta.data.mensaje_fallecido,

        validadoRENAPER: true,
      };
    } else {
      if (respuesta?.data?.mensaje) {
        return errorMessage(res, {message: `RENAPER: ${respuesta.data.mensaje}.`}, 503);
      }
      return errorMessage(
        res,
        {message: "Servicio de RENAPER no accesible, re-intente mas tarde."},
        503
      );
    }

    // {
    //   "id_tramite_principal": "3434355",
    //   "id_tramite_tarjeta_reimpresa": 0,
    //   "ejemplar": "B",
    //   "vencimiento": "12/11/2027",
    //   "emision": "12/11/2012",
    //   "cuil": "20XXXXXXX4",

    //   "apellido": "Perez",
    //   "nombres": "Juan",
    //   "fecha_nacimiento": "20/09/1955",

    //   "calle": "22",
    //   "numero": "S/N",
    //   "piso": "",
    //   "departamento": "",
    //   "barrio": "0",
    //   "ciudad": "LA PLATA",

    //   "monoblock": "",
    //   "municipio": "LA PLATA","MORENO"
    //   "provincia": "BUENOS AIRES",
    //   "pais": "ARGENTINA",

    //   "codigo_postal": "",
    //   "codigo_fallecido": 0,
    //   "mensaje_fallecido": "SIN AVISO DE FALLECIMIENTO",

    //   "id_ciudadano": "45789342",
    //   "codigo": 99,
    //   "mensaje": "DNI/PAS Firmado"
    // }

    return res.json({
      ok: true,
      paciente: pacienteRENAPER,
    });
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
