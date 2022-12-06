const express = require('express');

const app = express();

// Funcion para buscar archivos en la carpeta y subcarpetas.
const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function getRutas(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getRutas(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
};

// console.log(__dirname);
// const path = require('path');
getRutas(resolve(__dirname, './modulos'))
  .then(files => {
    files.forEach(ruta => {
      if (ruta.includes('rutas')) {
        try {
          app.use(require(ruta));
        } catch (error) {
          console.error("Error de ruta en: ", ruta);
          if (process.env.NODE_ENV === 'dev') {
            console.error("ERROR: ", error);
          };
        };
      };
    });
  })
  .catch(e => console.error(e));


module.exports = app;