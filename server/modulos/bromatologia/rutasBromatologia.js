const express = require("express");

const _pick = require("lodash/pick");

const {verificaToken, verificaArrayPropValue} = require(process.env.MAIN_FOLDER +
  "/middlewares/autenticacion");
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");

const Bromatologia = require("./models/bromatologia");

const app = express();

let listaBromatologia = [
  // 'usuario_creador',
  // 'orden',
  "conclusion",
  "origen",
  "muestra",
  "expediente",
  "titular",
  "rubro",
  "dir_calle",
  "dir_numero",
  "dir_entre",
  "dir_barrio",
  "telefono",
  "inspector",
  "fec_solicitud",
  "fec_inspeccion",
  "fec_resultado",
  "observacion",
  "tipo_analisis",
  "fuente_analisis",
  "usuario_verifico",
  "fec_verificado",
  "descargas",

  // Analisis Bacteriologico
  "mesofilas",
  "coliformes",
  "echerihia",
  "pseudomonaAeruginosa",

  //Fisico-Quimico
  "color",
  "olor",
  "aspecto",
  "ph",
  "nitratos",
  "nitritos",
  "sulfato",
  "arsenico",
  "cloruros",
  "cloroResidual",
  "dureza",
  "alcalinidad",

  // Alimento
  "observacionAlimento",

  //todos
  "estado",
];

