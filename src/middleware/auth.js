// auth.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticateJWT = (req, res, next) => {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("Decoded JWT: ", decoded); // Verifica si el token tiene el _id
    req.user = decoded; // Asigna el payload al req.user
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authenticateJWT;
