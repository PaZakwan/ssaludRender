require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const history = require("connect-history-api-fallback");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

const http = require("http");
// Configuracion para HTTPS
const https = require("https");
const fs = require("fs");

// ============================
// CORS configuración para permitir acceso.
// ============================
app.use(cors(JSON.parse(process.env.CORS)));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

// parse application/json
app.use(express.json());

// Logs de request al servidor para Desarrollo
if (process.env.NODE_ENV === "dev") {
  const morgan = require("morgan");
  morgan.token(`status`, (req, res) => {
    const status = (typeof res.headersSent !== `boolean` ? Boolean(res._header) : res.headersSent)
      ? res.statusCode
      : "x-x";
    // get status color
    const color =
      status >= 500 ? 31 : status >= 400 ? 33 : status >= 300 ? 36 : status >= 200 ? 32 : 0;
    return `\x1b[${color}m${status}\x1b[0m`;
  });
  app.use(
    morgan(":status :method :response-time ms - :res[content-length] B :url", {
      // Solo Loguea las consultas al CRUD[Create, Read, Update and Delete][ABML] API (no los gets de los recursos web)
      skip: function (req, res) {
        try {
          return !req.originalUrl.includes("/api/");
        } catch (error) {
          return false;
        }
      },
    })
  );
}

// Configuración para el re-direccionamiento de Vue
app.use(
  history({
    verbose: false,
    disableDotRule: false,
  })
);

// Seguridad para los headers de HTTP
app.use(
  helmet({
    contentSecurityPolicy: false,
    // contentSecurityPolicy: {
    //     directives: {
    //       ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    //         // NO VALE LA PENA ESTAR HASHEANDO CADA VEZ QUE SE REALIZA UNA SOLICITUD WEB...
    //         // A FUTURO CND TNG NOMBRE DE DOMINIO.. AGREGAR EL NOMBRE DEL SITIO Y QUITAR "'unsafe-inline'"
    //         // 'unsafe-eval' para que funcione PDFMAKE... :/
    //       "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    //     },
    //     // reportOnly: true,
    // },
  })
);

// Habilita la carpeta public
app.use(express.static(path.resolve(__dirname, "../public")));

// Configuración global de rutas de la API
// const rutas = require('./routes/index');
const rutas = require("./rutas_index");
app.use("/api", rutas);

// Si no encuentra la ruta responde con lo siguiente 404
app.use(function (req, res, next) {
  res.status(404).send({
    ok: false,
    err: {
      message: "Ruta Inexistente",
      data: `${req.protocol}-${req.method}: ${req.originalUrl}`,
      // Para que funcione mongoose-unique-validator en el front
      errors: "",
    },
  });
});

// Si ocurre algun error en la app 500
app.use(function (error, req, res, next) {
  res.status(500).send({
    ok: false,
    err: {
      message: "Error Interno en el Servidor",
      data: `${error.name}: ${error.message}`,
      // Para que funcione mongoose-unique-validator en el front
      errors: "",
    },
  });
  console.error(error.stack);
});

// Variable global para la ruta donde corre el server
process.env.MAIN_FOLDER = path.resolve(__dirname);

//Revisando si esta en Heroku
if (process.env.HEROKU) {
  // Heroku Server
  app.listen(process.env.PORT, () => {
    let ahora = new Date();
    console.log(
      `${ahora.getFullYear()}/${(ahora.getMonth() + 1).toString().padStart(2, 0)}/${ahora
        .getDate()
        .toString()
        .padStart(2, 0)} - ${ahora.getHours().toString().padStart(2, 0)}:${ahora
        .getMinutes()
        .toString()
        .padStart(2, 0)}` +
        ` <=> Ejecutando Backend en: ${process.env.BASE_URL}:${process.env.PORT}`
    );
  });
} else {
  // Levantando servidor HTTP
  if (process.env.NODE_ENV === "dev") {
    // Servidor para desarrollo local del FrontEnd
    app.listen(80, () => {
      let ahora = new Date();
      console.log(
        `${ahora.getFullYear()}/${(ahora.getMonth() + 1).toString().padStart(2, 0)}/${ahora
          .getDate()
          .toString()
          .padStart(2, 0)} - ${ahora.getHours().toString().padStart(2, 0)}:${ahora
          .getMinutes()
          .toString()
          .padStart(2, 0)}` + ` <=> Ejecutando Backend en: ${process.env.BASE_URL}:80`
      );
    });
  } else {
    // Redirect from http port 80 to https 443
    http
      .createServer(function (req, res) {
        res.writeHead(301, {Location: `https://${req.headers["host"]}${req.url}`});
        res.end();
        // res.redirect(301, `https://${req.headers['host']}${req.url}`);
      })
      .listen(80, () => {
        console.log(
          `===== Servidor funcionando en: ${process.env.BASE_URL}:80 redirecciona al HTTPS 443 =====`
        );
      });
  }

  // Levantando servidor HTTPS
  https
    .createServer(
      {
        key: fs.readFileSync(process.env.KEY),
        cert: fs.readFileSync(process.env.CERT),
        dhparam: fs.readFileSync(process.env.DH),
      },
      app
    )
    .listen(process.env.PORT, () => {
      let ahora = new Date();
      console.log(
        `${ahora.getFullYear()}/${(ahora.getMonth() + 1).toString().padStart(2, 0)}/${ahora
          .getDate()
          .toString()
          .padStart(2, 0)} - ${ahora.getHours().toString().padStart(2, 0)}:${ahora
          .getMinutes()
          .toString()
          .padStart(2, 0)}` +
          ` <=> Ejecutando Backend en: ${process.env.BASE_URL}:${process.env.PORT}`
      );
    });
}

