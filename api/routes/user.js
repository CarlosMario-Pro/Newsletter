const express = require("express");
const user = express.Router(); 
const User = require("../models/User");
const mongoose = require("mongoose");
const mailSettings = require("../additional/nodemailer");


user.post("/", async(req,res)=>{
    const { name, phone, email } = req.body;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            let existUser = await User.findOne({ email }).session(session);
            if (existUser) {
                return res
                    .status(409)
                    .json({ message: `El usuario con correo ${email} ya existe` });
            }
            const [createdUser] = await User.create(
                [ { name, phone, email } ],
                { session }
            );
            res.status(200).json({
                id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
            });
        });

        const transporter = mailSettings.transporter;
        const mailDetails = mailSettings.mailDetails(email);
        transporter.sendMail(mailDetails, (error, info) => {
            if (error) {
                console.log(error);
                return res
                    .status(500)
                    .send("Error al enviar email de confirmación");
            } else {
                return res.status(200).send("Usuario creado con éxito.");
            }
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al crear al usuario";
        return res.status(status).json({ message });
    } finally {
        await session.endSession();
    }
});



user.get("/",async(req,res)=>{
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            const users = await User.find({}).session(session);
            return res.status(200).json(users);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener los usuarios";
        return res.status(status).json({ message });
    } finally {
        await session.endSession();
    }
})


module.exports = user;