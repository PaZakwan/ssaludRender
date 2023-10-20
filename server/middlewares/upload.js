const multer = require("multer");

const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const path = require("path");

const storage = multer.diskStorage({
  // Directorio temporal
  // dest: os.tmpdir()
  // Donde corre el server
  // process.env.MAIN_FOLDER

  //multer disk storage settings
  destination: function (req, archivo, cb) {
    cb(null, path.resolve(process.env.MAIN_FOLDER, "../file_server/uploads"));
  },
  filename: function (req, archivo, cb) {
    let hoy = new Date().toISOString().substring(0, 19).replace(/:/g, "-");
    // let datetimestamp = Date.now();
    cb(null, `${hoy}_${archivo.originalname}`);
  },
});

const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) {
    //file filter
    if (
      ["csv"].indexOf(file.originalname.split(".")[file.originalname.split(".").length - 1]) === -1
    ) {
      req.fileValidationError = 'Extension de archivo Incorrecta. \nSolamente se aceptan "csv"';
      return callback(new Error('Extension de archivo Incorrecta. \nSolamente se aceptan "csv"'));
    }
    callback(null, true);
  },
}).single("file");

// =====================
// Agrega el archivo a req.file y los sube a la carpeta uploads
// =====================
const uploadSingleRoute = (req, res, next) => {
  upload(req, res, function (err) {
    try {
      if (req.fileValidationError) {
        return errorMessage(res, {message: req.fileValidationError}, 400);
      }
      if (err) {
        return errorMessage(res, err, err.code);
      }
      if (!req.file) {
        return errorMessage(res, {message: "Falta información para proceder (Archivo)."}, 412);
      }
      // Archivo ya subido, req.file
      req.file.fecha_Name = req.file.filename.split(".");
      req.file.fecha_Name.pop(); // elimina la extension
      req.file.fecha_Name = req.file.fecha_Name.join(".");
      return next();
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  });
};

module.exports = {
  uploadSingleRoute,
};
