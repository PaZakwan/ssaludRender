const express = require("express");
const mongoose = require("mongoose");

// Middleware de Permisos
const {verificaToken, verificaAdmin_Role} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {uploadSingleRoute} = require(process.env.MAIN_FOLDER + "/middlewares/upload");
// tools
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, isDateValid, isObjectIdValid} = require(process.env.MAIN_FOLDER + "/tools/object");
const {
  crearContentCSV,
  fileToJson,
  crearStreamFile,
  guardarContentStream,
  cerrarStreamFile,
  deleteFile,
} = require(process.env.MAIN_FOLDER + "/tools/file");

const app = express();

// CONSULTA PARA BORRAR EN MONGODB
// db.getCollection("VacunaAplicaciones")
//   .find({})
//   .skip(10)
//   .forEach(function (obj) {
//     db.getCollection("VacunaAplicaciones").deleteOne(obj);
//   });
const ps_us_oficina = {
  // ps_us => oficina_nro
  // Alvarez
  15: "15207",
  // sambrizzi
  30: "15216",
  // pqe paso del rey
  32: "15218",
  // posta San Carlos R25
  35: "15240",
  // portal saludable
  39: "15256",
  // REM
  40: "15254",
  // Amancio Alcorta
  41: "15219",
  // Altos de la Reja
  42: "15212",
  // Parque del Oeste
  46: "15231",
  // El Vergel
  47: "15232",
  // Villanueva
  48: "15246",
  // La perlita
  58: "15236",
  // La bibiana
  62: "15252",
  // Antropozoonosis
  63: "15117",
  // Prev Violencia familiar
  65: "12034",
  // Cortez
  66: "15217",
  // Salud Mental
  69: "15110",
  // Dia Salud Mental
  110: "15110",
  // Emergencias Salud Mental
  500: "15110",
  // Prisma Salud Mental
  915: "15110",
  // ACAIS (salud Mental)
  917: "15110",
  // Molina Campos
  74: "15230",
  // Vacunatorio Central
  86: "15115",
  // Vacunatorio Movil
  909: "15115",
  // Odontologia
  90: "15204",
  // Obesidad
  91: "15118",
  // Adicciones
  101: "15111",
  // Corsi
  121: "15224",
  // Indaburu
  171: "15234",
  // Santa Brigida
  201: "15244",
  // Anderson
  210: "15228",
  // Las Flores
  228: "15249",
  // La Fortuna
  236: "15243",
  // Lomas Marilo
  244: "15242",
  // Lomas de Casasco
  261: "15221",
  // Reja Grande
  279: "15211",
  // Maternidad Estela de Carloto (prov)
  300: "56000953",
  // Paso del Rey
  341: "15214",
  // Juramento
  350: "15226",
  // 25 de mayo
  368: "15237",
  // Cortejarena
  376: "15209",
  // San Ambrosio
  384: "15245",
  // Bongiovani
  392: "15215",
  // La reja
  406: "15208",
  // Las Catonas
  414: "15248",
  // Martin Fierro
  431: "15223",
  // Jose de San Martin
  449: "15239",
  // San Carlos R23
  457: "15251",
  // La Victoria
  473: "15222",
  // La Esperanza
  490: "15229",
  // Los Paraisos
  520: "15235",
  // San Jorge
  538: "15225",
  // Villa Escobar
  554: "15210",
  // Cuatro Vientos (pavon)
  562: "15250",
  // Jardines
  571: "15238",
  // Centro ETS/VIH (CET)
  589: "15113",
  // CISI
  753: "15260",
  906: "15260",
  907: "15260",
  908: "15260",
  // Hospital Movil
  900: false,
  // Maternidad e Infancia
  901: "12042",
  // Promocion Territorial
  902: "15107",
  // Trasbordo Promocion Territorial
  903: "15107",
  // Salud del Adulto
  904: "15109",
  // Enfermeria TBC
  905: "12039",
  // 6 de Enero
  910: "15300",
  // Los Hornos
  911: "15261",
  // Salud Sexual
  912: "12033",
  // La Perla
  913: "15255",
  // Atalaya
  914: "15262",
  // Moreno 2000 Villa Anita
  916: "15263",
};

const ps_estrategia_name = {
  1: "Calendario",
  2: "Campaña",
  3: "Contactos",
  4: "Terreno",
  5: "Internacion",
  6: "Pre exposicion",
  7: "Pos exposicion",
};

