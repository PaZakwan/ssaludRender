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

let HistorialClinicoUniversalSchema = new Schema(
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
    profesional_cabecera: {
      type: Schema.Types.ObjectId,
      ref: "Profesional",
    },
    observacion: {
      type: String,
      lowercase: true,
      trim: true,
    },

    antecedentes_patologicos: [
      {
        type: String,
        enum: {
          values: [
            "Diabetes (DM)",
            "Dislipidemia (DSP)",
            "Enfermedad Celíaca",
            "Hipertensión Arterial (HTA)",
            "Insuficiencia Renal Crónica",
          ],
          message: "{VALUE} no es un antecedente valido.",
        },
      },
    ],

    embarazada: {
      type: Date,
    },

    fuma: {
      type: Boolean,
    },

    // ### obtenerlos apartir de un find de id paciente..
    // Motivos
    // historial: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Paciente",
    //   }],
  },
  schemaOptions
);

HistorialClinicoUniversalSchema.pre("findOneAndUpdate", async function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

HistorialClinicoUniversalSchema.plugin(uniqueValidator, {message: "{PATH} debe de ser único."});

module.exports = mongoose.model(
  "HistorialClinico",
  HistorialClinicoUniversalSchema,
  "HistorialClinico"
);
