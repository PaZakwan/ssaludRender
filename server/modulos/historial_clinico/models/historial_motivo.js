const mongoose = require("mongoose");

let schemaOptions = {
  toObject: {
    getters: true,
  },
  toJSON: {
    getters: true,
  },
};

let Schema = mongoose.Schema;

let HistorialMotivoSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
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
    },
    profesional: {
      type: Schema.Types.ObjectId,
      ref: "Profesional",
      required: true,
    },
    //  activo, finalizado.
    estado: {
      type: String,
      default: "Activo",
      enum: {
        values: ["Activo", "Finalizado", "Abandonado", "Suspendido", "Cancelado"],
        message: "{VALUE} no es un estado de motivo valido.",
      },
    },
    estadoFecha: {
      type: Date,
    },

    // Sintomas/Problema/motivo
    motivo_especialidad: {
      type: String,
      enum: {
        values: [
          "Nutricion",
          "Diabetes",
          "Tuberculosis",
          // Generalista
          "Pediatria",
          "Clinica Medica",
          "Obstetricia",
          "Ginecologia",
        ],
        message: "{VALUE} no es un motivo valido.",
      },
      required: true,
    },
    severidad: {
      type: String,
      enum: {
        values: ["Leve", "Moderada", "Critica", "Incapaz de evaluar"],
        message: "{VALUE} no es una severidad valida.",
      },
      required: true,
    },
    // sintomas / programas de control
    descripcion: {
      type: String,
      lowercase: true,
      trim: true,
    },
    evolucion: {
      type: String,
      lowercase: true,
      trim: true,
    },
    diagnostico: {
      type: String,
      lowercase: true,
      trim: true,
    },

    // ### obtener CONSULTAS apartir de un find de id motivo..
    // ### La ruta se encargara de buscar las diferentes especialidades..
    // VER GENERAL schema_consultas, PARA HISTORIAL POR ESPECIALIDAD (HOJA 2),
    // findOne({}).populate('consultas.consulta').exec()
    // HOJAS 2
    // consultas: [
    //     {
    //       _id: false,
    //       especialidad: {
    //         type: String,
    //         enum: {
    //           values: ["Nutricion", "Diabetes", "Tuberculosis"],
    //           message: "{VALUE} no es una especialidad valida.",
    //         },
    //         required: true,
    //       },
    //       consulta: {
    //         type: Schema.Types.ObjectId,
    //         refPath: "historial.consultas.especialidad",
    //         required: true,
    //       },
    //     },
    //   ],

    // ### obtener Estudios apartir de un find de id motivo..
    // estudios: [
    //     {
    //       fecha_solicita: {
    //         type: Date,
    //       },
    //       profesional_solicita: {
    //         type: Schema.Types.ObjectId,
    //         ref: "Profesional",
    //       },
    //       // JSON LOCAL
    //       estudio: {
    //         type: String,
    //         required: true,
    //       },
    //       motivo: {
    //         type: String,
    //         lowercase: true,
    //         trim: true,
    //       },
    //       // En caso de que necesite Orden Medica
    //       // Datos obtenidos del array de cobertura del paciente
    //       cobertura: {
    //         rnos: {
    //           type: String,
    //         },
    //         name: {
    //           type: String,
    //         },
    //         plan: {
    //           type: String,
    //         },
    //         nro_afiliado: {
    //           type: String,
    //         },
    //       },
    //       fecha_estudio: {
    //         type: Date,
    //       },
    //       profesional_estudio: {
    //         type: Schema.Types.ObjectId,
    //         ref: "Profesional",
    //       },
    //       datos: {},
    //       resultado: {
    //         type: String,
    //         lowercase: true,
    //         trim: true,
    //       },
    //       estado: {
    //         type: String,
    //         default: "Pendiente",
    //         enum: {
    //           values: ["Pendiente", "Finalizado"],
    //           message: "{VALUE} no es un estado de estudio valido.",
    //         },
    //       },
    //     },
    //   ],

    // ### obtener Medicamentos apartir de un find de id motivo..
    // medicamentos: [
    //     {
    //       profesional: {
    //         type: Schema.Types.ObjectId,
    //         ref: "Profesional",
    //         required: true,
    //       },
    //       // Para la receta medica del array de coberturas del paciente
    //       cobertura: {
    //         rnos: {
    //           type: String,
    //         },
    //         name: {
    //           type: String,
    //         },
    //         plan: {
    //           type: String,
    //         },
    //         nro_afiliado: {
    //           type: String,
    //         },
    //       },
    //       // JSON LOCAL
    //       medicamento: {
    //         type: String,
    //         required: true,
    //       },
    //       fecha_inicio: {
    //         type: Date,
    //       },
    //       // dosis-recetas
    //       aplicacion: {
    //         frecuencia: {
    //           type: String,
    //         },
    //         unidad: {
    //           type: String,
    //         },
    //         intervalo_diario: {
    //           type: String,
    //         },
    //         expira: {
    //           type: Date,
    //         },
    //         chronico: {
    //           type: Boolean,
    //           default: false,
    //         },
    //       },
    //       estado: {
    //         type: String,
    //         default: "Activo",
    //         enum: {
    //           values: ["Activo", "Suspendido", "Finalizado"],
    //           message: "{VALUE} no es un estado de medicacion valido.",
    //         },
    //       },
    //     },
    //   ],
  },
  schemaOptions
);

// antes del save()
HistorialMotivoSchema.pre("save", async function (next) {
  // No mismo Motivo Activo (paciente / estado : "Activo" / motivo_especialidad / descripcion)
  if (this.estado === "Activo") {
    let DB = await HistorialMotivo.find({
      paciente: this.paciente,
      estado: "Activo",
      motivo_especialidad: this.motivo_especialidad,
      descripcion: this.descripcion,
    })
      .select("_id id")
      .exec();
    if (DB.length > 1 || (DB.length === 1 && DB[0]._id != this._id)) {
      throw (err = {
        message: `Ya existe un Mismo Motivo (Programa) "Activo", evolucione con consultas el existente.`,
      });
    }
  }

  // throw (err = {
  //   message: `Testiando, deberia guardarlo.`,
  // });

  next();
});

// antes del update
HistorialMotivoSchema.pre("findOneAndUpdate", async function (next) {
  // No mismo Motivo Activo (paciente / estado : "Activo" / motivo_especialidad / descripcion)
  if (this.getUpdate().$set.estado === "Activo") {
    let DB = await await this.model
      .find({
        paciente: this.getUpdate().$set.paciente,
        estado: "Activo",
        motivo_especialidad: this.getUpdate().$set.motivo_especialidad,
        descripcion: this.getUpdate().$set.descripcion,
      })
      .select("_id id")
      .exec();
    if (DB.length > 1 || (DB.length === 1 && DB[0]._id != this.getUpdate().$set._id)) {
      throw (err = {
        message: `Ya existe un Mismo Motivo "Activo", evolucione el existente.`,
      });
    }
  }

  if (this.getUpdate().$set) {
    this.getUpdate().$set.updatedAt = new Date();
  } else {
    this.getUpdate().updatedAt = new Date();
  }
  next();
});

const HistorialMotivo = mongoose.model(
  "HistorialMotivo",
  HistorialMotivoSchema,
  "HistorialMotivos"
);

module.exports = HistorialMotivo;
