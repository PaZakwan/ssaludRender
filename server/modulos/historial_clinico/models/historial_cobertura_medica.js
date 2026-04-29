const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const HistorialCoberturaMedicaSchema = new mongoose.Schema({
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

  coberturas_medicas: [
    {
      // JSON con Base de las Obras sociales existentes con su rnos,name y posibles planes.
      rnos: {
        type: String,
      },
      name: {
        type: String,
      },
      plan: {
        type: String,
      },
      nro_afiliado: {
        type: String,
        required: true,
      },
      // [inicia , finaliza cobertura]
      fecha_vigencia: {
        type: Array,
      },
    },
  ],
});

HistorialCoberturaMedicaSchema.pre(
  ["findOneAndUpdate", "updateOne", "updateMany"],
  function (next) {
    if (this.getUpdate().$set) {
      this.getUpdate().$set.updatedAt = new Date();
    } else {
      this.getUpdate().updatedAt = new Date();
    }

    next();
  }
);

HistorialCoberturaMedicaSchema.plugin(uniqueValidator, {
  message: "Ya existe. Valor repetido: '{VALUE}'.",
});

module.exports = mongoose.model("HistorialCoberturaMedica", HistorialCoberturaMedicaSchema);
