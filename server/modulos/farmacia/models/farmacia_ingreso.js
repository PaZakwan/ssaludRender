const mongoose = require("mongoose");

const FarmaciaIngresoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  remito_compra: {
    type: String,
    trim: true,
    required: [true, "El Remito de Compra es necesario."],
  },
  proveedor: {
    type: String,
    trim: true,
    required: [true, "El Proveedor es necesario."],
  },
  destino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: [true, "El Area que recibe es necesaria."],
  },
  orden_compra: {
    type: String,
    trim: true,
  },

  insumos: {
    type: [
      {
        _id: false,
        insumo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Insumo",
          required: [true, "El Insumo a recibir es necesario."],
        },
        cantidad: {
          type: Number,
          required: [true, "La Cantidad a recibir del mismo es necesaria."],
        },
        procedencia: {
          type: String,
          default: "Carga inicial",
        },
        lote: {
          type: String,
          trim: true,
          uppercase: true,
        },
        vencimiento: {
          type: Date,
        },
        recibido: {
          type: Date,
        },
      },
    ],
    required: [true, "La lista de Insumos a recibir es necesaria."],
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
});

module.exports = mongoose.model("FarmaciaIngreso", FarmaciaIngresoSchema, "FarmaciaIngresos");
