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
      trim: true,
      unique: true,
      sparse: true,
    },
    marca: {
      type: String,
    },
    modelo: {
      type: String,
      trim: true,
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
    },
    fec_verifico: {
      type: Date,
    },

    // percance
    fec_percance: {
      type: Date,
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
    },

    motivo_eliminacion: {
      type: String,
    },
    usuario_eliminacion: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    fec_eliminacion: {
      type: Date,
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

// antes del save()
patrimonioSchema.pre("save", async function (next) {
  // Modelo NO REPETIBLE en Insumos...
  if (this.categoria === "Insumos") {
    let DB = await Patrimonio.find({
      categoria: "Insumos",
      modelo: this.modelo?.trim(),
    })
      .select("_id id")
      .exec();
    if (DB.length >= 1) {
      // ya existe
      throw (err = {
        message: `El Modelo (${this.modelo?.trim()}) de Insumo ya se encuentra cargado en el Sistema.`,
      });
    }
  }

  next();
});

// antes del update()
patrimonioSchema.pre("findOneAndUpdate", async function (next) {
  // Actualiza horario de edicion
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }

  // Modelo NO REPETIBLE en Insumos...
  if (this.getUpdate().$set?.categoria === "Insumos" || this.getUpdate().categoria === "Insumos") {
    let DB = await Patrimonio.find({
      categoria: "Insumos",
      modelo: this.getUpdate().$set?.modelo?.trim() ?? this.getUpdate().modelo?.trim(),
    })
      .select("_id id")
      .exec();
    if (!(DB.length === 0 || DB.findIndex((obj) => obj?.id === this.getFilter()._id) >= 0)) {
      // Esta Repetido y No es el mismo
      throw (err = {
        message: `El Modelo (${
          this.getUpdate().$set?.modelo?.trim() ?? this.getUpdate().modelo?.trim()
        }) de Insumo ya se encuentra cargado en el Sistema.`,
      });
    }
  }

  next();
});

patrimonioSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

// para usarlo en el Schema.pre("save")
const Patrimonio = mongoose.model("Patrimonio", patrimonioSchema);

module.exports = mongoose.connections[1].model("Patrimonio", patrimonioSchema);
module.exports = Patrimonio;
