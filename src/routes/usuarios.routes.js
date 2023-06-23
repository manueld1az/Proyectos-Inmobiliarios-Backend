const { Router } = require("express");
const router = Router();

const usuariosController = require("../controllers/usuarios.controller");

const verificarToken = (req, res, next) => {
  const jwt = require("jsonwebtoken");

  if (!req.headers.authorization) {
    return res.status(401).send("No esta autorizado");
  }

  const token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("No esta autorizado");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = payload._id;
  next();
};

router.post("/auth/registro", usuariosController.crearUsuario);

router.post("/auth/ingreso", usuariosController.ingresar);

router.get(
  "/compra-venta/proyectos",
  verificarToken,
  usuariosController.mostrarMapa
);

router.get(
  "/compra-venta/estadisticas",
  verificarToken,
  usuariosController.mostrarEstadisticas
);

module.exports = router;
