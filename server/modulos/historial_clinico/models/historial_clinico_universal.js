const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const {resolve} = require("path");

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

    zona_sanitaria: {
      type: String,
      required: [
        true,
        "La Zona Sanitaria de donde vive la persona es necesaria para Estadisticas.",
      ],
    },

    prematuro: {
      type: Boolean,
    },

    peso_nacer_menor_2500: {
      type: Boolean,
    },

    peso_nacer_mayor_3800: {
      type: Boolean,
    },

    antecedentes_patologicos: [
      {
        type: String,
        enum: {
          values: [
            "Diabetes Tipo 1 (DM1)",
            "Diabetes Tipo 2 (DM2)",
            "Dislipidemia (DSP)",
            "Enfermedad Celíaca",
            "Hipertensión Arterial (HTA)",
            "Insuficiencia Renal Crónica",
          ],
          message: "{VALUE} no es un antecedente valido.",
        },
      },
    ],

    embarazada_semana: {
      type: Number,
    },

    puerpera: {
      type: Boolean,
    },

    inmunodeprimida: {
      type: Boolean,
    },

    riesgo: {
      type: Boolean,
    },
    personal_salud: {
      type: Boolean,
    },
    personal_esencial: {
      type: Boolean,
    },

    fuma: {
      type: Boolean,
    },
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

HistorialClinicoUniversalSchema.plugin(uniqueValidator, {
  message: "Ya existe. Valor repetido: '{VALUE}'.",
});

module.exports = mongoose.model(
  "HistorialClinico",
  HistorialClinicoUniversalSchema,
  "HistorialClinico"
);
