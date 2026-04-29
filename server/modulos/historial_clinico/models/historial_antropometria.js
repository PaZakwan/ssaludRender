const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const HistorialAntropometriaSchema = new mongoose.Schema({
  usuario_modifico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario modificador es necesario"],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: [true, "El paciente atendido es necesario"],
    unique: true,
  },

  grupo_factor_sanguineo: {
    fecha: {
      type: Date,
    },
    valor: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "0+", "0-"],
    },
    profesional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profesional",
    },
  },
  talla: [
    {
      fecha: {
        type: Date,
      },
      // Centimetros cm
      valor: {
        type: Number,
        min: 0,
      },
      profesional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profesional",
      },
    },
  ],
  peso: [
    {
      fecha: {
        type: Date,
      },
      // Gramos gr
      valor: {
        type: Number,
        min: 0,
      },
      profesional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profesional",
      },
    },
  ],

  cintura: [
    {
      fecha: {
        type: Date,
      },
      // Centimetros cm
      valor: {
        type: Number,
        min: 0,
      },
      profesional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profesional",
      },
    },
  ],
});

HistorialAntropometriaSchema.virtual("IMC").get(function () {
  // Indice de Masa Corporal Kg/mts^2
  if (this.peso && this.talla && this.peso.length > 0 && this.talla.length > 0) {
    return (
      (this.peso[this.peso.length - 1] * 1000) / (this.talla[this.talla.length - 1] / 100) ** 2
    );
  } else {
    return "";
  }
  // Blanco = Bajo peso (IMC <18,5)
  // Amarillo = Rango normal (IMC = 18,5-24,9)
  // Naranja = Sobrepeso (IMC = 24.9-29,9)
  // Rojo = Obesidad (IMC >30)
});

HistorialAntropometriaSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }

  next();
});

HistorialAntropometriaSchema.plugin(uniqueValidator, {
  message: "Ya existe. Valor repetido: '{VALUE}'.",
});

module.exports = mongoose.model("HistorialAntropometria", HistorialAntropometriaSchema);
