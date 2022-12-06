const mongoose = require("mongoose");

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
    },
    lote: {
      type: String,
      trim: true,
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
    name: "Conjunto del Insumo",
    unique: "Conjunto del Insumo ya existente en el area, debe ser unico.",
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

module.exports = mongoose.model("FarmaciaStock", farmaciaStockSchema, "FarmaciaStock");
