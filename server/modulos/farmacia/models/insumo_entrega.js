const mongoose = require("mongoose");

const InsumoEntregaSchema = new mongoose.Schema({
  usuario_creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario creador es necesario"],
  },

  fecha: {
    type: Date,
    default: Date.now,
  },
  origen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: [true, "El Area que entrega es necesaria."],
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: [true, "El Paciente que recibe es necesario."],
  },
  oSocial: {
    type: String,
  },
  // IOMA (Obligatorio)
  oSocialNumero: {
    type: String,
  },
  // PAMI (Obligatorio)
  doc_tramite: {
    type: String,
  },
  fecha_prescripcion: {
    type: Date,
  },
  accion_terapeutica: {
    nombre: {
      type: String,
      trim: true,
    },
    codigo_provincia: {
      type: String,
      uppercase: true,
      trim: true,
    },
    codigo_atc: {
      type: String,
      uppercase: true,
      trim: true,
    },
  },
  profesional_MP: {
    type: Number,
  },
  profesional_MN: {
    type: Number,
  },

  insumo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Insumo",
    required: [true, "El Insumo a entregar es necesario."],
  },
  cantidad: {
    type: Number,
    required: [true, "La Cantidad a entregar del mismo es necesaria."],
  },
  procedencia: {
    type: String,
    default: "Carga inicial",
  },
  lote: {
    type: String,
  },
  vencimiento: {
    type: Date,
  },

  retirado: {
    type: Date,
  },
});

// Para busquedas rapidas
InsumoEntregaSchema.index({paciente: 1});
InsumoEntregaSchema.index({origen: 1, insumo: 1, fecha: -1});
InsumoEntregaSchema.index({insumo: 1, fecha: -1});

module.exports = mongoose.model("InsumoEntrega", InsumoEntregaSchema, "InsumoEntregas");
