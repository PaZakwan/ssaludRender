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

let FarmaciaIngresoSchema = new Schema(
  {
    fecha: {
      type: Date,
      default: Date.now,
    },
    orden_compra: {
      type: String,
      trim: true,
      required: [true, "La Orden de Compra es necesaria."],
    },
    proveedor: {
      type: String,
      trim: true,
      required: [true, "El Proveedor es necesario."],
    },
    destino: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "El Area que recibe es necesaria."],
    },

    insumos: [
      {
        _id: false,
        insumo: {
          type: Schema.Types.ObjectId,
          ref: "Insumo",
          required: [true, "El Insumo a recibir es necesario."],
        },
        cantidad: {
          type: Number,
          required: [true, "La Cantidad a recibir del mismo es necesaria."],
        },
        procedencia: {
          type: String,
        },
        lote: {
          type: String,
          trim: true,
        },
        vencimiento: {
          type: Date,
        },
        recibido: {
          type: Date,
        },
      },
    ],

    observacion: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("FarmaciaIngreso", FarmaciaIngresoSchema, "FarmaciaIngresos");
