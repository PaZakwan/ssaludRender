const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const configSchema = new mongoose.Schema({
  usuario_modifico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario modificador es necesario"],
  },
  opcion: {
    type: String,
    unique: true,
    required: [true, "La opción es necesaria."],
  },
  datos: {
    type: Object,
    required: [true, "Los datos son necesarios."],
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

configSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }

  next();
});

configSchema.plugin(uniqueValidator, {
  message: "Ya existe. Valor repetido: '{VALUE}'.",
});

module.exports = mongoose.model("Config", configSchema);
