const express = require("express");
const {ObjectId} = require("mongodb");

const HistorialMotivo = require("./models/historial_motivo");
const Nutricion = require("./models/especialidades/consultas_nutricion");

const {verificaToken, verificaHistorialClinico} = require("../../middlewares/autenticacion");
const {errorMessage} = require("../../tools/errorHandler");

const app = express();

function sumarProps(object1, object2) {
  try {
    let temp = {};
    Object.keys(object1).forEach((key) => {
      if (typeof object1[key] == "number" && typeof object2[key] == "number") {
        temp[key] = object1[key] + object2[key];
      } else if (typeof object1[key] == "object" && typeof object2[key] == "object") {
        temp[key] = sumarProps(object1[key], object2[key]);
      } else {
        temp[key] = object1[key];
      }
    });
    return temp;
  } catch (error) {
    if (!!error.errors) {
      return error;
    }
    return false;
  }
}

// ============================
// Permanencia de las personas que iniciaron "Programa" entre fechas [x,y].
// ============================
app.get(
  "/HistorialClinico/nutricion/permanencia",
  [verificaToken, verificaHistorialClinico],
  async (req, res) => {
    try {
      let diasParaAbandono = Number(req.query.diasAbandono) || 14;
      let fechaAbandono = new Date();
      fechaAbandono.setUTCDate(fechaAbandono.getDate() - diasParaAbandono);
      fechaAbandono.setUTCHours(0, 0, 0, 0);
      let filtro = {
        // estado: {$in: ["Activo", "Abandonado"]},
        motivo_especialidad: "Nutricion",
        descripcion: req.query.programa || "reduccion de peso",
        createdAt: {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)},
      };

      let historialesRespuestaDB = await HistorialMotivo.aggregate([
        {
          $match: filtro,
        },
        // Buscar consultas del motivo
        {
          $lookup: {
            from: "HistorialConsultasNutricion",
            localField: "_id",
            foreignField: "motivo",
            as: "consultas",
          },
        },
        // Ordenar por fecha de consulta
        {$unwind: {path: "$consultas", preserveNullAndEmptyArrays: true}},
        {$sort: {"consultas.fecha": 1, _id: 1}},
        {
          $group: {
            _id: "$_id",
            createdAt: {$first: "$createdAt"},
            estado: {$first: "$estado"},
            descripcion: {$first: "$descripcion"},
            paciente: {$first: "$paciente"},
            consultas: {$push: {fecha: "$consultas.fecha"}},
          },
        },
        // Buscar datos del paciente.
        {
          $lookup: {
            from: "pacientes",
            localField: "paciente",
            foreignField: "_id",
            as: "paciente",
          },
        },
        {$unwind: "$paciente"},
        // Edicion del output
        {
          $project: {
            _id: "$_id",
            createdAt: "$createdAt",
            "paciente.nombre": 1,
            "paciente.apellido": 1,
            "paciente.nombreC": {
              $concat: [
                {$ifNull: ["$paciente.apellido", ""]},
                ", ",
                {$ifNull: ["$paciente.nombre", ""]},
              ],
            },
            "paciente.tipo_doc": 1,
            "paciente.documento": 1,
            "paciente.documentoC": {
              $concat: [
                {$ifNull: ["$paciente.tipo_doc", ""]},
                " ",
                {$ifNull: ["$paciente.documento", ""]},
              ],
            },
            programa: "$descripcion",
            estadoActual: "$estado",
            consultas: 1,
            permanencia: {
              $switch: {
                branches: [
                  {
                    case: {
                      $and: [
                        {$eq: ["$estado", "Activo"]},
                        {$gte: [{$arrayElemAt: ["$consultas.fecha", -1]}, fechaAbandono]},
                      ],
                    },
                    then: "Si",
                  },
                  {
                    case: {
                      $or: [{$eq: ["$estado", "Activo"]}, {$eq: ["$estado", "Abandonado"]}],
                    },
                    then: "No",
                  },
                  {
                    case: {$eq: ["$estado", "Finalizado"]},
                    then: "Finalizado",
                  },
                  {
                    case: {$eq: ["$estado", "Suspendido"]},
                    then: "Suspendido",
                  },
                  {
                    case: {$eq: ["$estado", "Cancelado"]},
                    then: "Cancelado",
                  },
                ],
                default: "",
              },
            },
          },
        },
      ]).exec();

      let totales = {Permanecen: 0, Abandonaron: 0, Otros: 0};
      historialesRespuestaDB.forEach((motivo) => {
        if (motivo.permanencia === "Si") {
          totales.Permanecen++;
        } else if (motivo.permanencia === "No") {
          totales.Abandonaron++;
        } else {
          totales.Otros++;
        }
      });

      res.json({
        ok: true,
        historiales: historialesRespuestaDB,
        totales,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Personas que perdieron peso y continuan el Programa que iniciaron entre fechas [x,y].
// ============================
app.get(
  "/HistorialClinico/nutricion/peso",
  [verificaToken, verificaHistorialClinico],
  async (req, res) => {
    try {
      let diasParaAbandono = Number(req.query.diasAbandono) || 14;
      let fechaAbandono = new Date();
      fechaAbandono.setUTCDate(fechaAbandono.getDate() - diasParaAbandono);
      fechaAbandono.setUTCHours(0, 0, 0, 0);
      let filtro = {
        // estado: {$in: ["Activo", "Abandonado"]},
        motivo_especialidad: "Nutricion",
        descripcion: req.query.programa || "reduccion de peso",
        createdAt: {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)},
      };
      let pesoPerdidoEsperado =
        req.query.pesoPerdido == 0 ? 0 : Number(req.query.pesoPerdido) || 1000;

      let historialesRespuestaDB = await HistorialMotivo.aggregate([
        {
          $match: filtro,
        },
        // Buscar consultas del motivo
        {
          $lookup: {
            from: "HistorialConsultasNutricion",
            localField: "_id",
            foreignField: "motivo",
            as: "consultas",
          },
        },
        // Ordenar por fecha de consulta (No contar con los motivos sin consultas)
        {$unwind: {path: "$consultas", preserveNullAndEmptyArrays: false}},
        {$sort: {"consultas.fecha": 1, _id: 1}},
        {
          $group: {
            _id: "$_id",
            createdAt: {$first: "$createdAt"},
            estado: {$first: "$estado"},
            descripcion: {$first: "$descripcion"},
            paciente: {$first: "$paciente"},
            // agregar array con las fechas / pesos (primer elemento primer peso tomado, ultimo elemento ultimo tomado)
            consultas: {$push: {fecha: "$consultas.fecha", peso: "$consultas.peso"}},
          },
        },
        // Buscar datos del paciente.
        {
          $lookup: {
            from: "pacientes",
            localField: "paciente",
            foreignField: "_id",
            as: "paciente",
          },
        },
        {$unwind: "$paciente"},
        // Edicion del output
        {
          $project: {
            _id: "$_id",
            createdAt: "$createdAt",
            "paciente.nombre": 1,
            "paciente.apellido": 1,
            "paciente.nombreC": {
              $concat: [
                {$ifNull: ["$paciente.apellido", ""]},
                ", ",
                {$ifNull: ["$paciente.nombre", ""]},
              ],
            },
            "paciente.tipo_doc": 1,
            "paciente.documento": 1,
            "paciente.documentoC": {
              $concat: [
                {$ifNull: ["$paciente.tipo_doc", ""]},
                " ",
                {$ifNull: ["$paciente.documento", ""]},
              ],
            },
            programa: "$descripcion",
            estadoActual: "$estado",
            consultas: 1,
            permanencia: {
              $switch: {
                branches: [
                  {
                    case: {
                      $and: [
                        {$eq: ["$estado", "Activo"]},
                        {$gte: [{$arrayElemAt: ["$consultas.fecha", -1]}, fechaAbandono]},
                      ],
                    },
                    then: "Si",
                  },
                  {
                    case: {
                      $or: [{$eq: ["$estado", "Activo"]}, {$eq: ["$estado", "Abandonado"]}],
                    },
                    then: "No",
                  },
                  {
                    case: {$eq: ["$estado", "Finalizado"]},
                    then: "Finalizado",
                  },
                  {
                    case: {$eq: ["$estado", "Suspendido"]},
                    then: "Suspendido",
                  },
                  {
                    case: {$eq: ["$estado", "Cancelado"]},
                    then: "Cancelado",
                  },
                ],
                default: "",
              },
            },
            pesoPerdidoInicial: {
              $subtract: [
                {$arrayElemAt: ["$consultas.peso", 0]},
                {$arrayElemAt: ["$consultas.peso", -1]},
              ],
            },
            pesoPerdidoUltimoPesaje: {
              $subtract: [
                {$arrayElemAt: ["$consultas.peso", -2]},
                {$arrayElemAt: ["$consultas.peso", -1]},
              ],
            },
            cumplio: {
              $cond: [
                {
                  $gte: [
                    {
                      $subtract: [
                        {$arrayElemAt: ["$consultas.peso", 0]},
                        {$arrayElemAt: ["$consultas.peso", -1]},
                      ],
                    },
                    pesoPerdidoEsperado,
                  ],
                },
                "Si",
                "No",
              ],
            },
          },
        },
      ]).exec();

      let totales = {Permanecen_Bajo: 0, Abandonaron_Bajo: 0, No_Bajaron: 0, Otros_Bajo: 0};
      historialesRespuestaDB.forEach((motivo) => {
        // bajaron de peso?
        if (motivo.cumplio === "Si") {
          if (motivo.permanencia === "Si") {
            totales.Permanecen_Bajo++;
          } else if (motivo.permanencia === "No") {
            totales.Abandonaron_Bajo++;
          } else {
            totales.Otros_Bajo++;
          }
        } else {
          totales.No_Bajaron++;
        }
      });

      res.json({
        ok: true,
        historiales: historialesRespuestaDB,
        totales,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Personas que bajaron X% de IMC e iniciaron el programa entre fechas [x,y].
// ============================
app.get(
  "/HistorialClinico/nutricion/IMC",
  [verificaToken, verificaHistorialClinico],
  async (req, res) => {
    try {
      //  motivo(esp:nutri, desc/prog: red. de peso,estado:activo).
      let filtro = {
        // estado: {$in: ["Activo", "Abandonado"]},
        motivo_especialidad: "Nutricion",
        descripcion: req.query.programa || "reduccion de peso",
        createdAt: {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)},
      };
      let IMCPerdidoEsperado = req.query.IMCPerdido == 0 ? 0 : Number(req.query.IMCPerdido) || 5;

      let historialesRespuestaDB = await HistorialMotivo.aggregate([
        {
          $match: filtro,
        },
        // Buscar consultas del motivo, SOLAMENTE CONSULTAS de Nutricionista
        {
          $lookup: {
            from: "HistorialConsultasNutricion",
            let: {motivo_id: "$_id"},
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {$eq: ["$motivo", "$$motivo_id"]},
                      {$eq: ["$actividad", "Nutricionista"]},
                    ],
                  },
                },
              },
              {$project: {fecha: 1, IMC: 1}},
            ],
            as: "consultas",
          },
        },
        // Ordenar por fecha de consulta (No contar con los motivos sin consultas)
        {$unwind: {path: "$consultas", preserveNullAndEmptyArrays: false}},
        {$sort: {"consultas.fecha": 1, _id: 1}},
        {
          $group: {
            _id: "$_id",
            createdAt: {$first: "$createdAt"},
            estado: {$first: "$estado"},
            descripcion: {$first: "$descripcion"},
            paciente: {$first: "$paciente"},
            // agregar array con las fechas / IMC (primer elemento primer IMC tomado, ultimo elemento ultimo tomado)
            consultas: {$push: {fecha: "$consultas.fecha", IMC: "$consultas.IMC"}},
          },
        },
        // Buscar datos del paciente.
        {
          $lookup: {
            from: "pacientes",
            localField: "paciente",
            foreignField: "_id",
            as: "paciente",
          },
        },
        {$unwind: "$paciente"},
        // Edicion del output
        {
          $project: {
            _id: "$_id",
            createdAt: "$createdAt",
            "paciente.nombre": 1,
            "paciente.apellido": 1,
            "paciente.nombreC": {
              $concat: [
                {$ifNull: ["$paciente.apellido", ""]},
                ", ",
                {$ifNull: ["$paciente.nombre", ""]},
              ],
            },
            "paciente.tipo_doc": 1,
            "paciente.documento": 1,
            "paciente.documentoC": {
              $concat: [
                {$ifNull: ["$paciente.tipo_doc", ""]},
                " ",
                {$ifNull: ["$paciente.documento", ""]},
              ],
            },
            programa: "$descripcion",
            estadoActual: "$estado",
            consultas: 1,
            IMCPerdidoInicial: {
              $round: [
                {
                  $subtract: [
                    {$arrayElemAt: ["$consultas.IMC", 0]},
                    {$arrayElemAt: ["$consultas.IMC", -1]},
                  ],
                },
                2,
              ],
            },
            IMCPerdidoUltimoPesaje: {
              $round: [
                {
                  $subtract: [
                    {$arrayElemAt: ["$consultas.IMC", -2]},
                    {$arrayElemAt: ["$consultas.IMC", -1]},
                  ],
                },
                2,
              ],
            },
            // IMC %
            // 100 - ( 100 * ultimo / primero)
            IMCDiferenciaPorcentual: {
              $round: [
                {
                  $subtract: [
                    100,
                    {
                      $multiply: [
                        100,
                        {
                          $divide: [
                            {$arrayElemAt: ["$consultas.IMC", -1]},
                            {$arrayElemAt: ["$consultas.IMC", 0]},
                          ],
                        },
                      ],
                    },
                  ],
                },
                2,
              ],
            },
            cumplio: {
              $cond: [
                {
                  $gte: [
                    {
                      $round: [
                        {
                          $subtract: [
                            {$arrayElemAt: ["$consultas.IMC", 0]},
                            {$arrayElemAt: ["$consultas.IMC", -1]},
                          ],
                        },
                        2,
                      ],
                    },
                    IMCPerdidoEsperado,
                  ],
                },
                "Si",
                "No",
              ],
            },
          },
        },
      ]).exec();

      let totales = {Cumplieron: 0, No_Cumplieron: 0};
      historialesRespuestaDB.forEach((motivo) => {
        // bajaron de IMC?
        if (motivo.cumplio === "Si") {
          totales.Cumplieron++;
        } else {
          totales.No_Cumplieron++;
        }
      });

      res.json({
        ok: true,
        historiales: historialesRespuestaDB,
        totales,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Personas que adoptaron X+ habitos e iniciaron el Programa entre fechas [x,y].
// ============================
app.get(
  "/HistorialClinico/nutricion/habitos",
  [verificaToken, verificaHistorialClinico],
  async (req, res) => {
    try {
      let filtro = {
        // estado: {$in: ["Activo", "Abandonado"]},
        motivo_especialidad: "Nutricion",
        descripcion: req.query.programa || "reduccion de peso",
        createdAt: {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)},
      };
      let habitoEsperado =
        req.query.habitoEsperado == 0 ? 0 : Number(req.query.habitoEsperado) || 2;
      let saludable = req.query.saludable || "Si";

      let historialesRespuestaDB = await HistorialMotivo.aggregate([
        {
          $match: filtro,
        },
        // Buscar consultas del motivo, SOLAMENTE CONSULTAS de Nutricionista.
        {
          $lookup: {
            from: "HistorialConsultasNutricion",
            let: {motivo_id: "$_id"},
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {$eq: ["$motivo", "$$motivo_id"]},
                      {$eq: ["$actividad", "Nutricionista"]},
                    ],
                  },
                },
              },
              {$project: {fecha: 1, habitos_saludables: 1, habitos_no_saludables: 1}},
            ],
            as: "consultas",
          },
        },
        // Ordenar por fecha de consulta (No contar con los motivos sin consultas)
        {$unwind: {path: "$consultas", preserveNullAndEmptyArrays: false}},
        {$sort: {"consultas.fecha": 1, _id: 1}},
        {
          $group: {
            _id: "$_id",
            createdAt: {$first: "$createdAt"},
            estado: {$first: "$estado"},
            descripcion: {$first: "$descripcion"},
            paciente: {$first: "$paciente"},
            // agregar array con las fechas / habitos (primer elemento primeros habitos tomados, ultimo elemento ultimos tomados)
            consultas: {
              $push: {
                fecha: "$consultas.fecha",
                habitos: {
                  $cond: [
                    saludable === "Si",
                    {
                      $cond: [
                        {$isArray: "$consultas.habitos_saludables"},
                        {$size: "$consultas.habitos_saludables"},
                        0,
                      ],
                    },
                    {
                      $cond: [
                        {$isArray: "$consultas.habitos_no_saludables"},
                        {$size: "$consultas.habitos_no_saludables"},
                        0,
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        // Buscar datos del paciente.
        {
          $lookup: {
            from: "pacientes",
            localField: "paciente",
            foreignField: "_id",
            as: "paciente",
          },
        },
        {$unwind: "$paciente"},
        // Edicion del output
        {
          $project: {
            _id: "$_id",
            createdAt: "$createdAt",
            "paciente.nombre": 1,
            "paciente.apellido": 1,
            "paciente.nombreC": {
              $concat: [
                {$ifNull: ["$paciente.apellido", ""]},
                ", ",
                {$ifNull: ["$paciente.nombre", ""]},
              ],
            },
            "paciente.tipo_doc": 1,
            "paciente.documento": 1,
            "paciente.documentoC": {
              $concat: [
                {$ifNull: ["$paciente.tipo_doc", ""]},
                " ",
                {$ifNull: ["$paciente.documento", ""]},
              ],
            },
            programa: "$descripcion",
            estadoActual: "$estado",
            consultas: 1,
            habitosDiferenciaInicial: {
              $subtract: [
                {$arrayElemAt: ["$consultas.habitos", -1]},
                {$arrayElemAt: ["$consultas.habitos", 0]},
              ],
            },
            habitosUltimasDiferencia: {
              $subtract: [
                {$arrayElemAt: ["$consultas.habitos", -1]},
                {$arrayElemAt: ["$consultas.habitos", -2]},
              ],
            },
            cumplio: {
              $cond: [
                {
                  $gte: [
                    {
                      $subtract: [
                        {$arrayElemAt: ["$consultas.habitos", -1]},
                        {$arrayElemAt: ["$consultas.habitos", 0]},
                      ],
                    },
                    habitoEsperado,
                  ],
                },
                "Si",
                "No",
              ],
            },
          },
        },
      ]).exec();

      let totales = {Cumplieron: 0, No_Cumplieron: 0};
      historialesRespuestaDB.forEach((motivo) => {
        // bajaron de IMC?
        if (motivo.cumplio === "Si") {
          totales.Cumplieron++;
        } else {
          totales.No_Cumplieron++;
        }
      });

      res.json({
        ok: true,
        historiales: historialesRespuestaDB,
        totales,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Personas con X+ consultas nutricionales entre fechas [x,y].
// ============================
app.get(
  "/HistorialClinico/nutricion/nutricionistas",
  [verificaToken, verificaHistorialClinico],
  async (req, res) => {
    try {
      let filtro = {
        actividad: "Nutricionista",
        fecha: {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)},
      };
      let consultasEsperadas =
        req.query.consultasEsperadas == 0 ? 0 : Number(req.query.consultasEsperadas) || 2;

      let consultasDB = await Nutricion.aggregate([
        // Buscar consultas de Nutricionistas.
        {
          $match: filtro,
        },
        {$sort: {fecha: 1, _id: 1}},
        {
          $group: {
            _id: "$paciente",
            consultasCantidad: {$sum: 1},
            consultas: {$push: {fecha: "$fecha"}},
          },
        },
        // Buscar datos del paciente.
        {
          $lookup: {
            from: "pacientes",
            localField: "_id",
            foreignField: "_id",
            as: "paciente",
          },
        },
        {$unwind: "$paciente"},
        // Edicion del output
        {
          $project: {
            _id: 1,
            "paciente.nombre": 1,
            "paciente.apellido": 1,
            "paciente.nombreC": {
              $concat: [
                {$ifNull: ["$paciente.apellido", ""]},
                ", ",
                {$ifNull: ["$paciente.nombre", ""]},
              ],
            },
            "paciente.tipo_doc": 1,
            "paciente.documento": 1,
            "paciente.documentoC": {
              $concat: [
                {$ifNull: ["$paciente.tipo_doc", ""]},
                " ",
                {$ifNull: ["$paciente.documento", ""]},
              ],
            },
            consultasCantidad: 1,
            consultas: 1,
          },
        },
        {$sort: {"paciente.nombreC": 1, _id: 1}},
      ]).exec();

      let totales = {Cumplieron: 0, No_Cumplieron: 0};

      consultasDB.forEach((persona) => {
        if (persona.consultasCantidad >= consultasEsperadas) {
          persona.cumplio = "Si";
          totales.Cumplieron++;
        } else {
          persona.cumplio = "No";
          totales.No_Cumplieron++;
        }
      });

      res.json({
        ok: true,
        historiales: consultasDB,
        totales,
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// Hoja 2.1
// ============================
app.get(
  "/HistorialClinico/control/nutricion/hoja2",
  [verificaToken, verificaHistorialClinico],
  async (req, res) => {
    try {
      // edades/genero (menos de 1 mes/ 1-11 meses)(1-4 / 5-9 / 10-14 / 15-19 / 20-34 / 35-49 / 50-64 / 65+).
      // totales segun genero, segun edad, segun edad y genero.
      // ##################################################
      // presentacion(valores), antecedentes(valores), diagnostico(valores 5), puntaje_z(valores 5), riesgo_cardio(valores),
      // omitir tensiones, totales del resto.
      let filtro = {
        fecha: {$gte: new Date(req.query.desde), $lte: new Date(req.query.hasta)},
      };
      if (req.query.area && req.query.area != "null") {
        filtro.area = ObjectId(req.query.area);
      }
      if (req.query.profesional && req.query.profesional != "null") {
        filtro.profesional = ObjectId(req.query.profesional);
      }

      const outputControlNutricion = {
        total: {$sum: 1},
        edadProm: {$avg: "$edad_años"},
        edadTotal: {$sum: "$edad_años"},
        // data: {$push: {riesgo_cardio: "$riesgo_cardiovascular_colesterol"}},
        actividad_Coordinador: {
          $sum: {
            $cond: [{$eq: ["$actividad", "Coordinador"]}, 1, 0],
          },
        },
        actividad_Nutricionista: {
          $sum: {
            $cond: [{$eq: ["$actividad", "Nutricionista"]}, 1, 0],
          },
        },
        presentacion_1era: {
          $sum: {
            $cond: [{$eq: ["$tipo_presentacion", "1ra vez"]}, 1, 0],
          },
        },
        presentacion_Ulterior: {
          $sum: {
            $cond: [{$eq: ["$tipo_presentacion", "Ulterior"]}, 1, 0],
          },
        },
        presentacion_Promocion: {
          $sum: {
            $cond: [{$eq: ["$tipo_presentacion", "Promocion"]}, 1, 0],
          },
        },
        antecedentes_Diabetes: {
          $sum: {
            $cond: [
              {
                $and: [
                  {$isArray: "$antecedentes_patologicos"},
                  {$in: ["Diabetes (DM)", "$antecedentes_patologicos"]},
                ],
              },
              1,
              0,
            ],
          },
        },
        antecedentes_Dislipidemia: {
          $sum: {
            $cond: [
              {
                $and: [
                  {$isArray: "$antecedentes_patologicos"},
                  {$in: ["Dislipidemia (DSP)", "$antecedentes_patologicos"]},
                ],
              },
              1,
              0,
            ],
          },
        },
        antecedentes_Celiaca: {
          $sum: {
            $cond: [
              {
                $and: [
                  {$isArray: "$antecedentes_patologicos"},
                  {$in: ["Enfermedad Celíaca", "$antecedentes_patologicos"]},
                ],
              },
              1,
              0,
            ],
          },
        },
        antecedentes_Hipertension: {
          $sum: {
            $cond: [
              {
                $and: [
                  {$isArray: "$antecedentes_patologicos"},
                  {$in: ["Hipertensión Arterial (HTA)", "$antecedentes_patologicos"]},
                ],
              },
              1,
              0,
            ],
          },
        },
        antecedentes_InsuficienciaRenal: {
          $sum: {
            $cond: [
              {
                $and: [
                  {$isArray: "$antecedentes_patologicos"},
                  {$in: ["Insuficiencia Renal Crónica", "$antecedentes_patologicos"]},
                ],
              },
              1,
              0,
            ],
          },
        },
        diagnostico0_Bajo: {
          $sum: {
            $cond: [{$eq: ["$diagnostico", "Bajo Peso"]}, 1, 0],
          },
        },
        diagnostico1_Normo: {
          $sum: {
            $cond: [{$eq: ["$diagnostico", "Normopeso"]}, 1, 0],
          },
        },
        diagnostico2_Sobrepeso: {
          $sum: {
            $cond: [{$eq: ["$diagnostico", "Sobrepeso"]}, 1, 0],
          },
        },
        diagnostico3_Obesidad1: {
          $sum: {
            $cond: [{$eq: ["$diagnostico", "Obesidad 1"]}, 1, 0],
          },
        },
        diagnostico4_Obesidad2: {
          $sum: {
            $cond: [{$eq: ["$diagnostico", "Obesidad 2"]}, 1, 0],
          },
        },
        diagnostico5_Morbida: {
          $sum: {
            $cond: [{$eq: ["$diagnostico", "Obesidad Morbida"]}, 1, 0],
          },
        },
        diagnostico6_NoDato: {
          $sum: {
            $cond: [
              {
                $and: [
                  // Es Nutricionista
                  {$eq: ["$actividad", "Nutricionista"]},
                  // Y no existe Diagnostico
                  {$not: [{$ifNull: ["$diagnostico", false]}]},
                ],
              },
              1,
              0,
            ],
          },
        },
        puntaje0_Neggtive2: {
          $sum: {
            $cond: [{$eq: ["$puntaje_z", "menores a -2"]}, 1, 0],
          },
        },
        puntaje1_Negative2a2: {
          $sum: {
            $cond: [{$eq: ["$puntaje_z", "de -2 a 2"]}, 1, 0],
          },
        },
        puntaje2_2a3: {
          $sum: {
            $cond: [{$eq: ["$puntaje_z", "de 2 a 3"]}, 1, 0],
          },
        },
        puntaje3_3Mayores: {
          $sum: {
            $cond: [{$eq: ["$puntaje_z", "mayores a 3"]}, 1, 0],
          },
        },
        puntaje4_BajaTalla: {
          $sum: {
            $cond: [{$eq: ["$puntaje_z", "Baja Talla"]}, 1, 0],
          },
        },
        puntaje5_NoDato: {
          $sum: {
            $cond: [
              {
                $and: [
                  // Es Nutricionista,
                  {$eq: ["$actividad", "Nutricionista"]},
                  // Cumple con la edad.. 0-19
                  {$lt: ["$edad_años", 20]},
                  // Y no existe puntaje_z
                  {$not: [{$ifNull: ["$puntaje_z", false]}]},
                ],
              },
              1,
              0,
            ],
          },
        },
        riesgo0_0a9: {
          $sum: {
            $cond: [{$eq: ["$riesgo_cardiovascular_colesterol", "menor a 10%"]}, 1, 0],
          },
        },
        riesgo1_10a19: {
          $sum: {
            $cond: [{$eq: ["$riesgo_cardiovascular_colesterol", "10-20%"]}, 1, 0],
          },
        },
        riesgo2_20a29: {
          $sum: {
            $cond: [{$eq: ["$riesgo_cardiovascular_colesterol", "20-30%"]}, 1, 0],
          },
        },
        riesgo3_30a39: {
          $sum: {
            $cond: [{$eq: ["$riesgo_cardiovascular_colesterol", "30-40%"]}, 1, 0],
          },
        },
        riesgo4_40aMayor: {
          $sum: {
            $cond: [{$eq: ["$riesgo_cardiovascular_colesterol", "mayor o igual a 40%"]}, 1, 0],
          },
        },
        riesgo5_NoDato: {
          $sum: {
            $cond: [
              {
                $and: [
                  // Es Nutricionista
                  {$eq: ["$actividad", "Nutricionista"]},
                  // Y no existe Riesgo
                  {$not: [{$ifNull: ["$riesgo_cardiovascular_colesterol", false]}]},
                ],
              },
              1,
              0,
            ],
          },
        },
      };

      const projectControlNutricion = {
        Rango: {
          $switch: {
            branches: [
              // boundaries: [0, 1, 5, 10, 15, 20, 35, 50, 65, 130],
              {case: {$eq: ["$_id", 50]}, then: "50-64"},
              {case: {$eq: ["$_id", 35]}, then: "35-49"},
              {case: {$eq: ["$_id", 20]}, then: "20-34"},
              {case: {$eq: ["$_id", 5]}, then: "05-09"},
              {case: {$eq: ["$_id", 1]}, then: "01-04"},
              {case: {$eq: ["$_id", 0]}, then: "0"},
              {case: {$eq: ["$_id", 10]}, then: "10-14"},
              {case: {$eq: ["$_id", 15]}, then: "15-19"},
              {case: {$eq: ["$_id", 65]}, then: "65-130"},
            ],
          },
        },
        Total: "$total",
        Edad_Promedio: "$edadProm",
        Edad_Total: "$edadTotal",
        Actividad: {
          Coordinador: "$actividad_Coordinador",
          Nutricionista: "$actividad_Nutricionista",
        },
        Presentacion: {
          "1ra vez": "$presentacion_1era",
          Ulterior: "$presentacion_Ulterior",
          Promocion: "$presentacion_Promocion",
        },
        Comorbilidad: {
          Diabetes: "$antecedentes_Diabetes",
          Dislipidemia: "$antecedentes_Dislipidemia",
          Celiaca: "$antecedentes_Celiaca",
          Hipertensión: "$antecedentes_Hipertension",
          "Insuficiencia Renal": "$antecedentes_InsuficienciaRenal",
        },
        Diagnostico: {
          "Bajo Peso": "$diagnostico0_Bajo",
          Normopeso: "$diagnostico1_Normo",
          Sobrepeso: "$diagnostico2_Sobrepeso",
          "Obesidad 1": "$diagnostico3_Obesidad1",
          "Obesidad 2": "$diagnostico4_Obesidad2",
          "Obesidad Morbida": "$diagnostico5_Morbida",
          "Sin Dato": "$diagnostico6_NoDato",
        },
        Puntaje_Z: {
          "menores a -2": "$puntaje0_Neggtive2",
          "de -2 a 2": "$puntaje1_Negative2a2",
          "de 2 a 3": "$puntaje2_2a3",
          "mayores a 3": "$puntaje3_3Mayores",
          "Baja Talla": "$puntaje4_BajaTalla",
          "Sin Dato": "$puntaje5_NoDato",
        },
        "Riesgo_Cardio_%": {
          "0-9": "$riesgo0_0a9",
          "10-19": "$riesgo1_10a19",
          "20-29": "$riesgo2_20a29",
          "30-39": "$riesgo3_30a39",
          "40+": "$riesgo4_40aMayor",
          "Sin Dato": "$riesgo5_NoDato",
        },
      };

      let resumenDB = await Nutricion.aggregate()
        .match(filtro)
        .facet({
          Derivados: [
            {
              $match: {
                derivado: {$exists: true},
              },
            },
            {
              $group: {
                _id: "$derivado",
                Derivados_Cantidad: {$sum: 1},
                Motivos: {$push: "$motivoReferencia"},
              },
            },
            {$sort: {_id: 1}},
            {
              $project: {
                _id: 0,
                Derivado: "$_id",
                Derivados_Cantidad: 1,
                Motivos: 1,
              },
            },
          ],
          Femenino_Edad: [
            {
              $match: {
                sexo: "Femenino",
              },
            },
            {
              $bucket: {
                groupBy: "$edad_años",
                boundaries: [0, 1, 5, 10, 15, 20, 35, 50, 65, 130],
                default: "sin edad",
                output: outputControlNutricion,
              },
            },
            {
              $project: projectControlNutricion,
            },
          ],
          Masculino_Edad: [
            {
              $match: {
                sexo: "Masculino",
              },
            },
            {
              $bucket: {
                groupBy: "$edad_años",
                boundaries: [0, 1, 5, 10, 15, 20, 35, 50, 65, 130],
                default: "sin edad",
                output: outputControlNutricion,
              },
            },
            {
              $project: projectControlNutricion,
            },
          ],
        })
        .exec();

      const baseProp = {
        Total: 0,
        Edad_Promedio: 0,
        Edad_Total: 0,
        Actividad: {
          Coordinador: 0,
          Nutricionista: 0,
        },
        Presentacion: {
          "1ra vez": 0,
          Ulterior: 0,
          Promocion: 0,
        },
        Comorbilidad: {
          Diabetes: 0,
          Dislipidemia: 0,
          Celiaca: 0,
          Hipertensión: 0,
          "Insuficiencia Renal": 0,
        },
        Diagnostico: {
          "Bajo Peso": 0,
          Normopeso: 0,
          Sobrepeso: 0,
          "Obesidad 1": 0,
          "Obesidad 2": 0,
          "Obesidad Morbida": 0,
          "Sin Dato": 0,
        },
        Puntaje_Z: {
          "menores a -2": 0,
          "de -2 a 2": 0,
          "de 2 a 3": 0,
          "mayores a 3": 0,
          "Baja Talla": 0,
          "Sin Dato": 0,
        },
        "Riesgo_Cardio_%": {
          "0-9": 0,
          "10-19": 0,
          "20-29": 0,
          "30-39": 0,
          "40+": 0,
          "Sin Dato": 0,
        },
      };

      const baseRango = [
        "0",
        "01-04",
        "05-09",
        "10-14",
        "15-19",
        "20-34",
        "35-49",
        "50-64",
        "65-130",
      ];

      // Masculino_Edad.Todos
      resumenDB[0].Masculino_Edad.Todos = Object.assign({}, JSON.parse(JSON.stringify(baseProp)));
      if (resumenDB[0].Masculino_Edad.length > 0) {
        for (let i = 0; i < resumenDB[0].Masculino_Edad.length; i++) {
          resumenDB[0].Masculino_Edad.Todos = sumarProps(
            resumenDB[0].Masculino_Edad.Todos,
            resumenDB[0].Masculino_Edad[i]
          );
        }
        // Calcular Edad_Promedio
        if (resumenDB[0].Masculino_Edad.Todos.Total != 0) {
          resumenDB[0].Masculino_Edad.Todos.Edad_Promedio =
            resumenDB[0].Masculino_Edad.Todos.Edad_Total / resumenDB[0].Masculino_Edad.Todos.Total;
        }
        resumenDB[0].Masculino_Edad.Todos.Edad_Promedio =
          resumenDB[0].Masculino_Edad.Todos.Edad_Promedio.toLocaleString("es-AR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        resumenDB[0].Masculino_Edad.Todos.Rango = "Todos";
      }

      // Femenino_Edad.Todas
      resumenDB[0].Femenino_Edad.Todas = Object.assign({}, JSON.parse(JSON.stringify(baseProp)));
      if (resumenDB[0].Femenino_Edad.length > 0) {
        for (let i = 0; i < resumenDB[0].Femenino_Edad.length; i++) {
          resumenDB[0].Femenino_Edad.Todas = sumarProps(
            resumenDB[0].Femenino_Edad.Todas,
            resumenDB[0].Femenino_Edad[i]
          );
        }
        // Calcular Edad_Promedio
        if (resumenDB[0].Femenino_Edad.Todas.Total != 0) {
          resumenDB[0].Femenino_Edad.Todas.Edad_Promedio =
            resumenDB[0].Femenino_Edad.Todas.Edad_Total / resumenDB[0].Femenino_Edad.Todas.Total;
        }
        resumenDB[0].Femenino_Edad.Todas.Edad_Promedio =
          resumenDB[0].Femenino_Edad.Todas.Edad_Promedio.toLocaleString("es-AR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        resumenDB[0].Femenino_Edad.Todas.Rango = "Todas";
      }

      // Todos_Edad.Todos
      resumenDB[0].Todos_Edad = {Todos: Object.assign({}, JSON.parse(JSON.stringify(baseProp)))};
      resumenDB[0].Todos_Edad.Todos = sumarProps(
        resumenDB[0].Masculino_Edad.Todos,
        resumenDB[0].Femenino_Edad.Todas
      );
      // Todos_Edad.Todos.Genero
      resumenDB[0].Todos_Edad.Todos.Genero = {
        Masculino: resumenDB[0].Masculino_Edad.Todos.Total,
        Femenino: resumenDB[0].Femenino_Edad.Todas.Total,
      };
      // Todos_Edad.Todos.Edad_Promedio
      if (resumenDB[0].Todos_Edad.Todos.Total != 0) {
        resumenDB[0].Todos_Edad.Todos.Edad_Promedio =
          resumenDB[0].Todos_Edad.Todos.Edad_Total / resumenDB[0].Todos_Edad.Todos.Total;
      }
      resumenDB[0].Todos_Edad.Todos.Edad_Promedio =
        resumenDB[0].Todos_Edad.Todos.Edad_Promedio.toLocaleString("es-AR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      resumenDB[0].Todos_Edad.Todos.Rango = "Todos";

      // Todos_Edad
      baseRango.forEach((Rango) => {
        resumenDB[0].Todos_Edad[Rango] = Object.assign({}, JSON.parse(JSON.stringify(baseProp)));
        resumenDB[0].Todos_Edad[Rango].Genero = {Masculino: 0, Femenino: 0};
        // buscar index del Rango del each
        let MasculinoIndex = resumenDB[0].Masculino_Edad.findIndex((x) => x.Rango === Rango);
        if (MasculinoIndex != -1) {
          // si existe sumar propiedades
          resumenDB[0].Todos_Edad[Rango] = sumarProps(
            resumenDB[0].Todos_Edad[Rango],
            resumenDB[0].Masculino_Edad[MasculinoIndex]
          );
          resumenDB[0].Todos_Edad[Rango].Genero.Masculino =
            resumenDB[0].Masculino_Edad[MasculinoIndex].Total;
        }
        let FemeninoIndex = resumenDB[0].Femenino_Edad.findIndex((x) => x.Rango === Rango);
        if (FemeninoIndex != -1) {
          // si existe sumar propiedades
          resumenDB[0].Todos_Edad[Rango] = sumarProps(
            resumenDB[0].Todos_Edad[Rango],
            resumenDB[0].Femenino_Edad[FemeninoIndex]
          );
          resumenDB[0].Todos_Edad[Rango].Genero.Femenino =
            resumenDB[0].Femenino_Edad[FemeninoIndex].Total;
        }
        // Calcular Edad_Promedio
        if (resumenDB[0].Todos_Edad[Rango].Total != 0) {
          resumenDB[0].Todos_Edad[Rango].Edad_Promedio =
            resumenDB[0].Todos_Edad[Rango].Edad_Total / resumenDB[0].Todos_Edad[Rango].Total;
        }
        resumenDB[0].Todos_Edad[Rango].Edad_Promedio = resumenDB[0].Todos_Edad[
          Rango
        ].Edad_Promedio.toLocaleString("es-AR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        resumenDB[0].Todos_Edad[Rango].Rango = Rango;
      });

      // Masculino_Edad
      let MasculinoTemp = {Todos: resumenDB[0].Masculino_Edad.Todos};
      baseRango.forEach((Rango) => {
        // buscar index del Rango del each
        let MasculinoIndex = resumenDB[0].Masculino_Edad.findIndex((x) => x.Rango === Rango);
        if (MasculinoIndex != -1) {
          // si existe borrar props y copiar
          delete resumenDB[0].Masculino_Edad[MasculinoIndex]._id;
          MasculinoTemp[Rango] = Object.assign(
            {},
            JSON.parse(JSON.stringify(resumenDB[0].Masculino_Edad[MasculinoIndex]))
          );
        } else {
          MasculinoTemp[Rango] = Object.assign({}, JSON.parse(JSON.stringify(baseProp)));
        }
        MasculinoTemp[Rango].Edad_Promedio = MasculinoTemp[Rango].Edad_Promedio.toLocaleString(
          "es-AR",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        );
        MasculinoTemp[Rango].Rango = Rango;
      });
      resumenDB[0].Masculino_Edad = Object.assign({}, JSON.parse(JSON.stringify(MasculinoTemp)));

      // Femenino_Edad
      let FemeninoTemp = {Todas: resumenDB[0].Femenino_Edad.Todas};
      baseRango.forEach((Rango) => {
        // buscar index del Rango del each
        let FemeninoIndex = resumenDB[0].Femenino_Edad.findIndex((x) => x.Rango === Rango);
        if (FemeninoIndex != -1) {
          // si existe borrar props y copiar
          delete resumenDB[0].Femenino_Edad[FemeninoIndex]._id;
          FemeninoTemp[Rango] = Object.assign(
            {},
            JSON.parse(JSON.stringify(resumenDB[0].Femenino_Edad[FemeninoIndex]))
          );
        } else {
          FemeninoTemp[Rango] = Object.assign({}, JSON.parse(JSON.stringify(baseProp)));
        }
        FemeninoTemp[Rango].Edad_Promedio = FemeninoTemp[Rango].Edad_Promedio.toLocaleString(
          "es-AR",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        );
        FemeninoTemp[Rango].Rango = Rango;
      });
      resumenDB[0].Femenino_Edad = Object.assign({}, JSON.parse(JSON.stringify(FemeninoTemp)));

      res.json({
        ok: true,
        resumen: resumenDB[0],
      });
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

module.exports = app;
