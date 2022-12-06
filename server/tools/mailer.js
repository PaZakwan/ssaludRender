const nodemailer = require("nodemailer");
const path = require("path");

// IMPORTAR DATOS DEL MAIL DE PRODUCCION Y DEVELOPMENT..DE CONFIG.JS
async function crearTransporter() {
  try {
    // ethereal
    // let testAccount = await nodemailer.createTestAccount();
    // console.log("testAccount", testAccount);

    let temp = {
      auth: {},
    };
    // if (process.env.NODE_ENV === 'dev') {
    // temp.logger = true;
    // temp.debug = true;
    // };
    if (process.env.MAIL_SERVICE) {
      temp.service = process.env.MAIL_SERVICE || undefined; // 'Hotmail', 'Gmail'
    } else {
      temp.host = process.env.MAIL_HOST || "smtp.ethereal.email"; // 'smtp.live.com', 'smtp.gmail.com'
      temp.port = process.env.MAIL_PORT || 587; // '587', '465'
      temp.secure = process.env.MAIL_SECURE || false; // true for 465, false for other ports
    }
    if (process.env.MAIL_TYPE === "OAuth2") {
      temp.auth.type = process.env.MAIL_TYPE || "";
      temp.auth.user = process.env.MAIL_USER || "r5an4rce365zfgfx@ethereal.email";
      temp.auth.clientId = process.env.MAIL_CLIENT_ID || "";
      temp.auth.clientSecret = process.env.MAIL_CLIENT_SECRET || "";
      temp.auth.refreshToken = process.env.MAIL_REFRESH_TOKEN || "";
      temp.auth.accessToken = process.env.MAIL_ACCESS_TOKEN || "";
      temp.auth.expires = process.env.MAIL_EXPIRES || 1484314697598;
    } else {
      temp.auth.user = process.env.MAIL_USER || "r5an4rce365zfgfx@ethereal.email";
      temp.auth.pass = process.env.MAIL_PASS || "x9uRtqm4mA7P8FNx2W";
    }

    let transporter = nodemailer.createTransport(temp, {
      // default message fields
      from: `Secretaria de Salud Moreno <${temp.auth.user}>`,
      attachments: [
        {
          filename: "logo.png",
          path: path.resolve(__dirname, "../assets/mail-titulo-215-150.png"),
          cid: "tituloUnico", //same cid value as in the html img src
        },
      ],
    });

    await transporter.verify();

    let ahora = new Date();
    console.log(
      `===== ${ahora.getFullYear()}/${(ahora.getMonth() + 1).toString().padStart(2, 0)}/${ahora
        .getDate()
        .toString()
        .padStart(2, 0)} - ${ahora.getHours().toString().padStart(2, 0)}:${ahora
        .getMinutes()
        .toString()
        .padStart(2, 0)} ` +
        `<=> Servidor listo para enviar Mails: ${
          transporter.options.service || `${transporter.options.host}:${transporter.options.port}`
        } =====`
    );

    return transporter;
  } catch (error) {
    console.error(`XXXXX Fallo la conexion al servicio de E-mails. ${error} XXXXX`);
    return {};
  }
}

// export transporter
exports.mailTransporter = crearTransporter();
