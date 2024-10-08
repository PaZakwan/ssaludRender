const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let schemaOptions = {
  toObject: {
    getters: true,
  },
  toJSON: {
    getters: true,
  },
};

let Schema = mongoose.Schema;

let HistorialVacunaSchema = new Schema(
  {
    usuario_modifico: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },

    paciente: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: true,
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
            required: true,
          },
        },

        profesional_aplico: {
          type: Schema.Types.ObjectId,
          ref: "Profesional",
        },
        fecha_aplico: {
          type: Date,
        },

        profesional_solicito: {
          type: Schema.Types.ObjectId,
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
  },
  schemaOptions
);

HistorialVacunaSchema.pre("findOneAndUpdate", async function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

HistorialVacunaSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

module.exports = mongoose.model("HistorialVacuna", HistorialVacunaSchema);
