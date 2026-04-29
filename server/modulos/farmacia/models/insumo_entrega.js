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

module.exports = mongoose.model("InsumoEntrega", InsumoEntregaSchema, "InsumoEntregas");
