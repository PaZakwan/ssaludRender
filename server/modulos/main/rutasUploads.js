const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

// Middleware de Permisos
const {verificaToken, verificaAdmin_Role} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");

// Herramientas para excels
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");

const app = express();

// Requerido para Upload Files
const multer = require("multer");

const storage = multer.diskStorage({
  //multer disk storage settings
  destination: function (req, archivo, cb) {
    cb(null, "./server/uploads/");
  },
  filename: function (req, archivo, cb) {
    let hoy = new Date().toISOString().substring(0, 19).replace(/:/g, "-");
    // let datetimestamp = Date.now();
    cb(null, hoy + "-" + archivo.originalname);
  },
});

const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) {
    //file filter
    if (
      ["xls", "xlsx"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      req.fileValidationError = 'Extension de archivo Incorrecta. \nSe aceptan "xls" o "xlsx"';
      return callback(new Error('Extension de archivo Incorrecta. \nSe aceptan "xls" o "xlsx"'));
    }
    callback(null, true);
  },
}).single("file");

// Funciones
// ###############################
// LAS FECHAS QUE NO SON DEL 2000 TIENEN QUE ESTAR EN VALOR NUMERICO, ESTILO EXCEL
// ###############################
function fechaTOyyyymmdd(value) {
  try {
    let cuenta = 0;
    let posicion = value.indexOf("/");
    while (posicion != -1) {
      cuenta++;
      posicion = value.indexOf("/", posicion + 1);
    }
    if (cuenta === 2) {
      let fecha = value.split("/");
      fecha = new Date(Number("20" + fecha[2]), Number(fecha[0]) - 1, Number(fecha[1]));
      return [
        true,
        `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, "0")}-${fecha
          .getDate()
          .toString()
          .padStart(2, "0")}`,
      ];
    } else {
      // zona horaria, 24 - 3
      let offsetUTC = -21;
      fecha = new Date(Date.UTC(0, 0, value, offsetUTC));
      return [
        true,
        `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, "0")}-${fecha
          .getDate()
          .toString()
          .padStart(2, "0")}`,
      ];
    }
  } catch (error) {
    return [false, `${value}`];
  }
}

// ###############################
// Selecciona el modulo a utilizar para pasar a json, segun la extencion del archivo
// ###############################
function exceltojson(file) {
  if (file.originalname.split(".")[file.originalname.split(".").length - 1] === "xlsx") {
    return xlsxtojson;
  } else if (file.originalname.split(".")[file.originalname.split(".").length - 1] === "xls") {
    return xlstojson;
  }
}

// ###############################
// Guardar archivo log en uploads/logs...
// ###############################
function guardarLog(file, exitosos, errores, totales) {
  let hoy = new Date().toISOString().substring(0, 19).replace(/:/g, "-");
  let filename = file.originalname.split(".");
  filename.pop();
  filename = filename.join(".");
  let ruta = `./server/uploads/logs/${hoy}-${filename}-log.txt`;
  let texto = `EXITOSOS: ${exitosos} \r\nTOTAL EXITOSOS: ${totales.exitosos} \r\n \r\nERRORES: ${errores} \r\nTOTAL ERRORES: ${totales.errores}`;
  fs.appendFile(
    ruta,
    texto,
    {
      encoding: "utf8",
      flag: "a",
    },
    function (err) {
      if (err) throw err;
    }
  );
}

