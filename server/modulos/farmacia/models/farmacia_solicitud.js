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

let FarmaciaSolicitudSchema = new Schema(
  {
    fecha: {
      type: Date,
      default: Date.now,
    },
    origen: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "El Area que solicita es necesaria."],
    },
    destino: {
      type: Schema.Types.ObjectId,
      ref: "Area",
    },

    insumos: {
      type: [
        {
          // JSON con insumo y cantidad.
          insumo: {
            type: Schema.Types.ObjectId,
            ref: "Insumo",
            required: [true, "El Insumo a solicitar es necesario."],
          },
          cantidad: {
            type: Number,
            required: [true, "La Cantidad a solicitar es necesaria."],
          },
        },
      ],
      required: [true, "Los Insumos a solicitar es necesario."],
    },

    estado: {
      type: String,
      required: [true, "El Estado de la solicitud es necesario."],
    },
    motivo: {
      type: String,
      required: [true, "El Motivo de la solicitud es necesario."],
    },

    fec_resolucion: {
      type: Date,
    },
    condicion_aceptada: {
      type: String,
    },
    motivo_rechazo: {
      type: String,
    },
  },
  schemaOptions
);

module.exports = mongoose.model(
  "FarmaciaSolicitud",
  FarmaciaSolicitudSchema,
  "FarmaciaSolicitudes"
);
