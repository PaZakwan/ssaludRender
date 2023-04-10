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

let HistorialMedicacionSchema = new Schema(
  {
    usuario_modifico: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },

    paciente: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: true,
      unique: true,
    },

    profesional: {
      type: Schema.Types.ObjectId,
      ref: "Profesional",
      required: true,
    },
    // Para la receta medica del array de coberturas del paciente
    // cobertura: {
    //   rnos: {
    //     type: String,
    //   },
    //   name: {
    //     type: String,
    //   },
    //   plan: {
    //     type: String,
    //   },
    //   nro_afiliado: {
    //     type: String,
    //   },
    // },
    area: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: true,
    },
    medicamento: {
      type: Schema.Types.ObjectId,
      ref: "Insumo",
      required: true,
    },
    fecha_inicio: {
      type: Date,
    },
    // dosis-recetas
    // aplicacion: {
    //   frecuencia: {
    //     type: String,
    //   },
    //   unidad: {
    //     type: String,
    //   },
    //   intervalo_diario: {
    //     type: String,
    //   },
    //   expira: {
    //     type: Date,
    //   },
    //   chronico: {
    //     type: Boolean,
    //   },
    // },
    fecha_declaracion_jurada: {
      type: Date,
    },
    dias_declaracion_por_vencer: {
      type: Number,
      min: 0,
    },
    dias_declaracion_vencida: {
      type: Number,
      min: 0,
    },
    estado: {
      type: String,
      default: "Activo",
      enum: {
        values: ["Activo", "Suspendido", "Finalizado"],
        message: "{VALUE} no es un estado de medicacion valido.",
      },
    },

    // fecha_control: {
    //   type: Date,
    // },

    // fecha_declaracion_jurada: [
    //   {
    //     type: Date,
    //   },
    // ],

    // diabetes_tipo: {
    //   type: String,
    // },

    // hipoglucemiantes: [
    //   {
    //     type: String,
    //     enum: ["Metforminas", "Glibenclamida", "Gliclazida"],
    //   },
    // ],

    // insulinas: [
    //   {
    //     type: String,
    //     // enum: ["Metforminas", "Glibenclamida", "Gliclazida"],
    //   },
    // ],

    // motivo_baja: {
    //   type: String,
    // },

    // // HTA
    // hiper_tension: {
    //   type: String,
    // },

    // enalpril: {
    //   type: Boolean,
    // },

    // losartan: {
    //   type: Boolean,
    // },

    // hidroclortiazidas: {
    //   type: Boolean,
    // },

    // amlodipina: {
    //   type: Boolean,
    // },

    // atenolol: {
    //   type: Boolean,
    // },

    // carvedilol: {
    //   type: Boolean,
    // },

    // antidepresivos: [
    //   {
    //     type: String,
    //     // enum: ["Metforminas", "Glibenclamida", "Gliclazida"],
    //   },
    // ],

    // // Colesterol
    // dislipemia: {
    //   type: String,
    // },

    // estatinas: [
    //   {
    //     type: String,
    //     // enum: ["Metforminas", "Glibenclamida", "Gliclazida"],
    //   },
    // ],

    // // Tabaquismo
    // fuma: {
    //   type: String,
    // },

    // aspirina: {
    //   type: Boolean,
    // },
  },
  schemaOptions
);

HistorialMedicacionSchema.pre("findOneAndUpdate", async function (next) {
  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

HistorialMedicacionSchema.virtual("declaracion_vencida").get(function () {
  // calcular diferencia de fechas
  // TESTEAR DIFERENCIAS HORARIAS... UTC en 00:00:00:0000
  let hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  let days_diff = Math.floor(
    Math.abs((hoy.getTime() - this.fecha_declaracion_jurada.getTime()) / (24 * 60 * 60 * 1000))
  );
  if (days_diff >= this.dias_actualizar_declaracion) {
    return (
      "vencio." +
      this.fecha_declaracion_jurada +
      "." +
      this.dias_actualizar_declaracion +
      "." +
      days_diff
    );
  }
  return (
    "todavia sirve." +
    this.fecha_declaracion_jurada +
    "." +
    this.dias_actualizar_declaracion +
    "." +
    days_diff
  );
});

// HistorialMedicacionSchema.virtual("IMC").get(function () {
//   // Indice de Masa Corporal Kg/mts^2
//   if (this.peso && this.talla && this.peso.length > 0 && this.talla.length > 0) {
//     return (
//       (this.peso[this.peso.length - 1] * 1000) / (this.talla[this.talla.length - 1] / 100) ** 2
//     );
//   } else {
//     return "";
//   }
//   // Blanco = Bajo peso (IMC <18,5)
//   // Amarillo = Rango normal (IMC = 18,5-24,9)
//   // Naranja = Sobrepeso (IMC = 24.9-29,9)
//   // Rojo = Obesidad (IMC >30)
// });

HistorialMedicacionSchema.plugin(uniqueValidator, {message: "{PATH} debe de ser único."});

module.exports = mongoose.model(
  "HistorialMedicacion",
  HistorialMedicacionSchema,
  "HistorialMedicaciones"
);
