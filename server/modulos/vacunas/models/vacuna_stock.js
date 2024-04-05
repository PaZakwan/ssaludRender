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

let VacunaStockSchema = new Schema(
  {
    area: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "El Area en donde se encuentra es necesaria."],
    },
    insumo: {
      type: Schema.Types.ObjectId,
      ref: "VacunaInsumo",
      required: [true, "El Insumo es necesario."],
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
    cantidad: {
      type: Number,
      required: [true, "La Cantidad es necesaria."],
    },

    //todos
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  schemaOptions
);

VacunaStockSchema.index(
  {area: 1, insumo: 1, procedencia: 1, lote: 1, vencimiento: 1},
  {
    name: "Conjunto del Insumo",
    unique: "Conjunto del Insumo ya existente en el area, debe ser unico.",
  }
);

VacunaStockSchema.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

module.exports = mongoose.model("VacunaStock", VacunaStockSchema, "VacunaStock");
