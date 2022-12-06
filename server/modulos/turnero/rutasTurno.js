const express = require("express");

const _pick = require("lodash/pick");

const Turno = require("./models/turno");
const {verificaToken, verificaTurno} = require("../../middlewares/autenticacion");

const app = express();

let listaTurno = [
  // 'usuario_modifico',
  "uas",
  "fecha",
  "profesional",
  "especialidad",
  "horario",
  "amplitudTurno",
  "paciente",
  "fase",
  "derivado",

  //todos
  "estado",
];

function turnoAdmin(usuario) {
  try {
    if (usuario.turnero === 3) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

function turnoEdit(usuario) {
  try {
    if (usuario.turnero > 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

// ============================
// Mostrar todo los Turnos con un desde y con limite(opcional para paginar respuesta).
// ============================
app.get("/turnos", [verificaToken, verificaTurno], (req, res) => {
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

    // Revisa permisos del cliente
    let filtro = {};

    if (!turnoAdmin(req.usuario)) {
      filtro = {estado: true};
    }

    Turno.find(filtro)
      .skip(desde)
      .limit(limite)
      .sort("fecha")
      .populate("uas", "area zona_us direccion")
      .populate("profesional", "nombre apellido nombreC")
      .populate(
        "paciente",
        "nombre apellido nombreC tipo_doc documento documentoC dir_calle dir_numero direccion telefono"
      )
      .populate("derivado", "area zona_us direccion")
      .exec((err, turnos) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err,
          });
        }

        Turno.countDocuments(filtro, (err, cuantos) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              err,
            });
          }

          res.json({
            ok: true,
            turnos,
            cuantos,
          });
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

// ============================
// Mostrar select de Turnos segun los filtros
// Agregar sort y limit para obtener solo el ultimo
// ============================
app.get("/turnos/buscar", [verificaToken, verificaTurno], (req, res) => {
  try {
    // Toma los datos Recibidos
    let filtro = req.query.filtro || "";
    try {
      filtro = JSON.parse(filtro);
    } catch (error) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "No se envió ningún dato, para Filtro.",
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
          message: "No se envió ningún dato, para Select",
        },
      });
    }
    let orden = req.query.orden || JSON.stringify({fecha: 1});
    try {
      orden = JSON.parse(orden);
    } catch (error) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "No se envió ningún dato, para Orden",
        },
      });
    }
    let limite = req.query.limite || 0;
    try {
      limite = Number(limite);
    } catch (error) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "No se envió ningún dato, para Limite",
        },
      });
    }
    let populate = req.query.populate || "si";

    // Revisa que se haya enviado por lo menos un filtro.
    let todovacio = true;
    for (const key in filtro) {
      if (filtro.hasOwnProperty(key)) {
        if (key === "fecha" || key === "fechaDesde") {
          todovacio = false;
          filtro[key] = new Date(filtro[key]);
        } else if (
          typeof filtro[key] !== "string" ||
          key === "id" ||
          key === "uas" ||
          key === "profesional" ||
          key === "paciente"
        ) {
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
      return res.status(400).json({
        ok: false,
        err: {
          message: "No se envió ningún filtro.",
        },
      });
    }
    if (filtro.fechaDesde) {
      filtro["fecha"] = {$gte: filtro.fechaDesde.toISOString()};
      delete filtro["fechaDesde"];
    }

    if (!turnoAdmin(req.usuario)) {
      filtro.estado = true;
    }

    // Realiza la busqueda en la BD
    if (populate == "si") {
      Turno.find(filtro)
        .collation({locale: "es", numericOrdering: true})
        .select(select)
        .sort(orden)
        .limit(limite)
        .populate("uas", "area zona_us direccion")
        .populate("profesional", "nombre apellido nombreC")
        .populate(
          "paciente",
          "nombre apellido nombreC tipo_doc documento documentoC dir_calle dir_numero direccion telefono hist_salitas"
        )
        .populate("derivado", "area zona_us direccion")
        .exec((err, turnos) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              err: {
                message: err.toString(),
              },
            });
          }
          Turno.countDocuments(filtro, (err, cuantos) => {
            if (err) {
              return res.status(500).json({
                ok: false,
                err: {
                  message: err.toString(),
                },
              });
            }
            res.json({
              ok: true,
              turnos,
              cuantos,
            });
          });
        });
    } else {
      Turno.find(filtro)
        .collation({locale: "es", numericOrdering: true})
        .select(select)
        .sort(orden)
        .limit(limite)
        .exec((err, turnos) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              err: {
                message: err.toString(),
              },
            });
          }
          Turno.countDocuments(filtro, (err, cuantos) => {
            if (err) {
              return res.status(500).json({
                ok: false,
                err: {
                  message: err.toString(),
                },
              });
            }
            res.json({
              ok: true,
              turnos,
              cuantos,
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
// Registrar Turno
// ============================
app.post("/turno", [verificaToken, verificaTurno], (req, res) => {
  try {
    if (!turnoEdit(req.usuario)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Acceso Denegado.",
        },
      });
    }

    let listaTurnoCrear = listaTurno.slice();

    let body = _pick(req.body, listaTurnoCrear);

    let todovacio = true;
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        // Delete del campo si esta como "null" o ""
        if (body[key] === null || body[key] === "") {
          delete body[key];
        } else {
          todovacio = false;
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

    let turno = new Turno(body);

    turno.save((err, turnoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.status(201).json({
        ok: true,
        turno: turnoDB,
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

// ============================
// Modificar Turno por id
// ============================
app.put("/turno/:id", [verificaToken, verificaTurno], (req, res) => {
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

    if (!turnoEdit(req.usuario)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Acceso Denegado.",
        },
      });
    }

    let listaTurnoUpdate = listaTurno.slice();

    let body = _pick(req.body, listaTurnoUpdate);

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
        const element = body[key];
        if (element === null || element === "" || element.length === 0) {
          $unset[key] = 1;
        } else {
          $set[key] = element;
        }
      }
    }
    body = {$set, $unset};

    // Realiza la busqueda y el Update
    Turno.findOneAndUpdate({_id: id}, body, {new: true, runValidators: true}, (err, turnoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!turnoDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Turno no encontrado.",
          },
        });
      }

      res.json({
        ok: true,
        turno: turnoDB,
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

// ============================
// Eliminar/Cancelar Turno por id
// ============================
app.delete("/turno/:id", [verificaToken, verificaTurno], (req, res) => {
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

    if (!turnoEdit(req.usuario)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Acceso Denegado.",
        },
      });
    }

    Turno.findOneAndDelete({_id: id}, (err, turnoDeleted) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!turnoDeleted) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Turno no encontrado.",
          },
        });
      }

      res.json({
        ok: true,
        turno: turnoDeleted,
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
