require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/user");
require("dotenv").config();


const { CLIENT_URL } = process.env;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: CLIENT_URL,
        methods: "GET, POST, PUT, DELETE",
        credentials: true,
    })
);

app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        CLIENT_URL
    );

  // "https://pf-front-swart.vercel.app"
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});


app.use("/user", routes);


module.exports = app;