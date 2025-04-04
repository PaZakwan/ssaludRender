const {ObjectId} = require("mongodb");

const isObjectIdValid = (id) => {
  try {
    if (ObjectId.isValid(id) && ObjectId.createFromHexString(id) == id) {
      return ObjectId.createFromHexString(id);
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const isDateValid = (date) => {
  try {
    if (new Date(date).toISOString().slice(0, 10) === date) {
      return date;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const dateUTC = ({date, hours = "00:00:00.000", timezone = "+00:00", excelValue = false}) => {
  try {
    if (timezone != "+00:00" && !/^(?:[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$/.test(timezone)) {
      // offset = req.get("timezoneoffset");
      return {
        dato: {date, hours, timezone},
        error: "La Zona Horaria no es valida.",
      };
    }
    if (
      hours != "00:00:00.000" &&
      !/^(?:(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9].[0-9][0-9][0-9])$/.test(hours)
    ) {
      return {dato: {date, hours, timezone}, error: "El Horario no es valido."};
    }
    if (excelValue) {
      if (!date) {
        return {dato: {date, hours, timezone}, error: "El Valor de Excel no es valido."};
      }
      return new Date(
        `${new Date(Math.round((date - 25569) * 864e5))
          .toISOString()
          .slice(0, 10)}T${hours}${timezone}`
      );
    } else {
      if (!isDateValid(date)) {
        return {dato: {date, hours, timezone}, error: "La Fecha no es valida."};
      }
      return new Date(`${date}T${hours}${timezone}`);
    }
  } catch (error) {
    return {dato: {date, hours, timezone}, error};
  }
};

const getDiferenciaDias = ({date, dateHasta = new Date().toISOString().slice(0, 10)}) => {
  try {
    if (Object.prototype.toString.call(dateHasta) === "[object Date]" && !isNaN(dateHasta)) {
      dateHasta = dateHasta.toISOString().slice(0, 10);
    }
    let hasta = dateUTC({
      date: dateHasta,
      hours: "00:00:00.000",
    });
    if (hasta.error) {
      return {dato: {date, dateHasta}, error: `getDiferenciaDias hasta: ${hasta.error}`};
    }
    if (Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date)) {
      date = date.toISOString().slice(0, 10);
    }
    let desde = dateUTC({
      date: date,
      hours: "00:00:00.000",
    });
    if (desde.error) {
      return {dato: {date, dateHasta}, error: `getDiferenciaDias desde: ${desde.error}`};
    }

    return (hasta.getTime() - desde.getTime()) / (1000 * 60 * 60 * 24);
  } catch (error) {
    return {dato: {date, dateHasta}, error};
  }
};

const getEdad = ({
  date,
  dateHasta = new Date().toISOString().slice(0, 10),
  onlyYear = true,
  formatString = false,
}) => {
  if (!date) {
    return "";
  }
  try {
    if (Object.prototype.toString.call(dateHasta) === "[object Date]" && !isNaN(dateHasta)) {
      dateHasta = dateHasta.toISOString().slice(0, 10);
    }
    let hasta = dateUTC({
      date: dateHasta,
      hours: "00:00:00.000",
    });
    if (Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date)) {
      date = date.toISOString().slice(0, 10);
    }
    let desde = dateUTC({
      date: date,
      hours: "00:00:00.000",
    });
    if (desde.error) {
      return {
        dato: {date, dateHasta, onlyYear, formatString},
        error: `getEdad desde: ${desde.error}`,
      };
    }
    // corregir fechas invertidas..
    if (desde > hasta) {
      let temp = desde;
      desde = hasta;
      hasta = temp;
    }

    // edad_years
    let edad_years = hasta.getUTCFullYear() - desde.getUTCFullYear();
    let mes_diff = hasta.getUTCMonth() - desde.getUTCMonth();

    if (mes_diff < 0 || (mes_diff === 0 && hasta.getUTCDate() < desde.getUTCDate())) {
      edad_years--;
    }

    if (onlyYear) {
      if (formatString) {
        return `${edad_years}a`;
      }
      return `${edad_years}`;
    }
    // mes_diff / dias_diff
    mes_diff = mes_diff < 0 ? 12 + mes_diff : mes_diff;
    let dias_diff = hasta.getUTCDate() - desde.getUTCDate();
    if (hasta.getUTCDate() < desde.getUTCDate()) {
      if (mes_diff === 0) {
        mes_diff = 11;
      } else {
        mes_diff -= 1;
      }
      let mesAntes = new Date(hasta);
      mesAntes.setUTCDate(0);
      dias_diff += mesAntes.getUTCDate();
    }

    let edad_days = getDiferenciaDias({
      date: desde.toISOString().slice(0, 10),
      dateHasta: hasta.toISOString().slice(0, 10),
    });
    return {
      edad_years,
      edad_months: edad_years * 12 + mes_diff,
      edad_weeks: Math.floor(edad_days / 7),
      edad_days: Math.round(edad_days),
      formatString: formatString ? `${edad_years}a ${mes_diff}m ${dias_diff}d` : null,
    };
  } catch (error) {
    return {dato: {date, dateHasta, onlyYear, formatString}, error};
  }
};

const getEdadUnidades = ({edad_valor, edad_unidad}) => {
  // 'Año', 'Mes', 'Semana', 'Dia', 'Hora'
  try {
    // segun la edad_unidad -> obtener las demas edad_unidad
    let dias = 0;
    switch (edad_unidad) {
      case "Año":
        dias = edad_valor * 365.25;
        break;

      case "Mes":
        dias = edad_valor * (365.25 / 12);
        break;

      case "Semana":
        dias = edad_valor * 7;
        break;

      case "Dia":
        dias = edad_valor;
        break;

      case "Hora":
        dias = edad_valor / 24;
        break;

      default:
        return {
          dato: {edad_valor, edad_unidad},
          error: `getEdadUnidades edad_unidad: ${edad_unidad}`,
        };
    }
    return {
      Año: Math.floor(dias / 365.25),
      Mes: Math.floor(dias / 30), // 30.4375
      Semana: Math.floor(dias / 7),
      Dia: Math.floor(dias),
      Hora: Math.floor(dias * 24),
    };
  } catch (error) {
    return {dato: {edad_valor, edad_unidad}, error};
  }
};

// // 'Año', 'Mes', 'Semana', 'Dia', 'Hora'
// let test = {edad_valor: "30", edad_unidad: "Dia"};
// console.log("### TEST ", getEdadUnidades(test));

const isVacio = (payload) => {
  try {
    let {
      dato,
      mainValue = true,
      vacioUndefined = true,
      vacioNull = true,
      vacioCero = false,
      vacioBoolean = false,
      vacioEmptyStr = true,
      vacioEmptyArr = true,
      vacioEmptyObj = true,
      inArr = false,
      inObj = false,
      borrar = false,
    } = payload;
    // if (!mainValue) {
    //   console.log("dato", dato);
    // }

    switch (typeof dato) {
      case "undefined":
        if (vacioUndefined) {
          return {dato: dato, vacio: true};
        }
        return {dato: dato, vacio: false};

      case "string":
        dato = dato.trim();
        if (vacioEmptyStr && dato === "") {
          return {dato: dato, vacio: true};
        }
        if (vacioCero && dato === "0") {
          return {dato: dato, vacio: true};
        }
        if (vacioBoolean && dato === "false") {
          return {dato: dato, vacio: true};
        }
        return {dato: dato, vacio: false};

      case "number":
        if (vacioCero && dato === 0) {
          return {dato: dato, vacio: true};
        }
        return {dato: dato, vacio: false};

      case "boolean":
        if (vacioBoolean && dato === false) {
          return {dato: dato, vacio: true};
        }
        return {dato: dato, vacio: false};

      case "object":
        if (dato === null) {
          if (vacioNull) {
            return {dato: dato, vacio: true};
          }
          return {dato: dato, vacio: false};
        }

        let todovacio = true;
        if (mainValue || (inArr && Array.isArray(dato)) || (inObj && !Array.isArray(dato))) {
          // Recorrer Objeto para borrar dentro
          for (const key in dato) {
            if (dato.hasOwnProperty(key)) {
              let vacioTemp = isVacio({...payload, dato: dato[key], mainValue: false});
              // console.log("vacioTemp", vacioTemp);
              if (vacioTemp.error) {
                return {
                  dato: dato,
                  vacio: "errorInside",
                  error: `problemas dentro (${key} : ${dato[key]}): ${vacioTemp.error}`,
                };
              }
              if (vacioTemp.vacio === true) {
                if (borrar) {
                  if (Array.isArray(dato) && !vacioUndefined) {
                    dato[key] = Symbol("borrarIn");
                  } else {
                    delete dato[key];
                  }
                }
              } else {
                // faster without borrar
                if (!borrar) {
                  return {dato: dato, vacio: false};
                }
                todovacio = false;
                dato[key] = vacioTemp.dato;
              }
            }
          }
        }

        if (Array.isArray(dato)) {
          // es un array
          if (borrar && (mainValue || inArr)) {
            if (vacioUndefined) {
              dato = dato.filter((v) => v !== undefined);
            } else {
              dato = dato.filter((v) => !(typeof v === "symbol" && v.description === "borrarIn"));
            }
          }

          if (vacioEmptyArr && dato.length === 0) {
            return {
              dato: dato,
              vacio: true,
            };
          } else {
            return {dato: dato, vacio: mainValue || inArr ? todovacio : false};
          }
        } else {
          // es un objeto
          if (vacioEmptyObj && Object.keys(dato).length === 0) {
            return {dato: dato, vacio: true};
          } else {
            return {dato: dato, vacio: mainValue || inObj ? todovacio : false};
          }
        }

      case "function":
        return {dato: dato, vacio: false};

      default:
        return {dato: dato, vacio: "errorType", error: "tipo de valor desconocido"};
    }
  } catch (error) {
    return {dato: dato, vacio: "error", error};
  }
};

// let temp = {
//   // func: () => {
//   //   console.log("hola temp");
//   // },
//   und: undefined,
//   null: null,
//   bool1: true,
//   bool0: false,
//   str: "hola",
//   stre: "",
//   stre2: "   ",
//   number0: 0,
//   number: 6,
//   arrayEmpty: [],
//   array: [
//     "256",
//     "  ",
//     0,
//     35,
//     undefined,
//     null,
//     true,
//     false,
//     [],
//     [0, 3],
//     {},
//     {hola: "chau"},
//     // () => {
//     //   console.log("hola temp");
//     // },
//   ],
//   obje: {},
//   obj: {
//     // func: () => {
//     //   console.log("hola temp");
//     // },
//     und: undefined,
//     null: null,
//     bool1: true,
//     bool0: false,
//     str: "hola",
//     stre: "",
//     stre2: "   ",
//     number0: 0,
//     number: 6,
//     arrayEmpty: [],
//     array: [
//       "256",
//       "  ",
//       0,
//       35,
//       undefined,
//       null,
//       true,
//       false,
//       [],
//       [0, 3],
//       {},
//       {hola: "chau"},
//       // () => {
//       //   console.log("hola temp");
//       // },
//     ],
//     obje: {},
//   },
// };

// TESTEAR VACIOS
// console.log(
//   "isVacio: ",
//   isVacio({
//     dato: temp,
//     // dato: [undefined, ,],
//     // opciones: new value // default value
//     vacioUndefined: false, // true,
//     vacioNull: false, // true,
//     vacioCero: true, // false,
//     vacioBoolean: true, // false,
//     vacioEmptyStr: false, // true,
//     vacioEmptyArr: false, // true,
//     vacioEmptyObj: false, // true,
//     inArr: true, // false,
//     inObj: true, // false,
//     borrar: true, // false,
//   })
// );

const objectSetUnset = ({dato, unsetCero = false, unsetBoolean = false}) => {
  try {
    let todovacio = true;
    let $set = {};
    let $unset = {};
    for (const key in dato) {
      if (dato.hasOwnProperty(key)) {
        if (unsetCero && (dato[key] === 0 || dato[key] === "0")) {
          $unset[key] = 1;
        } else if (unsetBoolean && (dato[key] === false || dato[key] === "false")) {
          $unset[key] = 1;
        } else if (
          (typeof dato[key] === "string" && dato[key].trim() === "") ||
          dato[key] === null ||
          dato[key] === undefined ||
          dato[key].length === 0
        ) {
          $unset[key] = 1;
        } else if (
          typeof dato[key] === "string" ||
          typeof dato[key] === "number" ||
          typeof dato[key] === "boolean"
        ) {
          $set[key] = dato[key];
          todovacio = false;
        } else {
          // Es un objeto o un array
          let vacioTemp = isVacio({
            dato: dato[key],
            vacioCero: unsetCero, // false,
            vacioBoolean: unsetBoolean, // false,
            inArr: true, // false,
            inObj: true, // false,
            borrar: true, // false,
          });
          if (vacioTemp.vacio === false) {
            $set[key] = vacioTemp.dato;
            todovacio = false;
          } else {
            $unset[key] = 1;
          }
        }
      }
    }
    return {dato: {$set, $unset}, vacio: todovacio};
  } catch (error) {
    return {dato: dato, error};
  }
};

const objectToFind = ({dato, mainValue = true, mainKey = false}) => {
  // POR FUERA
  // filtro = JSON.parse(filtro);
  // filtro = isVacio({
  //   dato: dato[key],
  //   inArr: true, // false,
  //   inObj: true, // false,
  //   borrar: true, // false,
  // });
  //
  // undefined -> undefined
  // string -> new RegExp(dato, "i")
  // number -> dato
  // boolean -> dato
  // object/array -> "$in" -> [dato]
  // object -> noTocar / "elemMatch" -> {dato}
  try {
    switch (typeof dato) {
      case "undefined":
        return undefined;

      case "string":
        if (dato === "false" || dato === "true" || isObjectIdValid(dato) || isDateValid(dato)) {
          return dato;
        }
        return new RegExp(dato, "i");

      case "number":
        return dato;

      case "boolean":
        return dato;

      case "object":
        // es array, busca alguno de los elementos en la propiedad..
        if (Array.isArray(dato)) {
          let temp = {$in: []};
          for (let index = 0; index < dato.length; index++) {
            let arrayElement = objectToFind({dato: dato[index], mainValue: false});
            if (arrayElement.error) {
              return {
                dato: dato,
                error: `problemas dentro (${index} : ${dato[index]}): ${arrayElement.error}`,
              };
            }
            temp.$in.push(arrayElement);
          }
          return temp;
        }
        // si es un object
        else {
          // sin datos para modiicar (prop:noTocar)
          if (dato?.noTocar) {
            delete dato.noTocar;
            return dato;
          }
          // busca en el arrayDB de objetos el siguiente objeto.. (prop:elemMatch)
          if (dato?.elemMatch) {
            delete dato.elemMatch;
            let temp = {$elemMatch: {}};
            for (const key in dato) {
              if (dato.hasOwnProperty(key)) {
                temp["$elemMatch"][key] = objectToFind({
                  dato: dato[key],
                  mainValue: false,
                  mainKey: key,
                });
                if (temp["$elemMatch"][key].error) {
                  return {
                    dato: dato,
                    error: `problemas dentro (${key} : ${temp["$elemMatch"][key]}): ${temp["$elemMatch"][key].error}`,
                  };
                }
                if (temp["$elemMatch"][key] === undefined) {
                  delete temp["$elemMatch"][key];
                }
              }
            }
            return temp;
          }
          // con datos para modiicar => objectToFind recursiva
          if (mainValue) {
            let temp = {};
            for (const key in dato) {
              if (dato.hasOwnProperty(key)) {
                temp[key] = objectToFind({dato: dato[key], mainValue: false, mainKey: key});
                if (temp[key].error) {
                  return {
                    dato: dato,
                    error: `problemas dentro (${key} : ${temp[key]}): ${temp[key].error}`,
                  };
                }
                if (temp[key] === undefined) {
                  delete temp[key];
                }
                if (temp[key].deleteMain) {
                  delete temp[key].deleteMain;
                  for (const key2 in temp[key]) {
                    if (temp[key].hasOwnProperty(key2)) {
                      temp[key2] = temp[key][key2];
                    }
                  }
                  delete temp[key];
                }
              }
            }
            return temp;
          } else if (mainKey) {
            let temp = {deleteMain: true};
            for (const key in dato) {
              if (dato.hasOwnProperty(key)) {
                temp[`${mainKey}.${key}`] = objectToFind({
                  dato: dato[key],
                  mainValue: false,
                  mainKey: `${mainKey}.${key}`,
                });
                if (temp[`${mainKey}.${key}`].error) {
                  return {
                    dato: dato,
                    error: `problemas dentro (${`${mainKey}.${key}`} : ${
                      temp[`${mainKey}.${key}`]
                    }): ${temp[`${mainKey}.${key}`].error}`,
                  };
                }
                if (temp[`${mainKey}.${key}`] === undefined) {
                  delete temp[`${mainKey}.${key}`];
                }
                if (temp[`${mainKey}.${key}`].deleteMain) {
                  delete temp[`${mainKey}.${key}`].deleteMain;
                  for (const key2 in temp[`${mainKey}.${key}`]) {
                    if (temp[`${mainKey}.${key}`].hasOwnProperty(key2)) {
                      temp[key2] = temp[`${mainKey}.${key}`][key2];
                    }
                  }
                  delete temp[`${mainKey}.${key}`];
                }
              }
            }
            return temp;
          } else {
            let temp = {};
            for (const key in dato) {
              if (dato.hasOwnProperty(key)) {
                temp[key] = objectToFind({
                  dato: dato[key],
                  mainValue: false,
                  mainKey: key,
                });
                if (temp[key].error) {
                  return {
                    dato: dato,
                    error: `problemas dentro (${key} : ${temp[key]}): ${temp[key].error}`,
                  };
                }
                if (temp[key] === undefined) {
                  delete temp[key];
                }
              }
            }
            return temp;
          }
        }

      default:
        return {dato: dato, error: "tipo de valor desconocido"};
    }
  } catch (error) {
    return {dato: dato, error};
  }
};

// TESTEAR objectToFind Mongoose
// console.log(
//   "objectToFind: ",
//   objectToFind({
//     dato: isVacio({
//       dato: temp,
//       inArr: true, // false,
//       inObj: true, // false,
//       borrar: true, // false,
//     }).dato,
//   })
// );

const sumarProps = (object1, object2) => {
  try {
    let temp = {};
    Object.keys(object1).forEach((key) => {
      if (typeof object1[key] === "number") {
        if (typeof object2[key] === "number") {
          temp[key] = object1[key] + object2[key];
        } else {
          temp[key] = object1[key];
        }
      } else if (Array.isArray(object1[key])) {
        if (Array.isArray(object2[key])) {
          temp[key] = [].concat(object1[key], object2[key]);
        } else {
          temp[key] = object1[key];
        }
      } else if (typeof object1[key] === "object" && !(object1[key] instanceof ObjectId)) {
        if (typeof object2[key] === "object") {
          temp[key] = sumarProps(object1[key], object2[key]);
        } else {
          temp[key] = object1[key];
        }
      } else {
        temp[key] = object1[key];
      }
    });
    Object.keys(object2).forEach((key) => {
      if (typeof temp[key] === "undefined") {
        temp[key] = object2[key];
      }
    });
    return temp;
  } catch (error) {
    return {dato: {object1, object2}, error};
  }
};

const groupBy = ({array, keys}) => {
  return array.reduce((acumulador, obj) => {
    keys.forEach((key) => {
      (acumulador[obj[key]] = acumulador[obj[key]] || []).push(obj);
    });
    return acumulador;
  }, {});
};

// ==============================================================================
// valorInRangoArray [0, 1, ..., n-1, n], retorna string "rangoArray[i-1] a rangoArray[i]" o false
// ==============================================================================
const valorInRangoArray = ({valor, rangoArray}) => {
  try {
    // ordenar rangoArray
    rangoArray.sort?.((a, b) => a - b);
    // esta en el rango
    if (valor < rangoArray.at(-1) && rangoArray.at(0) <= valor) {
      // Recorrer rangoArray y determinar en que rango esta
      for (let index = 1; index < rangoArray.length; index++) {
        // rango etario
        if (rangoArray[index - 1] <= valor && valor < rangoArray[index]) {
          return [rangoArray[index - 1], rangoArray[index] - 1];
        }
      }
      return false;
    } else {
      return false;
    }
  } catch (error) {
    return {dato: {valor, rangoArray}, error};
  }
};

// ==============================================================================
// valorInMatriz [[min,max], ..., [min,max]], retorna string "matriz[i][0] a matriz[i][1]" o false
// ==============================================================================
const valorInMatriz = ({valor, matriz}) => {
  try {
    // ordenar matriz
    matriz.sort?.((a, b) => {
      if (a[0] === b[0]) {
        // ordenar por segundo elemento
        if (a[1] === b[1]) {
          return 0;
        } else {
          return a[1] < b[1] ? -1 : 1;
        }
      } else {
        return a[0] < b[0] ? -1 : 1;
      }
    });
    // esta en el rango
    if (valor < matriz.at(-1)[1] && matriz.at(0)[0] <= valor) {
      // Recorrer matriz y determinar en que rango esta
      for (let index = 0; index < matriz.length; index++) {
        // rango etario
        if (matriz[index][0] <= valor && valor < matriz[index][1]) {
          return [matriz[index][0], matriz[index][1] - 1];
        }
      }
      return false;
    } else {
      return false;
    }
  } catch (error) {
    return {dato: {valor, matriz}, error};
  }
};

const arrayFromSumarPropsInArrays = async ({
  arrays,
  compare = (a, b) => {
    a === b;
  },
  nullArrays = true,
}) => {
  try {
    if (Array.isArray(arrays)) {
      let respuesta = [];
      // recorrer arrays para ir integrando y sumando.
      for (let ArrayIndex = 0; ArrayIndex < arrays.length; ArrayIndex++) {
        // si es una promesa entonces esperar que se resuelva
        if (typeof arrays[ArrayIndex]?.then === "function") {
          arrays[ArrayIndex] = await arrays[ArrayIndex].exec();
        }
        if (Array.isArray(arrays[ArrayIndex])) {
          // recorrer contenido del array
          for (let elementIndex = 0; elementIndex < arrays[ArrayIndex].length; elementIndex++) {
            // buscar si el elemento del array ya existe en la respuesta
            let respuestaIndex = respuesta.findIndex((respuestaItem) =>
              compare(arrays[ArrayIndex][elementIndex], respuestaItem)
            );
            // sumar props de los items que existen
            if (respuestaIndex !== -1) {
              let tempObj = sumarProps(arrays[ArrayIndex][elementIndex], respuesta[respuestaIndex]);
              if (!tempObj.error) {
                respuesta[respuestaIndex] = tempObj;
              } else {
                return {dato: {arrays, compare, respuesta}, error: tempObj};
              }
            }
            // agregar items del array a la respuesta si no existe
            else {
              respuesta.push(arrays[ArrayIndex][elementIndex]);
            }
            if (nullArrays) {
              arrays[ArrayIndex][elementIndex] = null;
            }
          }
        } else {
          return {
            dato: {arrays, compare, respuesta},
            error: `Uno de los arrays no es un array, index ${ArrayIndex}`,
          };
        }
        if (nullArrays) {
          arrays[ArrayIndex] = null;
        }
      }
      if (nullArrays) {
        arrays = null;
      }
      return respuesta;
    } else {
      return {dato: {arrays, compare}, error: "Arrays no es un array"};
    }
  } catch (error) {
    return {dato: {arrays, compare}, error};
  }
};

// exports
exports.isObjectIdValid = isObjectIdValid;

exports.isDateValid = isDateValid;

exports.dateUTC = dateUTC;

exports.getDiferenciaDias = getDiferenciaDias;

exports.getEdad = getEdad;

exports.getEdadUnidades = getEdadUnidades;

exports.isVacio = isVacio;

exports.objectSetUnset = objectSetUnset;

exports.objectToFind = objectToFind;

exports.sumarProps = sumarProps;

exports.groupBy = groupBy;

exports.valorInRangoArray = valorInRangoArray;

exports.valorInMatriz = valorInMatriz;

exports.arrayFromSumarPropsInArrays = arrayFromSumarPropsInArrays;
