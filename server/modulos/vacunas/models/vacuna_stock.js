const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const VacunaStockSchema = new mongoose.Schema({
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: [true, "El Area en donde se encuentra es necesaria."],
  },
  insumo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VacunaInsumo",
    required: [true, "El Insumo es necesario."],
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
  cantidad: {
    type: Number,
    required: [true, "La Cantidad es necesaria."],
  },

  //todos
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

VacunaStockSchema.index(
  {area: 1, insumo: 1, procedencia: 1, lote: 1, vencimiento: 1},
  {
    name: "Insumo lote en el Vacunatorio",
    unique: true,
  }
);

VacunaStockSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

VacunaStockSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

module.exports = mongoose.model("VacunaStock", VacunaStockSchema, "VacunaStock");
