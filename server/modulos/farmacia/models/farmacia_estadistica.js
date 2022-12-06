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

let farmaciaEstadisticaSchema = new Schema(
  {
    fecha: {
      type: Date,
      default: Date.now,
    },

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

    stock_anterior: {
      type: Number,
    },

    recibido_ingreso: {
      type: Number,
    },
    recibido_transferencia: {
      type: Number,
    },

    retirado_transferencia: {
      type: Number,
    },
    entregados: {
      type: Number,
    },
    utilizados: {
      type: Number,
    },
    descartados: {
      type: Number,
    },

    solicitados: {
      type: Number,
    },
  },
  schemaOptions
);

farmaciaEstadisticaSchema.virtual("stock").get(function () {
  let temp = 0;
  if (typeof this.stock_anterior === "number") {
    temp += this.stock_anterior;
  }
  if (typeof this.recibido_ingreso === "number") {
    temp += this.recibido_ingreso;
  }
  if (typeof this.recibido_transferencia === "number") {
    temp += this.recibido_transferencia;
  }
  if (typeof this.retirado_transferencia === "number") {
    temp -= this.retirado_transferencia;
  }
  if (typeof this.entregados === "number") {
    temp -= this.entregados;
  }
  if (typeof this.utilizados === "number") {
    temp -= this.utilizados;
  }
  if (typeof this.descartados === "number") {
    temp -= this.descartados;
  }
  return temp;
});

module.exports = mongoose.model(
  "FarmaciaEstadistica",
  farmaciaEstadisticaSchema,
  "FarmaciaEstadisticas"
);
