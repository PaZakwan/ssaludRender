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

let InsumoSchema = new Schema(
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

    unique_code: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
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
          // para group etario estadistica
          // https://stackoverflow.com/questions/44481283/how-to-implement-bucket-to-group-by-multiple-fields
          // min incluye, max excluye.
          // unidad -> mayor - menor
          min: {
            valor: {
              type: Number,
            },
            unidad: {
              type: String,
            },
          },
          max: {
            valor: {
              type: Number,
            },
            unidad: {
              type: String,
            },
          },
        },
      ],
      _id: false,
      default: void 0,
      required: [
        // si esto es true regresa mensaje y no deja guardar
        function () {
          if (this.categoria === "Vacuna" || this.getUpdate?.().$set?.categoria === "Vacuna") {
            if (
              this.grupo_etario?.length > 0 ||
              this.getUpdate?.().$set?.grupo_etario?.length > 0
            ) {
              return false;
            } else {
              return true;
            }
          } else {
            return false;
          }
        },
        // "El Grupo Etario es necesario si es Vacuna.",
        "El Grupo Etario es necesario.",
      ],
    },

    dosis_posibles: {
      type: [
        {
          type: String,
        },
      ],
      default: void 0,
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

InsumoSchema.virtual("nombreC").get(function () {
  try {
    return `${this.nombre}${this.descripcion ? `: ${this.descripcion}` : ""}`;
  } catch (error) {
    return "ERROR nombre y descripcion";
  }
});

InsumoSchema.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

InsumoSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

module.exports = mongoose.model("Insumo", InsumoSchema, "Insumos");