const ps_dosis_name = {
  D1: "1era",
  D2: "2da",
  D3: "3era",
  D4: "4ta",
  D5: "5ta",
  D6: "6ta",
  D7: "7ma",
  DA: "Anual",
  DN: "Neonatal",
  DU: "Unica",
  R: "Refuerzo",
  R2: "Refuerzo 2do",
  R3: "Refuerzo 3ero",
};

const ps_vacuna_name = {
  2: "BCG",
  3: "Hepatitis B Pediatrica 10mcg",
  4: "Hepatitis B Pediatrica 10mcg",
  5: "Hepatitis B Pediatrica 10mcg",
  6: "Hepatitis B Pediatrica 10mcg",
  7: "Sabin OPV",
  8: "Sabin OPV",
  9: "Sabin OPV",
  10: "Sabin OPV",
  11: "Sabin OPV",
  12: "Neumococo Conjugada (13)",
  13: "Neumococo Conjugada (13)",
  14: "Neumococo Conjugada (13)",
  15: "Neumococo Conjugada (13)",
  16: "Pentavalente DPT HB Hib",
  17: "Pentavalente DPT HB Hib",
  18: "Pentavalente DPT HB Hib",
  19: "Pentavalente DPT HB Hib",
  21: "Cuadruple Bacteriana DPT Hib",
  22: "Cuadruple Bacteriana Acelular DPTa Hib",
  23: "DPT Triple Bacteriana",
  24: "DPTa Triple Bacteriana Acelular",
  25: "Hepatitis A Pediatrica",
  26: "SRP Triple Viral",
  27: "SRP Triple Viral",
  28: "DT Doble Bacteriana",
  29: "DT Doble Bacteriana",
  30: "DT Doble Bacteriana",
  31: "VPH Cuadrivalente",
  32: "VPH Cuadrivalente",
  33: "VPH Cuadrivalente",
  34: "SR Doble Viral",
  35: "Neumococo Polisacarida (23)",
  36: "Varicela",
  37: "Antigripal Pediatrica",
  38: "Salk IPV",
  39: "Salk IPV",
  40: "Salk IPV",
  41: "Salk IPV",
  42: "Salk IPV",
  43: "Varicela",
  49: "Hepatitis A Pediatrica",
  50: "Hepatitis A Pediatrica",
  51: "Cuadruple Bacteriana Acelular DPTa Hib",
  52: "Cuadruple Bacteriana Acelular DPTa Hib",
  53: "Cuadruple Bacteriana Acelular DPTa Hib",
  56: "Rotavirus",
  57: "Rotavirus",
  58: "Rotavirus",
  59: "PPD", //name tuberculosis examen
  60: "Antigripal Pediatrica",
  61: "Antigripal Pediatrica",
  69: "Sextuple DTPa Hib HB Salk",
  70: "Sextuple DTPa Hib HB Salk",
  71: "Sextuple DTPa Hib HB Salk",
  72: "Meningococo ACYW",
  73: "Meningococo ACYW",
  74: "Meningococo ACYW",
  75: "Meningococo ACYW",
  76: "Antigripal Adultos",
  77: "Gripe Mayores", //name
  78: "Hepatitis B Adultos 20mcg",
  79: "Hepatitis B Adultos 20mcg",
  80: "Hepatitis B Adultos 20mcg",
  81: "Antigripal Adultos",
  82: "Antigripal Adultos",
  83: "Meningococo ACYW",
  84: "Antirrábica Humana CRL", //name
  85: "Antirrábica Humana CRL",
  86: "Antirrábica Humana CRL",
  87: "Antirrábica Humana CRL",
  88: "Antirrábica Humana CRL",
  89: "Antirrábica Humana CRL",
  90: "Antirrábica Humana CRL",
  91: "Antirrábica Humana CRL",
  92: "Antirrábica Humana CRL",
  93: "Antirrábica Humana CRL",
  94: "Antirrábica Humana cultivo en líneas celulares", //name
  95: "Antirrábica Humana cultivo en líneas celulares",
  96: "Antirrábica Humana cultivo en líneas celulares",
  97: "Antirrábica Humana cultivo en líneas celulares",
  98: "Antirrábica Humana cultivo en líneas celulares",
  99: "Antirrábica Humana cultivo en líneas celulares",
  100: "Antirrábica Humana cultivo en líneas celulares",
  101: "Antirrábica Humana cultivo en líneas celulares",
  102: "Antirrábica Humana cultivo en líneas celulares",
  103: "Antirrábica Humana cultivo en líneas celulares",
  104: "Meningococo menactra", //name
  105: "Meningococo bexsero", //name
  106: "Meningococo bexsero",
  107: "Meningococo bexsero",
  108: "Meningococo bexsero",
  109: "DPT Triple Bacteriana",
  110: "DPT Triple Bacteriana",
  111: "DPT Triple Bacteriana",
  112: "Haemophilus", //name
  113: "Gamaglobulina Hepatitis B", //name
  114: "Hepatitis A adultos", //name
  115: "Hepatitis A adultos",
  116: "Hepatitis A adultos",
  117: "Covid 19", //name
  118: "Covid 19",
  119: "Covid 19",
  120: "Covid 19",
  121: "Covid 19",
};

