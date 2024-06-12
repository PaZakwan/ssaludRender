const express = require("express");
const mongoose = require("mongoose");

// Middleware de Permisos
const {verificaToken, verificaAdmin_Role} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {uploadSingleRoute} = require(process.env.MAIN_FOLDER + "/middlewares/upload");
// tools
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {capitalize, trim_between} = require(process.env.MAIN_FOLDER + "/tools/string");
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
// db.getCollection("pacientes")
//   .find({})
//   .skip(40)
//   .forEach(function (obj) {
//     db.getCollection("pacientes").deleteOne(obj);
//   });
const PacienteProperties = [
  "apellido",
  "nombre",
  "tipo_doc",
  "documento",
  "sexo",
  "fec_nac",
  "telefono",
  "telefono_alt",
  "email",
  "dir_calle",
  "dir_numero",
  "dir_piso",
  "dir_depto",
  "dir_barrio",
  "dir_localidad",
  "dir_municipio",
  "dir_descripcion",
  "oSocial",
  "oSocialNumero",
  "fec_fallecimiento",
  // PS
  "doc_responsable", // DNIResponsable
  "ps_id", // IdPS
  "error",
  "advertencia",
];

// ============================
// Guardando CSV Pacientes (con sus mensajes de Errores y Advertencias)
// ============================
const guardarCSV = ({streamFile, json, line, error, advertencia}) => {
  let row = "\n";
  for (let index = 0; index < PacienteProperties.length; index++) {
    switch (PacienteProperties[index]) {
      case "doc_responsable":
        if (json.doc_responsable) {
          row += crearContentCSV({content: json.doc_responsable});
        } else if (json.DNIResponsable) {
          row += crearContentCSV({content: json.DNIResponsable});
        }
        break;

      case "ps_id":
        if (json.ps_id) {
          row += crearContentCSV({content: json.ps_id});
        } else if (json.IdPS) {
          row += crearContentCSV({content: json.IdPS});
        }
        break;

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
        if (json[PacienteProperties[index]]) {
          row += crearContentCSV({content: json[PacienteProperties[index]]});
        }
        break;
    }
    if (index !== PacienteProperties.length - 1) {
      row += ",";
    }
  }
  guardarContentStream({
    streamFile,
    content: row,
  });
};

