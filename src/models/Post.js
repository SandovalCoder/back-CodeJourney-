const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "Post image is required"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Post title is required"],
    trim: true,
    minLength: [2, "Post title must be at least 2 characters"],
  },
  content: {
    type: String,
    required: [true, "Post content is required"],
    trim: true,
    minLength: [2, "Post content must be at least 2 characters"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencia al modelo 'User'
    required: true,
  },
  // Agregar este campo para almacenar los comentarios asociados
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
