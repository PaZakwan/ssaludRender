exports.errorMessage = (res, error, statusTemp) => {
  let status = Number.isInteger(statusTemp) ? statusTemp : error.responseCode || 500;
  let msjtemp = `${error.name ? `<${error.name}>: ` : ""}${error.message}` || "Error inesperado";
  let statusOriginal = undefined;
  if (status < 100 || 600 <= status) {
    statusOriginal = status;
    status = "444";
  }
  // "timed out" o "MongooseServerSelectionError" mensaje de BD no funcionando
  if (
    error.name &&
    error.message &&
    (error.message.includes("timed out") || error.name.includes("MongooseServerSelectionError"))
  ) {
    status = 503;
    msjtemp = `Problema con la conexion a la Base de Datos
    Comuniquese con soporte para mas informacion.`;
  }
  // Mongoose Errors
  if (error.name === "ValidationError") {
    // pasar object de errors a array de string.. key: message
    let temp = [];
    Object.keys(error.errors).forEach((key) => {
      temp.push(`${key}: ${error.errors[key].message}`);
    });
    error.errors = temp;
    msjtemp = "";
  }
  return res.status(status).json({
    ok: false,
    err: {
      message: msjtemp,
      code: error.code || status,
      status: statusOriginal || status,
      type: error.type || "Sin Tipo",
      arguments: error.arguments || "Sin Argumentos",
      // Para que funcione mongoose
      errors: error.errors || [],
    },
  });
};
// Examples

// import
// const { errorMessage } = require('../../tools/errorHandler');

// Precondition Failed
// return errorMessage(res, { message: "Falta información para proceder." }, 412);
// return errorMessage(res, {message: "No se envió ningún filtro/dato."}, 412);

// Bad Request / Sintaxis inválida
// return errorMessage(res, {message: "El ID de Busqueda no es valido."}, 400);

// not found
// return errorMessage(res, { message: "Usuario no encontrado." }, 404);

// Unauhtorized
// return errorMessage(res, { message: "Acceso Denegado." }, 401);
// Forbidden
// return errorMessage(res, { message: "Actividad no autorizada." }, 403);

// errores varios
// return errorMessage(res, err, err.code);

// default values
// return errorMessage(res, {}, null);
