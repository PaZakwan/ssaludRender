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

let patrimonioSchema = new Schema(
  {
    usuario_creador: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    usuario_modifico: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    categoria: {
      type: String,
      // enum: categoriaValidos,
      required: [true, "La categoría del bien es necesaria."],
    },
    inventario: {
      type: String,
      unique: true,
      sparse: true,
    },
    serie: {
      type: String,
      unique: true,
      sparse: true,
    },
    marca: {
      type: String,
    },
    modelo: {
      type: String,
    },
    dependencia: {
      type: String,
    },
    fec_alta: {
      type: String,
    },
    detalle: {
      type: String,
    },
    funciona: {
      type: String,
      required: [true, "El Estado del bien es necesaria."],
      default: "Funcionando",
    },

    ubicacion: {
      type: String,
    },
    lugar: {
      type: Schema.Types.ObjectId,
      ref: "Lugar",
      required: [true, "El Lugar en donde se encuentra es necesario."],
    },
    area: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "El Area en donde se encuentra es necesario."],
    },

    verificado: {
      type: Boolean,
      default: false,
    },
    usuario_verifico: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      default: null,
    },
    fec_verifico: {
      type: Date,
      default: null,
    },

    // percance
    fec_percance: {
      type: Date,
      default: null,
    },
    resumen_percance: {
      type: String,
    },

    // baja
    motivo_baja: {
      type: String,
    },
    fec_baja: {
      type: Date,
      default: null,
    },

    motivo_eliminacion: {
      type: String,
    },
    usuario_eliminacion: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      default: null,
    },
    fec_eliminacion: {
      type: Date,
      default: null,
    },

    // PCs
    micro: {
      type: String,
    },
    memoria: {
      type: String,
    },
    memoria_tipo: {
      type: String,
    },
    disco: {
      type: String,
    },
    disco_tipo: {
      type: String,
    },
    mother: {
      type: String,
    },
    fuente: {
      type: String,
    },

    // Insumos
    cantidad: {
      type: Number,
    },
    cantidad_deposito: {
      type: Number,
    },
    subcategoria: {
      type: String,
    },
    compatibilidad: {
      type: String,
    },

    // Monitor
    PC: {
      type: String,
    },
    pulgadas: {
      type: String,
    },
    tipoPantalla: {
      type: String,
    },

    // Impresora
    impresora_tipo: {
      type: String,
    },
    impresora_multifuncion: {
      type: Boolean,
    },

    // Interno
    telefono_interno: {
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

patrimonioSchema.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

patrimonioSchema.plugin(uniqueValidator, {message: "{PATH} valor repetido, debe de ser único."});

module.exports = mongoose.connections[1].model("Patrimonio", patrimonioSchema);
module.exports = mongoose.model("Patrimonio", patrimonioSchema);
