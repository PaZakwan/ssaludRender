const express = require("express");

const _pick = require("lodash/pick");

const HistorialClinico = require("./models/historial_clinico_universal");
const HistorialMotivo = require("./models/historial_motivo");
const HistorialMedicacion = require("./models/historial_medicacion");
const Nutricion = require("./models/especialidades/consultas_nutricion");

const {verificaToken, verificaHistorialClinico} = require("../../middlewares/autenticacion");
const {errorMessage} = require("../../tools/errorHandler");
const {isVacio, objectSetUnset} = require("../../tools/object");

const app = express();

let listaHistorial = [
  "_id",
  "id",
  // 'usuario_modifico',
  // 'updatedAt',
  "paciente",
  "profesional_cabecera",
  "observacion",
  "antecedentes_patologicos",
  "embarazada",
  "fuma",
  // "motivos", //[motivosSchema]
];

let listaMotivo = [
  "_id",
  "id",
  "createdAt",
  // 'usuario_modifico',
  // 'updatedAt',
  "paciente",
  "profesional",
  "estado",
  "estadoFecha",
  "motivo_especialidad",
  "severidad",
  "descripcion",
  "evolucion",
  "diagnostico",
  // "consultas", //[consultasSchema]
  // "estudios", //[estudiosSchema]
  // "medicamentos", //[medicamentosSchema]
];

let listaMedicacion = [
  "_id",
  "id",
  // 'usuario_modifico',
  // 'updatedAt',
  "paciente",
  "profesional",
  "medicamento",
  "fecha_inicio",
  "fecha_declaracion_jurada",
  "dias_actualizar_declaracion",
  "estado",
];

async function buscarConsultas(motivoId) {
  try {
    // realizar todas las busquedas en las BD de las especialidades y juntarlas.
    let consultasDB = [];
    consultasDB = [...consultasDB, ...(await Nutricion.find({motivo: motivoId}).exec())];

    return consultasDB;
  } catch (error) {
    if (!!error.errors) {
      return error;
    }
    return false;
  }
}

async function crearConsulta(data) {
  try {
    switch (data.especialidad) {
      case "Nutricion":
        // Si no existe lo crea.
        if (!data._id) {
          consultaTemp = new Nutricion(data);
          consultaTemp = await consultaTemp.save();
        }
        // Existe entonces la edita
        // Delete del campo si esta como "null" o ""
        else {
          $set = {};
          $unset = {};
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              if (data[key] === null || data[key] === "") {
                $unset[key] = 1;
              } else {
                $set[key] = data[key];
              }
            }
          }
          delete $set._id;
          consultaTemp = await Nutricion.findOneAndUpdate(
            {_id: data._id},
            {$set, $unset},
            {
              new: true,
              runValidators: true,
            }
          ).exec();
        }
        return consultaTemp;
      default:
        return false;
    }
  } catch (error) {
    if (!!error.errors) {
      return error;
    }
    return false;
  }
}

