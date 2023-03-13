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

let analisisValidos = {
  values: ["Bacteriologico", "Fisico-Quimico", "Alimento"],
  message: "{VALUE} no es un análisis válido.",
};

let contieneValidos = {
  values: ["Contiene", "No Contiene", ""],
  message: "{VALUE} no es un valor válido.",
};

let contiene500 = {
  values: [">500", "<500", ""],
  message: "{VALUE} no es un valor válido.",
};

let bromatologiaSchema = new Schema(
  {
    usuario_creador: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    orden: {
      type: String,
      unique: true,
      required: [true, "El numero de orden es necesario"],
    },
    conclusion: {
      type: String,
      default: "",
    },
    origen: {
      type: String,
      default: "",
    },
    // "sparse" permite varios ingresos "undefined" del campo y con el "unique" cuando no es "undefined" verifica que el valor no se repita.
    muestra: {
      type: String,
      unique: true,
      sparse: true,
    },
    expediente: {
      type: String,
    },
    tipo_analisis: {
      type: String,
      enum: analisisValidos,
      required: [true, "El tipo de análisis es obligatorio"],
    },
    fuente_analisis: {
      type: String,
    },
    titular: {
      type: String,
      required: [true, "El titular es obligatorio"],
    },
    rubro: {
      type: String,
    },
    dir_calle: {
      type: String,
      required: [true, "La dirección es obligatoria."],
    },
    dir_numero: {
      type: Number,
    },
    dir_entre: {
      type: String,
      default: "",
    },
    dir_barrio: {
      type: String,
      default: "",
    },
    telefono: {
      type: String,
      match: [/^[0-9]+$/, "El teléfono debe ser numérico."],
      default: "",
    },
    inspector: {
      type: String,
      default: "",
    },
    observacion: {
      type: String,
      default: "",
    },
    fec_solicitud: {
      type: Date,
    },
    fec_inspeccion: {
      type: Date,
    },
    fec_resultado: {
      type: Date,
    },

    usuario_verifico: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      default: null,
    },
    fec_verificado: {
      type: Date,
      default: null,
    },
    descargas: {
      type: Number,
      min: 0,
      default: 0,
    },

    // Bacteriologico
    mesofilas: {
      type: String,
      enum: contiene500,
    },
    coliformes: {
      type: String,
    },
    echerihia: {
      type: String,
      enum: contieneValidos,
    },
    pseudomonaAeruginosa: {
      type: String,
      enum: contieneValidos,
    },

    //Fisico-Quimico
    color: {
      type: String,
    },
    olor: {
      type: String,
    },
    aspecto: {
      type: String,
    },
    ph: {
      type: Number,
    },
    nitratos: {
      type: Number,
    },
    nitritos: {
      type: Number,
    },
    sulfato: {
      type: Number,
    },
    arsenico: {
      type: Number,
    },
    cloruros: {
      type: Number,
    },
    dureza: {
      type: Number,
    },
    alcalinidad: {
      type: Number,
    },

    // Alimento
    observacionAlimento: {
      type: String,
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

bromatologiaSchema.virtual("direccion").get(function () {
  if (this.dir_numero) {
    return `${this.dir_calle} ${this.dir_numero}`;
  } else {
    return this.dir_calle;
  }
});

bromatologiaSchema.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

bromatologiaSchema.plugin(uniqueValidator, {message: "{PATH} valor repetido, debe de ser único."});

module.exports = mongoose.model("Bromatologia", bromatologiaSchema);
