const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const {resolve} = require("path");

const {capitalize} = require(resolve(process.env.MAIN_FOLDER, "tools/string"));

let schemaOptions = {
  toObject: {
    getters: true,
  },
  toJSON: {
    getters: true,
  },
};

const permisosFarmacia = new mongoose.Schema(
  {
    // crear insumos
    insumos: {
      type: Number,
      min: 0,
      max: 1,
    },
    // Para todas las areas
    general: {
      stock: {
        type: Number,
        min: 0,
        max: 1,
      },
      reportes: {
        type: Number,
        min: 0,
        max: 1,
      },
      admin: {
        type: Number,
        min: 0,
        max: 1,
      },
    },
    // entrega de insumos a pacientes
    entregas: {type: [{type: mongoose.Schema.Types.ObjectId, ref: "Area"}], default: void 0},
    // visualizacion de stock del area...
    stock: {type: [{type: mongoose.Schema.Types.ObjectId, ref: "Area"}], default: void 0},
    // gestion del area: opciones, solicitudes propias, entradas, clearing, descartes, reportes locales.
    gestion: {type: [{type: mongoose.Schema.Types.ObjectId, ref: "Area"}], default: void 0},
  },
  {_id: false}
);

let usuarioSchema = new mongoose.Schema(
  {
    usuario: {
      type: String,
      unique: true,
      minlength: 3,
      match: [/^[0-9a-zA-Z\u00f1\u00d1]+$/, "Solo se admiten letras(sin acentos) y números."],
      required: [true, "El nombre de usuario es necesario."],
    },
    nombre: {
      type: String,
      minlength: 2,
      trim: true,
      required: [true, "El nombre es necesario."],
      set: capitalize,
    },
    apellido: {
      type: String,
      minlength: 2,
      trim: true,
      required: [true, "El apellido es necesario."],
      set: capitalize,
    },

    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "El Area donde trabaja es necesario."],
    },
    password: {
      type: String,
      minlength: 4,
      required: [true, "La contraseña es obligatoria."],
    },
    role: {
      type: String,
      default: "USER_ROLE",
      enum: {
        values: ["ADMIN_ROLE", "USER_ROLE"],
        message: "{VALUE} no es un rol válido.",
      },
    },
    actividad: {
      type: String,
    },
    email: {
      type: String,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,12})?$/, "El e-mail no es valido."],
    },
    telefono: {
      type: String,
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

    // Permisos Sub-sistemas

    bromatologia: {
      type: Number,
      min: 0,
      max: 3,
    },
    informatica: {
      type: Number,
      min: 0,
      max: 3,
    },
    patrimonio: {
      type: Number,
      min: 0,
      max: 3,
    },
    patrimonioArea: {
      type: Number,
      min: 0,
      max: 3,
    },
    tuberculosis: {
      type: Number,
      min: 0,
      max: 3,
    },
    turnero: {
      type: Number,
      min: 0,
      max: 3,
    },
    historial_clinico: {
      type: Number,
      min: 0,
      max: 3,
    },
    farmacia: {
      type: permisosFarmacia,
      default: void 0,
    },
  },
  schemaOptions
);

usuarioSchema.virtual("nombreC").get(function () {
  try {
    return `${
      this.apellido ? capitalize(this.apellido) : ""
    }${this.apellido && this.nombre ? `, ` : ""}${this.nombre ? `${capitalize(this.nombre)}` : ""}${!this.apellido && !this.nombre ? `No tiene apellido y nombre` : ""}`;
  } catch (error) {
    return "ERROR apellido y nombre";
  }
});

usuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject({getters: true});
  delete userObject.password;

  return userObject;
};

usuarioSchema.pre("findOneAndUpdate", function (next) {
  if (!this._update.lastLogin) {
    if (this.getUpdate().$set) {
      this.getUpdate().$set.updatedAt = new Date();
    } else {
      this.getUpdate().updatedAt = new Date();
    }
  }
  next();
});

usuarioSchema.plugin(uniqueValidator, {message: "{PATH} debe de ser único."});

module.exports = mongoose.model("Usuario", usuarioSchema);