const getVacunaID = (json, vacunasDB) => {
  let {insumo, ps_vacuna, vacunaName} = json;
  if (insumo) {
    // use insumo -> valid ID?
    if (isObjectIdValid(insumo)) {
      insumo = isObjectIdValid(insumo);
    } else {
      return {id: null, error: ` vacuna ID no Valido (${insumo}).`};
    }
    return {id: insumo};
  } else if (ps_vacuna) {
    // use ps_vacuna_name to get name -> search vacunaID in vacunasDB
    if (!ps_vacuna_name[ps_vacuna]) {
      return {id: null, error: ` ps_vacuna ID no Valido (${ps_vacuna}).`};
    }
    // buscar en vacunasDB el _id con el ps_vacuna_name
    let vacunaTemp = vacunasDB.find((vacuna) => {
      if (vacuna.name === ps_vacuna_name[ps_vacuna]) {
        return true;
      }
      return false;
    });
    if (vacunaTemp) {
      return {id: vacunaTemp._id};
    } else {
      // sera guardado como vacunaName
      return {
        id: null,
        name: ps_vacuna_name[ps_vacuna],
        advertencia: ` insumo No Encontrado con ps_vacuna_name (${ps_vacuna_name[ps_vacuna]}).`,
      };
    }
  } else {
    // buscar en vacunasDB el _id con el vacunaName
    let vacunaTemp = vacunasDB.find((vacuna) => {
      if (vacuna.name === vacunaName) {
        return true;
      }
      return false;
    });
    if (vacunaTemp) {
      return {id: vacunaTemp._id};
    } else {
      // sera guardado como vacunaName
      return {
        id: null,
        name: vacunaName,
        advertencia: ` insumo No Encontrado con vacunaName (${vacunaName}).`,
      };
    }
  }
};

const VacunacionProperties = [
  "fecha",

  "ps_us",
  "origen",
  "origenName",

  "ps_paciente", // IdPersona (paciente.ps_id)
  "paciente",
  "tipo_doc",
  "documento",

  "vacunadorName",
  "fecha_futura_cita",

  // Obetener sexo y localidad del paciente para la "zona_sanitaria"
  "sexo",
  "edad_valor",
  "edad_unidad",
  "zona_sanitaria",

  "embarazada_semana", // "ps_embarazada" (20)
  "puerpera", // "ps_puerpera"
  "prematuro",
  "peso_nacer_menor_2500",
  "peso_nacer_mayor_3800",
  "inmunodeprimida",
  "fuma",
  "antecedentes_patologicos",
  "oSocial",
  "riesgo",
  "personal_salud",
  "personal_esencial",

  "ps_vacuna",
  "vacunaName",
  "insumo",

  "procedencia",
  "lote",
  "vencimiento",
  "dosis", // "ps_dosis"
  "completa", // "ps_completa"
  "estrategia", // "ps_estrategia"
  "retirado", // "No_Provista" / (fecha)

  // PS
  "ps_id",

  "error",
  "advertencia",
];

