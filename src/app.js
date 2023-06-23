const cors = require('cors');
const express = require("express");
const app = express();

// Se permite el acceso al servidor Back-end desde la dirección del servidor Front-end especificada
app.use(
  cors({
    origin: process.env.FRONT_END_SERVER_URL,
  })
);
app.use(express.json());
app.use("/api", require("./routes/usuarios.routes"));

module.exports = app;
