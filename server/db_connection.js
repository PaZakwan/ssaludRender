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
    // console.error(`mongoose.connect ERROR (Default), ${err.name}: ${err.message}.`);
    clgFalla({
      name: "mongoose.connect (Default)",
      falla: `${err.name}: ${err.message}`,
      type: "otros",
    });
    // let defaultConnection = this;
    // intenta reconectar pasados los 20 seg de un error
    setTimeout(async function () {
      try {
        // console.log("****** mongoose Default models", defaultConnection.models);
        await mongoose.connect(process.env.URLDB, JSON.parse(process.env.DBoptions));
      } catch (error) {
        // console.error(`mongoose.connect ERROR (Default), ${error.name}: ${error.message}.`);
      }
      // }, 20 * 1000);
    }, 5 * 1000);
  })
  .on("connected", function () {
    mensajeONLINE("Default");
  })
  .on("disconnected", () => {
    mensajeOFFLINE("Default");
  });

// FUNCION PARA INICIAR CONEXION A LA BD MONGO
const startConnectionDB = async () => {
  try {
    // BASE
    mongoose.connect(process.env.URLDB, JSON.parse(process.env.DBoptions)).catch((err) => {
      clgFalla({
        name: "startConnectionDB Base",
        falla: err,
      });
    });

    // UPLOAD
    mongoose.upload = await crearNuevaConexion(
      process.env.URLDB,
      {
        ...JSON.parse(process.env.DBoptions),
        ...{maxPoolSize: 1},
      },
      "Upload"
    );
    return mongoose;
  } catch (error) {
    clgFalla({
      name: "startConnectionDB",
      falla: error,
    });
    return false;
  }
};

// FUNCION PARA CREAR OTRAS CONEXIONES A LA BD MONGO
const crearNuevaConexion = async function (dbURL, options, baseName) {
  return await mongoose
    .createConnection(dbURL, options)
    .on("error", async function (err) {
      // console.error(`createConnection ERROR (${baseName}), ${err.name}: ${err.message}.`);
      clgFalla({
        name: `mongoose.connect (${baseName})`,
        falla: `${err.name}: ${err.message}`,
        type: "otros",
      });
      let mongooseConnection = this;
      // intenta reconectar pasados los 20 seg de un error
      setTimeout(async function () {
        try {
          // buscar e intentar reconectar con THIS
          // console.log(`****** mongoose.${baseName} models`, mongooseConnection.models);
          await mongooseConnection.openUri(dbURL, options);
        } catch (error) {
          // console.error(`createConnection ERROR (${baseName}), ${error.name}: ${error.message}.`);
        }
        // }, 20 * 1000);
      }, 5 * 1000);
    })
    .on("connected", function () {
      mensajeONLINE(`${baseName}`);
    })
    .on("disconnected", () => {
      mensajeOFFLINE(`${baseName}`);
    })
    .asPromise()
    .catch((err) => {
      // console.error(`createConnection CATCH (${baseName}), ${err.name}: ${err.message}.`);
      clgFalla({
        name: "crearNuevaConexion",
        falla: err,
      });
    });
};

// funciones de msjs
const mensajeONLINE = (db) => {
  clgEvento({name: "Base de Datos", evento: `${db} ONLINE`});
  // console.log(`mongoose.connections *ONLINE ${db}*`, mongoose.connections.length);
};
const mensajeOFFLINE = (db) => {
  clgFalla({name: "Base de Datos", falla: `${db} OFFLINE, Esperando Re-conectar`, type: "otros"});
  // console.log(`mongoose.connections *OFFLINE ${db}*`, mongoose.connections.length);
};

// exports
exports.startConnectionDB = startConnectionDB;
