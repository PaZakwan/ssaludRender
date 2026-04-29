const mongoose = require("mongoose");

// ============================
// XXXXXX  Desarrollar  XXXXXXX
// ============================
// ============================
// VER TODO, Extraido del ex historial
// ============================

const DiabetesSchema = new mongoose.Schema({
  _id: false,

  usuario_modifico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario modificador es necesario"],
  },

  numero_hist: {
    type: String,
    sparse: true,
    trim: true,
    required: [true, "El numero de historial es necesario"],
  },
  fecha_inicio: {
    type: Date,
    default: Date.now,
  },
  fecha_declaracion_jurada: {
    type: Date,
  },
  observacion: {
    type: String,
    trim: true,
  },
  controles: [
    {
      fecha_control: {
        type: Date,
      },
      profesional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profesional",
      },
      medicacion: {
        glibenclamida: {
          type: Boolean,
        },
        metformina: {
          type: Boolean,
        },
        insulina: {
          type: Boolean,
        },
        HTA: {
          type: Boolean,
        },
        enalapril: {
          type: Boolean,
        },
        atenolol: {
          type: Boolean,
        },
        losartan: {
          type: Boolean,
        },
        furosemida: {
          type: Boolean,
        },
        hidroclorotiazida: {
          type: Boolean,
        },
        dislipemia: {
          type: Boolean,
        },
        estatinas: {
          type: String,
          enum: ["simvastatina", "atorvastatina", "rosuvastatina"],
        },
      },
    },
  ],

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

DiabetesSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], async function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

DiabetesSchema.virtual("fecha_ultimo_control").get(function () {
  return `${this.controles?.[0]?.fecha_control ?? "No hay registro"}`;
});

module.exports = DiabetesSchema;
