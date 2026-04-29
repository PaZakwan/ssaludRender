const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const lugarSchema = new mongoose.Schema({
  usuario_modifico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario modificador es necesario"],
  },
  nombre: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "El nombre del lugar es necesario."],
  },
  direccion: {
    type: String,
    trim: true,
    required: [true, "La direccion del lugar es necesaria."],
  },
  descripcion: {
    type: String,
    trim: true,
  },

  conectividad: {
    type: String,
  },
  ip: {
    type: String,
    lowercase: true,
    trim: true,
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

lugarSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }

  next();
});

lugarSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

module.exports = mongoose.model("Lugar", lugarSchema, "Lugares");
