const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const {resolve} = require("path");

const TuberculosisSchema = require("./schemas/Tuberculosis");

const {capitalize, trim_between} = require(resolve(process.env.MAIN_FOLDER, "tools/string"));
const {getEdad} = require(resolve(process.env.MAIN_FOLDER, "tools/object"));

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
          // \u00f1 y \u00d1 son el equivalente para "ñ" y "Ñ", \s es el espacio
          let re = /^[A-Za-z\sÀ-ÿ\u00f1\u00d1]+$/;
          return re.test(v);
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
          // \u00f1 y \u00d1 son el equivalente para "ñ" y "Ñ", \s es el espacio
          let re = /^[A-Za-z\sÀ-ÿ\u00f1\u00d1]+$/;
          return re.test(v);
        },
        message: "No se admiten caracteres especiales ni numeros.",
      },
      set: capitalize,
    },
    tipo_doc: {
      type: String,
      trim: true,
    },
    documento: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          let re = /^[0-9]+$/;
          return re.test(v);
        },
        message: "Solo se admiten numeros.",
      },
    },
    sexo: {
      type: String,
    },
    fec_nac: {
      type: String,
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
      trim: true,
    },
    dir_localidad: {
      type: String,
      trim: true,
    },
    dir_descripcion: {
      type: String,
      trim: true,
      set: trim_between,
    },
    oSocial: {
      type: String,
      trim: true,
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
  {tipo_doc: 1, documento: 1},
  {name: "documento_unico", unique: "Documento ya existente en el sistema, debe ser unico."}
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
      return getEdad({date: this.fec_nac, onlyYear: false});
    }
    return undefined;
  } catch (error) {
    return "ERROR Edad";
  }
});

// antes del save()
pacienteSchema.pre("save", async function (next) {
  // NUMERO DE HISTORIAL DE SALITAS NO REPETIBLE...
  if (this.hist_salitas) {
    for (const element of this.hist_salitas) {
      if (element.area) {
        let DB = await Paciente.find({
          hist_salitas: {$elemMatch: {area: element.area, historial: element.historial}},
        })
          .select("_id id")
          .exec();
        if (DB.length > 1 || (DB.length === 1 && DB[0]._id != this._id)) {
          throw (err = {
            message: `El N° de Historial (${element.historial}) ya se encuentra utilizado en esa Sala por otro paciente.`,
          });
        }
      }
    }
  }
  next();
});

// antes del update()
pacienteSchema.pre("findOneAndUpdate", async function (next) {
  // Actualiza horario de edicion
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  if (this.getUpdate().$set.hist_tuberculosis) {
    this.getUpdate().$set.hist_tuberculosis.updatedAt = new Date();
  } else if (this.getUpdate().hist_tuberculosis) {
    this.getUpdate().hist_tuberculosis.updatedAt = new Date();
  }

  // NUMERO DE HISTORIAL DE SALITAS NO REPETIBLE...
  if (this.getUpdate().$set.hist_salitas) {
    for (const element of this.getUpdate().$set.hist_salitas) {
      if (element.area) {
        let DB = await this.model
          .find({hist_salitas: {$elemMatch: {area: element.area, historial: element.historial}}})
          .select("_id id")
          .exec();
        if (DB.length > 1 || (DB.length === 1 && DB[0]._id != this.getFilter()._id)) {
          throw (err = {
            message: `El N° de Historial (${element.historial}) ya se encuentra utilizado en esa Sala por otro paciente.`,
          });
        }
      }
    }
  }

  next();
});

pacienteSchema.plugin(uniqueValidator, {message: "{PATH} debe de ser único."});

// para usarlo en el Schema.pre("save")
const Paciente = mongoose.model("Paciente", pacienteSchema);

module.exports = Paciente;
