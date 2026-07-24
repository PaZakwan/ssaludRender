const express = require("express");

const {clgFalla} = require(process.env.MAIN_FOLDER + "/tools/console");

const app = express();

// Funcion para buscar archivos en la carpeta y subcarpetas.
const {promisify} = require("util");
const {resolve} = require("path");
const fs = require("fs");
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function getRutas(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getRutas(res) : res;
    })
  );
  return files.reduce((a, f) => a.concat(f), []);
}

// console.log(__dirname);
// const path = require('path');
getRutas(resolve(__dirname, "./modulos"))
  .then((files) => {
    files.forEach((ruta) => {
      if (ruta.includes("rutas")) {
        try {
          const moduloRuta = require(ruta);
          app.use(moduloRuta.app ?? moduloRuta);
        } catch (error) {
          // console.error("Error de ruta en: ", ruta);
          clgFalla({
            name: "Ruta CATCH",
            falla: `Error de ruta en: ${ruta}`,
            type: "otros",
          });
          if (process.env.NODE_ENV === "dev") {
            clgFalla({
              name: "getRutas ERROR",
              falla: error,
              // type: "otros",
            });
          }
        }
      }
    });
    return {getRutas: true};
  })
  .catch((err) =>
    clgFalla({
      name: "getRutas CATCH",
      falla: err,
      type: "otros",
    })
  );

module.exports = app;
