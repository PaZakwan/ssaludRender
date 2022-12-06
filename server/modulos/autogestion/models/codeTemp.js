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

let codeSchema = new Schema(
  {
    // ID del solicitante de codigo temporal
    solicitante: {
      type: String,
      trim: true,
      required: [true, "Quien solicita el codigo es necesario."],
    },
    documento: {
      type: String,
      required: [true, "El Documento es necesario."],
    },
    codigo: {
      type: String,
      required: [true, "El Codigo temporal es necesario."],
    },
    fechaExpira: {
      type: Date,
      // Desp de 10 min se borra el codigo
      default: () => new Date(+new Date() + 10 * 60 * 1000),
      // 2 min to test
      // default: () => new Date(+new Date() + 2 * 60 * 1000),
      // Index encargado de borrar el codigo en la fecha de la propiedad si existe
      index: {
        expireAfterSeconds: 0,
        partialFilterExpression: {
          fechaExpira: {$exists: true},
        },
      },
    },
  },
  schemaOptions
);

codeSchema.virtual("fechaCodeSend").get(function () {
  if (this.fechaExpira) {
    return `${new Date(+this.fechaExpira - 10 * 60 * 1000)}`;
  } else {
    return undefined;
  }
});

codeSchema.pre("findOneAndUpdate", function (next) {
  this.findOneAndUpdate({fechaExpira: new Date(+new Date() + 10 * 60 * 1000)});

  next();
});

module.exports = mongoose.model("VerificationCode", codeSchema, "VerificationCode");
