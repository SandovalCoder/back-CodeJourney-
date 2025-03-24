// services/commentService.js
const Comment = require("../models/Comment");
const Post = require("../models/Post");

//
// Crear un nuevo comentario
//
const createComment = async (commentData) => {
  try {
    // Verificar que el post exista sin validar sus campos
    const postExists = await Post.exists({ _id: commentData.post });
    if (!postExists) {
      throw new Error("Post not found");
    }

    // Crear el comentario
    const newComment = new Comment(commentData);
    await newComment.save();

    // Actualizar el post con el nuevo comentario
    await Post.findByIdAndUpdate(
      commentData.post,
      { $push: { comments: newComment._id } }
    );

    // Poblar el autor del comentario antes de devolverlo
    await newComment.populate('author', 'name lastName');
    
    return newComment;
  } catch (error) {
    throw new Error(error.message);
  }
};

//
// Obtener todos los comentarios para un post
//
const getCommentsByPostId = async (postId) => {
  try {
    const comments = await Comment.find({ post: postId })
      .populate("author", "name lastName")
      .populate("post", "title");
    return comments;
  } catch (error) {
    throw new Error(error.message);
  }
};

//
// Obtener un comentario específico
//
const getCommentById = async (commentId) => {
  try {
    const comment = await Comment.findById(commentId)
      .populate("author", "name email")
      .populate("post", "title");
    if (!comment) {
      throw new Error("Comment not found");
    }
    return comment;
  } catch (error) {
    throw new Error(error.message);
  }
};

//
// Actualizar un comentario
//
const updateComment = async (commentId, updatedData) => {
  try {
    const comment = await Comment.findByIdAndUpdate(commentId, updatedData, {
      new: true,
    });
    if (!comment) {
      throw new Error("Comment not found");
    }
    return comment;
  } catch (error) {
    throw new Error(error.message);
  }
};

//
// Eliminar un comentario
//
const deleteComment = async (commentId) => {
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }
    // (Opcional) Quitar el comentario del array "comments" del post asociado
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: commentId },
    });
    return comment;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createComment,
  getCommentsByPostId,
  getCommentById,
  updateComment,
  deleteComment,
};
