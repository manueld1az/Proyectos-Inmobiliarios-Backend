// Se obtienen las variables de entorno del archivo .env
require("dotenv").config();

// Se usa la variable PORT del archivo .env
const PORT = process.env.PORT ?? 3000;

const app = require("./app");

// Se configura el puerto del servidor
app.listen(PORT);
console.log(`Servidor escuchando en el puerto ${PORT}`);
