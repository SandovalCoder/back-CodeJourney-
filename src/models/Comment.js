// models/Comment.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "El contenido del comentario es requerido"],
    trim: true,
    minLength: [2, "El contenido debe tener al menos 2 caracteres"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencia al modelo 'User'
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // Referencia al modelo 'Post'
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