// ============================
// Guardando CSV Vacunaciones (con sus mensajes de Errores y Advertencias)
// ============================
const guardarCSV = ({streamFile, json, line, error, advertencia}) => {
  let row = "\n";
  for (let index = 0; index < VacunacionProperties.length; index++) {
    switch (VacunacionProperties[index]) {
      case "error":
        if (error) {
          row += crearContentCSV({content: `${line} - ${error}`});
        }
        break;

      case "advertencia":
        if (advertencia) {
          row += crearContentCSV({content: `${line} - ${advertencia}`});
        }
        break;

      default:
        if (json[VacunacionProperties[index]]) {
          row += crearContentCSV({content: json[VacunacionProperties[index]]});
        }
        break;
    }
    if (index !== VacunacionProperties.length - 1) {
      row += ",";
    }
  }
  guardarContentStream({
    streamFile,
    content: row,
  });
};

// ============================
// Verificando/Validando formato de Vacunaciones
// ============================
const VacunacionFormat = async ({
  json,
  totales,
  line,
  logFile,
  csvErrors,
  csvFix,
  vacunatoriosDB,
  vacunasDB,
}) => {
  try {
    let errores = "";
    let advertencia = "";

    // fecha REQUERIDO
    if (json.fecha) {
      if (!isDateValid(json.fecha)) {
        errores += ` fecha (${json.fecha}) [YYYY-MM-DD].`;
      }
    } else {
      errores += " fecha Sin Dato.";
    }

    // origen / ps_us / origenName REQUERIDO (buscar "area")
    let origenTemp = false;
    if (json.origen) {
      if (isObjectIdValid(json.origen)) {
        json.origen = isObjectIdValid(json.origen);
      } else {
        errores += ` origen ID no Valido (${json.origen}).`;
      }
    } else if (json.ps_us) {
      // buscar en ps_us_oficina con el ps_us la oficina_nro
      json.origen = json.ps_us;
      if (ps_us_oficina[json.ps_us]) {
        // buscar en vacunatoriosDB el _id con la oficina_nro
        origenTemp = vacunatoriosDB.find((vacunatorio) => {
          if (vacunatorio.oficina_nro === ps_us_oficina[json.ps_us]) {
            return true;
          }
          return false;
        });
        if (origenTemp) {
          json.origen = origenTemp._id;
        } else {
          errores += ` origen No Encontrado con oficina_nro (${ps_us_oficina[json.ps_us]}).`;
        }
      } else {
        errores += ` origen ps_us incorrecto (${json.ps_us}).`;
      }
    } else if (json.origenName) {
      // buscar en vacunatoriosDB el _id con el origenName
      origenTemp = vacunatoriosDB.find((vacunatorio) => {
        if (vacunatorio.area === json.origenName) {
          return true;
        }
        return false;
      });
      if (origenTemp) {
        json.origen = origenTemp._id;
      } else {
        errores += ` origen No Encontrado con origenName (${json.origenName}).`;
      }
    } else {
      errores += " origen Sin Dato.";
    }

    // vacunador / vacunadorName
    if (json.vacunador) {
      if (isObjectIdValid(json.vacunador)) {
        json.vacunador = isObjectIdValid(json.vacunador);
      } else {
        errores += ` vacunador ID no Valido (${json.vacunador}).`;
      }
    }
    // else {
    //   json.vacunadorName = json.vacunadorName ?? "No Informado";
    // }

    // fecha_futura_cita
    if (json.fecha_futura_cita) {
      if (!isDateValid(json.fecha_futura_cita)) {
        errores += ` fecha futura cita (${json.fecha_futura_cita}) [YYYY-MM-DD].`;
      }
    }

    // paciente / tipo_doc / documento (buscar "paciente")
    let pacienteTemp = false;
    if (json.IdPersona || json.ps_paciente) {
      json.ps_paciente = json.ps_paciente ?? json.IdPersona;
    }
    if (json.paciente) {
      if (isObjectIdValid(json.paciente)) {
        json.paciente = isObjectIdValid(json.paciente);
        pacienteTemp = await mongoose.connections[0].models.Paciente.findOne(
          {
            _id: json.paciente,
          },
          "_id sexo dir_localidad"
        ).exec();
      } else {
        errores += ` paciente ID no Valido (${json.paciente}).`;
      }
    } else if (json.documento) {
      json.documento = json.documento.trim().toUpperCase();
      if (!json.ps_paciente && (json.documento == 0 || !/^[A-Z0-9]+$/.test(json.documento))) {
        errores += ` documento Validation (${json.documento}).`;
      }
      // tipo_doc (default "DNI")
      if (json.tipo_doc) {
        switch (json.tipo_doc) {
          case "DNI":
          case "Cédula Mercosur":
          case "Documento Bolivia":
          case "Documento Brasil":
          case "Documento Chile":
          case "Documento Colombia":
          case "Documento Paraguay":
          case "Documento Uruguay":
          case "Pasaporte extranjero":
          case "Otro documento extranjero":
          case "Pasaporte":
          case "CI":
          case "LE":
          case "LC":
            break;
          // PSVacunas
          case "1":
          case "54":
            json.tipo_doc = "DNI";
            break;
          case "55":
            json.tipo_doc = "Documento Brasil";
            break;
          case "56":
            json.tipo_doc = "Documento Chile";
            break;
          case "57":
            json.tipo_doc = "Documento Colombia";
            break;
          case "591":
            json.tipo_doc = "Documento Bolivia";
            break;
          case "595":
            json.tipo_doc = "Documento Paraguay";
            break;
          case "598":
            json.tipo_doc = "Documento Uruguay";
            break;
          case "999":
            json.tipo_doc = "Otro documento extranjero";
            break;

          default:
            if (!json.ps_paciente) {
              errores += ` tipo_doc (${json.tipo_doc}).`;
            }
        }
      } else {
        json.tipo_doc = "DNI";
      }
      pacienteTemp = await mongoose.connections[0].models.Paciente.findOne(
        {
          tipo_doc: json.tipo_doc,
          documento: json.documento,
        },
        "_id sexo dir_localidad"
      ).exec();
    } else if (!json.ps_paciente) {
      errores += ` paciente Sin Dato.`;
    }
    // del paciente traer -> _id, sexo, dir_localidad => zona_sanitaria.
    if (pacienteTemp) {
      json.paciente = pacienteTemp._id;
      json.sexo = pacienteTemp.sexo;
      json.zona_sanitaria = pacienteTemp.dir_localidad ?? origenTemp?.zona_us;
    } else if (json.ps_paciente) {
      // json.sexo = "No Informado";
      // json.zona_sanitaria = origenTemp?.zona_us ?? "No Informado";
      if (origenTemp?.zona_us) {
        json.zona_sanitaria = origenTemp.zona_us;
      }
    } else if (pacienteTemp !== false) {
      errores += ` paciente No Encontrado con tipo_doc/documento (${
        json.paciente ?? `${json.tipo_doc} / ${json.documento}`
      }).`;
    }
    delete json.documento;
    delete json.tipo_doc;

    // edad_valor
    if (!json.edad_valor) {
      advertencia += " valor de edad Sin Dato.";
    }
    // edad_unidad
    if (json.edad_unidad) {
      switch (json.edad_unidad.toLowerCase()) {
        // Año / Mes / Semana / Dia / Hora
        case "a":
        case "año":
          json.edad_unidad = "Año";
          break;
        case "d":
        case "dia":
          json.edad_unidad = "Dia";
          break;
        case "h":
        case "hora":
          json.edad_unidad = "Hora";
          break;
        case "m":
        case "mes":
          json.edad_unidad = "Mes";
          break;
        case "s":
        case "semana":
          json.edad_unidad = "Semana";
          break;

        default:
          advertencia += ` unidad de edad (${json.edad_unidad}).`;
      }
    } else {
      advertencia += " unidad de edad Sin Dato.";
    }

    // OPCIONALES
    if (json.embarazada_semana) {
      json.embarazada_semana = Number(json.embarazada_semana);
    } else if (json.ps_embarazada) {
      json.embarazada_semana = 20; // mediana
    }
    delete json.ps_embarazada;

    if (json.puerpera) {
      json.puerpera = true;
    } else if (json.ps_puerpera) {
      json.puerpera = true;
    }
    delete json.ps_puerpera;

    if (json.personal_salud) {
      json.personal_salud = true;
    }
    if (json.personal_esencial) {
      json.personal_esencial = true;
    }
    if (json.riesgo) {
      json.riesgo = true;
    }
    if (json.prematuro) {
      json.prematuro = true;
    }
    if (json.peso_nacer_menor_2500) {
      json.peso_nacer_menor_2500 = true;
    }
    if (json.peso_nacer_mayor_3800) {
      json.peso_nacer_mayor_3800 = true;
    }
    if (json.inmunodeprimida) {
      json.inmunodeprimida = true;
    }
    if (json.fuma) {
      json.fuma = true;
    }

    // ps_dosis, (dosis)
    if (json.ps_dosis) {
      // Obtener valor del PS
      if (ps_dosis_name[json.ps_dosis]) {
        json.dosis = ps_dosis_name[json.ps_dosis];
        delete json.ps_dosis;
      } else {
        errores += ` ps_dosis incorrecto (${json.ps_dosis}).`;
      }
    } else if (json.dosis) {
      // buscar en los valores de ps_dosis si existe valor valido
      if (!Object.values(ps_dosis_name).includes(json.dosis)) {
        errores += ` dosis No Valida (${json.dosis}).`;
      }
    } else {
      errores += " dosis Sin Dato.";
    }

    // ps_vacuna, (vacunaName) (insumo)
    json.insumo = getVacunaID(json, vacunasDB);
    if (json.insumo.error) {
      errores += json.insumo.error;
    }
    if (json.insumo.advertencia) {
      advertencia += json.insumo.advertencia;
    }
    if (json.insumo.name) {
      json.vacunaName = json.insumo.name;
    }
    if (json.insumo.id === null) {
      delete json.insumo;
    } else {
      json.insumo = json.insumo.id;
    }

    // vencimiento,
    if (json.vencimiento) {
      if (!isDateValid(json.vencimiento)) {
        errores += ` vencimiento (${json.vencimiento}) [YYYY-MM-DD].`;
      }
    }
    // else {
    //   json.vencimiento = json.fecha;
    // }
    // procedencia; No Informado
    // if (!json.procedencia) {
    //   json.procedencia = "No Informado";
    // }
    // lote; (PS sin dato primeras cargas)
    // if (!json.lote) {
    //   json.lote = "No Informado";
    // }

    // No_Provista, (retirado -> No_Provista ? undefined : fecha)
    if (json.No_Provista) {
      json.retirado = undefined;
      delete json.No_Provista;
    } else {
      json.retirado = json.retirado ?? json.fecha;
      if (!isDateValid(json.retirado)) {
        errores += ` retirado (${json.retirado}) [YYYY-MM-DD].`;
      }
    }

    // ps_estrategia, (estrategia)
    if (json.ps_estrategia) {
      // Obtener valor del PS
      if (ps_estrategia_name[json.ps_estrategia]) {
        json.estrategia = ps_estrategia_name[json.ps_estrategia];
        delete json.ps_estrategia;
      } else {
        errores += ` ps_estrategia incorrecto (${json.ps_estrategia}).`;
      }
    } else if (json.estrategia) {
      // buscar en los valores de ps_estrategia si existe valor valido
      if (!Object.values(ps_estrategia_name).includes(json.estrategia)) {
        errores += ` estrategia No Valida (${json.estrategia}).`;
      }
    } else {
      errores += " estrategia Sin Dato.";
    }

    // ps_completa, (completa)
    if (json.completa) {
      json.completa = true;
    } else if (json.ps_completa) {
      json.completa = true;
    }
    delete json.ps_completa;

    if (advertencia) {
      guardarContentStream({
        streamFile: logFile,
        content: `\nFila Excel: ${line}, Advertencia:${advertencia}`,
      });
      totales.advertencias += 1;
    }
    if (errores) {
      // errores-fixable => mepa que no??.
      // if (
      //   (json.documento && json.documento != 0 && json.apellido && json.nombre) ||
      //   (!json.documento && (/\d/.test(json.apellido) || /\d/.test(json.nombre)))
      // ) {
      //   guardarCSV({
      //     streamFile: csvFix,
      //     json,
      //     line,
      //     error: errores,
      //     advertencia,
      //   });
      //   totales["errores-fix"] += 1;
      // }
      guardarCSV({
        streamFile: csvErrors,
        json,
        line,
        error: errores,
        advertencia,
      });
      guardarContentStream({
        streamFile: logFile,
        content: `\nFila Excel: ${line}, Error:${errores}`,
      });
      totales.errores += 1;
      return {json, totales, return: true};
    }

    return {json, totales};
  } catch (error) {
    return {json, totales, error};
  }
};

