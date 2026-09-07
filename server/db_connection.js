const mongoose = require("mongoose");
const {clgEvento, clgFalla} = require(process.env.MAIN_FOLDER + "/tools/console");

if (process.env.NODE_ENV === "dev") {
  mongoose.set("debug", true);
}
mongoose.set("allowDiskUse", true);

mongoose.set("toJSON", {virtuals: true, getters: true, versionKey: false});
mongoose.set("toObject", {virtuals: true, getters: true, versionKey: false});

// Plugin global
mongoose.plugin((schema) => {
  schema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
    // 'this' se refiere al objeto Query
    this.setOptions({
      new: true,
      runValidators: true,
      context: "query",
    });
    next();
  });
});

// config default connection
mongoose.connection
  .on("error", async function (err) {
    if (err.name !== "MongoServerSelectionError") {
      clgFalla({
        name: "mongoose.connect (Default)",
        falla: `${err.name}: ${err.message}`,
        type: "otros",
      });
    }
  })
  .on("connected", function () {
    mensajeONLINE("Default");
  })
  .on("disconnected", () => {
    mensajeOFFLINE("Default");
  });

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// FUNCION PARA INICIAR CONEXION A LA BD MONGO
const startConnectionDB = async (
  {maxIntentos = 10, tiempoEntreReintentos = 6 * 1000} = {
    maxIntentos: 10,
    tiempoEntreReintentos: 6 * 1000,
  }
) => {
  let intentos = 0;

  while (true) {
    let conexionUploadTemporal = null;

    try {
      intentos++;
      clgEvento({
        name: `${intentos > 1 ? "⚠️  " : "⚙️  "}Base de Datos`,
        evento: `${intentos > 1 ? `Reintentando Conectar... (Intento ${intentos})` : "Conectando.."}`,
      });

      await mongoose.connect(process.env.URLDB, JSON.parse(process.env.DBoptions));

      conexionUploadTemporal = await crearNuevaConexion({
        dbURL: process.env.URLDB,
        options: {
          ...JSON.parse(process.env.DBoptions),
          maxPoolSize: 1,
        },
        baseName: "Upload",
      });

      mongoose.upload = conexionUploadTemporal;

      return mongoose;
    } catch (error) {
      clgFalla({
        name: `Base de Datos - Error (Intento ${intentos})`,
        falla: `${error.name}: ${error.message}`,
        type: "otros",
      });

      if (conexionUploadTemporal) {
        // Evita fugas de memoria al crear nuevas conexiones de upload en cada iteracion
        // (caso de que un micro corte se produzca justo entre la conexion default y la upload)
        await conexionUploadTemporal.destroy().catch(() => {});
      }

      if (intentos >= maxIntentos) {
        throw new Error(
          `Base de Datos - No Conectada (Supero Limite de Reintentos).\nmessage: ${error.message}`,
          {cause: error}
        );
      }

      await esperar(tiempoEntreReintentos);
    }
  }
};

// FUNCION PARA CREAR OTRAS CONEXIONES A LA BD MONGO
const crearNuevaConexion = async function ({dbURL, options, baseName}) {
  const connection = mongoose.createConnection(dbURL, options);

  connection
    .on("error", async function (err) {
      if (err.name !== "MongoServerSelectionError") {
        clgFalla({
          name: `mongoose.connect (${baseName})`,
          falla: `${err.name}: ${err.message}`,
          type: "otros",
        });
      }
    })
    .on("connected", function () {
      mensajeONLINE(`${baseName}`);
    })
    .on("disconnected", () => {
      mensajeOFFLINE(`${baseName}`);
    });

  return await connection.asPromise();
};

// funciones de msjs
const mensajeONLINE = (db) => {
  clgEvento({name: "🟩 Base de Datos", evento: `${db} ONLINE`});
};
const mensajeOFFLINE = (db) => {
  clgFalla({name: "Base de Datos", falla: `${db} OFFLINE, Esperando Reconectar`, type: "otros"});
};

// exports
exports.startConnectionDB = startConnectionDB;
