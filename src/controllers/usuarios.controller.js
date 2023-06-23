// Contenedor de las funciones del controlador
const usuariosController = {};

// Array para simular una base de datos clave valor
usuariosController.usuariosRegistrados = [];

const jwt = require("jsonwebtoken");

usuariosController.crearUsuario = (req, res) => {
  let ultimaID = 0;
  if (usuariosController.usuariosRegistrados.length > 0) {
    const numeroUsuariosRegistrados =
      usuariosController.usuariosRegistrados.length;
    ultimaID =
      usuariosController.usuariosRegistrados[numeroUsuariosRegistrados - 1][
        "id"
      ] + 1;
  }

  const { correo, clave } = req.body;
  const nuevoUsuario = { id: ultimaID, correo, clave };

  /* Se agrega el nuevo usuario recibido del Front-end al array de usuarios registrados 
  para simular la base de datos */
  usuariosController.usuariosRegistrados.push(nuevoUsuario);

  // Después de crear el usuario se devuelve un token al cliente
  // generado con el id que regresara la base de datos en un caso real
  // investigar si se debe modificar el token para cada usuario en la misma maquina
  const token = jwt.sign({ id: ultimaID }, process.env.JWT_SECRET);
  console.log("te registraste");
  console.log(usuariosController.usuariosRegistrados);
  res.status(200).json({ token });
};

usuariosController.ingresar = (req, res) => {
  const { correo, clave } = req.body;

  // Debería hacerse de manera async si fuera una consulta a la base de datos
  const usuario = usuariosController.usuariosRegistrados.find(
    (usuario) => usuario["correo"] == correo
  );
  if (!usuario) {
    return res.status(401).send("El correo no existe");
  }
  if (usuario.clave !== clave){
    return res.status(401).send("Contraseña errónea");
  }

  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET);
  console.log("ingresaste");
  console.log(usuario);
  return res.status(200).json({ token });
};

usuariosController.mostrarMapa = (req, res) => {
  // verificar token primero
  res.send("mapa privado");
  console.log("mapa privado");
};

usuariosController.mostrarEstadisticas = (req, res) => {
  // verificar token primero
  res.send("estadisticas privado");
  console.log("estadisticas privado");
};

module.exports = usuariosController;