// ============================
// Guardando Vacunaciones y errores
// ============================
const saveVacunacionesUnHilo = async ({documentos, totales, line, logFile, csvErrors, csvFix}) => {
  try {
    let bulkVacunaciones = await mongoose.connections[1].models.VacunaAplicacion.insertMany(
      documentos,
      // ordered -> Si la insercion de un documento falla continua con el resto y no sigue orden de guardado.
      // lean -> skips hydrating and validating the documents. performance!
      {ordered: false, lean: true}
    );
    totales.exitosos += bulkVacunaciones?.length ?? 0;
    return totales;
  } catch (error) {
    // Si fallo alguna Insercion guardar en el log
    // si insertMany() con Lean true
    totales.exitosos += error?.result?.insertedCount ?? 0;
    totales.errores += error?.writeErrors?.length ?? 0;
    if (error?.writeErrors?.length > 0) {
      let mensajeTemp = `\n\nSave Errors [Fila ${line}] ${error?.writeErrors?.length}~${documentos.length}:`;
      error.writeErrors.forEach((element) => {
        let errorMessage = "";
        if (element.err.code === 11000 || element.err.code === 11001) {
          let parts = element.err.errmsg.match(/index: (.+) dup key: (.+)/i);
          // parts[1] -> index name (I use this one to further parse out the field name)
          // parts[2] -> value that violates the constraint
          errorMessage = `${parts[1]} ya existente en el sistema, debe ser unico (${parts[2]}).`;
          totales["errores-exist"] += 1;
        } else {
          errorMessage = `${element.err.errmsg}`;
          // posibilidad que sea fixable
          guardarCSV({
            streamFile: csvFix,
            json: element.err.op,
            line,
            error: errorMessage,
            advertencia: "",
          });
          totales["errores-fix"] += 1;
        }
        // Guardar en CSV los errores
        // element.err.op
        guardarCSV({
          streamFile: csvErrors,
          json: element.err.op,
          line,
          error: errorMessage,
          advertencia: "",
        });
        mensajeTemp += `\r\n\t${errorMessage}`;
        mensajeTemp += "\r\n\t---------";
      });
      guardarContentStream({
        streamFile: logFile,
        content: mensajeTemp,
      });
    }
    return totales;
  }
};

