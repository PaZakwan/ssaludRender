/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const errorMessage = function (res, error, statusTemp) {
  let status = Number.isInteger(statusTemp) ? statusTemp : (error.responseCode ?? 500);
  let msjtemp = `${error.name ? `<${error.name}>: ` : ""}${error.message}` || "Error inesperado";
  let statusOriginal = undefined;
  if (status < 100 || 600 <= status) {
    statusOriginal = status;
    status = 444;
  }

  if (process.env.NODE_ENV === "dev") {
    console.error("##### errorMessage INI #####");
    console.error("code: ", error.code);
    console.error("responseCode: ", error.responseCode);
    console.error("statusTemp: ", statusTemp);
    console.error("name: ", error.name);
    console.error("message: ", error.message);
    console.error("type: ", error.type);
    console.error("arguments: ", error.arguments);
    console.error("errors: ", error.errors);
    console.error("##### errorMessage END #####");
  }

  switch (error.name) {
    // Mongoose Errors
    case "MongooseError":
      // "cannot call connection functions" no se conecto con la BD
      if (error.message?.includes?.("initial connection")) {
        status = 503;
        msjtemp = `No se logro la Conexion con la Base de Datos
        Comuniquese con soporte para mas informacion.`;
      } else {
        status = 500;
        msjtemp = `Problema con la Base de Datos
        Comuniquese con soporte para mas informacion.`;
      }
      break;
    case "MongooseServerSelectionError":
      status = 503;
      msjtemp = `Problema con la Conexion a la Base de Datos
      Comuniquese con soporte para mas informacion.`;
      break;
    case "ValidationError":
      // pasar object de errors a array de string.. key: message
      status = 400;
      error.errors = Object.entries(error.errors).map(([key, value]) => `${key}: ${value.message}`);
      msjtemp = "";
      break;

    // MongoDB Errors
    case "MongoServerError":
      status = 500;
      if (error.code === 292 || error.code === 146) {
        msjtemp = `Problema con la Consulta a la Base de Datos,
        El rango de busqueda de la Consulta Excede el Limite de Memoria del Servidor.`;
      } else {
        msjtemp = `Problema con la Consulta a la Base de Datos
        Comuniquese con soporte para mas informacion.`;
      }
      break;

    default:
      // "timed out" mensaje de BD no funcionando
      if (error.message?.includes?.("timed out")) {
        status = 503;
        msjtemp = `Problema con la Conexion a la Base de Datos
        Comuniquese con soporte para mas informacion.`;
      }
      break;
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

const errorAxios = function ({serverName, code}) {
  // No se recibio respuesta y esta contemplado por axios
  if (code === "ERR_NETWORK") {
    return {
      message: `Problema con la Conexion a ${serverName}.
     Revise la conexion (acceso a internet), el estado del Servicio con el que quiere conectar y pruebe nuevamente.
     Si el problema persiste, Llame a Informatica para mas informacion.`,
      status: 503,
    };
  } else if (code === "ECONNABORTED") {
    return {
      message: `Conexion cancelada a ${serverName}, el tiempo de espera de respuesta se excedio.
     Revise la conexion (acceso a internet), el estado del Servicio con el que quiere conectar y pruebe nuevamente.
     Si el problema persiste, Llame a Informatica para mas informacion.`,
      status: 503,
    };
  } else if (code === "ENOTFOUND") {
    return {
      message: `Problema con la Conexion a ${serverName}, servidor no encontrado.
     Revise la conexion (acceso a internet), el estado del Servicio con el que quiere conectar y pruebe nuevamente.
     Si el problema persiste, Llame a Informatica para mas informacion.`,
      status: 503,
    };
  } else if (code === "ETIMEDOUT") {
    return {
      message: `Se agoto el tiempo de espera al Conectar con ${serverName}.
     Revise la conexion (acceso a internet), el estado del Servicio con el que quiere conectar y pruebe nuevamente.
     Si el problema persiste, Llame a Informatica para mas informacion.`,
      status: 503,
    };
  } else {
    return {
      message: `Hubo un problema al intentar Conectar con ${serverName}.
     Revise la conexion (acceso a internet), el estado del Servicio con el que quiere conectar y pruebe nuevamente.
     Si el problema persiste, Llame a Informatica para mas informacion.`,
      status: 503,
    };
  }
};

exports.errorMessage = errorMessage;
exports.errorAxios = errorAxios;

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
