const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const turnoSchema = new mongoose.Schema({
  usuario_modifico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario modificador es necesario"],
  },
  uas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: [true, "La area es necesaria"],
  },
  fecha: {
    type: Date,
    required: [true, "La fecha es necesaria"],
  },
  profesional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profesional",
    required: [true, "El profesional es necesario"],
  },
  especialidad: {
    type: String,
    required: [true, "La especialidad es necesaria"],
  },
  horario: [
    {
      type: String,
      required: [true, "El horario modificador es necesario"],
    },
  ],
  amplitudTurno: {
    type: String,
    required: [true, "La amplitud es necesaria"],
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: [true, "El paciente es necesario"],
  },
  fase: {
    type: String,
    default: "turno asignado",
    required: [true, "La fase es necesaria"],
  },
  derivado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
  },

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

turnoSchema.index(
  {uas: 1, fecha: 1, profesional: 1, especialidad: 1, "horario.0": 1},
  {name: "turno_unico", unique: true}
);

turnoSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], async function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

turnoSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

module.exports = mongoose.model("Turno", turnoSchema);