// MONGO CONEXIONES BD

mongoose.set("strictQuery", false);

// Configuraciones (DEFAULT)
mongoose.connection.on("error", (e) => {
  // console.error("reason", e.reason);
  // console.error(`onError, ${e.name}: ${e.message}.`);
  console.error(`~~~~~ RE-Intentando primer conexion... (Default) ~~~~~`);
  console.log("mongoose.connections *error Def*", mongoose.connections.length);
  // intenta reconectar pasados los 20 seg de un error
  setTimeout(() => {
    mongoose.connect(process.env.URLDB, JSON.parse(process.env.DBoptions)).catch((err) => {});
  }, 20 * 1000);
});

mongoose.connection.on("connected", () => {
  let ahora = new Date();
  console.log(`===== Servidor funcionando en: ${process.env.BASE_URL}:${process.env.PORT} =====`);
  console.log(
    `===== ${ahora.getFullYear()}/${(ahora.getMonth() + 1).toString().padStart(2, 0)}/${ahora
      .getDate()
      .toString()
      .padStart(2, 0)} - ${ahora.getHours().toString().padStart(2, 0)}:${ahora
      .getMinutes()
      .toString()
      .padStart(2, 0)}` + ` <=> Base de Datos ONLINE (Default) =====`
  );
  // console.log("mongoose.connections *conn Def*", mongoose.connections.length);
});

mongoose.connection.on("disconnected", () => {
  let ahora = new Date();
  console.error(
    `XXXXX ${ahora.getFullYear()}/${(ahora.getMonth() + 1).toString().padStart(2, 0)}/${ahora
      .getDate()
      .toString()
      .padStart(2, 0)} - ${ahora.getHours().toString().padStart(2, 0)}:${ahora
      .getMinutes()
      .toString()
      .padStart(2, 0)}` + ` <=> Base de Datos OFFLINE (Default) XXXXX`
  );
  console.error("XXXXX Esperando Re-conectar... XXXXX");
  console.log("mongoose.connections *disco Def*", mongoose.connections.length);
});

// FUNCION PARA CREAR OTRAS CONEXIONES A LA BD MONGO
function crearNuevaConexion(dbURL, options, baseName) {
  try {
    let db = mongoose.createConnection(dbURL, options);
    db.on("error", function (err) {
      // Primer conexion falla
      // console.error(`onError (${baseName}), ${err.name}: ${err.message}.`);
      // console.error(`~~~~~ RE-Intentando primer conexion... IMPORTANTE (${baseName}) ~~~~~`);
      console.error(`~~~~~ NO RE-Intenta primer conexion... IMPORTANTE (${baseName}) ~~~~~`);
      // DESARROLLAR RE CONEXION...
      // usar otro mongoose para crear array de conexiones infinitas
      // y cnd este lista mandarla conexion al array del default ¿?¿?¿?
      // console.log("this: ", this);
      // db.close();
      // setTimeout(function () {
      //   db.open(dbURL).catch((err) => {});
      //   // catch to avoid unhandled rejections.
      // }, 20 * 1000);
      // console.log("despues de aca tira alto error!!");
    });
    db.on("connected", () => {
      let ahora = new Date();
      console.log(
        `===== ${ahora.getFullYear()}/${(ahora.getMonth() + 1).toString().padStart(2, 0)}/${ahora
          .getDate()
          .toString()
          .padStart(2, 0)} - ${ahora.getHours().toString().padStart(2, 0)}:${ahora
          .getMinutes()
          .toString()
          .padStart(2, 0)}` + ` <=> Base de Datos ONLINE (${baseName}) =====`
      );
    });
    db.on("disconnected", () => {
      let ahora = new Date();
      console.error(
        `XXXXX ${ahora.getFullYear()}/${(ahora.getMonth() + 1).toString().padStart(2, 0)}/${ahora
          .getDate()
          .toString()
          .padStart(2, 0)} - ${ahora.getHours().toString().padStart(2, 0)}:${ahora
          .getMinutes()
          .toString()
          .padStart(2, 0)}` + ` <=> Base de Datos OFFLINE (${baseName}) XXXXX`
      );
    });

    return db;
  } catch (error) {
    console.error("crearNuevaConexion: ", error.message);
  }
}

// carga las tareas ejecutadas cronologicamente.
const schedule = require("./schedule_task");

// Conectando la BD
(async () => {
  try {
    schedule.saveFarmaciaEstadistica();
    //  gracefully shutdown jobs when a system interrupt occurs.
    process.on("SIGINT", async () => {
      await schedule.gracefulShutdown();
      process.exit(0);
    });
    process.on("SIGTERM", async () => {
      await schedule.gracefulShutdown();
      process.exit(0);
    });
    process.on("SIGQUIT", async () => {
      await schedule.gracefulShutdown();
      process.exit(0);
    });
    // console.log("mongoose.connections *Ini*", mongoose.connections.length);
    mongoose.connect(process.env.URLDB, JSON.parse(process.env.DBoptions)).catch((err) => {});
    crearNuevaConexion(
      process.env.URLDB,
      {...JSON.parse(process.env.DBoptions), ...{maxPoolSize: 1}},
      "UploadBatch"
    );
    // console.log("mongoose.connections *fin*", mongoose.connections.length);
  } catch (err) {
    console.error("conectarBDs: ", err.message);
  }
})();
