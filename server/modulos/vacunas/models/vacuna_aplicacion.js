const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const VacunaAplicacionSchema = new mongoose.Schema({
  usuario_creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario creador es necesario"],
  },

  fecha: {
    type: Date,
    default: Date.now,
  },
  origen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: [true, "El Area que Aplica es necesaria."],
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: [
      function () {
        const ps_paciente =
          this instanceof mongoose.Query
            ? // Si es una query (update), buscamos en getUpdate().
              this.getUpdate()?.$set?.ps_paciente || this.getUpdate()?.ps_paciente
            : // Si es un documento (save), usamos this directamente.
              this.ps_paciente;

        return !ps_paciente;
      },
      // "El Paciente es necesario si ps_paciente no existe.",
      "El Paciente que recibe es necesario.",
    ],
  },
  vacunador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [
      function () {
        const vacunadorName =
          this instanceof mongoose.Query
            ? this.getUpdate()?.$set?.vacunadorName || this.getUpdate()?.vacunadorName
            : this.vacunadorName;

        return !vacunadorName;
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
  fec_nac: {
    type: String,
    required: [true, "La Fecha de Nacimiento del Paciente es necesaria."],
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "VacunaInsumo",
    required: [
      function () {
        const vacunaName =
          this instanceof mongoose.Query
            ? this.getUpdate()?.$set?.vacunaName || this.getUpdate()?.vacunaName
            : this.vacunaName;

        return !vacunaName;
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
        const vacunador =
          this instanceof mongoose.Query
            ? this.getUpdate()?.$set?.vacunador || this.getUpdate()?.vacunador
            : this.vacunador;

        return vacunador;
      },
      // "El Lote de la Vacuna a aplicar es necesario si vacunador existe.",
      "El Lote de la Vacuna a aplicar es necesario.",
    ],
  },
  vencimiento: {
    type: Date,
    required: [
      function () {
        const vacunador =
          this instanceof mongoose.Query
            ? this.getUpdate()?.$set?.vacunador || this.getUpdate()?.vacunador
            : this.vacunador;

        return vacunador;
      },
      // "El Vencimiento de la Vacuna a aplicar es necesario si vacunador existe.",
      "El Vencimiento de la Vacuna a aplicar es necesario.",
    ],
  },
  dosis: {
    type: String,
    required: [true, "La Dosis de la Vacuna a aplicar es necesaria."],
  },
  qty_dosis: {
    type: String,
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
  ps_tipo_doc: {
    type: String,
  },
  ps_doc: {
    type: String,
  },
  ps_fecha_nacimiento: {
    type: Date,
  },
  ps_doc_resp: {
    type: String,
  },

  // CIPRES
  cipres_fecha: {
    type: Date,
  },
  cipres_id: {
    type: String,
    unique: true,
    sparse: true,
  },
  cipres_msg: {
    type: String,
  },

  retirado: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

VacunaAplicacionSchema.plugin(uniqueValidator, {message: "Ya existe. Valor repetido: '{VALUE}'."});

mongoose.connections[1].model("VacunaAplicacion", VacunaAplicacionSchema, "VacunaAplicaciones");
module.exports = mongoose.model("VacunaAplicacion", VacunaAplicacionSchema, "VacunaAplicaciones");
