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

let farmaciaStockSchema = new Schema(
  {
    area: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "El Area en donde se encuentra es necesaria."],
    },
    insumo: {
      type: Schema.Types.ObjectId,
      ref: "Insumo",
      required: [true, "El Insumo es necesario."],
    },
    cantidad: {
      type: Number,
      required: [true, "La Cantidad es necesaria."],
    },
    procedencia: {
      type: String,
      default: "Carga inicial",
    },
    lote: {
      type: String,
    },
    vencimiento: {
      type: Date,
    },

    //todos
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  schemaOptions
);

farmaciaStockSchema.index(
  {area: 1, insumo: 1, procedencia: 1, lote: 1, vencimiento: 1},
  {
    name: "Insumo lote en la Farmacia",
    unique: true,
  }
);

farmaciaStockSchema.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

farmaciaStockSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

module.exports = mongoose.model("FarmaciaStock", farmaciaStockSchema, "FarmaciaStock");
