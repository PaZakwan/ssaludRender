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

let turnoSchema = new Schema(
  {
    usuario_modifico: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    uas: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    profesional: {
      type: Schema.Types.ObjectId,
      ref: "Profesional",
      required: true,
    },
    especialidad: {
      type: String,
      required: true,
    },
    horario: [
      {
        type: String,
        required: true,
      },
    ],
    amplitudTurno: {
      type: String,
      required: true,
    },
    paciente: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: true,
    },
    fase: {
      type: String,
      default: "turno asignado",
      required: true,
    },
    derivado: {
      type: Schema.Types.ObjectId,
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
  },
  schemaOptions
);

turnoSchema.index(
  {uas: 1, fecha: 1, profesional: 1, especialidad: 1, "horario.0": 1},
  {name: "turno_unico", unique: true}
);

turnoSchema.pre("findOneAndUpdate", async function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

turnoSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

module.exports = mongoose.model("Turno", turnoSchema);
