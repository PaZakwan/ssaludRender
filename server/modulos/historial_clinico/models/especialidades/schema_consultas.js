const mongoose = require("mongoose");

const ConsultaSchema = {
  usuario_modifico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario modificador es necesario"],
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
    type: [{type: mongoose.Schema.Types.ObjectId, ref: "Profesional"}],
    validate: [
      {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: "{PATH} al menos uno es requerid@.",
      },
    ],
    required: [true, "Al menos un profesional es necesari@."],
  },

  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: [true, "El paciente es necesario"],
  },

  motivo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HistorialMotivo",
    required: [true, "El motivo es necesario"],
  },

  // nombre del modelo donde se guardo
  especialidad: {
    type: String,
    required: [true, "La especialidad es necesaria"],
  },

  edad_valor: {
    // para group etario estadistica
    // calcular en base a la fecha de nacimiento y la consulta..
    type: Number,
    required: [true, "El Valor de la edad es necesario"],
  },
  edad_unidad: {
    // para group etario estadistica
    // calcular en base a la fecha de nacimiento y la consulta..
    type: String,
    required: [true, "La Unidad de edad es necesaria"],
  },

  sexo: {
    // para group etario estadistica
    type: String,
    required: [true, "El sexo del paciente es necesario"],
  },

  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: [true, "El area es necesaria"],
  },

  fecha: {
    type: Date,
    required: [true, "La fecha es necesaria"],
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
    required: [true, "La actividad es necesaria"],
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
