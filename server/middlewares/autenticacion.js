const jwt = require("jsonwebtoken");
const _get = require("lodash/get");

const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");

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
  // recorrer array de props value
  for (const element of req.verificacionArray) {
    // si no es array verificar con su value,
    if (element.value && _get(req.usuario, element.prop) >= element.value) {
      // si cumple Next
      return next();
    } else if (
      // si es array usar una condicion,
      Array.isArray(_get(req.usuario, element.prop)) &&
      _get(req.usuario, element.prop).length >= 1
    ) {
      // si cumple Next
      return next();
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
