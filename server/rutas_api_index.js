const express = require("express");

const {clgFalla} = require(process.env.MAIN_FOLDER + "/tools/console");

// Funcion para buscar archivos en la carpeta y subcarpetas.
const {promisify} = require("util");
const {resolve} = require("path");
const fs = require("fs");
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const getRutas = async function (dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getRutas(res) : res;
    })
  );
  return files.reduce((a, f) => a.concat(f), []);
};

// console.log(__dirname);
const loadRutasModulos = async function ({routerPrincipal, path}) {
  try {
    const files = await getRutas(resolve(__dirname, "./modulos"));

    for (const ruta of files) {
      if (ruta.includes("rutas")) {
        try {
          const moduloRuta = require(ruta);
          routerPrincipal.use(path, moduloRuta.app ?? moduloRuta);
        } catch (error) {
          clgFalla({
            name: "loadRutasModulos ERROR",
            falla: `Error de ruta en: ${ruta}`,
            type: "otros",
          });
          throw error;
        }
      }
    }

    return true;
  } catch (err) {
    clgFalla({
      name: "loadRutasModulos CATCH",
      falla: err,
      type: "otros",
    });
    throw err;
  }
};

// FUNCION PARA CARGAR LAS RUTAS DE LA API (Y LOS MODELOS DE MONGOOSE)
const startRutasApi = async ({routerPrincipal, path}) => {
  try {
    // Habilita GETs de la carpeta public
    routerPrincipal.use(express.static(resolve(__dirname, "../public")));
    // routerPrincipal.use(express.static(resolve(__dirname, "../publicOld")));

    // Configuración global de rutas de la API
    await loadRutasModulos({routerPrincipal, path});

    // Changelog de la API
    routerPrincipal.get(`${path}/system/changelog`, async (req, res) => {
      let changelog = await fs.promises.readFile(resolve(__dirname, "../CHANGELOG.md"), "utf8");
      return res.status(200).json({
        ok: true,
        changelog,
      });
    });
    // ToDo de la API
    routerPrincipal.get(`${path}/system/ToDoList`, async (req, res) => {
      let ToDoList = await fs.promises.readFile(resolve(__dirname, "../ToDo.md"), "utf8");
      return res.status(200).json({
        ok: true,
        ToDoList,
      });
    });

    // Si no encuentra la ruta responde con lo siguiente 404
    routerPrincipal.use((req, res, next) => {
      return res.status(404).json({
        ok: false,
        err: {
          message: "Ruta Inexistente",
          data: `${req.protocol}-${req.method}: ${req.originalUrl}`,
        },
      });
    });

    // Si ocurre algun error en la app (routerPrincipal) 500
    routerPrincipal.use((err, req, res, next) => {
      clgFalla({
        name: "RutasApi",
        falla: err,
      });
      return res.status(500).json({
        ok: false,
        err: {
          message: "Error Interno en el Servidor",
          data: `${err.name}: ${err.message}`,
        },
      });
    });
  } catch (error) {
    clgFalla({
      name: "startRutasApi CATCH",
      falla: error,
      type: "otros",
    });
    throw error;
  }
};

exports.startRutasApi = startRutasApi;
