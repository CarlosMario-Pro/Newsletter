const nodemailer = require('nodemailer');
require('dotenv').config();
const { NODEMAILER } = process.env;


module.exports = {
    transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'elmateexpress@gmail.com',
            pass: NODEMAILER,
        },
    }),


    mailDetails: ( email) => {
        return {
            from: 'elmateexpress@gmail.com',
            to: email,
            subject: `¡Bienvenido a Newsletters`,
            html: `
                <p>Te damos la bienvenida al Newsletters de la Organización de Ambientalistas Autoconvocados</p>
                <br/>
                <p><b>Nos encontramos muy felices de que desees hacer parte de esta comunidad.</b></p>
                <p>Contamos con el apollo de la comunidad para hacer frente a nuestras necesidades, nuestra voz debe ser escuchada, trabajemos juntos para lograrlo.></img>
            `
        }
    },


    mailResponse: (email, name, response, comment) => {
        return {
            from: 'elmateexpress@gmail.com',
            to: email,
            subject: 'Boletín informativo',
            html:
                `
                    <h1>Hola <b>${name},</b></h1>
                    <p>Estas son las novedades del día.</p>
                    <br/>

                    <p>La Corte Suprema bonaerense citó este martes al intendente Manuel Passaglia, denunciado por ejecutar proyectos urbanísticos en áreas protegidas . La causa investiga la deforestación masiva de la reserva natural Parque Rafael Aguiar de 1.500 hectáreas .</p>
                `
            ,
        }
    },
};
