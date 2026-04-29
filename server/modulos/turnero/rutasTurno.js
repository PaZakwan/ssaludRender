const express = require("express");

const {verificaToken, verificaArrayPropValue} = require(
  process.env.MAIN_FOLDER + "/middlewares/autenticacion"
);
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectSetUnset} = require(process.env.MAIN_FOLDER + "/tools/object");

const Turno = require("./models/turno");

const app = express();

const listaTurno = [
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

// ============================
// Mostrar todo los Turnos con un desde y con limite(opcional para paginar respuesta).
// ============================
app.get(
  "/turnos",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "turnero", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let desde = req.query.desde ?? 0;
      try {
        desde = Number(desde);
      } catch (error) {
        desde = 0;
      }

      let limite = req.query.limite ?? 0;
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

      let turnosDB = await Turno.find(filtro)
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
        .exec();

      return res.status(200).json({
        ok: true,
        turnos: turnosDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar select de Turnos segun los filtros
// Agregar sort y limit para obtener solo el ultimo
// ============================
app.get(
  "/turnos/buscar",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "turnero", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // Toma los datos Recibidos
      let filtro = req.query.filtro || "";
      try {
        filtro = JSON.parse(filtro);
      } catch (error) {
        return errorMessage(res, {message: "Error con el dato, para Filtro."}, 400);
      }
      let select = req.query.select || "";
      try {
        select = select.toString();
      } catch (error) {
        return errorMessage(res, {message: "Error con el dato, para Select."}, 400);
      }
      let orden = req.query.orden || JSON.stringify({fecha: 1});
      try {
        orden = JSON.parse(orden);
      } catch (error) {
        return errorMessage(res, {message: "Error con el dato, para Orden."}, 400);
      }
      let limite = req.query.limite || 0;
      try {
        limite = Number(limite);
      } catch (error) {
        return errorMessage(res, {message: "Error con el dato, para Limite."}, 400);
      }
      let populate = req.query.populate || "si";

      // Revisa que se haya enviado por lo menos un filtro.
      let todovacio = true;
      for (const key in filtro) {
        if (Object.hasOwn(filtro, key)) {
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
      if (filtro.fechaDesde) {
        filtro["fecha"] = {$gte: filtro.fechaDesde.toISOString()};
        delete filtro["fechaDesde"];
      }

      if (!turnoAdmin(req.usuario)) {
        filtro.estado = true;
      }

      // Prepara la busqueda para la BD
      let turnosDB = Turno.find(filtro)
        .collation({locale: "es", numericOrdering: true})
        .select(select)
        .sort(orden)
        .limit(limite);
      if (populate == "si") {
        turnosDB.populate("uas", "area zona_us direccion");
        turnosDB.populate("profesional", "nombre apellido nombreC");
        turnosDB.populate(
          "paciente",
          "nombre apellido nombreC tipo_doc documento documentoC dir_calle dir_numero direccion telefono hist_salitas"
        );
        turnosDB.populate("derivado", "area zona_us direccion");
      }

      // Realiza la busqueda en la BD
      turnosDB = await turnosDB.exec();

      return res.status(200).json({
        ok: true,
        turnos: turnosDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Registrar Turno
// ============================
app.post(
  "/turno",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "turnero", value: 2}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let body = isVacio({
        dato: req.body,
        pickDato: listaTurno,
        borrar: true,
      });
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      body["usuario_modifico"] = req.usuario._id;

      let turnoDB = await new Turno(body).save();

      if (!turnoDB) {
        return errorMessage(res, {message: "Error al registrar el Turno."}, 400);
      }

      return res.status(201).json({
        ok: true,
        turno: turnoDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Modificar Turno por id
// ============================
app.put(
  "/turno/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "turnero", value: 2}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      if (!req.params.id || req.params.id === "undefined") {
        return errorMessage(res, {message: "No se envió el ID."}, 412);
      }

      let body = isVacio({
        dato: req.body,
        pickDato: listaTurno,
      });
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      body["usuario_modifico"] = req.usuario._id;

      // Delete del campo si esta como null / "" / undefined /array vacio
      body = objectSetUnset({dato: body}).dato;

      // Realiza la busqueda y el Update
      let turnoDB = await Turno.findOneAndUpdate({_id: req.params.id}, body).exec();

      if (!turnoDB) {
        return errorMessage(res, {message: "Error al modificar el Turno."}, 400);
      }

      return res.status(201).json({
        ok: true,
        turno: turnoDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Eliminar/Cancelar Turno por id
// ============================
app.delete(
  "/turno/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "turnero", value: 2}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      if (!req.params.id || req.params.id === "undefined") {
        return errorMessage(res, {message: "No se envió el ID."}, 412);
      }

      let turnoBorrado = await Turno.findOneAndDelete({
        _id: req.params.id,
      }).exec();

      if (!turnoBorrado) {
        return errorMessage(res, {message: "Turno no borrado."}, 400);
      }

      return res.status(201).json({
        ok: true,
        turno: turnoBorrado,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

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