// ============================
// Ruta para subir archivo y actualizar Vacunaciones
// ============================
app.post(
  "/farmacia/vacunacion/upload",
  [verificaToken, verificaAdmin_Role, uploadSingleRoute],
  async (req, res) => {
    // Archivo ya subido, uploadSingleRoute -> req.file
    // req.file.fecha_Name; // fecha + _ + name
    let logFile = crearStreamFile({
      fileName: `vacunacion-${req.file.fecha_Name}-log`,
      fileExtension: "txt",
      route: "../file_server/logs",
    });
    let csvErrors = crearStreamFile({
      fileName: `vacunacion-${req.file.fecha_Name}-Errores`,
      fileExtension: "csv",
      route: "../file_server/uploads",
    });
    let csvFix = crearStreamFile({
      fileName: `vacunacion-${req.file.fecha_Name}-Fix`,
      fileExtension: "csv",
      route: "../file_server/uploads",
    });

    let documentos = [];
    let totales = {
      exitosos: 0,
      errores: 0,
      "errores-fix": 0,
      "errores-exist": 0,
      advertencias: 0,
    };

    // cargar json files con id del ps

    let vacunatoriosDB = await mongoose.connections[0].models.Area.find(
      {
        vacunatorio: {$exists: true},
      },
      "_id area oficina_nro zona_us"
    ).exec();
    let vacunasDB = await mongoose.connections[0].models.Insumo.find(
      {
        categoria: "Vacuna",
      },
      "_id nombre"
    ).exec();

    try {
      guardarContentStream({
        streamFile: logFile,
        content: `
        ####################
        # vacunacion/upload #
        ####################\n\nVariables Iniciadas.\n`,
      });

      let headers = "";
      for (let index = 0; index < VacunacionProperties.length; index++) {
        if (index === VacunacionProperties.length) {
          headers += VacunacionProperties[index] + "\n";
        } else {
          headers += VacunacionProperties[index] + ",";
        }
      }
      guardarContentStream({
        streamFile: csvErrors,
        content: headers,
      });
      guardarContentStream({
        streamFile: csvFix,
        content: headers,
      });
      let fileJson = await fileToJson({
        file: req.file,
        asyncOperation: async ({json, line, error}) => {
          if (error) {
            guardarCSV({streamFile: csvErrors, json, line, error});
            guardarContentStream({
              streamFile: logFile,
              content: `\nFila Excel: ${line}, Error: ${error}.`,
            });
            totales.errores += 1;
            return;
          }
          if (Object.keys(json).some((e) => /field/g.test(e))) {
            guardarCSV({
              streamFile: csvErrors,
              json,
              line,
              error: "Contiene valor en celda sin header.",
            });
            guardarContentStream({
              streamFile: logFile,
              content: `\nFila Excel: ${line}, Error: Contiene valor en celda sin header.`,
            });
            totales.errores += 1;
            return;
          }
          json = isVacio({
            dato: json,
            // opciones: new value // default value
            //     vacioUndefined: false, // true,
            //     vacioNull: false, // true,
            //     vacioCero: true, // false,
            vacioBoolean: true, // false,
            //     vacioEmptyStr: false, // true,
            //     vacioEmptyArr: false, // true,
            //     vacioEmptyObj: false, // true,
            inArr: true, // false,
            inObj: true, // false,
            borrar: true, // false,
          });
          if (json.vacio === true) {
            guardarCSV({
              streamFile: csvErrors,
              json,
              line,
              error: "Empty Line.",
            });
            guardarContentStream({
              streamFile: logFile,
              content: `\nFila Excel: ${line}, Error: Empty Line.`,
            });
            totales.errores += 1;
            return;
          }
          json = json.dato;
          json.usuario_creador = req.usuario._id;
          json.createdAt = new Date();

          // Validar datos (Manipulando json para luego actualizar la BD)
          let vacunacionTemp = await VacunacionFormat({
            json,
            totales,
            line,
            logFile,
            csvErrors,
            csvFix,
            vacunatoriosDB,
            vacunasDB,
          });
          totales = vacunacionTemp.totales;
          if (vacunacionTemp.return) {
            return;
          }
          json = vacunacionTemp.json;

          // Acumular Documentos para realizar una sola consulta a la BD y no saturarla por Documento (cada 10k o no mas Documentos)
          documentos.push(json);
          if (documentos.length === 10000) {
            // Insertar datos
            totales = await saveVacunacionesUnHilo({
              documentos,
              totales,
              line,
              logFile,
              csvErrors,
              csvFix,
            });
            documentos = [];
          }
        },
      });
      if (fileJson?.error) {
        return errorMessage(res, {message: fileJson.error}, 412);
      }
      // Si termino y quedaron documentos en el acumulador, Guardarlos
      if (documentos.length > 0) {
        // Insertar datos restantes
        totales = await saveVacunacionesUnHilo({
          documentos,
          totales,
          line: "last",
          logFile,
          csvErrors,
          csvFix,
        });
        documentos = [];
      }

      guardarContentStream({
        streamFile: logFile,
        content: `\n\nTotales:\r\n\t⚠ Errores: ${totales.errores}.\r\n\t\t• Fixables: ${totales["errores-fix"]}.\r\n\t\t◙ Ya cargado: ${totales["errores-exist"]}.\r\n\tⓘ Advertencias: ${totales.advertencias}.\r\n\t☺ Exitosos: ${totales.exitosos}.`,
      });
      return res.json({
        ok: true,
        data: {totales},
        respuesta: "Subida Exitosa.",
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    } finally {
      // Cerrar Streams
      cerrarStreamFile({streamFile: logFile});
      cerrarStreamFile({streamFile: csvErrors});
      cerrarStreamFile({streamFile: csvFix});
      // Borrar si no hay errores
      if (totales.errores === 0) {
        deleteFile({
          fileName: `vacunacion-${req.file.fecha_Name}-Errores`,
          fileExtension: "csv",
          route: "../file_server/uploads",
        });
      }
      // Borrar si no hay errores-fix
      if (totales["errores-fix"] === 0) {
        deleteFile({
          fileName: `vacunacion-${req.file.fecha_Name}-Fix`,
          fileExtension: "csv",
          route: "../file_server/uploads",
        });
      }
      // Borrar archivo subido
      deleteFile({
        fileName: `${req.file.fecha_Name}`,
        fileExtension: "csv",
        route: "../file_server/uploads",
      });
    }
  }
);

module.exports = app;
