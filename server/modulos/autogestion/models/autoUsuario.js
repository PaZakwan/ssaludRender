const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const autoUsuarioSchema = new mongoose.Schema({
  documento: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "El numero de documento es necesario."],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria."],
  },
  email: {
    type: String,
    match: [/^([\w-.]+@([\w-]+\.)+[\w-]{2,12})?$/, "El e-mail no es valido."],
    required: [true, "El e-mail es necesario."],
  },
  // verificar email
  estadoEmail: {
    type: Boolean,
    default: false,
  },
  expireUser: {
    type: Date,
    // El usuario se borrara pasado 1 dia si no se verifica el correo.
    // default: () => new Date(+new Date() + 1 * 24 * 60 * 60 * 1000),
    // El usuario se borrara pasado 10 min si no se verifica el correo.
    default: () => new Date(+new Date() + 10 * 60 * 1000),
    // 3 min to test
    // default: () => new Date(+new Date() + 3 * 60 * 1000),
    // Index encargado de borrar los usuarios en la fecha de la propiedad si existe y estadoEmail = false.
    index: {
      expireAfterSeconds: 0,
      partialFilterExpression: {
        expireUser: {$exists: true},
        estadoEmail: false,
      },
    },
  },
  // Verificacion de datos en donde se atienda.. para futuro.. corroboracion de datos con el documento.
  documentoConfirmado: {
    type: Boolean,
    default: false,
  },

  // Datos
  nombre: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "El nombre es necesario."],
  },
  apellido: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "El apellido es necesario."],
  },
  fec_nac: {
    type: String,
  },
  sexo: {
    type: String,
  },
  telefono: {
    type: String,
  },
  dir_calle: {
    type: String,
    trim: true,
  },
  dir_numero: {
    type: Number,
  },
  dir_piso: {
    type: String,
  },
  dir_depto: {
    type: String,
  },
  dir_barrio: {
    type: String,
    trim: true,
  },
  dir_localidad: {
    type: String,
    trim: true,
  },
  zona: {
    type: String,
    trim: true,
  },
  oSocial: {
    type: String,
    trim: true,
  },

  lastLogin: {
    type: Date,
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

autoUsuarioSchema.virtual("nombreC").get(function () {
  if (this.nombre !== undefined && this.apellido !== undefined) {
    return `${this.nombre}, ${this.apellido}`;
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

autoUsuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject({getters: true});
  delete userObject.password;

  return userObject;
};

autoUsuarioSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  const update = this.getUpdate();

  if ((update.$set && !update.$set.lastLogin) || (!update.$set && !update.lastLogin)) {
    if (update.$set) {
      this.getUpdate().$set.updatedAt = new Date();
    } else {
      this.getUpdate().updatedAt = new Date();
    }
  }

  next();
});

autoUsuarioSchema.plugin(uniqueValidator, {
  message: "Ya existe. Valor repetido: '{VALUE}'.",
});

module.exports = mongoose.model("autoUsuario", autoUsuarioSchema);
