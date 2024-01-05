const {ObjectId} = require("mongodb");

const isObjectIdValid = (id) => {
  try {
    if (ObjectId.isValid(id) && new ObjectId(id) == id) {
      return new ObjectId(id);
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

const getEdad = ({date, onlyYear = true}) => {
  try {
    let hoy = dateUTC({
      date: new Date().toISOString().slice(0, 10),
      hours: "00:00:00.000",
    });
    if (Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date)) {
      date = date.toISOString().slice(0, 10);
    }
    let fec_nac = dateUTC({
      date: date,
      hours: "00:00:00.000",
    });
    if (fec_nac.error) {
      return {dato: {date, onlyYear}, error: `getEdad fec_nac: ${fec_nac.error}`};
    }
    // edad_years
    let edad_years = hoy.getUTCFullYear() - fec_nac.getUTCFullYear();
    let mes = hoy.getUTCMonth() - fec_nac.getUTCMonth();

    if (mes < 0 || (mes === 0 && hoy.getUTCDate() < fec_nac.getUTCDate())) {
      edad_years--;
    }

    if (onlyYear) {
      return `${edad_years}`;
    }

    // edad_months
    // edad_weeks
    // edad_days
    let diferenciaDias = getDiferenciaDias({date, dateHasta: hoy.toISOString().slice(0, 10)});
    return {
      edad_years,
      edad_months: Math.floor(diferenciaDias / 30.41), // 30.4375
      edad_weeks: Math.floor(diferenciaDias / 7),
      edad_days: Math.round(diferenciaDias),
    };
  } catch (error) {
    return {dato: {date, onlyYear}, error};
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
        if (vacioEmptyStr && dato.trim() === "") {
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
              } else if (vacioTemp.vacio === true) {
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
//   // bool1: true,
//   // bool0: false,
//   // str: "hola",
//   stre: "",
//   stre2: "   ",
//   // number0: 0,
//   // number: 6,
//   arrayEmpty: [],
//   // array: ["256", "  ", 0, 35, undefined, null, true, false, [], [0, 3], {}, {hola: "chau"}],
//   obje: {},
//   // obj: {
//   //   und: undefined,
//   //   null: null,
//   //   bool1: true,
//   //   bool0: false,
//   //   str: "hola",
//   //   stre: "",
//   //   stre2: "   ",
//   //   number0: 0,
//   //   number: 6,
//   //   arrayEmpty: [],
//   //   array: ["256", "  ", 0, 35, undefined, null, true, false, [], [0, 3], {}, {hola: "chau"}],
//   //   obje: {},
//   // },
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
    if (todovacio === true) {
      return {dato: {$set, $unset}, vacio: true};
    } else {
      return {dato: {$set, $unset}, vacio: false};
    }
  } catch (error) {
    return {dato: dato, error};
  }
};

const objectToFind = (dato) => {
  try {
    if (typeof dato !== "undefined") {
      let temp = {};
      if (
        // si es un string && (.trim() !== "") && no es ("true/false" || "idObject" || fecha valida) => contenga el texto.. case insensitive
        typeof dato === "string" &&
        dato.trim() !== "" &&
        dato !== "true" &&
        dato !== "false" &&
        !isObjectIdValid(dato) &&
        !isDateValid(dato)
      ) {
        temp = new RegExp(dato, "i");
      } else if (Array.isArray(dato) && dato.length !== 0) {
        // si es un array no vacio => buscar que contenta alguno de los valores $in
        temp = {$in: []};
        for (let index = 0; index < dato.length; index++) {
          temp.$in.push(objectToFind(dato[index]));
        }
      } else if (typeof dato === "object" && !dato?.noTocar) {
        // si es un object con datos para modiicar => objectToFind recursiva
        for (const key in dato) {
          if (dato.hasOwnProperty(key)) {
            temp[key] = objectToFind(dato[key]);
            if (temp[key] === undefined) {
              delete temp[key];
            }
          }
        }
      } else {
        // si es un (string & (id object || true/false || fecha valida)) || number || boolean=> buscar tal como esta.
        if (dato?.noTocar) {
          delete dato.noTocar;
        }
        temp = dato;
      }
      return temp;
    }
    return undefined;
  } catch (error) {
    return {dato: dato, error};
  }
};

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

// exports
exports.isObjectIdValid = isObjectIdValid;

exports.isDateValid = isDateValid;

exports.dateUTC = dateUTC;

exports.getEdad = getEdad;

exports.getDiferenciaDias = getDiferenciaDias;

exports.isVacio = isVacio;

exports.objectSetUnset = objectSetUnset;

exports.objectToFind = objectToFind;

exports.sumarProps = sumarProps;

exports.groupBy = groupBy;
