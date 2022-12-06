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

let FarmaciaOpcionesSchema = new Schema(
  {
    area: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "El Area a configurar es necesaria."],
      unique: true,
    },

    insumo: {
      type: Schema.Types.ObjectId,
      ref: "Insumo",
      required: [true, "El Insumo a configurar es necesario."],
    },

    cant_min: {
      type: Number,
      required: [true, "La Cantidad Minima Alarmante es necesaria."],
    },

    // cant_solicitar: {
    //   type: Number,
    //   required: [true, "La Cantidad a Solicitar es necesaria."],
    // },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  schemaOptions
);

FarmaciaOpcionesSchema.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

FarmaciaOpcionesSchema.plugin(uniqueValidator, {message: "{PATH} debe de ser único."});

module.exports = mongoose.model("FarmaciaOpciones", FarmaciaOpcionesSchema, "FarmaciaOpciones");
