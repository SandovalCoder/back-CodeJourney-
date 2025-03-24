// routes/commentRoutes.js
const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/auth"); // Middleware de autenticación
const { validateComment } = require("../middleware/commentValidator"); // Middleware de validación para comentarios
const {
  createCommentController,
  getCommentsByPostIdController,
  getCommentByIdController,
  updateCommentController,
  deleteCommentController,
} = require("../controller/commentController");

// Crear un comentario para un post (requiere autenticación)
// Se espera que la URL contenga el postId en: /api/comments/create/:postId
router.post(
  "/create/:postId",
  authenticateJWT,
  validateComment,
  createCommentController
);

// Obtener todos los comentarios de un post (postId en la URL)
router.get("/post/:postId", getCommentsByPostIdController);

// Obtener un comentario específico (usando commentId)
router.get("/:commentId", getCommentByIdController);

// Actualizar un comentario (requiere autenticación)
router.put(
  "/:commentId",
  authenticateJWT,
  validateComment,
  updateCommentController
);

// Eliminar un comentario (requiere autenticación)
router.delete("/:commentId", authenticateJWT, deleteCommentController);

module.exports = router;
