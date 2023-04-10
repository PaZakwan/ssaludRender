const jwt = require("jsonwebtoken");
const _get = require("lodash/get");

// =====================
// Verificar Token
// =====================
const verificaToken = (req, res, next) => {
  let token = req.get("token");

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Sesión expirada. Por favor, vuelva a iniciar Sesión.",
        },
      });
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
    return res.status(403).json({
      ok: false,
      err: {
        message: "Actividad no autorizada.",
      },
    });
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
  // si ninguna cumple No autorizado
  return res.status(403).json({
    ok: false,
    err: {
      message: "Actividad no autorizada.",
    },
  });
};

// =====================
// Verifica Bromatologia
// =====================
const verificaBromatologia = (req, res, next) => {
  let usuario = req.usuario;

  if (usuario.bromatologia > 0) {
    return next();
  } else {
    return res.status(403).json({
      ok: false,
      err: {
        message: "Actividad no autorizada.",
      },
    });
  }
};

// =====================
// Verifica Same
// =====================
const verificaSame = (req, res, next) => {
  let usuario = req.usuario;

  if (usuario.same > 0) {
    return next();
  } else {
    return res.status(403).json({
      ok: false,
      err: {
        message: "Actividad no autorizada.",
      },
    });
  }
};

// =====================
// Verifica Paciente
// =====================
const verificaPaciente = (req, res, next) => {
  let usuario = req.usuario;

  if (
    usuario.tuberculosis > 0 ||
    usuario.turnero > 0 ||
    usuario.historial_clinico > 0 ||
    usuario.farmacia?.general?.reportes ||
    usuario.farmacia?.general?.admin ||
    (usuario.farmacia &&
      Array.isArray(usuario.farmacia.entregas) &&
      usuario.farmacia.entregas.length >= 1)
  ) {
    return next();
  } else {
    return res.status(403).json({
      ok: false,
      err: {
        message: "Actividad no autorizada.",
      },
    });
  }
};

// =====================
// Verifica Turnero
// =====================
const verificaTurno = (req, res, next) => {
  let usuario = req.usuario;

  if (usuario.turnero > 0) {
    return next();
  } else {
    return res.status(403).json({
      ok: false,
      err: {
        message: "Actividad no autorizada.",
      },
    });
  }
};

// =====================
// Verifica HistorialClinico
// =====================
const verificaHistorialClinico = (req, res, next) => {
  let usuario = req.usuario;

  if (usuario.historial_clinico > 0) {
    return next();
  } else {
    return res.status(403).json({
      ok: false,
      err: {
        message: "Actividad no autorizada.",
      },
    });
  }
};

module.exports = {
  verificaToken,
  verificaAdmin_Role,
  verificaArrayPropValue,
  verificaBromatologia,
  verificaSame,
  verificaPaciente,
  verificaTurno,
  verificaHistorialClinico,
};
