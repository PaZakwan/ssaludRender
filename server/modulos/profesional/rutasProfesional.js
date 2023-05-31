const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaAdmin_Role} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");

const Profesional = require("./models/profesional");

const app = express();

let listaProfesional = [
  // 'usuario_modifico',
  "apellido",
  "nombre",
  "tipo_doc",
  "documento",
  "legajo",
  "especialidades",

  //todos
  "estado",
];

function especialidadBusqueda(filtro, todovacio) {
  if (filtro["especialidades"]) {
    for (const key2 in filtro["especialidades"]) {
      if (filtro["especialidades"].hasOwnProperty(key2)) {
        // console.log(`key: ${key2} - value: ${filtro['especialidades'][key2]}`);
        // console.log(`Type: ${typeof filtro['especialidades'][key2]}`);

        if (filtro["especialidades"][key2] === "$!exists") {
          todovacio = false;
          filtro[`especialidades.${key2}`] = {$exists: false};
        } else if (filtro["especialidades"][key2] === "$exists") {
          todovacio = false;
          filtro[`especialidades.${key2}`] = {$exists: true};
        } else if (
          (typeof filtro["especialidades"][key2] !== "string" || key2 === "unidad_atencion") &&
          filtro["especialidades"][key2] !== "" &&
          filtro["especialidades"][key2] !== null
        ) {
          todovacio = false;
          filtro[`especialidades.${key2}`] = filtro["especialidades"][key2];
        } else if (
          filtro["especialidades"][key2] !== "" &&
          filtro["especialidades"][key2] !== null
        ) {
          todovacio = false;
          filtro[`especialidades.${key2}`] = {
            $regex: `(?i)${filtro["especialidades"][key2].toString()}`,
          };
        }
      }
    }
    delete filtro["especialidades"];
    if (filtro["especialidades.$exists"]) {
      filtro[`especialidades`] = {$exists: true};
      delete filtro["especialidades.$exists"];
    }
  }
  return (respuesta = {
    filtro,
    todovacio,
  });
}

