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

let profesionalesSchema = new Schema(
  {
    usuario_modifico: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    apellido: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "El Apellido es necesario."],
    },
    nombre: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "El Nombre es necesario."],
    },
    tipo_doc: {
      type: String,
      trim: true,
    },
    // "sparse" permite varios ingresos "undefined" del campo y con el "unique" cuando no es "undefined" verifica que el valor no se repita.
    documento: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    legajo: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    especialidades: [
      {
        _id: false,
        especialidad: {
          type: String,
          trim: true,
          required: [true, "La Especialidad es necesaria."],
        },
        unidad_atencion: {
          type: Schema.Types.ObjectId,
          ref: "Area",
          required: [true, "La Unidad Sanitaria de Atención es necesaria."],
        },
        duracion_turno: {
          type: String,
          required: [true, "La Duración de los Turnos es necesaria."],
        },
        dias_laborales: {
          type: Object,
          default: {},
        },
        turno: {
          type: String,
          default: "no",
          required: [true, "Se requiere saber si la especialidad es con turno."],
        },
      },
    ],

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

profesionalesSchema.virtual("nombreC").get(function () {
  if (this.nombre !== undefined && this.apellido !== undefined) {
    return this.apellido + ", " + this.nombre;
  }
  if (this.nombre === undefined) {
    return this.apellido;
  }
  if (this.apellido === undefined) {
    return this.nombre;
  } else {
    return "No tiene nombres";
  }
});

profesionalesSchema.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

profesionalesSchema.plugin(uniqueValidator, {message: "{PATH} valor repetido, debe de ser único."});

module.exports = mongoose.model("Profesional", profesionalesSchema);
