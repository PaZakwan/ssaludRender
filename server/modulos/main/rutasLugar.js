const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaAdmin_Role} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectToFind, objectSetUnset} = require(process.env.MAIN_FOLDER + "/tools/object");

const Lugar = require("./models/lugar");

const app = express();

const listaLugar = [
  // 'usuario_modifico',
  "_id",
  "nombre",
  "direccion",
  "descripcion",
  "conectividad",
  "ip",

  "estado",
];

// ============================
// Modificar Lugar o crearlo en caso de no existir
// ============================
app.post("/lugar/:nombre", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    let body = isVacio({
      dato: _pick(req.body, listaLugar),
    });
    if (body.vacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }
    body = body.dato;

    body["usuario_modifico"] = req.usuario._id;

    let lugarDB = null;
    if (body._id) {
      let _id = body._id;
      // Existe entonces la edita
      // Delete del campo si esta como null / "" / undefined /array vacio
      body = objectSetUnset({dato: body}).dato;
      // actualiza el lugar, si se esta editando
      delete body.$set._id;
      lugarDB = await Lugar.findOneAndUpdate({_id}, body, {
        new: true,
        runValidators: true,
      }).exec();

      if (!lugarDB) {
        return errorMessage(res, {message: "Lugar no encontrado."}, 404);
      }

      return res.json({
        ok: true,
        lugar: lugarDB,
      });
    }

    lugarDB = await Lugar.findOne({nombre: req.params.nombre}).exec();
    if (lugarDB) {
      // Existe entonces la edita
      // Delete del campo si esta como null / "" / undefined /array vacio
      body = objectSetUnset({dato: body}).dato;
      delete body.$set._id;
      // actualiza el lugar por el nombre(para uploads o cuando se crea con el mismo nombre del lugar)
      lugarDB = await Lugar.findOneAndUpdate({nombre: req.params.nombre}, body, {
        new: true,
        runValidators: true,
      }).exec();

      return res.json({
        ok: true,
        lugar: lugarDB,
      });
    }

    // Si no existe el lugar lo crea.
    let nuevoLugar = new Lugar(body);

    lugarDB = await nuevoLugar.save();

    return res.status(201).json({
      ok: true,
      lugar: lugarDB,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Mostrar Lugar por filtros
// ============================
app.get("/lugar/buscar", [verificaToken], async (req, res) => {
  try {
    // Toma los datos Recibidos
    let filtro = req.query.filtro;
    if (filtro === "{}") {
      filtro = {};
    } else {
      try {
        filtro = JSON.parse(filtro);
        if (typeof filtro !== "object") {
          return errorMessage(res, {message: "El tipo de dato de Filtro no es valido."}, 400);
        }
        filtro = isVacio({
          dato: filtro,
          inArr: true,
          inObj: true,
          borrar: true,
        });
        if (filtro.vacio === true) {
          return errorMessage(res, {message: "No se envió ningún dato."}, 412);
        }
        filtro = objectToFind({dato: filtro.dato});
        if (filtro.error) {
          return errorMessage(
            res,
            {message: `El formato del Filtro no es valido. ${filtro.error}`},
            400
          );
        }
      } catch (error) {
        return errorMessage(res, {message: "El dato de Filtro no es valido."}, 400);
      }
    }

    let select = req.query.select || "";
    try {
      select = select.toString();
    } catch (error) {
      return errorMessage(res, {message: "El dato de Select no es valido."}, 400);
    }

    let orden = req.query.orden || JSON.stringify({nombre: 1});
    try {
      orden = JSON.parse(orden);
    } catch (error) {
      return errorMessage(res, {message: "El dato para Ordenar no es valido."}, 400);
    }

    // Revisa permisos del cliente
    if (req.usuario.role !== "ADMIN_ROLE") {
      filtro.estado = true;
    }

    // Realiza la busqueda en la BD
    let lugarDB = await Lugar.find(filtro)
      .collation({locale: "es", numericOrdering: true})
      .select(select)
      .sort(orden)
      .exec();

    return res.json({
      ok: true,
      lugares: lugarDB,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Borrar Lugar por nombre
// ============================
app.delete("/lugar/:nombre", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    // let lugarBorrado = await Lugar.deleteOne({nombre: req.params.nombre}).exec();
    // if (lugarBorrado.deletedCount === 0) {
    //   return errorMessage(res, {message: "Lugar no encontrado."}, 404);
    // }

    let lugarDB = await Lugar.findOne({nombre: req.params.nombre}).exec();
    if (!lugarDB) {
      return errorMessage(res, {message: "Lugar no encontrado."}, 404);
    }

    let lugarBorrado = await Lugar.findOneAndUpdate(
      {_id: lugarDB._id},
      {
        nombre: lugarDB.nombre + " (BORRADA)",
        estado: false,
      },
      {new: true}
    ).exec();

    return res.json({
      ok: true,
      lugar: lugarBorrado,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

module.exports = app;
