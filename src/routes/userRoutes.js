// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { validateUser } = require("../middleware/userValidator"); // Importamos el middleware de validación
const {
  registerUserController,
  loginUserController,
  getUserProfileController,
  validateEmailController,
  updateUserController,
} = require("../controller/userController");
const authenticateJWT = require("../middleware/auth"); // Importar el middleware de autenticación

// Ruta pública para registrar un nuevo usuario
router.post("/register", validateUser, registerUserController); // Usar el middleware de validación

// Ruta pública para iniciar sesión
router.post("/login", loginUserController);

// Ruta protegida para obtener el perfil del usuario
router.get("/profile", authenticateJWT, getUserProfileController);

// Ruta pública para validar que el email no este registrado
router.post("/validate-email", validateEmailController);

// Ruta protegida para actualizar el perfil del usuario
router.put("/update/:userId", authenticateJWT, updateUserController);

module.exports = router;
