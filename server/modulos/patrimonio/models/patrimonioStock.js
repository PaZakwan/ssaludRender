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

let patrimonioStockSchema = new Schema(
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
    area_solicita: {
      type: Schema.Types.ObjectId,
      ref: "Area",
    },
    modelo_impresora: {
      type: String,
    },
    inventario_consume: {
      type: String,
    },
    fec_solicitud: {
      type: Date,
    },
    motivo: {
      type: String,
      required: [true, "Motivo de la solicitud."],
    },
    persona_solicitante: {
      type: String,
    },
    persona_legajo: {
      type: String,
    },
    orden_compra: {
      type: String,
    },
    cantidad: {
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

patrimonioStockSchema.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

patrimonioStockSchema.plugin(uniqueValidator, {
  message: "{PATH} valor repetido, debe de ser único.",
});

module.exports = mongoose.model("PatrimonioStock", patrimonioStockSchema);
