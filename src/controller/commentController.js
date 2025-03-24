// controllers/commentController.js
const {
  createComment,
  getCommentsByPostId,
  getCommentById,
  updateComment,
  deleteComment,
} = require("../services/commentService");

//
// Crear un nuevo comentario (requiere autenticación)
// Se asume que el postId se envía como parámetro en la URL y el contenido en el body
//
const createCommentController = async (req, res) => {
  try {
    if (!req.body.content) {
      return res.status(400).json({ error: "El contenido del comentario es requerido" });
    }

    if (!req.params.postId) {
      return res.status(400).json({ error: "El ID del post es requerido" });
    }

    const commentData = {
      content: req.body.content,
      author: req.user.userId,
      post: req.params.postId,
    };

    const newComment = await createComment(commentData);
    res.status(201).json({ message: "Comentario creado exitosamente", newComment });
  } catch (error) {
    console.error("Error en createCommentController:", error);
    res.status(400).json({ error: error.message });
  }
};

//
// Obtener todos los comentarios de un post (usando postId en los parámetros)
//
const getCommentsByPostIdController = async (req, res) => {
  try {
    const comments = await getCommentsByPostId(req.params.postId);
    res.status(200).json({ comments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//
// Obtener un comentario por su ID
//
const getCommentByIdController = async (req, res) => {
  try {
    const comment = await getCommentById(req.params.commentId);
    res.status(200).json({ comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//
// Actualizar un comentario (usando commentId en los parámetros)
//
const updateCommentController = async (req, res) => {
  try {
    const updatedComment = await updateComment(req.params.commentId, req.body);
    res
      .status(200)
      .json({ message: "Comment updated successfully", updatedComment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//
// Eliminar un comentario (usando commentId en los parámetros)
//
const deleteCommentController = async (req, res) => {
  try {
    const deletedComment = await deleteComment(req.params.commentId);
    res
      .status(200)
      .json({ message: "Comment deleted successfully", deletedComment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCommentController,
  getCommentsByPostIdController,
  getCommentByIdController,
  updateCommentController,
  deleteCommentController,
};
