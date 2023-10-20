const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectSetUnset} = require(process.env.MAIN_FOLDER + "/tools/object");

const HistorialClinico = require("./models/historial_clinico_universal");
const HistorialMotivo = require("./models/historial_motivo");
const HistorialMedicacion = require("./models/historial_medicacion");
const Nutricion = require("./models/especialidades/consultas_nutricion");

const app = express();

let listaHistorial = [
  "_id",
  "id",
  // 'usuario_modifico',
  // 'updatedAt',
  "paciente",
  "profesional_cabecera",
  "zona_sanitaria",
  "prematuro",
  "peso_nacer_menor_2500",
  "peso_nacer_mayor_3800",
  "antecedentes_patologicos",
  "inmunodeprimida",
  "fuma",
  "riesgo",
  "embarazada",
  "puerpera",
  "personal_salud",
  "personal_esencial",
  "observacion",
  // "embarazada_semana" //virtual
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
  "area",
  "medicamento",
  "fecha_inicio",
  "fecha_declaracion_jurada",
  "dias_declaracion_por_vencer",
  "dias_declaracion_vencida",
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

async function crearConsulta(body) {
  try {
    switch (body.especialidad) {
      case "Nutricion":
        let consultaTemp = null;
        if (body._id) {
          // update
          body = objectSetUnset({dato: body, unsetCero: false, unsetBoolean: true}).dato;
          let _id = body.$set._id;
          delete body.$set._id;
          consultaTemp = await Nutricion.findOneAndUpdate({_id}, body, {
            new: true,
            runValidators: true,
          }).exec();
        } else {
          // nuevo
          // true (borra, los vacios)
          body = isVacio(body, true).dato;
          consultaTemp = await new Nutricion(body).save();
        }

        if (!consultaTemp) {
          return errorMessage(res, {message: "Consulta no encontrada."}, 404);
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

// ============================
// Mostrar Historial de un Paciente por su ID.
// ============================
app.get(
  "/HistorialClinico/buscar/:pacienteId",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "historial_clinico", value: 1},
        // {prop: "farmacia.entregas"},
        {prop: "farmacia.vacunas"},
        {prop: "farmacia.general.reportes", value: 1},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
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
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [
        {prop: "historial_clinico", value: 2},
        // {prop: "farmacia.entregas"},
        {prop: "farmacia.vacunas"},
        {prop: "farmacia.general.admin", value: 1},
      ];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // false (no borra, los vacios)
      let body = isVacio(_pick(req.body, listaHistorial), false);
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      if (!!body._id && body._id !== null && !/^[a-fA-F\d]{24}$/.test(body._id)) {
        return errorMessage(res, {message: "El ID del Historial no es valido."}, 400);
      }

      body["usuario_modifico"] = req.usuario._id;

      let historialDB = null;
      if (body._id) {
        // update
        body = objectSetUnset({dato: body, unsetCero: true, unsetBoolean: true}).dato;
        let _id = body.$set._id;
        delete body.$set._id;
        historialDB = await HistorialClinico.findOneAndUpdate({_id}, body, {
          new: true,
          runValidators: true,
        }).exec();
      } else {
        // nuevo
        // true (borra, los vacios)
        body = isVacio(body, true).dato;
        historialDB = await new HistorialClinico(body).save();
      }

      if (!historialDB) {
        return errorMessage(res, {message: "Historial no encontrado."}, 404);
      }

      return res.status(201).json({
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
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "historial_clinico", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
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
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "historial_clinico", value: 2}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // false (no borra, los vacios)
      let body = isVacio(_pick(req.body, listaMotivo), false);
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      if (!!body._id && body._id !== null && !/^[a-fA-F\d]{24}$/.test(body._id)) {
        return errorMessage(res, {message: "El ID del Motivo no es valido."}, 400);
      }

      body["usuario_modifico"] = req.usuario._id;

      let motivoDB = null;
      if (body._id) {
        // update
        body = objectSetUnset({dato: body, unsetCero: true, unsetBoolean: true}).dato;
        let _id = body.$set._id;
        delete body.$set._id;
        motivoDB = await HistorialMotivo.findOneAndUpdate({_id}, body, {
          new: true,
          runValidators: true,
        }).exec();
      } else {
        // nuevo
        // true (borra, los vacios)
        body = isVacio(body, true).dato;
        motivoDB = await new HistorialMotivo(body).save();
      }

      if (!motivoDB) {
        return errorMessage(res, {message: "Motivo no encontrado."}, 404);
      }

      return res.status(201).json({
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
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "historial_clinico", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      if (!req.params.motivoId) {
        return errorMessage(res, {message: "Falta información para proceder."}, 412);
      }

      if (!/^[a-fA-F\d]{24}$/.test(req.params.motivoId)) {
        return errorMessage(res, {message: "El ID del Motivo no es valido."}, 400);
      }

      // Funcion de busqueda de todas las consultas del motivo
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
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "historial_clinico", value: 2}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // false (no borra, los vacios)
      let body = isVacio(req.body, false);
      if (body.vacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 412);
      }
      body = body.dato;

      if (!body.motivo) {
        return errorMessage(res, {message: "Falta información para proceder."}, 412);
      }

      if (!!body._id && body._id !== null && !/^[a-fA-F\d]{24}$/.test(body._id)) {
        return errorMessage(res, {message: "El ID de la Consulta no es valida."}, 400);
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
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "historial_clinico", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
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
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "historial_clinico", value: 2}];
      next();
    },
    verificaArrayPropValue,
  ],
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
        body = objectSetUnset({dato: body, unsetCero: true, unsetBoolean: true}).dato;
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
