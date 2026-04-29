const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const VacunaInsumoSchema = new mongoose.Schema({
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
        const categoria =
          this instanceof mongoose.Query
            ? // Si es una query (update), buscamos en getUpdate().
              this.getUpdate()?.$set?.categoria || this.getUpdate()?.categoria
            : // Si es un documento (save), usamos this directamente.
              this.categoria;

        return categoria === "Vacuna";
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
    _id: false,
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
            {
              validator: function (val) {
                return Array.isArray(val) && val.length === 2;
              },
              message: "{PATH} El rango debe poseer dos valores [min,max).",
            },
          ],
        },
      },
    ],
    default: void 0,
  },

  dosis_posibles: {
    type: [
      {
        type: String,
      },
    ],
    required: [
      function () {
        const categoria =
          this instanceof mongoose.Query
            ? this.getUpdate()?.$set?.categoria || this.getUpdate()?.categoria
            : this.categoria;

        return categoria === "Vacuna";
      },
      // "Las Dosis Posibles son requeridas si categoria es Vacuna.",
      "Las Dosis Posibles de la Vacuna son necesarias (CIPRES).",
    ],
    default: void 0,
  },

  qty_dosis_posibles: {
    type: [
      {
        type: String,
        enum: ["Media dosis", "Doble dosis"],
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
});

VacunaInsumoSchema.virtual("nombreC").get(function () {
  try {
    return `${this.nombre}${this.descripcion ? `: ${this.descripcion}` : ""}`;
  } catch (error) {
    return "ERROR nombre y descripcion";
  }
});

VacunaInsumoSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

VacunaInsumoSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

module.exports = mongoose.model("VacunaInsumo", VacunaInsumoSchema, "VacunaInsumos");
