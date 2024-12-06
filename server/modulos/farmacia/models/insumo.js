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
