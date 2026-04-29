const jwt = require("jsonwebtoken");

const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {getObject} = require(process.env.MAIN_FOLDER + "/tools/object");

// =====================
// Verificar Token
// =====================
const verificaToken = (req, res, next) => {
  // express no maneja bien las async function
  // try {
  //   let decoded = await jwt.verify(req.get("token"), process.env.SEED);
  //   req.usuario = decoded.usuario;
  //   return next();
  // } catch (err) {
  //   return errorMessage(
  //     res,
  //     {message: "Sesión expirada. Por favor, vuelva a iniciar Sesión."},
  //     401
  //   );
  // }
  jwt.verify(req.get("token"), process.env.SEED, (err, decoded) => {
    if (err) {
      return errorMessage(
        res,
        {message: "Sesión expirada. Por favor, vuelva a iniciar Sesión."},
        401
      );
    }
    req.usuario = decoded.usuario;
    return next();
  });
};

// =====================
// Verifica AdminRole
// =====================
const verificaAdmin_Role = (req, res, next) => {
  if (req.usuario.role === "ADMIN_ROLE") {
    return next();
  } else {
    return errorMessage(res, {message: "Actividad no autorizada."}, 403);
  }
};

// =====================
// Verifica Array de Propiedades Value(null es un array)
// =====================
const verificaArrayPropValue = (req, res, next) => {
  // si array esta vacio
  if (!Array.isArray(req.verificacionArray) || req.verificacionArray.length === 0) {
    return errorMessage(res, {message: "Server Error verificaArrayPropValue."}, 500);
  }
  // recorrer array de props value
  for (const element of req.verificacionArray) {
    if (getObject({obj: req.usuario, path: element.prop})) {
      // existe prop
      if (element.value && getObject({obj: req.usuario, path: element.prop}) >= element.value) {
        // si existe value verifica prop con value
        return next();
      } else if (
        Array.isArray(getObject({obj: req.usuario, path: element.prop})) &&
        getObject({obj: req.usuario, path: element.prop}).length >= 1
      ) {
        // si prop es array verifica si tiene elementos
        return next();
      } else if (
        typeof getObject({obj: req.usuario, path: element.prop}) === "object" &&
        !Array.isArray(getObject({obj: req.usuario, path: element.prop})) &&
        Object.keys(getObject({obj: req.usuario, path: element.prop})).length >= 1
      ) {
        // si prop es object y no array, verifica si tiene keys
        return next();
      }
    }
  }
  req.verificacionArray = [];
  // si ninguna cumple No autorizado
  return errorMessage(res, {message: "Actividad no autorizada."}, 403);
};

module.exports = {
  verificaToken,
  verificaAdmin_Role,
  verificaArrayPropValue,
};
