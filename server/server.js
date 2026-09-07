require("./config/config");

// Variable global para la ruta donde corre el server
const path = require("path");
process.env.MAIN_FOLDER = path.resolve(__dirname);
const {clgEvento, clgFalla} = require(process.env.MAIN_FOLDER + "/tools/console");

// MONGO CONEXIONES DB
const db_connection = require("./db_connection");

// Tareas Cronologicas.
const schedule_task = require("./schedule_task");

// WebServer + API Routes
const gracefulShutdown = require("http-graceful-shutdown");
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

// Rutas de la API
const routes_API = require("./rutas_api_index");

const createAsyncServer = ({serverInstance, port}) => {
  return new Promise((resolve, reject) => {
    const server = serverInstance.listen?.(port) ?? serverInstance;

    server.on("listening", () => resolve(server));
    server.on("error", (err) => reject(err));
  });
};

// FUNCION PARA INICIAR SERVIDOR WEB (folder public) Y SERVICIOS DE RUTAS API
const webApiServerRun = async () => {
  try {
    const activeServers = {mainServer: null, redirectServer: null};

    //Revisando si esta en Heroku (onRender) Free Host
    if (process.env.HEROKU) {
      // Hosting Server
      const hostingServer = await createAsyncServer({serverInstance: app, port: process.env.PORT});

      mensajeBackend(process.env.BASE_URL, process.env.PORT);
      activeServers.mainServer = hostingServer;
    } else {
      // HTTP Server
      let server80Instance;
      let logCallback;

      if (process.env.NODE_ENV === "dev") {
        // Servidor para desarrollo local del FrontEnd
        server80Instance = app;
        logCallback = () => mensajeBackend(process.env.BASE_URL, 80);
      } else {
        // Redirect from http to https
        server80Instance = http.createServer((req, res) => {
          res.writeHead(301, {Location: `https://${req.headers["host"]}${req.url}`});
          res.end();
          // res.redirect(301, `https://${req.headers['host']}${req.url}`);
        });
        logCallback = () =>
          clgEvento({
            name: "✅ Server",
            evento: `Funcionando en ${process.env.BASE_URL}:80. Redirecciona al HTTPS`,
          });
      }

      // HTTPS Server
      const httpsServerInstance = https.createServer(
        {
          key: fs.readFileSync(process.env.KEY),
          cert: fs.readFileSync(process.env.CERT),
          dhparam: fs.readFileSync(process.env.DH),
        },
        app
      );

      [activeServers.redirectServer, activeServers.mainServer] = await Promise.all([
        createAsyncServer({serverInstance: server80Instance, port: 80}),
        createAsyncServer({serverInstance: httpsServerInstance, port: process.env.PORT}),
      ]);

      // Ejecutamos los logs ahora que sabemos con certeza que están escuchando
      logCallback();
      mensajeBackend(process.env.BASE_URL, process.env.PORT);
    }
    return activeServers;
  } catch (error) {
    throw new Error(`Server Web Api - CATCH.\nmessage: ${error.message}`, {cause: error});
  }
};

// FUNCION PARA INICIAR SERVIDOR
const startSystem = async () => {
  try {
    clgEvento({
      name: "🖥️  Sistema",
      evento: "Iniciando Sistema..",
    });

    // Conecta a la DB.
    const DB = await db_connection.startConnectionDB({
      maxIntentos: 10,
      tiempoEntreReintentos: 6 * 1000,
    });
    // Carga las Rutas de la API.
    await routes_API.startRutasApi({routerPrincipal: app, path: "/api"});
    // Espera que se creen los modelos en las RUTAS
    clgEvento({
      name: "⚙️  Base de Datos",
      evento: "Modelos Cargados",
    });

    // Sincronizacion por modelo
    const modelos = Object.keys(DB.models);

    // Crea los INDEX de la BD.
    clgEvento({
      name: "⚙️  Base de Datos",
      evento: "Sincronizando Indices..",
    });
    for (const nombreModelo of modelos) {
      try {
        await DB.model(nombreModelo).syncIndexes();
      } catch (err) {
        throw new Error(
          `Base de Datos - Indices en Modelo: ${nombreModelo}.\nmessage: ${err.message}`,
          {cause: err}
        );
      }
    }

    // Espera que se Terminen de crear los index de la DB
    clgEvento({
      name: "💾 Base de Datos",
      evento: "Finalizada la Sincronizacion",
    });

    // Carga las Tareas Cronologicas.
    const scheduleState = await schedule_task.scheduleRun();
    // Levanta el Servidor.
    const webApiServer = await webApiServerRun();

    // Apagado Seguro
    const opcionesShutdown = {
      timeout: 30000, // Tiempo para responder peticiones activas (30 segundos)
      signals: "SIGINT SIGTERM SIGQUIT",
      forceExit: true,

      preShutdown: async (signal) => {
        clgEvento({
          name: "🖥️  Sistema",
          evento: `Iniciando apagado... (${signal})`,
        });
        if (scheduleState) {
          clgEvento({name: "⚠️  Tareas Cronologicas", evento: "Deteniendo Tareas Programadas.."});
          await schedule_task.scheduleClose();
          clgEvento({name: "🛑 Tareas Cronologicas", evento: "Tareas Programadas Detenidas"});
        }
        if (webApiServer.redirectServer) {
          clgEvento({name: "⚠️  Server", evento: "Cerrando Redireccionador.."});
          await new Promise((resolve) => {
            webApiServer.redirectServer.close(() => {
              clgEvento({name: "🛑 Server", evento: "Redireccionador Cerrado"});
              resolve();
            });
          });
        }
        clgEvento({
          name: "⚠️  Server",
          evento: "Cerrando Express..",
        });
      },

      onShutdown: async () => {
        clgEvento({
          name: "🛑 Server",
          evento: "Express Cerrado",
        });
        if (DB) {
          clgEvento({name: "⚠️  Base de Datos", evento: "Cerrando Mongoose.."});
          const conexionUpload = DB.upload;
          const cierreDBs = [DB.disconnect()];
          if (conexionUpload) {
            cierreDBs.push(conexionUpload.close());
          }

          await Promise.all(cierreDBs);
          clgEvento({name: "🛑 Base de Datos", evento: "Mongoose Cerrado"});
        }
      },

      finally: () => clgEvento({name: "☠️  Sistema", evento: "Apagado Completo"}),
    };

    const _testShutdown = gracefulShutdown(webApiServer.mainServer, opcionesShutdown);

    clgEvento({
      name: "🖥️  Sistema",
      evento: "Funcionando",
    });

    // Para testear el apagado, porque nodemon no espera...
    // await _testShutdown();
  } catch (error) {
    clgFalla({
      name: "startSystem CATCH",
      falla: error,
    });
    if (process.env.NODE_ENV !== "dev") {
      // eslint-disable-next-line n/no-process-exit
      process.exit(1);
    }
  }
};

startSystem();

// funciones de msjs
const mensajeBackend = function (BASE_URL, PORT) {
  clgEvento({
    name: "✅ Server",
    evento: `Funcionando en ${BASE_URL}:${PORT}`,
  });
};

// +objectSetUnset        $set = {} $unset          como rutasInsumos VER reconstruir como isVacio()
// +populate optional                               como en rutasPatrimonio
