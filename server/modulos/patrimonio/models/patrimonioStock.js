const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const patrimonioStockSchema = new mongoose.Schema({
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
  area_solicita: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
  },
  modelo_impresora: {
    type: String,
  },
  inventario_consume: {
    type: String,
  },
  fec_solicitud: {
    type: Date,
  },
  motivo: {
    type: String,
    required: [true, "Motivo de la solicitud."],
  },
  persona_solicitante: {
    type: String,
  },
  persona_legajo: {
    type: String,
  },
  orden_compra: {
    type: String,
  },
  cantidad: {
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

patrimonioStockSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

patrimonioStockSchema.plugin(uniqueValidator, {
  message: "Ya existe. Valor repetido: '{VALUE}'.",
});

module.exports = mongoose.model("PatrimonioStock", patrimonioStockSchema);
