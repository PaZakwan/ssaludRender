const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ConsultaSchema = require("./schema_consultas");

let schemaOptions = {
  toObject: {
    getters: true,
  },
  toJSON: {
    getters: true,
  },
};

let Schema = mongoose.Schema;

// fetch estadistica GroupBy area / profesional.

let NutricionSchema = new Schema(
  {
    // usuario_modifico
    // createdAt
    // updatedAt
    // profesional
    // paciente
    // edad_años
    // sexo
    // area
    // fecha
    // receto_medicamentos (Si/No)
    // solicito_estudios (Si/No)
    // motivo
    // actividad (Programa/Actividad)
    // observacion
    // derivado
    // motivoReferencia
    ...ConsultaSchema,

    // H2 Nutricion
    embarazada_semana: {
      type: Number,
      min: 0,
    },

    fuma: {
      type: Boolean,
    },

    tipo_presentacion: {
      type: String,
      enum: {
        values: ["1ra vez", "Ulterior", "Promocion"],
        message: "{VALUE} no es una presentacion valida.",
      },
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

    // T.A Alta
    tension_arterial_sistolica: {
      type: String,
      lowercase: true,
      trim: true,
    },
    // T.A Baja
    tension_arterial_diastolica: {
      type: String,
      lowercase: true,
      trim: true,
    },

    talla: {
      // Centimetros cm
      type: Number,
      min: 0,
    },
    peso: {
      // Gramos gr
      type: Number,
      min: 0,
    },

    IMC: {
      type: Number,
    },
    // return (this.peso / 1000 / (this.talla / 100) ** 2).toFixed(4);
    // Amarillo = Bajo Peso (IMC <18,5)
    // Blanco = Normopeso (IMC = 18,5-24,9)
    // Amarillo = Sobrepeso (IMC = 25-29,9)
    // Naranja = Obesidad 1 (IMC 30-34.9)
    // Rojo = Obesidad 2 (IMC 35-39.9)
    // ultra-rojo = Obesidad Morbida (IMC +40)

    diagnostico: {
      type: String,
      enum: {
        values: [
          "Bajo Peso",
          "Normopeso",
          "Sobrepeso",
          "Obesidad 1",
          "Obesidad 2",
          "Obesidad Morbida",
        ],
        message: "{VALUE} no es un diagnostico valido.",
      },
    },

    // Niños 0-19 años (estadistica de IMC chicos/as)
    puntaje_z: {
      type: String,
      enum: {
        values: ["menores a -2", "de -2 a 2", "de 2 a 3", "mayores a 3", "Baja Talla"],
        message: "{VALUE} no es un puntaje valido.",
      },
    },

    cambio_diagnostico: {
      type: Boolean,
    },

    colesterol: {
      // mili gramos (mg)
      type: Number,
      min: 0,
    },

    // estadistica 'menor a 10%' '10-20%' '20-30%''30-40%' 'mayor o igual a 40%'
    riesgo_cardiovascular_colesterol: {
      type: String,
      enum: {
        values: ["menor a 10%", "10-20%", "20-30%", "30-40%", "mayor o igual a 40%"],
        message: "{VALUE} no es un valor valido.",
      },
    },

    // Nutricionista
    cintura: {
      // Centimetros cm
      type: Number,
      min: 0,
    },
    habitos_saludables: [
      {
        type: String,
        enum: {
          values: [
            "Agua",
            "Frutas Diaria",
            "Actividad Fisica",
            "Harinas Integrales",
            "Legumbres",
            "Hidratos",
            "Verduras Almuerzo",
            "Verduras Cena",
            "Preparaciones Caceras",
          ],
          message: "{VALUE} no es un 'habito saludable' valido.",
        },
      },
    ],
    habitos_no_saludables: [
      {
        type: String,
        enum: {
          values: [
            "Bebidas Azucaras",
            "Harinas Refinadas",
            "Fiambres Embutidos",
            "Pan y Galletas - Almuerzo",
            "Pan y Galletas - Cena",
          ],
          message: "{VALUE} no es un 'habito no saludable' valido.",
        },
      },
    ],
    // Laboratorio (VER ESTUDIOS EN MOTIVO GRAL)
  },
  schemaOptions
);

// Si el create/update tiene el campo de tensiones (fecha,valor,profesional)
// Actualizar tambien tabla signos vitales..

// Si el create/update tiene el campo de peso/talla/cintura (fecha,valor,profesional)
// Actualizar tambien tabla hist_antro..

// Si el create/update tiene el campo de antecedentes_patologicos (fecha,valor,profesional)
// Actualizar tambien tabla antecedentes_patologicos..

NutricionSchema.pre("findOneAndUpdate", async function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

NutricionSchema.plugin(uniqueValidator, {message: "{PATH} debe de ser único."});

module.exports = mongoose.model("Nutricion", NutricionSchema, "HistorialConsultasNutricion");
