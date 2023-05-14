const mongoose = require("mongoose");

let schemaOptions = {
  toObject: {
    getters: true,
  },
  toJSON: {
    getters: true,
  },
};

let Schema = mongoose.Schema;

let FarmaciaDescarteSchema = new Schema(
  {
    usuario_creador: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    fecha: {
      type: Date,
      default: Date.now,
    },
    origen: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "El Area que egresara insumos es necesaria."],
    },

    insumo: {
      type: Schema.Types.ObjectId,
      ref: "Insumo",
      required: [true, "El Insumo a egresar es necesario."],
    },
    cantidad: {
      type: Number,
      required: [true, "La Cantidad a egresar del mismo es necesaria."],
    },
    procedencia: {
      type: String,
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

    retirado: {
      type: Date,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("FarmaciaDescarte", FarmaciaDescarteSchema, "FarmaciaDescartes");
