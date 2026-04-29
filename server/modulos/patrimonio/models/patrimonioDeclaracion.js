const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const patrimonioDeclaracionSchema = new mongoose.Schema({
  usuario_modifico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario modificador es necesario"],
  },
  tipo: {
    type: String,
    required: [true, "El tipo de la declaración(Bienes Reales/Faltantes) es necesaria."],
  },
  fecha: {
    type: Date,
    required: [true, "La Fecha de la declaración es necesaria."],
  },
  oficina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: [true, "La Oficina de la declaración es necesaria."],
  },
  oficina_nro: {
    type: String,
    lowercase: true,
    trim: true,
  },
  custodia: {
    type: String,
    lowercase: true,
    trim: true,
  },
  inventariador: {
    type: String,
    lowercase: true,
    trim: true,
  },
  objetos: {
    type: [
      {
        _id: false,
        inventario: {
          type: String,
          lowercase: true,
          trim: true,
          required: [true, "El numero de inventario del Bien es necesario."],
        },
        descripcion: {
          type: String,
          trim: true,
          required: [true, "La descripcion del Bien es necesaria."],
        },
        desde: {
          type: String,
          trim: true,
        },
        destino: {
          type: String,
          trim: true,
        },
      },
    ],
    required: [true, "La lista de Objetos a declarar es necesaria."],
    validate: [
      {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: "{PATH} al menos uno es requerido.",
      },
    ],
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
});

patrimonioDeclaracionSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

patrimonioDeclaracionSchema.plugin(uniqueValidator, {
  message: "Ya existe. Valor repetido: '{VALUE}'.",
});

module.exports = mongoose.model("PatrimonioDeclaracion", patrimonioDeclaracionSchema);