// ============================
// Ruta para subir archivo y actualizar las Areas
// ============================
app.post("/area/upload", [verificaToken, verificaAdmin_Role], (req, res) => {
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.status(400).json({
        ok: false,
        err: {
          message: req.fileValidationError,
        },
      });
    }
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "No se envio ningun Archivo",
        },
      });
    }
    let excelParaJson = exceltojson(req.file);
    try {
      excelParaJson(
        {
          input: req.file.path,
          // output: req.file.destination + 'tmp/' + req.file.filename + '.json',
          output: null,
          lowerCaseHeaders: false,
        },
        async function (err, result) {
          if (err) {
            return res.status(500).json({
              ok: false,
              err,
            });
          }
          // Manipulando excel para luego actualizar la BD
          let object = {};
          let $set = {};
          let objetoBDTMP = {};
          let exitosos = "";
          let errores = "";
          let totales = {
            exitosos: 0,
            errores: 0,
          };
          for (let index = 0; index < result.length; index++) {
            object = result[index];
            // preparando el objeto segun las columnas del excel
            if (object["area"]) {
              for (const key in object) {
                if (object.hasOwnProperty(key)) {
                  if (object[key] === null || object[key] === "" || object[key].length === 0) {
                    // no guardar nada
                  } else {
                    $set[key] = object[key];
                  }
                }
              }
              $set["usuario_modifico"] = req.usuario._id;

              // Revisa cambio de nombre de area
              let area = object["area"];
              if (object["cambia_nombre"]) {
                $set["area"] = object["cambia_nombre"];
              }
              objetoBDTMP = {$set};

              // Realizar actualizacion uno por uno
              let AreaUnHilo = mongoose.connections[1].models.Area;
              try {
                let resultado = await AreaUnHilo.findOneAndUpdate({area}, objetoBDTMP, {
                  new: true,
                  runValidators: true,
                  upsert: true,
                  setDefaultsOnInsert: true,
                });
                if (resultado) {
                  exitosos = `${exitosos}Fila Excel: ${
                    index + 2
                  }, Area: ${area}, Actualizado.\r\n\t`;
                  totales.exitosos += 1;
                }
              } catch (err) {
                errores = `${errores}Fila Excel: ${index + 2}, Area: ${area}, Error: ${
                  err.message
                }\r\n\t`;
                totales.errores += 1;
              }

              // Reiniciar objetos para el proximo del loop
              area = "";
              objetoBDTMP = {};
              $set = {};
            } else {
              // si No tiene nombre de area no hacer nada
              errores = `${errores}Fila Excel: ${index + 2}, Error: No contiene Area.\r\n\t`;
              totales.errores += 1;
            }
          }
          // Guardar archivo log en uploads/logs...
          guardarLog(req.file, exitosos, errores, totales);
          // Borrar archivo subido
          try {
            fs.unlinkSync(req.file.path);
          } catch (e) {
            console.log("error deleting the file, Error : ", e);
          }
          return res.json({
            ok: true,
            data: {exitosos, errores, totales},
            respuesta: "Subida Exitosa.",
          });
        }
      );
    } catch (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
  });
});

