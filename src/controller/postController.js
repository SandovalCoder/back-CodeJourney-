const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUser,
} = require("../services/postService");

const { cloudinary } = require("../middleware/upload");

const createPostController = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ error: "No user authenticated" });
    }

    // Si la imagen se carga como URL
    let imageUrl = req.body.image;

    // Si la imagen es cargada como archivo (usando multer), subirla a Cloudinary
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "posts",
            format: "png", // Cambiar el formato si es necesario
            public_id: req.file.originalname.split(".")[0],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = uploadResult.secure_url; // Establecer la URL de Cloudinary
    }

    const postData = {
      ...req.body,
      image: imageUrl, // Asignar la imagen (URL de Cloudinary o la proporcionada en el cuerpo)
      author: req.user.userId, // Asignar el autor del post
    };

    const newPost = await createPost(postData);
    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPostsController = async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPostByIdController = async (req, res) => {
  try {
    const post = await getPostById(req.params.postId);
    res.status(200).json({ post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePostController = async (req, res) => {
  try {
    // Verificar si el usuario está autenticado
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ error: "No user authenticated" });
    }

    // Verificar si el post existe
    const existingPost = await getPostById(req.params.postId);
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Verificar si el usuario es el autor del post
    if (existingPost.author._id ? existingPost.author._id.toString() !== req.user.userId : existingPost.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "You can only update your own posts" });
    }

    let updateData = { ...req.body };

    // Si se sube una nueva imagen
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "posts",
            format: "png", // Ajusta el formato si es necesario
            public_id: req.file.originalname.split(".")[0],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      updateData.image = uploadResult.secure_url; // Asignar nueva URL de imagen
    }

    // Actualizar el post
    const updatedPost = await updatePost(req.params.postId, updateData);
    res.status(200).json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(400).json({ error: error.message });
  }
};

const deletePostController = async (req, res) => {
  try {
    const deletedPost = await deletePost(req.params.postId);
    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Obtener sus posts de un usuario autenticado publicados
const getPostsByUserController = async (req, res) => {
  try {
    const posts = await getPostsByUser(req.user.userId);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  createPostController,
  getPostsController,
  getPostByIdController,
  updatePostController,
  deletePostController,
  getPostsByUserController,
};
