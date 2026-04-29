const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const HistorialVacunaSchema = new mongoose.Schema({
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

  vacunas: [
    {
      // Vacunas modelos en archivo json.
      vacuna: {
        lote: {
          type: String,
        },
        modelo: {
          type: String,
          required: [true, "La Vacuna es necesaria"],
        },
      },

      profesional_aplico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profesional",
      },
      fecha_aplico: {
        type: Date,
      },

      profesional_solicito: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profesional",
      },
      fecha_solicito: {
        type: Date,
      },

      estado: {
        type: String,
        enum: ["aplicada", "pendiente"],
      },
    },
  ],
});

HistorialVacunaSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }

  next();
});

HistorialVacunaSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

module.exports = mongoose.model("HistorialVacuna", HistorialVacunaSchema);
