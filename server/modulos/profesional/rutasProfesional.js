const express = require("express");

const {verificaToken, verificaAdmin_Role} = require(
  process.env.MAIN_FOLDER + "/middlewares/autenticacion"
);
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectSetUnset} = require(process.env.MAIN_FOLDER + "/tools/object");

const Profesional = require("./models/profesional");

const app = express();

const listaProfesional = [
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

const especialidadBusqueda = function (filtro, todovacio) {
  if (filtro["especialidades"]) {
    for (const key2 in filtro["especialidades"]) {
      if (Object.hasOwn(filtro["especialidades"], key2)) {
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
  return {
    filtro,
    todovacio,
  };
};

// ============================
// Crear Profesional
// ============================
app.post("/profesional", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    let body = isVacio({
      dato: req.body,
      pickDato: listaProfesional,
    });
    if (body.vacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }
    body = body.dato;

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
      if (Object.hasOwn(filtro, key)) {
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
    // Revisa permisos del cliente
    if (req.usuario.role !== "ADMIN_ROLE") {
      if (todovacio === true) {
        return errorMessage(res, {message: "No se envió ningún filtro."}, 412);
      }
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

    let body = isVacio({
      dato: req.body,
      pickDato: listaProfesional,
    });
    if (body.vacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }
    body = body.dato;

    body["usuario_modifico"] = req.usuario._id;

    // Delete del campo si esta como null / "" / undefined /array vacio
    body = objectSetUnset({dato: body}).dato;

    // Realiza la busqueda y el Update
    let profesionalDB = await Profesional.findOneAndUpdate({_id: req.params.id}, body).exec();

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
      {runValidators: false}
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
