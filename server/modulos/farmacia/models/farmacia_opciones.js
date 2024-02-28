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

let FarmaciaOpcionesSchema = new Schema(
  {
    area: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "El Area a configurar es necesaria."],
    },

    insumo: {
      type: Schema.Types.ObjectId,
      ref: "Insumo",
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

FarmaciaOpcionesSchema.index(
  {area: 1, insumo: 1},
  {
    name: "Insumo en la Farmacia",
    unique: "Opcion de Insumo ya existente en la Farmacia, debe ser unico.",
  }
);

FarmaciaOpcionesSchema.plugin(uniqueValidator, {message: "{PATH} debe de ser único."});

module.exports = mongoose.model("FarmaciaOpciones", FarmaciaOpcionesSchema, "FarmaciaOpciones");