// ============================
// Mostrar todos los Analisis de bromatologia con un desde y con limite(opcional para paginar respuesta).
// ============================
app.get(
  "/bromatologia",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "bromatologia", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let desde = req.query.desde || 0;
      try {
        desde = Number(desde);
      } catch (error) {
        desde = 0;
      }

      let limite = req.query.limite || 0;
      try {
        limite = Number(limite);
      } catch (error) {
        limite = 0;
      }

      // Revisa permisos del cliente

      let filtro = {};

      if (req.usuario.bromatologia == 1) {
        filtro = {estado: true, fec_verificado: {$ne: null}};
      }
      if (req.usuario.bromatologia == 2) {
        filtro = {estado: true};
      }

      let analisisDB = null;
      analisisDB = await Bromatologia.find(filtro)
        .sort("orden")
        .skip(desde)
        .limit(limite)
        .populate("usuario_creador", "nombre apellido nombreC")
        .populate("usuario_verifico", "nombre apellido nombreC")
        .exec();

      return res.json({
        ok: true,
        analisis: analisisDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Mostrar un Analisis de bromatologia por ID.
// ============================
app.get(
  "/bromatologia/buscar/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "bromatologia", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let analisisDB = null;
      analisisDB = await Bromatologia.findOne({_id: req.params.id})
        .populate("usuario_creador", "nombre apellido nombreC")
        .populate("usuario_verifico", "nombre apellido nombreC")
        .exec();

      if (!analisisDB) {
        return errorMessage(res, {message: "Analisis no encontrado."}, 404);
      }

      return res.json({
        ok: true,
        analisis: analisisDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ===========================
//  Buscar Analisis entre Fechas de inspeccion.
// ===========================
app.get(
  "/bromatologia/buscar",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "bromatologia", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let inicio = req.query.inicio;
      let fin = req.query.fin;

      try {
        inicio = new Date(inicio);
        inicio.toISOString();

        fin = new Date(fin);
        fin.toISOString();
      } catch (error) {
        return errorMessage(res, {message: "Se necesitan ambas fechas validas."}, 400);
      }

      //  "inicio" =< "fec_inspeccion" =< "fin"
      let filtro = {fec_inspeccion: {$gte: inicio, $lte: fin}};

      // Revisa permisos del cliente
      if (req.usuario.bromatologia < 3) {
        filtro.estado = true;
      }

      if (req.usuario.bromatologia > 1 && req.query.validos === "No Verificados") {
        filtro.fec_verificado = {$eq: null};
      } else if (req.usuario.bromatologia == 1 || req.query.validos === "Verificados") {
        filtro.fec_verificado = {$ne: null};
      }

      let analisisDB = null;
      analisisDB = await Bromatologia.find(filtro)
        .sort("fec_inspeccion")
        .populate("usuario_creador", "nombre apellido nombreC")
        .populate("usuario_verifico", "nombre apellido nombreC")
        .exec();

      return res.json({
        ok: true,
        analisis: analisisDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Crear Analisis
// ============================
app.post(
  "/bromatologia",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "bromatologia", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      if (req.usuario.bromatologia < 2) {
        return errorMessage(res, {message: "Acceso Denegado."}, 401);
      }

      let body = _pick(req.body, listaBromatologia.slice());

      let todovacio = true;
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          const element = body[key];
          if (element !== "") {
            todovacio = false;
            break;
          }
        }
      }
      if (todovacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 400);
      }

      // autonumerico para Numero de Orden segun Año-Autonumerico

      let ordTemp = [];

      try {
        ordTemp = body.fec_inspeccion.split("-");
        ordTemp[2] = "1".padStart(6, "0");
      } catch (error) {
        return errorMessage(
          res,
          {message: "Se necesita que la fecha de inspeccion sea valida."},
          400
        );
      }

      let analisisDB = null;
      analisisDB = await Bromatologia.find({
        orden: {$regex: body.fec_inspeccion.substring(0, 5), $options: "i"},
      })
        .sort({orden: -1})
        .limit(1)
        .exec();

      let ordenCrear = [];
      ordenCrear[0] = ordTemp[0];
      if (analisisDB.length === 0) {
        ordenCrear[1] = ordTemp[2];
      } else {
        ordenCrear[1] = (Number(analisisDB[0].orden.split("-")[1]) + 1).toString().padStart(6, "0");
      }
      ordenCrear = ordenCrear.join("-");

      body["usuario_creador"] = req.usuario._id;
      body["orden"] = ordenCrear;

      let nuevoAnalisis = new Bromatologia(body);
      analisisDB = await nuevoAnalisis.save();

      return res.json({
        ok: true,
        analisis: analisisDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Modificar Analisis por id
// ============================
app.put(
  "/bromatologia/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "bromatologia", value: 2}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let listaBromatologiaUpdate = listaBromatologia.slice();
      // Se quitaban de la lista los valores que no serán modificables. Por cuestión de seguridad.
      // listaBromatologiaUpdate.splice(0, 2);

      let body = _pick(req.body, listaBromatologiaUpdate);

      let todovacio = true;
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          const element = body[key];
          if (element !== "") {
            todovacio = false;
            break;
          }
        }
      }
      if (todovacio === true) {
        return errorMessage(res, {message: "No se envió ningún dato."}, 400);
      }

      let analisisDB = null;
      analisisDB = await Bromatologia.findOne({_id: req.params.id}).exec();
      if (!analisisDB) {
        return errorMessage(res, {message: "Analisis no encontrado."}, 400);
      }

      if (!analisisDB.usuario_verifico || analisisDB.usuario_verifico == req.usuario.id) {
        let $set = {};
        let $unset = {};
        for (const key in body) {
          if (body.hasOwnProperty(key)) {
            const element = body[key];
            if (element === null) {
              // Delete del campo "muestra" si esta como "null"
              if (key === "muestra") {
                $unset[key] = 1;
              } else {
                $set[key] = element;
              }
            } else {
              $set[key] = element;
            }
          }
        }
        body = {$set, $unset};

        analisisDB = null;
        analisisDB = await Bromatologia.findOneAndUpdate({_id: req.params.id}, body, {
          new: true,
          runValidators: true,
          context: "query",
        }).exec();
        if (!analisisDB) {
          return errorMessage(res, {message: "Analisis no encontrado."}, 400);
        }

        return res.json({
          ok: true,
          analisis: analisisDB,
        });
      } else {
        return errorMessage(
          res,
          {message: "Analisis verificado por otra persona, No lo puede editar."},
          406
        );
      }
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Validar Analisis por id
// ============================
app.put(
  "/bromatologia/validar/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "bromatologia", value: 3}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      if (!req.body.conclusion) {
        return errorMessage(res, {message: "No se envio la conclusion."}, 400);
      }

      let analisisDB = null;
      analisisDB = await Bromatologia.findOne({_id: req.params.id}).exec();
      if (!analisisDB) {
        return errorMessage(res, {message: "Analisis no encontrado."}, 400);
      }

      if (!analisisDB.fec_verificado) {
        let validarAnalisis = {
          usuario_verifico: req.usuario._id,
          fec_verificado: new Date(),
          conclusion: req.body.conclusion,
        };

        analisisDB = await Bromatologia.findOneAndUpdate({_id: req.params.id}, validarAnalisis, {
          new: true,
          runValidators: true,
        }).exec();

        return res.json({
          ok: true,
          analisis: analisisDB,
        });
      } else {
        return errorMessage(res, {message: "Analisis ya estaba verificado."}, 406);
      }
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// "Borrar" edita estado a false de analisis por id
// ============================
app.delete(
  "/bromatologia/:id",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "bromatologia", value: 3}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let analisisDB = null;
      analisisDB = await Bromatologia.findOneAndUpdate(
        {_id: req.params.id},
        {
          estado: false,
        },
        {new: true}
      ).exec();
      if (!analisisDB) {
        return errorMessage(res, {message: "Analisis no encontrado."}, 400);
      }

      return res.json({
        ok: true,
        analisis: analisisDB,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
