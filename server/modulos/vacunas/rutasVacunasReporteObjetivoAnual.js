const express = require("express");

const {verificaToken, verificaArrayPropValue} = require(
  process.env.MAIN_FOLDER + "/middlewares/autenticacion"
);

const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler");
const {isObjectIdValid, dateUTC, getEdadUnidades, valorInRangoArray} = require(
  process.env.MAIN_FOLDER + "/tools/object"
);
const {mesShortNames, redondearA2Decimales} = require(process.env.MAIN_FOLDER + "/tools/string");

const VacunaInsumo = require("./models/vacuna_insumo");
const VacunaAplicacion = require("./models/vacuna_aplicacion");

const app = express();

// bucle de 12 [mesShortNames] para las prop aplicaciones, acumulativo y porcentaje
const createMesColumns = ({obj = {}}) => {
  mesShortNames.forEach((mes) => {
    ["Aplicaciones", "Acumulativo", "Porcentaje"].forEach((post) => {
      obj[`${mes} - ${post}`] = 0;
    });
  });
};

// ============================
// Mostrar Aplicaciones y Porcentaje acumulativo Mensual del año por Vacuna con su Grupo Etario respecto a la Poblacion Objetivo Anual.
//  Filtro: OPCIONALES(areas-insumos) -> tomar fecha actual para filtrar desde inicio del año hasta el final del mismo
//                      (si fecha actual es enero, tomar año pasado)
//  Out:    Vacuna <-> Grupo Etario <-> Objetivo Anual <-> [Enero-Diciembre]-Aplicaciones <-> [Enero-Diciembre]-Objetivo(Acumulativo) <-> Total-Aplicaciones
// ============================
app.get(
  "/vacunas/reporte/objetivo-anual",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = [{prop: "vacunas.reportes", value: 1}];
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      let filtro = {fecha: {$gte: null, $lte: null}};

      const hoy = new Date();
      let fullYear = hoy.getUTCFullYear();
      if (hoy.getUTCMonth() === 0) {
        // Enero -> usar el año anterior
        fullYear--;
      }

      // desde
      filtro.fecha.$gte = dateUTC({
        date: `${fullYear}-01-01`,
        hours: "00:00:00.000",
        // timezone: req.get("timezoneoffset"),
      });
      if (filtro.fecha.$gte.error) {
        return errorMessage(res, {message: filtro.fecha.$gte}, 400);
      }
      // hasta
      filtro.fecha.$lte = dateUTC({
        date: `${fullYear}-12-31`,
        hours: "23:59:59.999",
        // timezone: req.get("timezoneoffset"),
      });
      if (filtro.fecha.$lte.error) {
        return errorMessage(res, {message: filtro.fecha.$lte}, 400);
      }

      // donde (opcional)
      if (req.query.areas) {
        filtro.origen = {
          $in: JSON.parse(req.query.areas),
        };
        for (const [index, area] of filtro.origen.$in.entries()) {
          if (isObjectIdValid(area)) {
            // regresa mongoose.Types.ObjectId(area);
            filtro.origen.$in[index] = isObjectIdValid(area);
          } else {
            return errorMessage(
              res,
              {message: "Uno de los Vacunatorios para el Reporte no es valido."},
              400
            );
          }
        }
      }

      // que (opcional)
      if (req.query.insumos) {
        filtro.insumo = {
          $in: JSON.parse(req.query.insumos),
        };
        for (const [index, vacuna] of filtro.insumo.$in.entries()) {
          if (isObjectIdValid(vacuna)) {
            // regresa mongoose.Types.ObjectId(vacuna);
            filtro.insumo.$in[index] = isObjectIdValid(vacuna);
          } else {
            return errorMessage(
              res,
              {message: "Una de las Vacunas para el Reporte no es valida."},
              400
            );
          }
        }
      }

      // Obtener vacunas que tienen grupos etarios con objetivo anual
      let objetivosAnualDB = await VacunaInsumo.aggregate()
        .match({
          _id: filtro.insumo ?? {$exists: true},
          categoria: "Vacuna",
          "grupo_etario.objetivo_anual": {$exists: true},
        })
        .project({
          _id: 1,
          nombre: 1,
          grupo_etario: 1,
        })
        .sort({nombre: 1})
        .unwind({path: "$grupo_etario"})
        .match({
          "grupo_etario.objetivo_anual": {$exists: true},
        })
        .exec();

      if (!objetivosAnualDB || objetivosAnualDB.length === 0) {
        return errorMessage(res, {message: "No hay Vacunas con Objetivo Anual"}, 400);
      }

      filtro.insumo = {
        $in: [...new Set(objetivosAnualDB.map((vac) => vac._id.toString()))].map((idStr) =>
          isObjectIdValid(idStr)
        ),
      };

      // Obtener Aplicaciones Agrupadas por vacuna - mes -> lista de pacientes +edad_unidad +edad_valor
      let aplicacionesDB = await VacunaAplicacion.aggregate()
        .match(filtro)
        .group({
          _id: {
            insumo: "$insumo",
            mes: {$month: "$fecha"},
          },
          total_aplicaciones: {$sum: 1},
          pacientes: {
            $push: {
              edad_unidad: {$ifNull: ["$edad_unidad", null]},
              edad_valor: {$ifNull: ["$edad_valor", null]},
            },
          },
        })
        .project({
          _id: 0,
          insumo: "$_id.insumo",
          mes: "$_id.mes",
          total_aplicaciones: 1,
          pacientes: 1,
        })
        .sort({mes: 1})
        .exec();

      // Crear reporteObj BASE con objetivosAnualDB -> con las props finales inicializadas en cero.
      // MASTER KEY -> insumo(id)-grupo_etario["unidad"]-grupo_etario["value"][0]
      // y TOTAL KEY -> insumo(id)-total
      let reporteObj = {};
      let insumoTotalTemp = {id_vacuna: null, nombre: null, objetivo: 0};
      objetivosAnualDB.forEach((objetivo) => {
        // grupo "total" cuando cambia la vacuna y despues fuera del bucle (ultimo "total")
        if (insumoTotalTemp.id_vacuna && insumoTotalTemp.id_vacuna !== objetivo._id.toString()) {
          reporteObj[`${insumoTotalTemp.id_vacuna}-total`] = {
            id_vacuna: insumoTotalTemp.id_vacuna,
            Vacuna: insumoTotalTemp.nombre,
            "Grupo Etario": "TOTAL",
            Objetivo: insumoTotalTemp.objetivo,
          };
          createMesColumns({
            obj: reporteObj[`${insumoTotalTemp.id_vacuna}-total`],
          });
          insumoTotalTemp.objetivo = 0;
        }
        // grupos etarios en 0
        reporteObj[
          `${objetivo._id}-${objetivo.grupo_etario["unidad"]}-${objetivo.grupo_etario["value"][0]}`
        ] = {
          id_vacuna: objetivo._id.toString(),
          Vacuna: objetivo.nombre,
          "Grupo Etario": `${objetivo.grupo_etario["value"][0]}-${objetivo.grupo_etario["value"][1]} [${objetivo.grupo_etario["unidad"]}]`,
          Objetivo: objetivo.grupo_etario["objetivo_anual"],
        };
        createMesColumns({
          obj: reporteObj[
            `${objetivo._id}-${objetivo.grupo_etario["unidad"]}-${objetivo.grupo_etario["value"][0]}`
          ],
        });
        insumoTotalTemp.id_vacuna = objetivo._id.toString();
        insumoTotalTemp.nombre = objetivo.nombre;
        insumoTotalTemp.objetivo += objetivo.grupo_etario["objetivo_anual"];
      });
      // ultimo grupo "total"
      reporteObj[`${insumoTotalTemp.id_vacuna}-total`] = {
        id_vacuna: insumoTotalTemp.id_vacuna,
        Vacuna: insumoTotalTemp.nombre,
        "Grupo Etario": "TOTAL",
        Objetivo: insumoTotalTemp.objetivo,
      };
      createMesColumns({
        obj: reporteObj[`${insumoTotalTemp.id_vacuna}-total`],
      });
      insumoTotalTemp = null;

      // RECORRER LAS APLICACIONES OBTENIDAS DE DB
      // -> EN CADA primera iteracion cargar el "total" del mes en el grupo "total".
      // -> Y EN CADA paciente de la lista de pacientes
      //    VER edad_unidad, edad_valor para determinar grupo etario donde pertenece.
      aplicacionesDB.forEach((aplicacion) => {
        // mes-total-aplicaciones
        reporteObj[`${aplicacion.insumo}-total`][
          `${mesShortNames[aplicacion.mes - 1]} - Aplicaciones`
        ] = aplicacion.total_aplicaciones;

        // recorrer lista de aplicaciones y asignar grupo etario
        aplicacion["pacientes"].forEach((paciente) => {
          const pacienteEdadUnidades = getEdadUnidades({
            edad_valor: paciente.edad_valor,
            edad_unidad: paciente.edad_unidad,
          });
          // error de edad -> no cuenta
          if (pacienteEdadUnidades.error) return;
          // Objetivos Etarios buscados
          objetivosAnualDB
            .filter((objetivo) => objetivo._id.toString() === aplicacion.insumo.toString())
            // Recorremos los de la vacuna en cuestion
            .forEach((objetivo) => {
              const existe = valorInRangoArray({
                valor: pacienteEdadUnidades[objetivo.grupo_etario["unidad"]],
                rangoArray: objetivo.grupo_etario["value"],
              });
              // no existe o error de rango -> no cuenta
              if (existe === false || existe.error) return;
              // existe contamos
              reporteObj[
                `${aplicacion.insumo}-${objetivo.grupo_etario["unidad"]}-${objetivo.grupo_etario["value"][0]}`
              ][`${mesShortNames[aplicacion.mes - 1]} - Aplicaciones`]++;
            });
        });
      });
      // limpiando variable de DB
      objetivosAnualDB = null;
      aplicacionesDB = null;

      // CALCULO
      // Recorrer grupos en reporteObj
      Object.keys(reporteObj).forEach((grupo) => {
        mesShortNames.forEach((mes, indexMes) => {
          // calculando acumulativo
          const acumulativoTemp =
            reporteObj[grupo][`${mes} - Aplicaciones`] +
            (reporteObj[grupo][`${mesShortNames[indexMes - 1]} - Acumulativo`] ?? 0);

          reporteObj[grupo][`${mes} - Acumulativo`] = acumulativoTemp;

          // calculando porcentaje
          if (reporteObj[grupo].Objetivo > 0) {
            reporteObj[grupo][`${mes} - Porcentaje`] = `${redondearA2Decimales(
              (acumulativoTemp * 100) / reporteObj[grupo].Objetivo
            )} %`;
          } else {
            reporteObj[grupo][`${mes} - Porcentaje`] = "No Objetivo";
          }
        });
      });

      return res.status(200).json({
        ok: true,
        reporteObj,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
