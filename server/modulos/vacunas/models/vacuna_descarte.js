const mongoose = require("mongoose");

const {trim_between} = require(process.env.MAIN_FOLDER + "/tools/string");

const VacunaDescarteSchema = new mongoose.Schema({
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
    required: [true, "El Area que egresara insumos es necesaria."],
  },

  insumo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VacunaInsumo",
    required: [true, "El Insumo a egresar es necesario."],
  },
  cantidad: {
    type: Number,
    required: [true, "La Cantidad a egresar del mismo es necesaria."],
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

  motivo: {
    type: String,
    trim: true,
    required: [true, "El Motivo del egreso del mismo es necesario."],
  },

  justificacion: {
    type: String,
    trim: true,
    set: trim_between,
  },

  retirado: {
    type: Date,
  },
});

module.exports = mongoose.model("VacunaDescarte", VacunaDescarteSchema, "VacunaDescartes");