// ============================
// Verificando/Validando formato de Pacientes
// ============================
const PacienteFormat = ({json, totales, line, logFile, csvErrors, csvFix}) => {
  try {
    let errores = "";
    let advertencia = "";
    // documento o doc_responsable REQUERIDO
    if (json.documento) {
      json.documento = json.documento.trim().toUpperCase();
      if (json.documento == 0) {
        delete json.documento;
      } else if (!/^[A-Z0-9]+$/.test(json.documento)) {
        errores += ` documento Validation (${json.documento}).`;
      }
    }
    if (json.DNIResponsable) {
      json.doc_responsable = json.doc_responsable ?? json.DNIResponsable;
      delete json.DNIResponsable;
    }
    if (json.doc_responsable == 0) {
      delete json.doc_responsable;
    }

    if (!json.documento && !json.doc_responsable) {
      errores += ` documento / doc_responsable Sin Dato.`;
    }

    // apellido REQUERIDO BD
    if (json.apellido) {
      json.apellido = json.apellido.trim().replaceAll(/[_\-]/g, " ").replaceAll(/[.]/g, "");
      json.apellido = capitalize(json.apellido);
      if (!/^[A-Za-z\sÀ-ÿ\u00f1\u00d1'`´¨-]+$/.test(json.apellido)) {
        errores += ` apellido Validation (${json.apellido}).`;
      }
    } else {
      errores += ` apellido Sin Dato.`;
    }
    // nombre REQUERIDO BD
    if (json.nombre) {
      json.nombre = json.nombre.trim().replaceAll(/[_\-]/gi, " ").replaceAll(/[.]/g, "");
      json.nombre = capitalize(json.nombre);
      if (!/^[A-Za-z\sÀ-ÿ\u00f1\u00d1'`´¨-]+$/.test(json.nombre)) {
        errores += ` nombre Validation (${json.nombre}).`;
      }
    } else {
      errores += ` nombre Sin Dato.`;
    }

    // tipo_doc (default "DNI")
    if (!json.documento) {
      delete json.tipo_doc;
    } else {
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
            errores += ` tipo_doc (${json.tipo_doc}).`;
        }
      } else {
        json.tipo_doc = "DNI";
      }
    }

    // fec_nac REQUERIDO BD
    if (json.fec_nac) {
      if (!isDateValid(json.fec_nac)) {
        errores += ` fec_nac (${json.fec_nac}) [YYYY-MM-DD].`;
      }
    } else {
      errores += " fec_nac Sin Dato.";
    }

    // sexo REQUERIDO BD
    if (json.sexo) {
      switch (json.sexo.toLowerCase()) {
        case "f":
        case "femenino":
          json.sexo = "Femenino";
          break;
        case "m":
        case "masculino":
          json.sexo = "Masculino";
          break;

        default:
          errores += ` sexo (${json.sexo}).`;
      }
    } else {
      errores += " sexo Sin Dato.";
    }

    // dir_localidad REQUERIDO BD
    if (json.dir_localidad) {
      switch (json.dir_localidad) {
        case "Cuartel V":
        case "Francisco Alvarez":
        case "La Reja":
        case "Moreno":
        case "Paso Del Rey":
        case "Trujui":
        case "Otros":
          break;

        default:
          errores += ` dir_localidad (${json.dir_localidad}).`;
      }
    } else if (json.ZonaReside) {
      // ZonaReside - PSVacunas
      switch (json.ZonaReside) {
        case "1":
          json.dir_localidad = "Francisco Alvarez";
          delete json.ZonaReside;
          break;
        case "2":
          json.dir_localidad = "Cuartel V";
          delete json.ZonaReside;
          break;
        case "3":
        case "4":
        case "8":
          json.dir_localidad = "Moreno";
          delete json.ZonaReside;
          break;
        case "5":
          json.dir_localidad = "Paso Del Rey";
          delete json.ZonaReside;
          break;
        case "6":
        case "7":
          json.dir_localidad = "Trujui";
          delete json.ZonaReside;
          break;

        default:
          errores += ` ZonaReside / dir_localidad (${json.ZonaReside}).`;
      }
    } else {
      errores += " dir_localidad Sin Dato.";
    }

    // email
    if (json.email && !/^([\w-\.]+@([\w-]+\.)+[\w-]{2,12})?$/.test(json.email)) {
      advertencia += ` email Validation (${json.email}).`;
    }
    // dir_calle
    if (json.dir_calle) {
      json.dir_calle = capitalize(json.dir_calle.trim());
    }
    // dir_numero // si no es un numero lo pasa a dir_descripcion
    if (json.dir_numero && isNaN(json.dir_numero)) {
      if (json.dir_descripcion) {
        json.dir_descripcion = `Numero: ${json.dir_numero}. ${json.dir_descripcion}`;
      } else {
        json.dir_descripcion = `Numero: ${json.dir_numero}.`;
      }
      advertencia += ` dir_numero No es un Numero (${json.dir_numero}) y fue guardado en dir_descripcion.`;
      delete json.dir_numero;
    }
    // dir_descripcion
    if (json.dir_descripcion) {
      json.dir_descripcion = trim_between(json.dir_descripcion);
    }

    if (json.IdPS) {
      json.ps_id = json.ps_id ?? json.IdPS;
      delete json.IdPS;
    }
    if (json.ps_id) {
      json.ps_id = [json.ps_id];
    }

    if (advertencia) {
      guardarContentStream({
        streamFile: logFile,
        content: `\nFila Excel: ${line}, Advertencia:${advertencia}`,
      });
      totales.advertencias += 1;
    }
    if (errores) {
      // errores-fixable => documento-apellido-nombre.. o apellido/nombre con numero.
      // fec_nac, dir_localidad o dir_calle/dir_numero
      if (
        json.fec_nac &&
        (json.dir_localidad || (json.dir_calle && json.dir_numero)) &&
        ((json.documento && json.documento != 0 && json.apellido && json.nombre) ||
          (!json.documento && (/\d/.test(json.apellido) || /\d/.test(json.nombre))))
      ) {
        guardarCSV({
          streamFile: csvFix,
          json,
          line,
          error: errores,
          advertencia,
        });
        totales["errores-fix"] += 1;
      }
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
// Guardando Pacientes y errores
// ============================
const savePacientesUnHilo = async ({documentos, totales, line, logFile, csvErrors, csvFix}) => {
  try {
    let bulkPacientes = await mongoose.connections[1].models.Paciente.insertMany(
      documentos,
      // ordered -> Si la insercion de un documento falla continua con el resto y no sigue orden de guardado.
      // throwOnValidationError -> tirar error si una falla pero carga el resto.
      // lean -> skips hydrating and validating the documents. performance!
      {ordered: false, lean: true}
      // {ordered: false, includeResultMetadata: true, throwOnValidationError: true}
    );
    totales.exitosos += bulkPacientes?.length ?? 0;
    // si insertMany() con Lean false
    // totales.errores += bulkPacientes?.mongoose?.validationErrors?.length ?? 0;
    // if (bulkPacientes?.mongoose?.validationErrors?.length > 0) {
    //   let mensajeTemp = `\n\nSave Errors [Fila ${line}] ${bulkPacientes?.mongoose?.validationErrors?.length}~${documentos.length}:`;
    //   bulkPacientes.mongoose.validationErrors.forEach((element) => {
    //     // recorriendo los documentos
    //     for (const [key, value] of Object.entries(element.errors)) {
    //       // recorriendo el documento
    //       mensajeTemp += `\r\n\t${value}`;
    //     }
    //     mensajeTemp += "\r\n\t---------";
    //     // Guardar en CSV los errores
    //   });
    //   guardarContentStream({
    //     streamFile: logFile,
    //     content: mensajeTemp,
    //   });
    // }
    return totales;
  } catch (error) {
    // Si fallo alguna Insercion guardar en el log
    // si insertMany() con Lean false
    // totales.exitosos += error?.includeResultMetadata?.insertedCount ?? 0;
    // totales.errores += error?.validationErrors?.length ?? 0;
    // if (error?.validationErrors?.length > 0) {
    //   let mensajeTemp = `\n\nSave Errors [Fila ${line}] ${error?.validationErrors?.length}~${documentos.length}:`;
    //   error.validationErrors.forEach((element) => {
    //     // recorriendo los documentos
    //     for (const [key, value] of Object.entries(element.errors)) {
    //       // recorriendo el documento
    //       mensajeTemp += `\r\n\t${value}`;
    //     }
    //     mensajeTemp += "\r\n\t---------";
    //   });
    //   guardarContentStream({
    //     streamFile: logFile,
    //     content: mensajeTemp,
    //   });
    // }
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
          mongoose.connections[1].models.Paciente.findOneAndUpdate(
            {
              tipo_doc: element.err.op.tipo_doc,
              documento: element.err.op.documento,
            },
            {$addToSet: {ps_id: {$each: element.err.op.ps_id}}}
          ).exec();
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

// // Ver log filename
// app.get("/log", [verificaToken, verificaAdmin_Role], (req, res) => {});

// // Ver logs
// app.get("/logs", [verificaToken, verificaAdmin_Role], (req, res) => {});

// // Borrar log
// app.delete("/log", [verificaToken, verificaAdmin_Role], (req, res) => {});

// ============================
// Ruta para subir archivo y actualizar Pacientes
// ============================
app.post(
  "/pacientes/upload",
  [verificaToken, verificaAdmin_Role, uploadSingleRoute],
  async (req, res) => {
    // Archivo ya subido, uploadSingleRoute -> req.file
    // req.file.fecha_Name; // fecha + _ + name
    let logFile = crearStreamFile({
      fileName: `paciente-${req.file.fecha_Name}-log`,
      fileExtension: "txt",
      route: "../file_server/logs",
    });
    let csvErrors = crearStreamFile({
      fileName: `paciente-${req.file.fecha_Name}-Errores`,
      fileExtension: "csv",
      route: "../file_server/uploads",
    });
    let csvFix = crearStreamFile({
      fileName: `paciente-${req.file.fecha_Name}-Fix`,
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

    try {
      guardarContentStream({
        streamFile: logFile,
        content: `
        ####################
        # pacientes/upload #
        ####################\n\nVariables Iniciadas.\n`,
      });

      let headers = "";
      for (let index = 0; index < PacienteProperties.length; index++) {
        if (index === PacienteProperties.length) {
          headers += PacienteProperties[index] + "\n";
        } else {
          headers += PacienteProperties[index] + ",";
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
            borrar: true,
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
          json.usuario_modifico = isObjectIdValid(req.usuario._id);
          json.createdAt = new Date();
          json.estado = true;

          // Validar datos (Manipulando json para luego actualizar la BD)
          let pacienteTemp = PacienteFormat({json, totales, line, logFile, csvErrors, csvFix});
          totales = pacienteTemp.totales;
          if (pacienteTemp.return) {
            return;
          }
          json = pacienteTemp.json;

          // Acumular Documentos para realizar una sola consulta a la BD y no saturarla por Documento (cada 10k o no mas Documentos)
          documentos.push(json);
          if (documentos.length === 10000) {
            // Insertar datos
            totales = await savePacientesUnHilo({
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
        totales = await savePacientesUnHilo({
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
          fileName: `paciente-${req.file.fecha_Name}-Errores`,
          fileExtension: "csv",
          route: "../file_server/uploads",
        });
      }
      // Borrar si no hay errores-fix
      if (totales["errores-fix"] === 0) {
        deleteFile({
          fileName: `paciente-${req.file.fecha_Name}-Fix`,
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
