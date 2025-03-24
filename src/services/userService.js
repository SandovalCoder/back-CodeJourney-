// services/userService.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

// Crear un nuevo usuario
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
};

// Buscar usuario por correo electrónico
const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Error finding user");
  }
};

// Autenticar usuario (validar credenciales y generar JWT)
const authenticateUser = async (email, password) => {
  try {
    // Buscar usuario por correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials: User not found");
    }

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid credentials: Incorrect password");
    }

    // Generar el JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Expira en 1 hora
    );

    return { token, user };
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw new Error(error.message);
  }
};

// Validar que el email no este registrado  
const validateEmail = async (email) => {
  const user = await User.findOne({ email });
  return !user; // Devuelve true si el email NO existe (está disponible)
};

//Actualizar usuario
const updateUser = async (userId, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user");
  }
};



module.exports = { createUser, findUserByEmail, authenticateUser, validateEmail, updateUser };
