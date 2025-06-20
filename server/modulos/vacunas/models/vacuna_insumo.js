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

let VacunaInsumoSchema = new Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: [true, "El Insumo a cargar es necesario."],
      unique: true,
    },
    categoria: {
      type: String,
      required: [true, "La Categoria a cargar es necesaria."],
    },

    descripcion: {
      type: String,
      trim: true,
      lowercase: true,
    },

    id_Nomivac: {
      type: String,
      trim: true,
      required: [
        function () {
          return this.categoria === "Vacuna" || this.getUpdate?.().$set?.categoria === "Vacuna";
        },
        // "El ID es necesario si categoria es Vacuna.",
        "El ID del Nomivac de la Vacuna es necesario (CIPRES).",
      ],
    },

    condiciones: {
      type: [
        {
          type: String,
        },
      ],
      default: void 0,
    },

    grupo_etario: {
      type: [
        {
          // para estadistica
          unidad: {
            type: String,
            required: [true, "La Unidad de Edad del Grupo Etario es necesaria."],
          },
          value: {
            type: [Number],
            validate: [
              (arr) => arr.length === 2,
              "{PATH} El rango debe poseer dos valores [min,max).",
            ],
          },
        },
      ],
      _id: false,
      default: void 0,
    },

    dosis_posibles: {
      type: [
        {
          type: String,
        },
      ],
      default: void 0,
      required: [
        function () {
          return this.categoria === "Vacuna" || this.getUpdate?.().$set?.categoria === "Vacuna";
        },
        // "Las Dosis Posibles son requeridas si categoria es Vacuna.",
        "Las Dosis Posibles de la Vacuna son necesarias (CIPRES).",
      ],
    },

    estado: {
      type: Boolean,
      default: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  schemaOptions
);

VacunaInsumoSchema.virtual("nombreC").get(function () {
  try {
    return `${this.nombre}${this.descripcion ? `: ${this.descripcion}` : ""}`;
  } catch (error) {
    return "ERROR nombre y descripcion";
  }
});

VacunaInsumoSchema.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

VacunaInsumoSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

module.exports = mongoose.model("VacunaInsumo", VacunaInsumoSchema, "VacunaInsumos");
