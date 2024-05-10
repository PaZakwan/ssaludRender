const errorMessage = function (res, error, statusTemp) {
  let status = Number.isInteger(statusTemp) ? statusTemp : error.responseCode ?? 500;
  let msjtemp = `${error.name ? `<${error.name}>: ` : ""}${error.message}` || "Error inesperado";
  let statusOriginal = undefined;
  if (status < 100 || 600 <= status) {
    statusOriginal = status;
    status = 444;
  }

  if (process.env.NODE_ENV === "dev") {
    console.log("##### errorMessage INI #####");
    console.error("code: ", error.code);
    console.error("responseCode: ", error.responseCode);
    console.error("statusTemp: ", statusTemp);
    console.error("name: ", error.name);
    console.error("message: ", error.message);
    console.error("type: ", error.type);
    console.error("arguments: ", error.arguments);
    console.error("errors: ", error.errors);
    console.log("##### errorMessage END #####");
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

  // MongoDB Errors
  if (error.name === "MongoServerError") {
    status = 500;
    if (error.code === 292 || error.code === 146) {
      msjtemp = `Problema con la Consulta a la Base de Datos,
      El rango de busqueda de la Consulta Excede el Limite de Memoria del Servidor.`;
    } else {
      msjtemp = `Problema con la Consulta a la Base de Datos
      Comuniquese con soporte para mas informacion.`;
    }
  }

  // "timed out" o "MongooseServerSelectionError" mensaje de BD no funcionando
  if (
    error.message?.includes("timed out") ||
    error.name?.includes("MongooseServerSelectionError")
  ) {
    status = 503;
    msjtemp = `Problema con la Conexion a la Base de Datos
    Comuniquese con soporte para mas informacion.`;
  }

  return res.status(status).json({
    ok: false,
    err: {
      message: msjtemp,
      code: error.code ?? status,
      status: statusOriginal ?? status,
      type: error.type ?? "Sin Tipo",
      arguments: error.arguments ?? "Sin Argumentos",
      // Para que funcione mongoose
      errors: error.errors ?? [],
    },
  });
};

exports.errorMessage = errorMessage;

// Examples

// import
// const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");

// SERVER
// 507 Insufficient Storage
// 503 Service Unavailable (Overload / mantenimiento)
// 501 Not Implemented
// 500 Internal Server Error (Generico)

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
