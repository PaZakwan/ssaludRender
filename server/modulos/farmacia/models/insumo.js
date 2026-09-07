const mongoose = require("mongoose");

const InsumoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, "El Insumo a cargar es necesario."],
    unique: true,
  },
  categoria: {
    type: String,
    required: [true, "La Categoria a cargar es necesaria."],
  },

  descripcion: {
    type: String,
    trim: true,
    lowercase: true,
  },

  unique_code: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
  },

  // HICLEM
  // diagnostico [codigo] (detectado por medico)
  // el médico ajusta -> la dosis, la frecuencia y la duración del tratamiento.

  // Categoria - Medicamento
  // https://servicios.pami.org.ar/vademecum/views/consultaPublica/listado.zul
  forma_farmaceutica: {
    type: String,
  },
  administracion: {
    type: String,
  },
  // empaque / presentacion (stock - ingreso)
  empaque: {
    type: String,
  },

  // certificado_anmat  46087 (no es unico)
  // -- GTIN | Troquel Unitario -> Vademécum Nacional de Medicamentos (VNM) (Producto + Lab + Envase) | Envase fisico autorizado
  // GTIN               07791829019436 (unico -> Producto + Lab + Envase)
  // laboratorio        MICROSULES ARGENTINA S.A. (lista proveedor?)
  // nombre_comercial   RHINAL
  // -- Generico (DCI) | Normativo (Ley de Genericos) | Ley 25.649
  // nombre_generico    NAFAZOLINA CLORHIDRATO 0.1 mg / 100 ml Frasco
  // nombreC ->         nombre_generico + concentracion + empaque

  // accion terapeutica [codigo] (medicamento farmacia) (lista a cargar por farmacia con codigos de provincia-nacion)
  // -- Codigo ATC | Científico (Principio Activo, uso terapeutico diferentes, cantidades de droga) | ANMAT -> Listado ATC
  accion_terapeutica: {
    type: [
      {
        _id: false,
        nombre: {
          type: String,
          trim: true,
        },
        codigo_provincia: {
          type: String,
          uppercase: true,
          trim: true,
        },
        codigo_atc: {
          type: String,
          uppercase: true,
          trim: true,
        },
      },
    ],
    default: void 0,
  },

  auditoria: {
    type: String,
    trim: true,
  },

  cantidad_tratamiento_aprox: {
    type: Number,
  },

  estado: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

InsumoSchema.virtual("nombreC").get(function () {
  try {
    return `${this.nombre}${this.descripcion ? `: ${this.descripcion}` : ""}`;
  } catch (error) {
    return "ERROR nombre y descripcion";
  }
});

InsumoSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }

  next();
});

module.exports = mongoose.model("Insumo", InsumoSchema, "Insumos");
