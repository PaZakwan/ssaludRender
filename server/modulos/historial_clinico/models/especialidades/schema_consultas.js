const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ConsultaSchema = {
  usuario_modifico: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  profesional: {
    type: [{type: Schema.Types.ObjectId, ref: "Profesional"}],
    validate: [
      (val) => {
        return Array.isArray(val) && val.length >= 1;
      },
      "{PATH} al menos uno es requerido.",
    ],
    required: true,
  },

  paciente: {
    type: Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },

  motivo: {
    type: Schema.Types.ObjectId,
    ref: "HistorialMotivo",
    required: true,
  },

  // nombre del modelo donde se guardo
  especialidad: {
    type: String,
    required: true,
  },

  edad_valor: {
    // para group etario estadistica
    // calcular en base a la fecha de nacimiento y la consulta..
    type: Number,
    required: true,
  },
  edad_unidad: {
    // para group etario estadistica
    // calcular en base a la fecha de nacimiento y la consulta..
    type: String,
    required: true,
  },

  sexo: {
    // para group etario estadistica
    type: String,
    required: true,
  },

  area: {
    type: Schema.Types.ObjectId,
    ref: "Area",
    required: true,
  },

  fecha: {
    type: Date,
    required: true,
  },

  receto_medicamentos: {
    type: Boolean,
  },
  solicito_estudios: {
    type: Boolean,
  },

  // JSON de actividades
  actividad: {
    type: String,
    required: true,
  },

  observacion: {
    type: String,
  },

  derivado: {
    type: String,
    trim: true,
  },

  motivoReferencia: {
    type: String,
    trim: true,
  },

  // Datos(H2 Especialidades)
  // agrega datos especiales en la carpeta de especialidades
};

module.exports = ConsultaSchema;
