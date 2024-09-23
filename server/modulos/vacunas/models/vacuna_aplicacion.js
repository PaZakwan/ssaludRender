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
      required: [
        function () {
          return !this.ps_paciente;
        },
        // "El Paciente es necesario si ps_paciente no existe.",
        "El Paciente que recibe es necesario.",
      ],
    },
    vacunador: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: [
        function () {
          return !this.vacunadorName;
        },
        // "El Vacunador es necesario si vacunadorName no existe.",
        "El Vacunador es necesario.",
      ],
    },
    vacunadorName: {
      type: String,
    },
    fecha_futura_cita: {
      type: Date,
    },

    // Valores del Paciente para acelerar Reportes...
    tipo_doc: {
      type: String,
    },
    documento: {
      type: String,
      trim: true,
      uppercase: true,
    },
    doc_responsable: {
      type: String,
      trim: true,
      uppercase: true,
    },
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
    antecedentes_patologicos: {
      type: [
        {
          type: String,
        },
      ],
      default: void 0,
    },
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
      ref: "VacunaInsumo",
      required: [
        function () {
          return !this.vacunaName;
        },
        // "La Vacuna a aplicar es necesaria si vacunaName no existe.",
        "La Vacuna a aplicar es necesaria.",
      ],
    },
    vacunaName: {
      type: String,
    },
    procedencia: {
      type: String,
      default: "Carga inicial",
    },
    lote: {
      type: String,
      required: [
        function () {
          return this.vacunador;
        },
        // "El Lote de la Vacuna a aplicar es necesario si vacunador existe.",
        "El Lote de la Vacuna a aplicar es necesario.",
      ],
    },
    vencimiento: {
      type: Date,
      required: [
        function () {
          return this.vacunador;
        },
        // "El Vencimiento de la Vacuna a aplicar es necesario si vacunador existe.",
        "El Vencimiento de la Vacuna a aplicar es necesario.",
      ],
    },
    dosis: {
      type: String,
      required: [true, "La Dosis de la Vacuna a aplicar es necesaria."],
    },
    completa: {
      type: Boolean,
    },
    estrategia: {
      type: String,
      default: "Calendario",
    },

    // PSVacunas
    ps_id: {
      type: String,
      unique: true,
      sparse: true,
    },
    ps_paciente: {
      type: String,
    },
    ps_nombreC: {
      type: String,
    },
    ps_fecha_nacimiento: {
      type: String,
    },

    retirado: {
      type: Date,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  schemaOptions
);

VacunaAplicacionSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

module.exports = mongoose.connections[1].model(
  "VacunaAplicacion",
  VacunaAplicacionSchema,
  "VacunaAplicaciones"
);
module.exports = mongoose.model("VacunaAplicacion", VacunaAplicacionSchema, "VacunaAplicaciones");
