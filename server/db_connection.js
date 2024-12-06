const mongoose = require("mongoose");
const {clgEvento, clgFalla} = require(process.env.MAIN_FOLDER + "/tools/console");

if (process.env.NODE_ENV === "dev") {
  mongoose.set("debug", true);
}
mongoose.set("allowDiskUse", true);

// config default connection
mongoose.connection
  .on("error", function (err) {
    // console.error(`mongoose.connect ERROR (Default), ${err.name}: ${err.message}.`);
    // let defaultConnection = this;
    // intenta reconectar pasados los 20 seg de un error
    setTimeout(function () {
      // console.log("****** mongoose Default models", defaultConnection.models);
      mongoose.connect(process.env.URLDB, JSON.parse(process.env.DBoptions)).catch((err) => {});
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
    .on("error", function (err) {
      // console.error(`createConnection ERROR (${baseName}), ${err.name}: ${err.message}.`);
      let mongooseConnection = this;
      // intenta reconectar pasados los 20 seg de un error
      setTimeout(function () {
        // buscar e intentar reconectar con THIS
        // console.log(`****** mongoose.${baseName} models`, mongooseConnection.models);
        mongooseConnection.openUri(dbURL, options).catch(() => {});
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
