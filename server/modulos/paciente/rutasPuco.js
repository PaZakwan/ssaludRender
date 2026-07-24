const express = require("express");
const axios = require("axios");

const {verificaToken, verificaArrayPropValue} = require(
  process.env.MAIN_FOLDER + "/middlewares/autenticacion.js"
);
const {errorMessage} = require(process.env.MAIN_FOLDER + "/tools/errorHandler.js");
const {capitalize} = require(process.env.MAIN_FOLDER + "/tools/string.js");

const {buscarPacienteCIPRES} = require(process.env.MAIN_FOLDER + "/modulos/vacunas/rutasCipres.js");

const app = express();

const verificacionArrayLectura = [
  {prop: "farmacia"},
  {prop: "vacunas"},
  {prop: "historial_clinico", value: 1},
  {prop: "turnero", value: 1},
  {prop: "tuberculosis", value: 1},
];

async function consultarPucoDniSISA(dni) {
  try {
    // Verificar datos necesarios
    if (!dni) {
      return {
        error: {message: "Falta el DNI para proceder con la consulta al PUCO.", status: 412},
      };
    }
    // Verificar credenciales
    if (!process.env.PUCO_USR || !process.env.PUCO_PSR) {
      return {
        error: {message: "El sistema no cuenta con acceso a PUCO al momento.", status: 501},
      };
    }

    const respuesta = await axios.post(
      `https://sisa.msal.gov.ar/sisa/services/rest/puco/${dni}`,
      {
        usuario: process.env.PUCO_USR,
        clave: process.env.PUCO_PSR,
      },
      {
        headers: {"content-type": "application/x-www-form-urlencoded"},
        timeout: 25 * 1000, // 25.000 (25seg) default is `0` (no timeout)
      }
    );
    // FALTA DESARROLLAR PORQUE NUNCA OBTUVE UNA APIKEY
    // <puco>
    //   <resultado>OK</resultado>
    //   <coberturaSocial>O.S.P. CIUDAD AUT. DE BUENOS AIRES (ObSBA)</coberturaSocial>
    //   <denominacion>PEREZ JUAN</denominacion>
    //   <nrodoc>33222666</nrodoc>
    //   <tipodoc>DNI</tipodoc>
    //   <rnos>901001</rnos>
    // </puco>;
    if (!respuesta || respuesta.puco.resultado !== "OK") {
      return [];
    }

    // formato
    return [
      {
        tipo_doc: "DNI",
        documento: respuesta.puco?.nrodoc,
        apellido: "",
        nombre: "",
        fec_nac: "",
        oSocial: capitalize(respuesta.puco?.coberturaSocial),
        oSocialSigla: "",
        oSocialRnos: respuesta.puco?.rnos,
        nombreC: capitalize(respuesta.puco?.denominacion),
      },
    ];
  } catch (error) {
    return {
      error: {message: error.message, status: 500},
    };
  }
}

async function consultarPucoDniCipres(dni, sexo, fec_nac) {
  // Verificar datos necesarios
  if (!dni || !sexo || !fec_nac) {
    return {
      error: {
        message:
          "Falta informacion para proceder con la consulta al PUCO:" +
          `${!dni ? " • DNI" : ""}${!sexo ? " • SEXO" : ""}${!fec_nac ? " • Fecha de Nacimiento" : ""}`,
        status: 412,
      },
    };
  }

  // {paciente: {documento: "", tipo_doc: "", sexo: "", fec_nac: ""}}
  const pacienteCIPRES = await buscarPacienteCIPRES({
    paciente: {tipo_doc: "DNI", documento: dni, sexo, fec_nac},
  });

  if (pacienteCIPRES?.err) {
    return {
      error: {message: pacienteCIPRES.err, status: 400},
    };
  }
  if (pacienteCIPRES === null) {
    return {
      error: {message: "Persona no encontrada.", status: 400},
    };
  }
  // pacienteCIPRES:  {
  //   paciente: {
  //     '@id': '/api/paciente/28485764',
  //     '@type': 'Paciente',
  //     id: 28485764,
  //     nombre: 'JUAN ALBERTO',
  //     apellido: 'PEREZ',
  //     sexo: {
  //       '@id': '/api/paciente/referencias/sexo/1',
  //       '@type': 'Sexo',
  //       id: 1,
  //       descripcionSexo: 'MASCULINO',
  //       inicial: 'M'
  //     },
  //     fechaNacimiento: '13-09-1951',
  //     fechaFallecido: null,
  //     tipoDocumento: {
  //       '@id': '/api/paciente/referencias/tipo_documento/1',
  //       '@type': 'TiposDocumento',
  //       id: 1,
  //       descripcionTiposDocumento: 'D.N.I.'
  //     },
  //     numeroDocumento: '11222666',
  //     historiaClinica: null,
  //     responsable: null,
  //     domicilio: null,
  //     obraSocial: {
  //       '@id': '/api/sgcc/obra-social/500807',
  //       '@type': 'ObraSocial',
  //       id: '500807',
  //       descripcion: 'INSTITUTO NACIONAL DE SERVICIOS SOCIALES PARA JUBILADOS Y PENSIONADOS',
  //       sigla: 'PAMI',
  //       tipo: null,
  //       habilitada: 'S'
  //     },
  //     nacionalidad: null,
  //     claseDocumento: 'P',
  //     cuil: null,
  //     isValidated: 'S'
  //   },
  //   hijos: []
  // }

  // formato
  return [
    {
      tipo_doc: "DNI",
      documento: pacienteCIPRES.paciente?.numeroDocumento,
      apellido: `${capitalize(pacienteCIPRES.paciente?.apellido)}`,
      nombre: `${capitalize(pacienteCIPRES.paciente?.nombre)}`,
      fec_nac: pacienteCIPRES.paciente?.fechaNacimiento,
      oSocial: capitalize(pacienteCIPRES.paciente?.obraSocial?.descripcion),
      oSocialSigla: pacienteCIPRES.paciente?.obraSocial?.sigla,
      oSocialRnos: pacienteCIPRES.paciente?.obraSocial?.id,
      nombreC: `${capitalize(pacienteCIPRES.paciente?.apellido)}, ${capitalize(pacienteCIPRES.paciente?.nombre)}`,
    },
  ];
}

