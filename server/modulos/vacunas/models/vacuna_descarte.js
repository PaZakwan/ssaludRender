const mongoose = require("mongoose");
const {resolve} = require("path");

const {trim_between} = require(resolve(process.env.MAIN_FOLDER, "tools/string"));

let schemaOptions = {
  toObject: {
    getters: true,
  },
  toJSON: {
    getters: true,
  },
};

let Schema = mongoose.Schema;

let VacunaDescarteSchema = new Schema(
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
  },
  schemaOptions
);

module.exports = mongoose.model("VacunaDescarte", VacunaDescarteSchema, "VacunaDescartes");
