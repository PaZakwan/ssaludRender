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

let VacunaAplicacionSchema = new Schema(
  {
    usuario_creador: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    fecha: {
      type: Date,
      default: Date.now,
    },
    origen: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "El Area que Aplica es necesaria."],
    },
    paciente: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: [true, "El Paciente que recibe es necesario."],
    },
    vacunador: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    fecha_futura_cita: {
      type: Date,
    },

    // Valores del Paciente para acelerar Reportes...
    sexo: {
      // para group etario estadistica
      type: String,
      required: [true, "El Sexo del Paciente es necesario."],
    },
    edad_valor: {
      // para group etario estadistica
      // calcular en base a la fecha de nacimiento y la consulta..
      type: Number,
      required: [true, "La Edad del Paciente es necesaria."],
    },
    edad_unidad: {
      // para group etario estadistica
      // calcular en base a la fecha de nacimiento y la consulta..
      type: String,
      required: [true, "La Edad del Paciente es necesaria."],
    },
    zona_sanitaria: {
      // Del paciente, para sacar reportes de zonas Vacunadas.
      type: String,
    },
    embarazada_semana: {
      type: Number,
    },
    puerpera: {
      type: Boolean,
    },
    prematuro: {
      type: Boolean,
    },
    peso_nacer_menor_2500: {
      type: Boolean,
    },
    peso_nacer_mayor_3800: {
      type: Boolean,
    },
    inmunodeprimida: {
      type: Boolean,
    },
    fuma: {
      type: Boolean,
    },
    antecedentes_patologicos: [
      {
        type: String,
      },
    ],
    oSocial: {
      type: String,
    },
    riesgo: {
      type: Boolean,
    },
    personal_salud: {
      type: Boolean,
    },
    personal_esencial: {
      type: Boolean,
    },
    // FIN Valores del Paciente para acelerar Reportes...

    insumo: {
      type: Schema.Types.ObjectId,
      ref: "Insumo",
      required: [true, "La Vacuna a aplicar es necesaria."],
    },
    cantidad: {
      type: Number,
      default: 1,
    },
    procedencia: {
      type: String,
      default: "Carga inicial",
    },
    lote: {
      type: String,
      required: [true, "El Lote de la Vacuna a aplicar es necesario."],
    },
    vencimiento: {
      type: Date,
      required: [true, "El Vencimiento de la Vacuna a aplicar es necesario."],
    },
    dosis: {
      type: String,
      required: [true, "La Dosis de la Vacuna a aplicar es necesaria."],
    },
    estrategia: {
      type: String,
      default: "Calendario",
    },

    retirado: {
      type: Date,
    },
  },
  schemaOptions
);

module.exports = mongoose.connections[1].model(
  "VacunaAplicacion",
  VacunaAplicacionSchema,
  "VacunaAplicaciones"
);
module.exports = mongoose.model("VacunaAplicacion", VacunaAplicacionSchema, "VacunaAplicaciones");
