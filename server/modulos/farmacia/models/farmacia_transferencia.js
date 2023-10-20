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

let FarmaciaTransferenciaSchema = new Schema(
  {
    fecha: {
      type: Date,
      default: Date.now,
    },
    remito: {
      type: String,
      trim: true,
      required: [true, "El Remito es necesario."],
    },
    origen: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "El Area que entrega es necesaria."],
    },
    destino: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "El Area que recibe es necesaria."],
    },

    insumos: {
      type: [
        {
          _id: false,
          stockID: {
            type: Schema.Types.ObjectId,
            ref: "FarmaciaStock",
          },
          insumo: {
            type: Schema.Types.ObjectId,
            ref: "Insumo",
            required: [true, "El Insumo a transferir es necesario."],
          },
          cantidad: {
            type: Number,
            required: [true, "La Cantidad a transferir del mismo es necesaria."],
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
          retirado: {
            type: Date,
          },
          recibido: {
            type: Date,
          },
        },
      ],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "Por lo menos un Insumo a transferir es requerido.",
      },
    },

    observacion: {
      type: String,
      trim: true,
      lowercase: true,
    },

    fec_planificada: {
      type: Date,
    },
  },
  schemaOptions
);

module.exports = mongoose.model(
  "FarmaciaTransferencia",
  FarmaciaTransferenciaSchema,
  "FarmaciaTransferencias"
);
