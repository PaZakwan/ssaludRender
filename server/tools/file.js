/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const {createReadStream, createWriteStream, unlinkSync, promises} = require("fs");
const path = require("path");

const languageEncoding = require("detect-file-encoding-and-language");

// # Herramienta para csv
const csv = require("csvtojson");
// # Herramienta para excels
// const XLSX = require("xlsx");
// # Herramientas para xml
// const {convertXML} = require("simple-xml-to-json");

// ###############################
// CREAR contenido CSV
// ###############################
const crearContentCSV = ({content = ""} = {}) => {
  try {
    content = content.toString();
    // revisar si el contenido tiene "," o '"' => y meterlo entre ""
    if (content.includes(",") || content.includes('"')) {
      // si tiene " remplazarlo por ""
      content = content.trim().replaceAll(/["]/g, '""');
      return `"${content}"`;
    } else {
      return content.trim();
    }
  } catch (error) {
    console.error(`crearContentCSV Catch error: ${error}`);
    return content?.trim?.() ?? "";
  }
};

// ###############################
// CREAR STREAM
// ###############################
const crearStreamFile = ({fileName, fileExtension, route}) => {
  let ruta = path.resolve(process.env.MAIN_FOLDER, route) + `/${fileName}.${fileExtension}`;

  // create a write stream for the given rute
  let streamFile = createWriteStream(ruta, {
    flags: "a", // 'a' means appending / agregar :V
    encoding: "utf8",
  });
  streamFile.on("error", (error) => {
    console.error(
      `crearStreamFile ${fileName}.${fileExtension}: Stream Write error: ${error.message}`
    );
  });

  return streamFile;
};

// ###############################
// USAR STREAM
// ###############################
const guardarContentStream = ({streamFile, content}) => {
  // stream content to the file log
  streamFile.write(content);
};

// ###############################
// CERRAR STREAM
// ###############################
const cerrarStreamFile = ({streamFile}) => {
  streamFile.end();
};

// ###############################
// BORRAR File
// ###############################
const deleteFile = ({fileName, fileExtension, route}) => {
  try {
    let ruta = path.resolve(process.env.MAIN_FOLDER, route) + `/${fileName}.${fileExtension}`;
    unlinkSync(ruta);
  } catch (error) {
    console.error("error deleteFile, Error : ", error);
  }
};

// ###############################
// Guardar archivo...
// ###############################
const guardarFile = async ({
  fileName,
  fileExtension,
  route,
  content,
  // 'a' means appending / agregar :V
  // 'w' Open file for writing. The file is created (if it does not exist) or truncated (if it exists)
  flags = "a",
  encoding = "utf8",
}) => {
  // new Promise((resolve, reject) => {
  let ruta = path.resolve(process.env.MAIN_FOLDER, route) + `/${fileName}.${fileExtension}`;

  // create a write stream for the given rute
  let fsLog = createWriteStream(ruta, {
    flags,
    encoding,
  });
  fsLog.on("error", (error) => {
    console.error(`guardarFile ${fileName}.${fileExtension}: Stream Write error: ${error.message}`);
  });
  // fsLog.on("finish", resolve);

  // stream content to the file log
  fsLog.write(content);
  fsLog.end();
  // });
};

// ###############################
// Leer archivo...
// ###############################
const leerFile = async ({fileName, fileExtension, route, encoding = "utf8"}) => {
  try {
    let ruta = path.resolve(process.env.MAIN_FOLDER, route) + `/${fileName}.${fileExtension}`;
    // leer
    return await promises.readFile(ruta, encoding);
  } catch (error) {
    console.error(`leerFile Catch error: ${error}`);
    return {
      error: `leerFile - Catch: ${error}`,
    };
  }
};

// ###############################
// Selecciona el modulo a utilizar para pasar a json, segun la extencion del archivo
// ###############################
/* eslint-disable-next-line no-unused-vars */
const fileToJson = ({file, asyncOperation, target_sheet, output}) => {
  let extension = file?.originalname?.split(".")[file.originalname.split(".").length - 1] ?? null;
  if (extension === "csv") {
    return csvToJson({
      input: file.path,
      asyncOperation,
      output,
    });
    // } else if (extension === "xlsx" || extension === "xls") {
    //   return excelToJson({
    //     input: file.path,
    //     target_sheet,
    //     output,
    //   });
    // } else if (extension === "xml") {
    //   return xmlToJson({
    //     input: file.path,
    //     output,
    //   });
  } else {
    return {
      error: `fileToJson: Formato de Archivo no valida (${extension}).`,
    };
  }
};

// ###############################
// Transforma archivo formato csv a Json
// ###############################
/* eslint-disable-next-line no-unused-vars */
const csvToJson = async ({input, asyncOperation, output}) => {
  try {
    // https://stackoverflow.com/questions/16831250/how-to-convert-csv-to-json-in-node-js
    // https://www.npmjs.com/package/csvtojson#api
    // https://nodesource.com/blog/understanding-streams-in-nodejs/

    let resultEncode = await languageEncoding(input);
    // Possible result: { language: japanese, encoding: Shift-JIS, confidence: { encoding: 0.94, language: 0.94 } }
    if (!(resultEncode?.encoding === "UTF-8")) {
      return {
        error: `csvToJson - languageEncoding: ${resultEncode?.encoding ?? "not found"} (UTF-8).`,
      };
    }

    let readableStream = createReadStream(input, {encoding: "utf8"});

    readableStream.on("error", (error) => {
      console.error(`csvToJson Stream Read error: ${error.message}`);
    });
    // .on("end", () => {
    //   console.log("csvToJson Stream Read Ended");
    // })
    // .on("close", (error) => {
    //   console.error("csvToJson Stream Read Closed");
    // });

    let line = 1;
    return csv({
      fork: true,
      maxRowLength: 65535,
      nullObject: true,
      needEmitAll: false,
    })
      .fromStream(readableStream)
      .subscribe(
        async (json) => {
          line++;
          try {
            // long operation for each json e.g. transform / write into database.
            await asyncOperation({json, line});
          } catch (error) {
            await asyncOperation({json, line, error});
          }
        },
        (error) => {
          console.error(`csvToJson Subscribe error: ${error.message}`);
        }
      );
  } catch (error) {
    console.error(`csvToJson Catch error: ${error}`);
    return {
      error: `csvToJson - Catch: ${error}`,
    };
  }
};

// ###############################
// Transforma archivo formato xml a Json (limitacion memoria)
// ###############################
// const xmlToJson = ({input, output}) => {
//   try {
//     if (!input) {
//       return {error: "You miss a input file"};
//     }

//     // Read the file using pathname
//     let file = openSync(input);
//     let xmlToConvert = readFileSync(file, {
//       encoding: "utf8",
//     }).toString();
//     closeSync(file);

//     let parsedData = convertXML(xmlToConvert);

//     if (output) {
//       // save the data in a json file
//       try {
//         writeFileSync(
//           `${path.resolve(process.env.MAIN_FOLDER, "../uploads", output)}.json`,
//           JSON.stringify(parsedData)
//         );
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     return parsedData?.dataroot?.children;
//   } catch (error) {
//     console.error(error);
//   }
// };

// ###############################
// Transforma archivo formato excel a Json (limitacion memoria)
// ###############################
// const excelToJson = ({input, target_sheet, output}) => {
//   if (!input) {
//     return {error: "You miss a input file"};
//   }
//   // Read the file using pathname
//   let file = XLSX.readFile(input);

//   // https://docs.sheetjs.com/docs/api/parse-options
//   // {cellDates: true}
//   // sheets		If specified, only parse specified sheets

//   // Grab the sheet info from the file
//   // Variable to store our data
//   let parsedData = {sheetNames: file.SheetNames, sheets: {}, target_sheet: [], target_name: ""};

//   if (target_sheet === "all") {
//     // Loop through sheets
//     for (let i = 0; i < parsedData.sheetNames?.length; i++) {
//       // Convert to json using XLSX
//       const tempData = XLSX.utils.sheet_to_json(file.Sheets[parsedData.sheetNames[i]]);

//       // Skip header row which is the colum names
//       // tempData.shift();

//       // Add the sheet's json to our data array
//       parsedData.sheet[parsedData.sheetNames[i]] = tempData;
//       // todas juntas en un array
//       // parsedData.data.push(...tempData);
//     }
//   } else if (!target_sheet || parsedData.sheetNames.includes(target_sheet)) {
//     parsedData.target_name = target_sheet ? target_sheet : file.SheetNames[0];
//     parsedData.target_sheet = XLSX.utils.sheet_to_json(
//       file.Sheets[target_sheet ? target_sheet : file.SheetNames[0]]
//     );
//   } else {
//     parsedData.error = `target_sheet (${target_sheet}) no exist`;
//     return parsedData;
//   }

//   if (output) {
//     // save the data in a json file
//     try {
//       writeFileSync(
//         `${path.resolve(process.env.MAIN_FOLDER, "../uploads", output)}.json`,
//         JSON.stringify(parsedData)
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return parsedData;
// };

// exports
exports.crearContentCSV = crearContentCSV;
exports.crearStreamFile = crearStreamFile;
exports.guardarContentStream = guardarContentStream;
exports.cerrarStreamFile = cerrarStreamFile;
exports.guardarFile = guardarFile;
exports.leerFile = leerFile;
exports.deleteFile = deleteFile;

exports.fileToJson = fileToJson;
exports.csvToJson = csvToJson;
// exports.xmlToJson = xmlToJson;
// exports.excelToJson = excelToJson;