async function consultarPucoDniJujuy(dni) {
  try {
    // Verificar datos necesarios
    if (!dni) {
      return {
        error: {message: "Falta el DNI para proceder con la consulta al PUCO.", status: 412},
      };
    }

    // hacer consulta
    const respuesta = await axios.post(
      "http://www.msaludjujuy.gov.ar:8072/Notificaciones/Informacion/ConsultaPuco",
      {
        dni,
      },
      {
        headers: {"content-type": "application/x-www-form-urlencoded"},
        Origin: "http://www.msaludjujuy.gov.ar:8072",
        Referer: "http://www.msaludjujuy.gov.ar:8072/Notificaciones/Informacion/Puco",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36",
        timeout: 25 * 1000, // 25.000 (25seg) default is `0` (no timeout)
      }
    );
    // respuesta.data.Items = [
    //   {
    //     ClaseDocumento: "Propio",
    //     FechaNacimiento: "--",
    //     Nombre: "PEREZ JUAN",
    //     NroDocumento: "34666999",
    //     ObraSocial: "MEDIF? ASOCIACI?N CIVIL",
    //     Siglas: "901402",
    //     TipoDocumento: "DNI",
    //   },
    //   {...otro},
    // ];

    if (respuesta?.data?.Estado === "Error") {
      return {
        error: {message: "El servicio de PUCO no se encuentra disponible.", status: 503},
      };
    }

    // formato
    return (
      respuesta?.data?.Items?.map((obj) => ({
        tipo_doc: "DNI",
        documento: obj.NroDocumento,
        apellido: "",
        nombre: "",
        fec_nac: obj.FechaNacimiento,
        oSocial: capitalize(obj.ObraSocial),
        oSocialSigla: obj.Siglas,
        oSocialRnos: "",
        nombreC: capitalize(obj.Nombre),
      })) || []
    );
  } catch (error) {
    return {
      error: {message: error.message, status: 500},
    };
  }
}

// ============================
// Mostrar Obras Sociales de Paciente segun el DNI
// Servicio del Padrón Único Consolidado Operativo (PUCO)
// ============================
app.get(
  "/paciente/puco/consulta",
  [
    verificaToken,
    (req, res, next) => {
      req.verificacionArray = verificacionArrayLectura;
      next();
    },
    verificaArrayPropValue,
  ],
  async (req, res) => {
    try {
      // Verificar datos necesarios
      if (!req.query.dni) {
        return errorMessage(
          res,
          {message: "Falta el DNI para proceder con la consulta al PUCO."},
          412
        );
      }

      // SISA (NACION)
      const PucoSISA = await consultarPucoDniSISA(req.query.dni);
      if (!PucoSISA.error) {
        return res.json({
          ok: true,
          puco: PucoSISA,
        });
      }

      // CIPRES (PROVINCIA)
      const PucoCipres = await consultarPucoDniCipres(
        req.query.dni,
        req.query.sexo,
        req.query.fec_nac
      );
      if (!PucoCipres.error) {
        return res.json({
          ok: true,
          puco: PucoCipres,
        });
      }

      // JUJUY
      const PucoJujuy = await consultarPucoDniJujuy(req.query.dni);
      if (!PucoJujuy.error) {
        return res.json({
          ok: true,
          puco: PucoJujuy,
        });
      }

      // PROVINCIA
      if (PucoCipres.error) {
        return errorMessage(res, PucoCipres.error, PucoCipres.error.status);
      }
      // JUJUY
      if (PucoJujuy.error) {
        return errorMessage(res, PucoJujuy.error, PucoJujuy.error.status);
      }
      // NACION
      if (PucoSISA.error) {
        return errorMessage(res, PucoSISA.error, PucoSISA.error.status);
      }
    } catch (err) {
      return errorMessage(res, err, err.code);
    }
  }
);

// ============================
// TITULO ¿?¿?¿?¿?
// ============================

// ============================
// XXXXXX  Desarrollar  XXXXXXX
// ============================
// ============================
// XXXXXXXXXXXXXXXXXXXXXXXXXXXX
// ============================

module.exports = app;
