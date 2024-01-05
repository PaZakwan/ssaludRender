require("./config/config");

// Variable global para la ruta donde corre el server
const path = require("path");
process.env.MAIN_FOLDER = path.resolve(__dirname);

// MONGO CONEXIONES DB
require("./db_connection");

// Tareas Cronologicas.
const schedule_task = require("./schedule_task");
schedule_task.scheduleRun().catch((error) => console.error("schedule_task.scheduleRun", error));

// WebServer + API Routes
const express = require("express");
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
const rutas = require("./rutas_index");
app.use("/api", rutas);

// Si no encuentra la ruta responde con lo siguiente 404
app.use(function (req, res, next) {
  res.status(404).send({
    ok: false,
    err: {
      message: "Ruta Inexistente",
      data: `${req.protocol}-${req.method}: ${req.originalUrl}`,
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
    },
  });
  console.error(error.stack);
});

//Revisando si esta en Heroku
if (process.env.HEROKU) {
  // Heroku Server
  app.listen(process.env.PORT, () => {
    mensajeBackend(process.env.BASE_URL, process.env.PORT);
  });
} else {
  // Levantando servidor HTTP
  if (process.env.NODE_ENV === "dev") {
    // Servidor para desarrollo local del FrontEnd
    app.listen(80, () => {
      mensajeBackend(process.env.BASE_URL, 80);
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
      mensajeBackend(process.env.BASE_URL, process.env.PORT);
    });
}

// funciones de msjs
const mensajeBackend = function (BASE_URL, PORT) {
  console.error(`${timeNow()} <=> Ejecutando Backend en: ${BASE_URL}:${PORT}`);
};
const timeNow = function () {
  let ahora = new Date();
  return `${ahora.getFullYear()}/${(ahora.getMonth() + 1).toString().padStart(2, 0)}/${ahora
    .getDate()
    .toString()
    .padStart(2, 0)} - ${ahora.getHours().toString().padStart(2, 0)}:${ahora
    .getMinutes()
    .toString()
    .padStart(2, 0)}`;
};

// +objectSetUnset        $set = {} $unset          como rutasInsumos VER reconstruir como isVacio()
// +populate optional                               como en rutasPatrimonio
