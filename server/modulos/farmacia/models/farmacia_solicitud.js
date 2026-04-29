const mongoose = require("mongoose");

const FarmaciaSolicitudSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  origen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: [true, "El Area que solicita es necesaria."],
  },
  destino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
  },

  insumos: {
    type: [
      {
        _id: false,
        insumo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Insumo",
          required: [true, "El Insumo a solicitar es necesario."],
        },
        cantidad: {
          type: Number,
          required: [true, "La Cantidad a solicitar es necesaria."],
        },
      },
    ],
    required: [true, "La lista de Insumos a solicitar es necesaria."],
    validate: [
      {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: "{PATH} al menos uno es requerido.",
      },
    ],
  },

  estado: {
    type: String,
    required: [true, "El Estado de la solicitud es necesario."],
  },
  motivo: {
    type: String,
    required: [true, "El Motivo de la solicitud es necesario."],
  },
  categoria: {
    type: String,
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

  //todos
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

FarmaciaSolicitudSchema.virtual("id_time").get(function () {
  try {
    return this._id.toString().toUpperCase.substring(2, 8);
  } catch (error) {
    return "ERROR id_time";
  }
});

FarmaciaSolicitudSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

module.exports = mongoose.model(
  "FarmaciaSolicitud",
  FarmaciaSolicitudSchema,
  "FarmaciaSolicitudes"
);
