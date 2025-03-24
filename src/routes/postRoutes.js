const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/auth"); // Aquí importamos el middleware de autenticación
const { upload } = require("../middleware/upload");
const {
  createPostController,
  getPostsController,
  getPostByIdController,
  updatePostController,
  deletePostController,
  getPostsByUserController,
} = require("../controller/postController");
const { validatePost } = require("../middleware/postValidator"); // Validación de post

// Asegúrate de aplicar el middleware authenticateJWT
//router.post("/create", authenticateJWT, validatePost, createPostController); // Primero autentica, luego valida
router.post(
  "/create",
  authenticateJWT,
  upload.single("image"),
  validatePost,
  createPostController
);
router.get("/", getPostsController);
router.get("/:postId", getPostByIdController);
//router.put("/:postId", authenticateJWT, validatePost, updatePostController); // Aplica también en PUT
router.put(
  "/:postId",
  authenticateJWT,
  upload.single("image"),
  validatePost,
  updatePostController
);
router.delete("/:postId", authenticateJWT, deletePostController); // Aplica también en DELETE
router.get("/user/posts", authenticateJWT, getPostsByUserController); // Obtener posts de un usuario autenticado
module.exports = router;
