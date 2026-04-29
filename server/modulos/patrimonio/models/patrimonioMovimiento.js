const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const patrimonioMovimientoSchema = new mongoose.Schema({
  usuario_modifico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario modificador es necesario"],
  },
  id_objeto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patrimonio",
    required: [true, "El id del objeto es necesario"],
  },
  fec_movio: {
    type: Date,
    required: [true, "El fecha de movimiento es necesario"],
  },
  ubicacion_anterior: {
    type: String,
  },
  ubicacion_destino: {
    type: String,
  },
  lugar_anterior: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lugar",
    // required: [true, 'El Lugar en donde se encontraba es necesario.']
  },
  lugar_destino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lugar",
    required: [true, "El Lugar a donde sera trasladado es necesario."],
  },
  area_anterior: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    // required: [true, 'El Area en donde se encontraba es necesaria.']
  },
  area_destino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: [true, "El Area a donde sera trasladado es necesaria."],
  },
  usuario_movio: {
    type: String,
  },
  usuario_legajo: {
    type: String,
  },
  motivo_movio: {
    type: String,
    trim: true,
  },
  fec_entregado: {
    type: String,
  },
  fec_patrimonio: {
    type: String,
  },

  //todos
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

patrimonioMovimientoSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

patrimonioMovimientoSchema.plugin(uniqueValidator, {
  message: "Ya existe. Valor repetido: '{VALUE}'.",
});

module.exports = mongoose.model("PatrimonioMovimiento", patrimonioMovimientoSchema);
