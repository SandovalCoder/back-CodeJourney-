const Post = require("../models/Post");
const User = require("../models/User"); // Para obtener el autor si es necesario
const Comment = require("../models/Comment"); // Si necesitas mostrar los comentarios

// Crear un nuevo post
const createPost = async (postData) => {
  try {
    const newPost = new Post(postData);
    await newPost.save();
    return newPost;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obtener todos los posts (puedes agregar paginación si es necesario)
const getPosts = async () => {
  try {
    const posts = await Post.find()
      .populate("author", "name lastName") // Si deseas mostrar detalles del autor
      .populate("comments"); // Si quieres incluir los comentarios en el post
    return posts;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obtener un post específico
const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId)
      .populate("author", "name lastName")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "name lastName"
        }
      });
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Actualizar un post
const updatePost = async (postId, updatedData) => {
  try {
    const post = await Post.findByIdAndUpdate(postId, updatedData, {
      new: true, // Devuelve el post actualizado
    });
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Eliminar un post
const deletePost = async (postId) => {
  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    // También puedes eliminar los comentarios asociados si es necesario
    await Comment.deleteMany({ post: postId });
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Obtener sus posts de un usuario autenticado publicados
const getPostsByUser = async (userId) => {
  try {
    const posts = await Post.find({ author: userId });
    return posts;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUser,
};
