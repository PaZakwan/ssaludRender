const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// ============================
// XXXXXX  Desarrollar  XXXXXXX
// ============================
// ============================
// VER TODO, Extraido del ex historial
// ============================

let schemaOptions = {
  toObject: {
    getters: true,
  },
  toJSON: {
    getters: true,
  },
  _id: false,
};

let Schema = mongoose.Schema;

let DiabetesSchema = new Schema(
  {
    _id: false,

    usuario_modifico: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    numero_hist: {
      type: String,
      sparse: true,
      trim: true,
      required: true,
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
          type: Schema.Types.ObjectId,
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
  },
  schemaOptions
);

DiabetesSchema.pre("findOneAndUpdate", async function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

DiabetesSchema.virtual("fecha_ultimo_control").get(function () {
  if (this.controles && this.controles[0] && this.controles[0].fecha_control) {
    return `${this.controles[0].fecha_control}`;
  } else {
    return "No hay registro";
  }
});

DiabetesSchema.plugin(uniqueValidator, {message: "{PATH} debe de ser único."});

module.exports = DiabetesSchema;
