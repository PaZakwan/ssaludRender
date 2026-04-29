const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const areaSchema = new mongoose.Schema({
  usuario_modifico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario modificador es necesario"],
  },
  subsecretaria: {
    type: String,
    trim: true,
  },
  depende: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
  },
  area: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "El nombre del area es necesario."],
  },
  direccion: {
    type: String,
    trim: true,
  },
  responsable: {
    type: String,
    trim: true,
  },
  oficina_nro: {
    type: String,
    trim: true,
  },
  patrimonio: {
    type: String,
    lowercase: true,
    trim: true,
  },
  unidad_atencion: {
    type: String,
    lowercase: true,
    trim: true,
  },
  zona_us: {
    type: String,
  },
  farmacia: {
    type: String,
    lowercase: true,
    trim: true,
  },
  vacunatorio: {
    type: String,
    lowercase: true,
    trim: true,
  },
  SISA: {
    type: String,
    lowercase: true,
    trim: true,
  },
  RUPES: {
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

areaSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }

  next();
});

areaSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

module.exports = mongoose.connections[1].model("Area", areaSchema);
module.exports = mongoose.model("Area", areaSchema);
