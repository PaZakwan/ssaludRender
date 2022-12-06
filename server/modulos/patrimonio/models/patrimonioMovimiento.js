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

let patrimonioMovimientoSchema = new Schema(
  {
    usuario_modifico: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    id_objeto: {
      type: Schema.Types.ObjectId,
      ref: "Patrimonio",
      required: true,
    },
    fec_movio: {
      type: Date,
      required: true,
    },
    ubicacion_anterior: {
      type: String,
    },
    ubicacion_destino: {
      type: String,
    },
    area_anterior: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      // required: [true, 'El Area en donde se encontraba es necesaria.']
    },
    area_destino: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "El Area a donde sera trasladado es necesaria."],
    },
    usuario_movio: {
      type: String,
    },
    usuario_legajo: {
      type: String,
    },
    motivo_movio: {
      type: String,
      trim: true,
    },
    fec_entregado: {
      type: String,
    },
    fec_patrimonio: {
      type: String,
    },

    //todos
    estado: {
      type: Boolean,
      default: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  schemaOptions
);

patrimonioMovimientoSchema.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

patrimonioMovimientoSchema.plugin(uniqueValidator, {
  message: "{PATH} valor repetido, debe de ser único.",
});

module.exports = mongoose.model("PatrimonioMovimiento", patrimonioMovimientoSchema);
