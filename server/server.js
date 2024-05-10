require("./config/config");

// Variable global para la ruta donde corre el server
const path = require("path");
process.env.MAIN_FOLDER = path.resolve(__dirname);

// MONGO CONEXIONES DB
const db_connection = require("./db_connection");

// Tareas Cronologicas.
const schedule_task = require("./schedule_task");

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

// FUNCION PARA CARGAR LAS RUTAS DE LA API (MODELOS DE MONGOOSE)
const loadRutasApi = () => {
  try {
    // Habilita GETs de la carpeta public
    app.use(express.static(path.resolve(__dirname, "../public")));

    // Configuración global de rutas de la API
    app.use("/api", require("./rutas_api_index"));

    // Si no encuentra la ruta responde con lo siguiente 404
    app.use((req, res, next) => {
      return res.status(404).send({
        ok: false,
        err: {
          message: "Ruta Inexistente",
          data: `${req.protocol}-${req.method}: ${req.originalUrl}`,
        },
      });
    });

    // Si ocurre algun error en la app 500
    // app.get("/", (req, res) => {
    //   let err = new Error("Testing - not found");
    //   err.status = 404;
    //   return next(err);
    // });
    app.use((err, req, res, next) => {
      console.error(err.stack);
      return res.status(500).send({
        ok: false,
        err: {
          message: "Error Interno en el Servidor",
          data: `${err.name}: ${err.message}`,
        },
      });
    });
  } catch (error) {
    console.error(`loadRutasApi CATCH => ${error.name}: ${error.message}.`);
  }
};

// FUNCION PARA INICIAR SERVIDOR WEB (folder public) Y SERVICIOS DE RUTAS API
const webApiServerRun = async () => {
  try {
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
    return true;
  } catch (error) {
    console.error(`webApiServerRun CATCH => ${error.name}: ${error.message}.`);
    return false;
  }
};

// FUNCION PARA INICIAR SERVIDOR
const startServer = async () => {
  try {
    // Conecta a la DB.
    let DB = await db_connection.startConnectionDB();
    // Carga las Rutas de la API.
    loadRutasApi();
    // Espera que se creen los modelos en las RUTAS
    console.log(`===== ${timeNow()} <=> Creando Modelos de la BD =====`);
    if (process.env.NODE_ENV === "dev") {
      await new Promise((resolve) => setTimeout(resolve, 1 * 1000));
    } else {
      await new Promise((resolve) => setTimeout(resolve, 2 * 1000));
    }
    // Crea los INDEX de la BD.
    console.log(`===== ${timeNow()} <=> Creando Indices de la BD =====`);
    let index = await DB.syncIndexes({continueOnError: true});
    // {key : value} => {Modelo : Error}
    // console.log("index", index);
    // Espera que se Terminen de crear los index de la DB
    console.log(`===== ${timeNow()} <=> Terminando de Crear los Indices de la BD =====`);
    if (process.env.NODE_ENV === "dev") {
      await new Promise((resolve) => setTimeout(resolve, 1 * 1000));
    } else {
      await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
    }
    // Carga las Tareas Cronologicas.
    schedule_task.scheduleRun();
    // Levanta el Servidor.
    await webApiServerRun();
  } catch (error) {
    console.error(`startServer CATCH => ${error.name}: ${error.message}.`);
  }
};

startServer();

// funciones de msjs
const mensajeBackend = function (BASE_URL, PORT) {
  console.log(`${timeNow()} <=> Ejecutando Backend en: ${BASE_URL}:${PORT}`);
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