function historialAdmin(usuario) {
  try {
    if (usuario.historial_clinico === 3) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

function historialEdit(usuario) {
  try {
    if (usuario.historial_clinico > 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

// ============================
// Mostrar Historial de un Paciente por su ID.
// ============================
app.get(
  "/HistorialClinico/buscar/:pacienteId",
  [verificaToken, verificaHistorialClinico],
  async (req, res) => {
    try {
      let id = req.params.pacienteId;

      if (!id) {
        return errorMessage(res, {message: "Falta información para proceder."}, 412);
      }

      if (!/^[a-fA-F\d]{24}$/.test(id)) {
        return errorMessage(res, {message: "El ID del Paciente no es valido."}, 400);
      }

      let historialDB = await HistorialClinico.findOne({paciente: id}).exec();

      // if (!historialDB) {
      //   return errorMessage(res, {message: "Historial no encontrado."}, 404);
      // }

      res.json({
        ok: true,
        historial: historialDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Modificar Historial o crearlo en caso de no existir
// ============================
app.put(
  "/HistorialClinico/guardar",
  [verificaToken, verificaHistorialClinico],
  async (req, res) => {
    try {
      let body = _pick(req.body, listaHistorial);

      let _id = body._id || null;

      if (!!_id && _id !== null && !/^[a-fA-F\d]{24}$/.test(_id)) {
        return errorMessage(res, {message: "El ID del Historial no es valido."}, 400);
      }

      let todovacio = true;
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          if (body[key] !== "" && body[key] !== null && body[key].length !== 0) {
            todovacio = false;
            break;
          }
        }
      }
      if (todovacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }

      body["usuario_modifico"] = req.usuario._id;

      if (!_id) {
        // Si no existe el historial lo crea.
        let nuevoHistorial = new HistorialClinico(body);

        historialDB = await nuevoHistorial.save();

        return res.status(201).json({
          ok: true,
          historial: historialDB,
        });
      }
      // Existe entonces la edita
      // Delete del campo si esta como "null" o ""
      let $set = {};
      let $unset = {};
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          if (body[key] === null || body[key] === "" || body[key].length === 0) {
            $unset[key] = 1;
          } else {
            $set[key] = body[key];
          }
        }
      }
      body = {$set, $unset};

      delete body.$set._id;
      historialDB = await HistorialClinico.findOneAndUpdate({_id}, body, {
        new: true,
        runValidators: true,
      }).exec();

      if (!historialDB) {
        return errorMessage(res, {message: "Historial no encontrado."}, 404);
      }

      return res.json({
        ok: true,
        historial: historialDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar Motivos de un Paciente por su ID.
// ============================
app.get(
  "/HistorialClinico/motivo/buscar/:pacienteId",
  [verificaToken, verificaHistorialClinico],
  async (req, res) => {
    try {
      let id = req.params.pacienteId;

      if (!id) {
        return errorMessage(res, {message: "Falta información para proceder."}, 412);
      }

      if (!/^[a-fA-F\d]{24}$/.test(id)) {
        return errorMessage(res, {message: "El ID del Paciente no es valido."}, 400);
      }

      let motivosDB = await HistorialMotivo.find({paciente: id}).exec();

      res.json({
        ok: true,
        motivos: motivosDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Modificar Motivo o crearlo en caso de no existir
// ============================
app.put(
  "/HistorialClinico/motivo/guardar",
  [verificaToken, verificaHistorialClinico],
  async (req, res) => {
    try {
      let body = _pick(req.body, listaMotivo);

      let _id = body._id || null;

      if (!!_id && _id !== null && !/^[a-fA-F\d]{24}$/.test(_id)) {
        return errorMessage(res, {message: "El ID del Motivo no es valido."}, 400);
      }

      let todovacio = true;
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          if (body[key] !== "" && body[key] !== null && body[key].length !== 0) {
            todovacio = false;
            break;
          }
        }
      }
      if (todovacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body["usuario_modifico"] = req.usuario._id;

      if (!_id) {
        // Si no existe el motivo lo crea.
        let nuevoMotivo = new HistorialMotivo(body);

        motivoDB = await nuevoMotivo.save();

        return res.status(201).json({
          ok: true,
          motivo: motivoDB,
        });
      }
      // Existe entonces la edita
      // Delete del campo si esta como "null" o ""
      let $set = {};
      let $unset = {};
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          if (body[key] === null || body[key] === "" || body[key].length === 0) {
            $unset[key] = 1;
          } else {
            $set[key] = body[key];
          }
        }
      }
      body = {$set, $unset};

      motivoDB = await HistorialMotivo.findOneAndUpdate({_id}, body, {
        new: true,
        runValidators: true,
      }).exec();

      if (!motivoDB) {
        return errorMessage(res, {message: "Motivo no encontrado."}, 404);
      }

      return res.json({
        ok: true,
        motivo: motivoDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar Consultas del Motivo por su ID.
// ============================
app.get(
  "/HistorialClinico/consulta/buscar/:motivoId",
  [verificaToken, verificaHistorialClinico],
  async (req, res) => {
    try {
      if (!req.params.motivoId) {
        return errorMessage(res, {message: "Falta información para proceder."}, 412);
      }

      if (!/^[a-fA-F\d]{24}$/.test(req.params.motivoId)) {
        return errorMessage(res, {message: "El ID del Motivo no es valido."}, 400);
      }

      // Funcion de busqueda de todas las consultas del motivo
      // let consultasDB = await HistorialMotivo.find({paciente: id}).exec();
      let consultasDB = await buscarConsultas(req.params.motivoId);
      if (consultasDB === false) {
        return errorMessage(
          res,
          {message: "Consulta no creada..\nSe encuentra en Desarrollo."},
          501
        );
      }
      if (!!consultasDB.errors) {
        return errorMessage(res, consultasDB, consultasDB.code);
      }

      res.json({
        ok: true,
        consultas: consultasDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Modificar Consulta o crearla en caso de no existir
// ============================
app.put(
  "/HistorialClinico/consulta/guardar",
  [verificaToken, verificaHistorialClinico],
  async (req, res) => {
    try {
      let body = req.body;

      if (!body.motivo) {
        return errorMessage(res, {message: "Falta información para proceder."}, 412);
      }

      if (!!body._id && body._id !== null && !/^[a-fA-F\d]{24}$/.test(body._id)) {
        return errorMessage(res, {message: "El ID de la Consulta no es valido."}, 400);
      }

      let todovacio = true;
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          if (body[key] !== "" && body[key] !== null && body[key].length !== 0) {
            todovacio = false;
            break;
          }
        }
      }
      if (todovacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body["usuario_modifico"] = req.usuario._id;

      // Funcion que crea y/o guarda cambios de la consulta
      let ConsultaDB = await crearConsulta(body);
      if (ConsultaDB === false) {
        return errorMessage(
          res,
          {message: "Consulta no creada..\nSe encuentra en Desarrollo."},
          501
        );
      }
      if (!!ConsultaDB.errors) {
        return errorMessage(res, ConsultaDB, ConsultaDB.code);
      }

      return res.status(201).json({
        ok: true,
        consulta: ConsultaDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar Medicaciones de un Paciente por su ID.
// ============================
app.get(
  "/HistorialClinico/medicacion/buscar/:pacienteId",
  [verificaToken, verificaHistorialClinico],
  async (req, res) => {
    try {
      let id = req.params.pacienteId;

      if (!id) {
        return errorMessage(res, {message: "Falta información para proceder."}, 412);
      }

      if (!/^[a-fA-F\d]{24}$/.test(id)) {
        return errorMessage(res, {message: "El ID del Paciente no es valido."}, 400);
      }

      let medicacionesDB = await HistorialMedicacion.find({paciente: id}).exec();

      res.json({
        ok: true,
        medicaciones: medicacionesDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Modificar Medicacion o crearla en caso de no existir
// ============================
// Testear
app.put(
  "/HistorialClinico/medicacion/guardar",
  [verificaToken, verificaHistorialClinico],
  async (req, res) => {
    try {
      // false (no borra, los vacios)
      let body = isVacio(_pick(req.body, listaMedicacion), false);
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      if (!!body._id && body._id !== null && !/^[a-fA-F\d]{24}$/.test(body._id)) {
        return errorMessage(res, {message: "El ID de la Medicacion no es valido."}, 400);
      }

      body["usuario_modifico"] = req.usuario._id;

      let medicacionDB = null;
      if (body._id) {
        // update
        body = objectSetUnset(body, "unsetCero").dato;
        let _id = body.$set._id;
        delete body.$set._id;
        medicacionDB = await HistorialMedicacion.findOneAndUpdate({_id}, body, {
          new: true,
          runValidators: true,
        }).exec();
      } else {
        // nuevo
        // true (borra, los vacios)
        body = isVacio(body, true).dato;
        medicacionDB = await new HistorialMedicacion(body).save();
      }

      if (!medicacionDB) {
        return errorMessage(res, {message: "Medicacion no encontrada."}, 404);
      }

      return res.status(201).json({
        ok: true,
        medicacion: medicacionDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
