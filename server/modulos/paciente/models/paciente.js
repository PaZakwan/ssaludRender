const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const TuberculosisSchema = require("./schemas/Tuberculosis");

const {capitalize, trim_between} = require(process.env.MAIN_FOLDER + "/tools/string");
const {getEdad} = require(process.env.MAIN_FOLDER + "/tools/object");

let schemaOptions = {
  toObject: {
    getters: true,
    virtuals: true,
  },
  toJSON: {
    getters: true,
    virtuals: true,
  },
};

let pacienteSchema = new mongoose.Schema(
  {
    usuario_modifico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    // Datos Personales
    apellido: {
      type: String,
      trim: true,
      required: [true, "El apellido es necesario."],
      validate: {
        validator: function (v) {
          // \u00f1 y \u00d1 son el equivalente para "ñ" y "Ñ", \s es el espacio y algunos especiales -> '`´¨-
          return /^[A-Za-z\sÀ-ÿ\u00f1\u00d1'`´¨-]+$/.test(v);
        },
        message: "No se admiten caracteres especiales ni numeros.",
      },
      set: capitalize,
    },
    nombre: {
      type: String,
      trim: true,
      required: [true, "El nombre es necesario."],
      validate: {
        validator: function (v) {
          // \u00f1 y \u00d1 son el equivalente para "ñ" y "Ñ", \s es el espacio y algunos especiales -> '`´¨-
          return /^[A-Za-z\sÀ-ÿ\u00f1\u00d1'`´¨-]+$/.test(v);
        },
        message: "No se admiten caracteres especiales ni numeros.",
      },
      set: capitalize,
    },
    tipo_doc: {
      type: String,
    },
    documento: {
      type: String,
      trim: true,
      uppercase: true,
      validate: {
        validator: function (v) {
          return /^[A-Z0-9]+$/.test(v);
        },
        message: "Solo se admiten numeros y letras Mayusculas.",
      },
    },
    sexo: {
      type: String,
      required: [true, "El Sexo del Paciente es necesario."],
    },
    fec_nac: {
      type: String,
      required: [true, "La Fecha de Nacimiento del Paciente es necesaria."],
    },
    telefono: {
      type: String,
    },
    telefono_alt: {
      type: String,
    },
    email: {
      type: String,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,12})?$/, "El e-mail no es valido."],
    },
    // Direccion
    dir_calle: {
      type: String,
      trim: true,
      set: capitalize,
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
    },
    dir_localidad: {
      type: String,
      required: [true, "La Localidad del Paciente es necesaria."],
    },
    dir_municipio: {
      type: String,
    },
    dir_descripcion: {
      type: String,
      trim: true,
      set: trim_between,
    },
    oSocial: {
      type: String,
    },
    oSocialNumero: {
      type: String,
      trim: true,
    },
    // No guardar si esta vacio...
    hist_salitas: {
      type: [
        {
          _id: false,
          area: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Area",
          },
          historial: {
            type: String,
            trim: true,
            uppercase: true,
          },
        },
      ],
      default: void 0,
    },

    // Historiales migrar tuberculosis
    hist_tuberculosis: TuberculosisSchema,

    fec_fallecimiento: {
      type: String,
    },
    validadoRENAPER: {
      type: Boolean,
    },

    // PSVacunas
    ps_id: {type: Array, default: void 0},

    resp_apellido: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          // \u00f1 y \u00d1 son el equivalente para "ñ" y "Ñ", \s es el espacio y algunos especiales -> '`´¨-
          return /^[A-Za-z\sÀ-ÿ\u00f1\u00d1'`´¨-]+$/.test(v);
        },
        message: "No se admiten caracteres especiales ni numeros.",
      },
      set: capitalize,
    },
    resp_nombre: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          // \u00f1 y \u00d1 son el equivalente para "ñ" y "Ñ", \s es el espacio y algunos especiales -> '`´¨-
          return /^[A-Za-z\sÀ-ÿ\u00f1\u00d1'`´¨-]+$/.test(v);
        },
        message: "No se admiten caracteres especiales ni numeros.",
      },
      set: capitalize,
    },
    resp_tipo_doc: {
      type: String,
    },
    doc_responsable: {
      type: String,
      trim: true,
      uppercase: true,
    },
    resp_sexo: {
      type: String,
    },
    resp_fec_nac: {
      type: String,
    },

    cipres_id: {
      type: String,
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

pacienteSchema.index(
  {
    sexo: 1,
    documento: 1,
    tipo_doc: 1,
  },
  {
    name: "documento_unico",
    unique: true,
    sparse: true,
    partialFilterExpression: {
      $and: [{sexo: {$exists: true}}, {tipo_doc: {$exists: true}}, {documento: {$exists: true}}],
    },
  }
);

pacienteSchema.virtual("nombreC").get(function () {
  try {
    return `${capitalize(this.apellido)}, ${capitalize(this.nombre)}`;
  } catch (error) {
    return "ERROR apellido y nombre";
  }
});

pacienteSchema.virtual("documentoC").get(function () {
  try {
    if (!!this.documento) {
      return `${this.tipo_doc ? `${this.tipo_doc} ` : ""}${this.documento}`;
    } else if (!!this.doc_responsable) {
      return `Resp ${this.doc_responsable}`;
    }
    return undefined;
  } catch (error) {
    return "ERROR en Documento";
  }
});

pacienteSchema.virtual("nombreDocumento").get(function () {
  try {
    return `${this.nombreC} ${this.documentoC ? `(${this.documentoC})` : "(Documento)"}`;
  } catch (error) {
    return "ERROR apellido, nombre (Documento)";
  }
});

pacienteSchema.virtual("direccion").get(function () {
  try {
    if (!!this.dir_calle || !!this.dir_numero) {
      return `${this.dir_calle ? capitalize(this.dir_calle) : ""}${
        this.dir_numero ? ` ${this.dir_numero}` : ""
      }`;
    }
    return undefined;
  } catch (error) {
    return "ERROR Direccion";
  }
});

pacienteSchema.virtual("edad").get(function () {
  try {
    // edad_years: "",
    // edad_months: "",
    // edad_weeks: "",
    // edad_days: "",
    if (!!this.fec_nac) {
      return getEdad({date: this.fec_nac, onlyYear: false, formatString: true});
    }
    return undefined;
  } catch (error) {
    return "ERROR Edad";
  }
});

// antes del update()
pacienteSchema.pre("findOneAndUpdate", async function (next) {
  // Actualiza horario de edicion
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  if (this.getUpdate().$set?.hist_tuberculosis) {
    this.getUpdate().$set.hist_tuberculosis.updatedAt = new Date();
  } else if (this.getUpdate().hist_tuberculosis) {
    this.getUpdate().hist_tuberculosis.updatedAt = new Date();
  }

  next();
});

pacienteSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

// para usarlo en el Schema.pre("save")
const Paciente = mongoose.model("Paciente", pacienteSchema);

module.exports = mongoose.connections[1].model("Paciente", pacienteSchema);
module.exports = Paciente;
