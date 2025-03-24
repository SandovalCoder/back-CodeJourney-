const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/config"); // Conexión con la base de datos
const userRoutes = require("./routes/userRoutes"); // Rutas para usuarios
const postRoutes = require("./routes/postRoutes"); // Rutas para posts
const commentRoutes = require("./routes/commentRoutes"); // Rutas para comentarios
const cors = require("cors"); // Habilitar CORS

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// Middleware para habilitar CORS (configuración básica)
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "*", // Puedes especificar un origen o usar '*' para todos
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use("/api/users", userRoutes); // Rutas de usuarios
app.use("/api/posts", postRoutes); // Rutas de posts
app.use("/api/comments", commentRoutes); // Rutas de comentarios

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Hello World desde Express y MongoDB!");
});

// Manejo de errores (opcional, pero útil para detectar fallos)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
