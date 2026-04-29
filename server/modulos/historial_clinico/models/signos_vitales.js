const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const actual_anterior = new mongoose.Schema({
  _id: false,

  actual: {
    fecha: {
      type: Date,
    },
    valor: {
      type: String,
      lowercase: true,
      trim: true,
    },
    profesional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profesional",
    },
  },
  anterior: {
    fecha: {
      type: Date,
    },
    valor: {
      type: String,
      lowercase: true,
      trim: true,
    },
    profesional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profesional",
    },
  },
});

const SignosVitalesSchema = new mongoose.Schema({
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
    required: [true, "El paciente es necesario"],
    unique: true,
  },

  // actual/anterior: fecha, valor, profesional.
  temperatura: actual_anterior,
  frecuencia_respiratoria: actual_anterior,
  frecuencia_cardiaca: actual_anterior,
  saturacion_oxigeno: actual_anterior,
  // T.A Alta
  tension_arterial_sistolica: actual_anterior,
  // T.A Baja
  tension_arterial_diastolica: actual_anterior,
});

SignosVitalesSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }

  next();
});

SignosVitalesSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

module.exports = mongoose.model("SignosVitales", SignosVitalesSchema);
