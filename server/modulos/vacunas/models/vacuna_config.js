const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let schemaOptions = {
  toObject: {
    getters: true,
  },
  toJSON: {
    getters: true,
  },
};

let Schema = mongoose.Schema;

let VacunaConfigSchema = new Schema(
  {
    area: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "El Area a configurar es necesaria."],
    },

    insumo: {
      type: Schema.Types.ObjectId,
      ref: "VacunaInsumo",
      required: [true, "El Insumo a configurar es necesario."],
    },

    cant_min: {
      type: Number,
      required: [true, "La Cantidad Minima Alarmante es necesaria."],
      min: [1, "El valor de {VALUE}, debe ser mayor a 0."],
    },
  },
  schemaOptions
);

VacunaConfigSchema.index(
  {area: 1, insumo: 1},
  {
    name: "Insumo en el Vacunatorio",
    unique: "Opcion de Insumo ya existente en el Vacunatorio, debe ser unico.",
  }
);

VacunaConfigSchema.plugin(uniqueValidator, {message: "{PATH} debe de ser único."});

module.exports = mongoose.model("VacunaConfig", VacunaConfigSchema, "VacunaConfigs");
