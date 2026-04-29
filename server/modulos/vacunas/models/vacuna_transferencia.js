const mongoose = require("mongoose");

const VacunaTransferenciaSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: [true, "El Area que entrega es necesaria."],
  },
  destino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: [true, "El Area que recibe es necesaria."],
  },

  insumos: {
    type: [
      {
        _id: false,
        stockID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "VacunaStock",
        },
        insumo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "VacunaInsumo",
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
    required: [true, "La lista de Insumos a transferir es necesaria."],
    validate: [
      {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: "{PATH} al menos uno es requerido.",
      },
    ],
  },

  observacion: {
    type: String,
    trim: true,
    lowercase: true,
  },

  fec_planificada: {
    type: Date,
  },
});

module.exports = mongoose.model(
  "VacunaTransferencia",
  VacunaTransferenciaSchema,
  "VacunaTransferencias"
);
