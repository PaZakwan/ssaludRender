const express = require("express");

const {verificaToken} = require(process.env.MAIN_FOLDER + "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectSetUnset, findDuplicates} = require(
  process.env.MAIN_FOLDER + "/tools/object"
);

const Config = require("./models/config");

const app = express();

const listaConfig = [
  // 'usuario_modifico',
  "opcion",
  "datos",
];

// ============================
// Mostrar una config segun la opcion.
// ============================
app.get("/config/:opc", [verificaToken], async (req, res) => {
  try {
    let configDB = await Config.findOne({opcion: req.params.opc}).exec();
    if (!configDB) {
      return errorMessage(res, {message: "Configuracion no encontrada."}, 404);
    }
    return res.json({
      ok: true,
      config: configDB,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Modificar Config segun la opcion y crearla en caso de no existir
// ============================
app.put("/config/:opc", [verificaToken], async (req, res) => {
  try {
    let body = isVacio({
      dato: req.body,
      pickDato: listaConfig,
    });
    if (body.vacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }
    body = body.dato;

    const areaOpcion = body.opcion?.split?.("-", 2);

    // PERMISOS
    if (req.usuario.role !== "ADMIN_ROLE") {
      // No es admin
      switch (areaOpcion[0]) {
        case "farmacia":
          if (
            !(
              req.usuario.farmacia?.general?.opciones === 1 ||
              req.usuario.farmacia?.general?.admin === 1
            )
          ) {
            return errorMessage(res, {message: "Actividad no autorizada."}, 403);
          }
          break;

        default:
          return errorMessage(res, {message: "Actividad no autorizada."}, 403);
      }
    }

    // Validaciones
    switch (areaOpcion[0]) {
      case "farmacia":
        if (
          areaOpcion[1] === "diagnosticos" &&
          findDuplicates({
            array: body.datos,
            key: "nombre",
            sensitiveCase: false,
            onlyOne: true,
          }).length > 0
        ) {
          return errorMessage(
            res,
            {
              message:
                "Diagnostico Repetido: No puede haber dos o mas diagnosticos con el mismo nombre.",
            },
            400
          );
        }
        break;

      default:
        break;
    }

    body["usuario_modifico"] = req.usuario._id;

    let configDB = await Config.findOne({opcion: req.params.opc}).exec();
    // Si no existe lo crea.
    if (!configDB) {
      body = isVacio({
        dato: body,
        borrar: true,
      }).dato;

      configDB = await new Config(body).save();
      return res.status(201).json({
        ok: true,
        config: configDB,
      });
    } else {
      // Delete del campo si esta como null / "" / undefined /array vacio o cero
      body = objectSetUnset({dato: body, unsetCero: true}).dato;

      // Modificando la BD
      configDB = await Config.findOneAndUpdate({_id: configDB._id}, body).exec();

      return res.json({
        ok: true,
        config: configDB,
      });
    }
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
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
