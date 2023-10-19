const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs"); // Asegúrate de requerir fs
const templatePath = path.join(
  __dirname,
  "../configuration/mailingTemplates",
  "Promociones",
  "index.html"
);

const sendMail = (req, res) => {
  try {
    fs.readFile(templatePath, "utf8", async (err, html) => {
      if (err) {
        console.error("Error al leer el archivo de plantilla:", err);
        return res.status(500).json({
          error: "Error al registrar el usuario",
          details: err.message,
        });
      }
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, // Cambiado de "post" a "port"
        secure: true,
        auth: {
          user: "greattravel.contact@gmail.com",
          pass: "hbacczxxirmcjmht",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const { to } = req.body;

      if (!to) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }
      // html = html.replace('<strong id="userPassword"></strong>', `<strong id="userPassword">${text}</strong>`);

      // Detalles del correo
      const mailOptions = {
        from: "greattravel.contact@gmail.com",
        to: to, // Utiliza la dirección del destinatario proporcionada en el cuerpo de la solicitud
        subject: "🎁✨¡Eres muy importante para nosotros! 💖🎀",
        html: html, // Puedes cambiar esto a HTML si lo deseas
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          console.log("Email Enviado");
          res.status(200).jsonp(req.body);
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al", details: error.message });
  }
};
module.exports = sendMail;