// ============================
// Crear Profesional
// ============================
app.post("/profesional", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    let listaProfesionalCrear = listaProfesional.slice();

    let body = _pick(req.body, listaProfesionalCrear);

    let todovacio = true;
    for (let key in body) {
      if (body.hasOwnProperty(key)) {
        let element = body[key];
        if (element !== "") {
          todovacio = false;
          break;
        }
      }
    }
    if (todovacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }

    body["usuario_modifico"] = req.usuario._id;

    // SALVADO EN BD
    let profesionalDB = await new Profesional(body).save();
    if (!profesionalDB) {
      return errorMessage(res, {message: "Error al guardar el profesional."}, 400);
    }

    return res.status(201).json({
      ok: true,
      profesional: profesionalDB,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ===========================
//  Buscar Profesionales con los filtros recibidos y mostrar select
// ===========================
app.get("/profesional/buscar", [verificaToken], async (req, res) => {
  try {
    // Toma los datos Recibidos
    let filtro = req.query.profesional || "{}";
    try {
      filtro = JSON.parse(filtro);
    } catch (error) {
      return errorMessage(res, {message: "Error con el dato, para el Filtro."}, 412);
    }
    let select = req.query.select || "";
    try {
      select = select.toString();
    } catch (error) {
      return errorMessage(res, {message: "Error con el dato, para el Select."}, 412);
    }
    let populate = req.query.populate || "true";
    try {
      populate = populate.toString();
    } catch (error) {
      return errorMessage(res, {message: "Error con el dato, para el Populate."}, 412);
    }
    // Revisa que se haya enviado por lo menos un filtro y elimina propiedades vacias.
    let todovacio = true;
    for (const key in filtro) {
      if (filtro.hasOwnProperty(key)) {
        if (key === "id") {
          todovacio = false;
          filtro["_id"] = filtro[key];
          delete filtro[key];
        } else if (key === "especialidades") {
          // Funcion filtro Especialidades
          let especialidad = especialidadBusqueda(filtro, todovacio);
          todovacio = especialidad.todovacio;
          filtro = especialidad.filtro;
        } else if (typeof filtro[key] !== "string") {
          todovacio = false;
          filtro[key] = filtro[key];
        } else if (filtro[key] !== "" && filtro[key] !== null) {
          todovacio = false;
          // name: { $regex: '(?i)+palabra' } (?i) es para buscar minusculas y mayusculas
          filtro[key] = {
            $regex: "(?i)" + filtro[key],
          };
        } else {
          // Quita elementos vacios para realizar la futura busqueda
          // delete objeto['propiedad']
          delete filtro[key];
        }
      }
    }
    // if (todovacio === true) {
    //   return errorMessage(res, {message: "No se envió ningún filtro."}, 412);
    // }
    // Revisa permisos del cliente
    if (req.usuario.role !== "ADMIN_ROLE") {
      filtro.estado = true;
    }

    // Prepara la busqueda para la BD
    let profesionalesDB = Profesional.find(filtro)
      .collation({locale: "es", numericOrdering: true})
      .select(select);
    if (populate == "true") {
      profesionalesDB.populate("usuario_modifico", "nombre apellido nombreC");
      profesionalesDB.populate("especialidades.unidad_atencion", "id area zona_us direccion");
    }

    // Realiza la busqueda en la BD
    profesionalesDB = await profesionalesDB.exec();

    return res.status(200).json({
      ok: true,
      profesionales: profesionalesDB,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Modificar Profesional por id
// ============================
app.put("/profesional/:id", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    if (!req.params.id || req.params.id === "undefined") {
      return errorMessage(res, {message: "No se envió el ID."}, 412);
    }

    let listaProfesionalCrear = listaProfesional.slice();

    let body = _pick(req.body, listaProfesionalCrear);

    let todovacio = true;
    for (let key in body) {
      if (body.hasOwnProperty(key)) {
        let element = body[key];
        if (element !== "") {
          todovacio = false;
          break;
        }
      }
    }
    if (todovacio === true) {
      return errorMessage(res, {message: "No se envió ningún filtro."}, 412);
    }

    body["usuario_modifico"] = req.usuario._id;

    // Delete del campo si esta como "null" o ""
    let $set = {};
    let $unset = {};
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        if (key === "especialidades") {
          // Delete del campo si esta como "null" o "" en especialidades
          body["especialidades"].forEach((especial) => {
            for (let key2 in especial) {
              if (especial.hasOwnProperty(key2)) {
                if (
                  especial[key2] === null ||
                  especial[key2] === "" ||
                  especial[key2].length === 0
                ) {
                  delete especial[key2];
                } else {
                  todovacio = false;
                }
              }
            }
          });
          $set["especialidades"] = body["especialidades"];
        } else {
          // Delete del campo si esta como "null" o "" en body
          if (body[key] === null || body[key] === "" || body[key].length === 0) {
            $unset[key] = 1;
          } else {
            $set[key] = body[key];
          }
        }
      }
    }
    body = {$set, $unset};

    // Realiza la busqueda y el Update
    let profesionalDB = await Profesional.findOneAndUpdate({_id: req.params.id}, body, {
      new: true,
      runValidators: true,
    }).exec();

    if (!profesionalDB) {
      return errorMessage(res, {message: "Error al modificar el profesional."}, 400);
    }

    return res.status(200).json({
      ok: true,
      profesional: profesionalDB,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// "Borrar" edita estado a false de Profesional por id
// ============================
app.delete("/profesional/:id", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    if (!req.params.id || req.params.id === "undefined") {
      return errorMessage(res, {message: "No se envió el ID."}, 412);
    }

    // Realiza la busqueda y el Update del estado
    let profesionalBorrado = await Profesional.findOneAndUpdate(
      {_id: req.params.id},
      {estado: false},
      {new: true}
    ).exec();

    if (!profesionalBorrado) {
      return errorMessage(res, {message: "Error al borrar el profesional."}, 400);
    }

    return res.status(200).json({
      ok: true,
      profesional: profesionalBorrado,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// TITULO
// ============================

// ============================
// XXXXXX  Desarrollar  XXXXXXX
// ============================
// ============================
// XXXXXXXXXXXXXXXXXXXXXXXXXXXX
// ============================

module.exports = app;
