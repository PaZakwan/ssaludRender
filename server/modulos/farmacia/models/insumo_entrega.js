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

let InsumoEntregaSchema = new Schema(
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
      required: [true, "El Area que entrega es necesaria."],
    },
    paciente: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: [true, "El Paciente que recibe es necesario."],
    },
    oSocial: {
      type: String,
    },

    insumo: {
      type: Schema.Types.ObjectId,
      ref: "Insumo",
      required: [true, "El Insumo a entregar es necesario."],
    },
    cantidad: {
      type: Number,
      required: [true, "La Cantidad a entregar del mismo es necesaria."],
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

    retirado: {
      type: Date,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("InsumoEntrega", InsumoEntregaSchema, "InsumoEntregas");