// ============================
// Ruta para subir archivo y actualizar Patrimonio
// ============================
app.post("/patrimonio/upload", [verificaToken, verificaAdmin_Role], (req, res) => {
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.status(400).json({
        ok: false,
        err: {
          message: req.fileValidationError,
        },
      });
    }
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "No se envio ningun Archivo",
        },
      });
    }
    let exceltojson;
    if (req.file.originalname.split(".")[req.file.originalname.split(".").length - 1] === "xlsx") {
      exceltojson = xlsxtojson;
    } else if (
      req.file.originalname.split(".")[req.file.originalname.split(".").length - 1] === "xls"
    ) {
      exceltojson = xlstojson;
    }
    try {
      exceltojson(
        {
          input: req.file.path,
          // output: req.file.destination + 'tmp/' + req.file.filename + '.json',
          output: null,
          lowerCaseHeaders: false,
        },
        async function (err, result) {
          if (err) {
            return res.status(500).json({
              ok: false,
              err,
            });
          }
          // Manipulando excel para luego actualizar la BD
          let object = {};
          let $set = {};
          let objetoBDTMP = {};
          let fechaError = false;
          let exitosos = "";
          let errores = "";
          let totales = {
            exitosos: 0,
            errores: 0,
          };
          console.log("tutoBem");
          for (let index = 0; index < result.length; index++) {
            object = result[index];
            // preparando el objeto segun las columnas del excel

            if (object["inventario"] || object["categoria"] === "Insumos") {
              try {
                let areaTMP = await AreaUnHilo.find({area: object["area"]}).exec();
                if (areaTMP.length !== 0) {
                  for (const key in object) {
                    if (object.hasOwnProperty(key)) {
                      if (object[key] === null || object[key] === "" || object[key].length === 0) {
                        // no guardar nada
                      } else if (["fec_alta"].indexOf(key) !== -1) {
                        let respuesta = fechaTOyyyymmdd(object[key]);
                        if (respuesta[0]) {
                          $set[key] = respuesta[1];
                        } else {
                          $set[key] = respuesta[1];
                          fechaError = true;
                          break;
                        }
                      } else {
                        $set[key] = object[key];
                      }
                    }
                  }

                  if (!fechaError) {
                    if (object["disco_marca"]) {
                      $set["disco"] = `${object["disco_marca"]}-${object["disco_capacidad"]}`;
                      $set["disco"] += `${
                        object["disco_marca2"]
                          ? ", " + object["disco_marca2"] + "-" + object["disco_capacidad2"]
                          : ""
                      }`;
                      $set["disco"] += `${
                        object["disco_marca3"]
                          ? ", " + object["disco_marca3"] + "-" + object["disco_capacidad3"] + "."
                          : "."
                      }`;
                      $set["disco_tipo"] = `${object["disco_tipo"]}${
                        object["disco_tipo2"] ? ", " + object["disco_tipo2"] : ""
                      }${object["disco_tipo3"] ? ", " + object["disco_tipo3"] : ""}.`;
                    }
                    if (object["observaciones"] || object["NombrePC"]) {
                      $set["detalle"] = `${object["NombrePC"] ? " - " + object["NombrePC"] : ""}${
                        object["observaciones"] ? " - " + object["observaciones"] : ""
                      }.`;
                    }

                    $set["area"] = areaTMP[0].id;

                    $set["usuario_creador"] = req.usuario._id;
                    objetoBDTMP = {$set};

                    // Realizar actualizacion uno por uno
                    let PatrimonioUnHilo = mongoose.connections[1].models.Patrimonio;
                    if (object["categoria"] === "Insumos") {
                      try {
                        let resultado = await PatrimonioUnHilo.findOneAndUpdate(
                          {modelo: object["modelo"]},
                          objetoBDTMP,
                          {
                            new: true,
                            runValidators: true,
                            upsert: true,
                            setDefaultsOnInsert: true,
                          }
                        );
                        if (resultado) {
                          exitosos = `${exitosos}Fila Excel: ${index + 2}, Objeto Modelo: ${
                            object["modelo"]
                          }, Actualizado.\r\n\t`;
                          totales.exitosos += 1;
                        }
                      } catch (error) {
                        errores = `${errores}Fila Excel: ${index + 2}, Objeto Modelo: ${
                          object["modelo"]
                        }, Error1: ${err}\r\n\t`;
                        totales.errores += 1;
                      }
                    } else {
                      try {
                        let resultado = await PatrimonioUnHilo.findOneAndUpdate(
                          {inventario: object["inventario"]},
                          objetoBDTMP,
                          {
                            new: true,
                            runValidators: true,
                            upsert: true,
                            setDefaultsOnInsert: true,
                          }
                        );
                        if (resultado) {
                          exitosos = `${exitosos}Fila Excel: ${index + 2}, Objeto Inv.: ${
                            object["inventario"]
                          }, Actualizado.\r\n\t`;
                          totales.exitosos += 1;
                        }
                      } catch (error) {
                        errores = `${errores}Fila Excel: ${index + 2}, Objeto Inv.: ${
                          object["inventario"]
                        }, Error2: ${err}\r\n\t`;
                        totales.errores += 1;
                      }
                    }
                  } else {
                    // si hay Error de fecha no cargar nada
                    errores = `${errores}Fila Excel: ${
                      index + 2
                    }, Error: Fecha Valor/es invalido/s.\r\n\t`;
                    totales.errores += 1;
                  }
                  // Reiniciar objetos para el proximo del loop
                  objetoBDTMP = {};
                  $set = {};
                  fechaError = false;
                  areaTMP = "";
                } else {
                  // si No tiene un Area valida no hacer nada
                  errores = `${errores}Fila Excel: ${
                    index + 2
                  }, Error: No contiene Area Valida.\r\n\t`;
                  totales.errores += 1;
                }
              } catch (error) {
                // si tira error no hacer nada
                errores = `${errores}Fila Excel: ${index + 2}, Error: ${error}.\r\n\t`;
                totales.errores += 1;
              }
            } else {
              // si No tiene numero de inventario no hacer nada
              errores = `${errores}Fila Excel: ${
                index + 2
              }, Error: No contiene N° Inventario.\r\n\t`;
              totales.errores += 1;
            }
          }
          // Guardar archivo log en uploads/logs...
          guardarLog(req.file, exitosos, errores, totales);
          // Borrar archivo subido
          try {
            fs.unlinkSync(req.file.path);
          } catch (e) {
            console.log("error deleting the file, Error :", e);
          }
          return res.json({
            ok: true,
            data: {exitosos, errores, totales},
            respuesta: "Subida Exitosa.",
          });
        }
      );
    } catch (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
  });
});

// ============================
// TITULO ¿?¿?¿?¿?
// ============================

// ============================
// XXXXXX  Desarrollar  XXXXXXX
// ============================
// ============================
// XXXXXXXXXXXXXXXXXXXXXXXXXXXX
// ============================

module.exports = app;
