const express = require("express");

const _pick = require("lodash/pick");

const Profesional = require("./models/profesional");

const {verificaToken, verificaAdmin_Role} = require("../../middlewares/autenticacion");

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
app.post("/profesional", [verificaToken, verificaAdmin_Role], (req, res) => {
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
      return res.status(400).json({
        ok: false,
        err: {
          message: "No se envió ningún dato.",
        },
      });
    }

    body["usuario_modifico"] = req.usuario._id;

    let profesional = new Profesional(body);

    // SALVADO EN BD
    profesional.save((err, profesionalDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.status(201).json({
        ok: true,
        profesional: profesionalDB,
      });
    });
  } catch (error) {
    return res.status(666).json({
      ok: false,
      err: {
        message: `Error Inesperado: ${error}`,
      },
    });
  }
});

// ===========================
//  Buscar Profesionales con los filtros recibidos y mostrar select
// ===========================
app.get("/profesional/buscar", [verificaToken], (req, res) => {
  try {
    // Toma los datos Recibidos
    let filtro = req.query.profesional || "{}";
    try {
      filtro = JSON.parse(filtro);
    } catch (error) {
      return res.status(400).json({
        ok: false,
        err: {
          message: `Error con el dato, para el Filtro.`,
        },
      });
    }
    let select = req.query.select || "";
    try {
      select = select.toString();
    } catch (error) {
      return res.status(400).json({
        ok: false,
        err: {
          message: `Error con el dato, para el Select.`,
        },
      });
    }
    let populate = req.query.populate || "true";
    try {
      populate = populate.toString();
    } catch (error) {
      return res.status(400).json({
        ok: false,
        err: {
          message: `Error con el dato, para el Populate.`,
        },
      });
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
    //     return res.status(400).json({
    //         ok: false,
    //         err: {
    //             message: `No se envió ningún filtro de busqueda.`
    //         }
    //     });
    // };
    // Revisa permisos del cliente
    // if (!pacienteAdmin(req.usuario)) {
    //     filtro.estado = true
    // };

    // Realiza la busqueda en la BD
    if (populate == "true") {
      Profesional.find(filtro)
        .collation({locale: "es", numericOrdering: true})
        .select(select)
        // .sort(orden)
        // .limit(limite)
        .populate("usuario_modifico", "nombre apellido nombreC")
        .populate("especialidades.unidad_atencion", "id area zona_us direccion")
        .exec((err, profesionalesDB) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              err,
            });
          }

          Profesional.countDocuments(filtro, (err, conteo) => {
            if (err) {
              return res.status(500).json({
                ok: false,
                err,
              });
            }

            res.json({
              ok: true,
              profesionales: profesionalesDB,
              cuantos: conteo,
            });
          });
        });
    } else {
      Profesional.find(filtro)
        .collation({locale: "es", numericOrdering: true})
        .select(select)
        // .sort(orden)
        // .limit(limite)
        // .populate('usuario_modifico', 'nombre apellido nombreC')
        // .populate('especialidades.unidad_atencion', 'id area zona_us direccion')
        .exec((err, profesionalesDB) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              err,
            });
          }

          Profesional.countDocuments(filtro, (err, conteo) => {
            if (err) {
              return res.status(500).json({
                ok: false,
                err,
              });
            }

            res.json({
              ok: true,
              profesionales: profesionalesDB,
              cuantos: conteo,
            });
          });
        });
    }
  } catch (error) {
    return res.status(666).json({
      ok: false,
      err: {
        message: `Error Inesperado: ${error}`,
      },
    });
  }
});

// ============================
// Modificar Profesional por id
// ============================
app.put("/profesional/:id", [verificaToken, verificaAdmin_Role], (req, res) => {
  try {
    if (!req.params.id || req.params.id === "undefined") {
      return res.status(400).json({
        ok: false,
        err: {
          message: "No se envió el ID.",
        },
      });
    }
    let id = req.params.id;

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
      return res.status(400).json({
        ok: false,
        err: {
          message: "No se envió ningún dato.",
        },
      });
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
    Profesional.findOneAndUpdate(
      {_id: id},
      body,
      {new: true, runValidators: true, context: "query"},
      (err, profesionalDB) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err,
          });
        }

        if (!profesionalDB) {
          return res.status(400).json({
            ok: false,
            err: {
              message: "Profesional no encontrado.",
            },
          });
        }

        res.json({
          ok: true,
          profesional: profesionalDB,
        });
      }
    );
  } catch (error) {
    return res.status(666).json({
      ok: false,
      err: {
        message: `Error Inesperado: ${error}`,
      },
    });
  }
});

// ============================
// "Borrar" edita estado a false de Profesional por id
// ============================
app.delete("/profesional/:id", [verificaToken, verificaAdmin_Role], (req, res) => {
  try {
    if (!req.params.id || req.params.id === "undefined") {
      return res.status(400).json({
        ok: false,
        err: {
          message: "No se envió el ID.",
        },
      });
    }
    let id = req.params.id;

    let cambiaEstado = {
      estado: false,
    };

    Profesional.findOneAndUpdate(
      {_id: id},
      cambiaEstado,
      {new: true},
      (err, profesionalBorrado) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err,
          });
        }

        if (!profesionalBorrado) {
          return res.status(400).json({
            ok: false,
            err: {
              message: "Profesional no encontrado.",
            },
          });
        }

        res.json({
          ok: true,
          profesional: profesionalBorrado,
        });
      }
    );
  } catch (error) {
    return res.status(666).json({
      ok: false,
      err: {
        message: `Error Inesperado: ${error}`,
      },
    });
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
