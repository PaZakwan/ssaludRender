const express = require("express");

const {verificaToken, verificaAdmin_Role} = require(
  process.env.MAIN_FOLDER + "/middlewares/autenticacion"
);
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isVacio, objectSetUnset} = require(process.env.MAIN_FOLDER + "/tools/object");

const Area = require("./models/area");

const app = express();

const listaArea = [
  // 'usuario_modifico',
  "_id",
  "subsecretaria",
  "depende",
  "area",
  "direccion",
  "responsable",
  "oficina_nro",
  "patrimonio",
  "unidad_atencion",
  "zona_us",
  "farmacia",
  "vacunatorio",
  "SISA",
  "RUPES",
  "estado",
];

// ============================
// Mostrar areas segun filtros
// ============================
app.get("/area", async (req, res) => {
  try {
    let filtro = req.query.filtro || "todos";
    if (filtro !== "todos") {
      try {
        filtro = JSON.parse(filtro);
        if (typeof filtro !== "object") {
          return errorMessage(res, {message: "El dato de Filtro no es valido."}, 400);
        }
        if (filtro.subs) {
          filtro.subsecretaria = {
            $regex: `(?i)${filtro.subs}`,
          };
          delete filtro.subs;
        }
        if (filtro.depende) {
          if (!/^[a-fA-F\d]{24}$/.test(filtro.depende)) {
            return errorMessage(
              res,
              {message: "El 'depende de ...' para Busqueda no es valido."},
              400
            );
          }
        }
        if (filtro.area) {
          filtro.area = {
            $regex: `(?i)${filtro.area}`,
          };
        }
        if (filtro.zona) {
          filtro.zona_us = {
            $regex: `(?i)${filtro.zona}`,
          };
          delete filtro.zona;
        }
        if (filtro.uas) {
          filtro.unidad_atencion = {
            $regex: `(?i)${filtro.uas}`,
          };
          delete filtro.uas;
        }
        if (filtro.farmacia) {
          filtro.farmacia = {
            $regex: `(?i)${filtro.farmacia}`,
          };
        }
        if (filtro.vacunatorio) {
          filtro.vacunatorio = {
            $regex: `(?i)${filtro.vacunatorio}`,
          };
        }
      } catch (error) {
        return errorMessage(res, {message: "El dato de Filtro no es valido."}, 400);
      }
    } else {
      filtro = {};
    }

    let select = req.query.select || "";
    try {
      select = select.toString();
    } catch (error) {
      return errorMessage(res, {message: "El dato de Select no es valido."}, 400);
    }

    let orden = req.query.orden || JSON.stringify({area: 1});
    try {
      orden = JSON.parse(orden);
    } catch (error) {
      return errorMessage(res, {message: "El dato para Ordenar no es valido."}, 400);
    }

    let limite = req.query.limite || 0;
    try {
      limite = Number(limite);
    } catch (error) {
      return errorMessage(res, {message: "El dato para Limite no es valido."}, 400);
    }

    let populate = req.query.populate || "si";

    let areas = Area.find(filtro)
      .collation({locale: "es", numericOrdering: true})
      .select(select)
      .sort(orden)
      .limit(limite);

    if (populate === "si") {
      // .populate("usuario_modifico", "nombre apellido nombreC")
      areas.populate("depende", "area");
    }

    areas = await areas.lean().exec();

    res.json({
      ok: true,
      areas,
    });
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Modificar Area o crearla en caso de no existir
// ============================
app.put("/area/:area", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    let body = isVacio({
      dato: req.body,
      pickDato: listaArea,
    });
    if (body.vacio === true) {
      return errorMessage(res, {message: "No se envió ningún dato."}, 412);
    }
    body = body.dato;

    body["usuario_modifico"] = req.usuario._id;

    let areaDB = await Area.findOne({area: req.params.area}).exec();

    if (!areaDB && !req.body._id) {
      // Si no existe el area la crea.
      areaDB = await new Area(body).save();

      return res.status(201).json({
        ok: true,
        area: areaDB,
      });
    } else {
      // Existe entonces la edita
      // Delete del campo si esta como null / "" / undefined /array vacio
      body = objectSetUnset({dato: body}).dato;

      if (req.body._id) {
        // actualiza el area, si se esta editando
        delete body.$set._id;
        areaDB = await Area.findOneAndUpdate({_id: req.body._id}, body).exec();

        if (!areaDB) {
          return errorMessage(res, {message: "Area no encontrada."}, 404);
        }

        return res.json({
          ok: true,
          area: areaDB,
        });
      } else {
        // actualiza el area por el nombre(para uploads o cuando se crea con el mismo nombre de area)
        delete body.$set.area;
        areaDB = await Area.findOneAndUpdate({area: req.params.area}, body).exec();

        if (!areaDB) {
          return errorMessage(res, {message: "Area no encontrada."}, 404);
        }

        return res.json({
          ok: true,
          area: areaDB,
        });
      }
    }
  } catch (err) {
    return errorMessage(res, err, err.code);
  }
});

// ============================
// Borrar la primer area encontrada por el campo "area"
// ============================
app.delete("/area/:area", [verificaToken, verificaAdmin_Role], async (req, res) => {
  try {
    // let areaBorrada = await Area.deleteOne({area: req.params.area}).exec();

    // if (areaBorrada.deletedCount === 0) {
    //   return res.status(404).json({
    //     ok: false,
    //     err: {
    //       message: "Area no encontrada.",
    //     },
    //   });
    // }
    let areaDB = await Area.findOne({area: req.params.area}).exec();

    if (!areaDB) {
      return errorMessage(res, {message: "Area no encontrada."}, 404);
    }

    let areaBorrada = await Area.findOneAndUpdate(
      {_id: areaDB._id},
      {
        area: areaDB.area + " (BORRADA)",
        estado: false,
      },
      {runValidators: false}
    ).exec();

    return res.json({
      ok: true,
      area: areaBorrada,
    });
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
