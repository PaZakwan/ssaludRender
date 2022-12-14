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

const isVacio = (dato, borrar) => {
  try {
    if (!!dato && dato !== null && dato !== undefined) {
      let todovacio = true;
      for (const key in dato) {
        if (dato.hasOwnProperty(key)) {
          if (
            (typeof dato[key] === "string" && dato[key].trim() === "") ||
            dato[key] === null ||
            dato[key] === undefined
          ) {
            if (!!borrar) {
              delete dato[key];
            }
          } else if (
            typeof dato[key] === "string" ||
            typeof dato[key] === "number" ||
            typeof dato[key] === "boolean"
          ) {
            if (!borrar) {
              return {dato: dato, vacio: false};
            }
            todovacio = false;
          } else {
            // Es un objeto o un array
            let vacioTemp = isVacio(dato[key], borrar);
            if (vacioTemp.vacio === false) {
              if (!borrar) {
                return {dato: dato, vacio: false};
              }
              todovacio = false;
            } else if (!!borrar) {
              delete dato[key];
            }
          }
        }
      }
      if (todovacio === true) {
        return {dato: dato, vacio: true};
      }
      return {dato: dato, vacio: false};
    } else {
      return {dato: dato, vacio: true};
    }
  } catch (error) {
    return {dato: dato, vacio: "error", error};
  }
};

const objectSetUnset = (dato, cero) => {
  try {
    let todovacio = true;
    let $set = {};
    let $unset = {};
    for (const key in dato) {
      if (dato.hasOwnProperty(key)) {
        if (cero && (dato[key] === 0 || dato[key] === "0")) {
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
          let vacioTemp = isVacio(dato[key], true);
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
      } else if (typeof object1[key] === "object") {
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

// exports
exports.isObjectIdValid = isObjectIdValid;

exports.isDateValid = isDateValid;

exports.isVacio = isVacio;

exports.objectSetUnset = objectSetUnset;

exports.objectToFind = objectToFind;

exports.sumarProps = sumarProps;
