const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const VacunaConfigSchema = new mongoose.Schema({
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: [true, "El Area a configurar es necesaria."],
  },

  insumo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VacunaInsumo",
    required: [true, "El Insumo a configurar es necesario."],
  },

  cant_min: {
    type: Number,
    required: [true, "La Cantidad Minima Alarmante es necesaria."],
    min: [1, "El valor de {VALUE}, debe ser mayor a 0."],
  },
});

VacunaConfigSchema.index(
  {area: 1, insumo: 1},
  {
    name: "Insumo en el Vacunatorio",
    unique: true,
  }
);

VacunaConfigSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

module.exports = mongoose.model("VacunaConfig", VacunaConfigSchema, "VacunaConfigs");
