const mongoose = require("mongoose");

const TuberculosisSchema = new mongoose.Schema({
  _id: false,

  usuario_modifico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario modificador es necesario"],
  },

  indice: [
    {
      _id: false,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Paciente",
        default: null,
      },
      caso: {
        type: String,
        trim: true,
      },
      documento: {
        type: String,
        trim: true,
      },
      tratamiento: {
        type: String,
        trim: true,
      },
    },
  ],
  clasificacion: {
    type: String,
    trim: true,
    required: [true, "La clasificacion es necesaria"],
  },
  tratamiento: {
    type: String,
    trim: true,
  },
  fec_tratamiento: {
    type: Date,
  },
  fec_quimio: {
    type: Date,
  },
  ppd: [
    {
      _id: false,
      fecha: {
        type: String,
        trim: true,
        default: "",
      },
      valor: {
        type: String,
        trim: true,
        default: "",
      },
    },
  ],
  rx_torax: [
    {
      _id: false,
      fecha: {
        type: String,
        trim: true,
        default: "",
      },
      valor: {
        type: String,
        trim: true,
        default: "",
      },
    },
  ],
  laboratorio: {
    type: String,
    trim: true,
  },
  quimioprofilaxis: {
    type: String,
    trim: true,
  },
  duracion: {
    type: String,
    trim: true,
  },
  completado: {
    type: String,
    trim: true,
  },
  observacion: {
    type: String,
    trim: true,
  },
  // Guardar historial (Retratamiento/Recaida) -> Fecha / datos...
  historial: [
    {
      _id: false,
      fecha_guardado: {
        type: Date,
      },
      motivo: {
        type: String,
        trim: true,
      },
      datos: {},
    },
  ],

  estado: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = TuberculosisSchema;
