const { User } = require('../database/db');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs'); // Asegúrate de requerir fs
const { log } = require('console');
const templatePath = path.join(__dirname, '../configuration/mailingTemplates', 'RecuperarContrasea', 'index.html');

const forgotPassHandler = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    
    try {
        fs.readFile(templatePath, 'utf8', async (err, html) => {
            if (err) {
              console.error('Error al leer el archivo de plantilla:', err);
              return res.status(500).json({ error: "Error al registrar el usuario", details: err.message });
            }
        
        
        const user = await User.findOne({where:{email: email} } );
        console.log('Email ingresasdo', user);

        if (!user) {
            return res.send({ Status: "User not existed" });
        }

        const token = jwt.sign({ id: user.id }, "jwt_secret_key", { expiresIn: "1d" });
        
        
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
              port: 465, // Cambiado de "post" a "port"
              secure: true,
              auth: {
                user: "greattravel.contact@gmail.com",
                pass: "hbacczxxirmcjmht"
              },
              tls:{
                rejectUnauthorized:false
              }
        });

        html = html.replace('<strong id="userPassword"></strong>', `<strong id="userPassword">${`https://the-next-page.vercel.app/reset_password/${user.id}/${token}`}</strong>`);
       

        var mailOptions = {
            from: 'greattravel.contact@gmail.com',
            to: email,
            subject: 'Reset Password Link',
            html: html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.send({ Status: "Error sending email" });
            } else {
                return res.send({ Status: "Success" });
            }
        });
    })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ Status: "Internal Server Error" });
    }
};

module.exports = forgotPassHandler;
