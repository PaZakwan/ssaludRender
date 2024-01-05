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

let lugarSchema = new Schema(
  {
    usuario_modifico: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
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
  },
  schemaOptions
);

lugarSchema.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

lugarSchema.plugin(uniqueValidator, {message: "{PATH} valor repetido, debe de ser único."});

module.exports = mongoose.model("Lugar", lugarSchema, "Lugares");
