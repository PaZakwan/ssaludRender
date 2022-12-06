// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 443;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || "2h";
// process.env.CADUCIDAD_TOKEN = 10000;

// ============================
//  Certificados SSL/TLS
// ============================
const path = require("path");

process.env.KEY = path.join(__dirname, "cert/ssalud.key.pem");
process.env.CERT = path.join(__dirname, "cert/ssalud.crt.pem");
process.env.DH = path.join(__dirname, "cert/dhparam.pem");

// ============================
//  IP LOCAL O SERVIDOR
// ============================

if (process.env.NODE_ENV === "dev") {
  const ip = require("ip");
  process.env.BASE_URL = ip.address().toString();
} else {
  process.env.BASE_URL = process.env.BASE_URL;
}

// ============================
//  Configuracion de CORS
// ============================
process.env.CORS = JSON.stringify({
  // origin: "*",
  origin: [
    `http://${process.env.BASE_URL}`,
    `http://${process.env.BASE_URL}:${process.env.PORT}`,
    `http://${process.env.BASE_URL}:80`,
    "http://localhost",
    `http://localhost:${process.env.PORT}`,
    "http://localhost:80",
    "http://localhost:8080", //VUE develop
    `http://${process.env.BASE_URL}:8080`, //VUE develop
    "http://ssalud.herokuapp.com",
    "http://www.ssaludmoreno.com",
    "http://www.secretariadesaludmoreno.com",
    "http://192.168.185.9",
    "http://192.168.104.6",
    `https://${process.env.BASE_URL}`,
    `https://${process.env.BASE_URL}:${process.env.PORT}`,
    `https://${process.env.BASE_URL}:443`,
    "https://localhost",
    `https://localhost:${process.env.PORT}`,
    "https://localhost:443",
    "https://localhost:8080", //VUE develop
    `https://${process.env.BASE_URL}:8080`, //VUE develop
    "https://ssalud.herokuapp.com",
    "https://www.ssaludmoreno.com",
    "https://www.secretariadesaludmoreno.com",
    "https://192.168.185.9",
    "https://192.168.104.6",
  ], //servidor que deseas que consuma(FrontEnd) o (*) en caso que sea acceso libre
  credentials: true,
  methods: ["OPTIONS", "GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization", "token"],
  optionsSuccessStatus: 200,
});

// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || "seed-desarrollo";

// ============================
//  Base de datos
// ============================
process.env.URLDB = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test";
if (process.env.NODE_ENV === "dev") {
  // serverSelectionTimeoutMS: Tiempo en retornar error de reconexion.
  // bufferCommands: Tiempo de espera en la ejecucion de las query de mongo, no espera antes de retornar un error.
  process.env.DBoptions = JSON.stringify({
    serverSelectionTimeoutMS: 8 * 1000,
    bufferCommands: false,
  });
} else {
  process.env.DBoptions = JSON.stringify({
    serverSelectionTimeoutMS: 8 * 1000,
    bufferCommands: false,
    autoIndex: true,
  });
  // autoIndex, ... VER EL TEMA DE CRAFTEO DE INDEXS....
  // https://es.stackoverflow.com/questions/327253/autoindex-en-false-o-true-mongoose
}
