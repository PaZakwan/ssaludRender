const nodemailer = require("nodemailer");
const {clgEvento, clgFalla} = require(process.env.MAIN_FOLDER + "/tools/console");

// IMPORTAR DATOS DEL MAIL DE PRODUCCION Y DEVELOPMENT..DE CONFIG.JS
// FUNCION PARA INICIAR MAIL SERVER
const crearTransporter = async () => {
  try {
    // ethereal
    // let testAccount = await nodemailer.createTestAccount();
    // console.log("testAccount", testAccount);

    let temp = {
      auth: {},
    };
    // if (process.env.NODE_ENV === "dev") {
    //   temp.logger = true;
    //   temp.debug = true;
    // }
    if (process.env.MAIL_SERVICE) {
      temp.service = process.env.MAIL_SERVICE; // 'Hotmail', 'Gmail'/'gmail' miinuscula )?
    } else {
      temp.host = process.env.MAIL_HOST ?? "smtp.ethereal.email"; // 'smtp.live.com', 'smtp.gmail.com'
      temp.port = process.env.MAIL_PORT ?? 587; // '587', '465'
      temp.secure = process.env.MAIL_SECURE ?? false; // true for 465, false for other ports
    }
    if (process.env.MAIL_TYPE === "OAuth2") {
      temp.auth.type = process.env.MAIL_TYPE ?? "";
      temp.auth.user = process.env.MAIL_USER ?? "camylle.wolf@ethereal.email";
      temp.auth.clientId = process.env.MAIL_CLIENT_ID ?? "";
      temp.auth.clientSecret = process.env.MAIL_CLIENT_SECRET ?? "";
      temp.auth.refreshToken = process.env.MAIL_REFRESH_TOKEN ?? "";
      temp.auth.accessToken = process.env.MAIL_ACCESS_TOKEN ?? "";
      temp.auth.expires = process.env.MAIL_EXPIRES ?? 1484314697598;
    } else {
      temp.auth.user = process.env.MAIL_USER ?? "camylle.wolf@ethereal.email";
      temp.auth.pass = process.env.MAIL_PASS ?? "uHzeYwQeysKjMwR3yj";
    }

    temp.pool = true;
    temp.maxMessages = 50;

    let transporter = nodemailer.createTransport(temp, {
      // default message fields
      from: `Secretaria de Salud Moreno <${temp.auth.user}>`,
      attachments: [
        {
          filename: "logo.png",
          path: process.env.MAIN_FOLDER + "\\assets\\mail-titulo-215-150.png",
          cid: "tituloUnico", //same cid value as in the html img src
        },
      ],
    });

    await transporter.verify();

    if (process.env.NODE_ENV === "dev") {
      // Listen for transporter has capacity to accept more messages.
      transporter.on("idle", (idle) => {
        clgEvento({
          name: "Mail Server",
          evento: `Idle (${idle})`,
        });
      });
    }
    clgEvento({
      name: "Mail Server",
      evento: `Funcionando (${
        transporter.options.service || `${transporter.options.host}:${transporter.options.port}`
      })`,
    });

    return transporter;
  } catch (error) {
    clgFalla({
      name: "Mail Server CATCH",
      falla: error,
    });
    return {error};
  }
};

const mailTransporter = crearTransporter();

// https://www.youtube.com/watch?v=M1E-bU5snA8

// export transporter
module.exports.mailTransporter = mailTransporter;
