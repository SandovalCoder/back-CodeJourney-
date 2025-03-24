// userController.js
const {
  createUser,
  authenticateUser,
  findUserByEmail,
  validateEmail,
  updateUser,
} = require("../services/userService");

// Controlador para registrar un usuario 
const registerUserController = async (req, res) => {
  try {
    const user = await createUser(req.body);

    // Excluir la contraseña antes de devolver el usuario
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword, // No devolvemos la contraseña
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para iniciar sesión
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authenticateUser(email, password);

    // Excluir la contraseña antes de devolver el usuario
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword, // No devolvemos la contraseña
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para obtener el perfil del usuario (solo accesible si el usuario está autenticado)
const getUserProfileController = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email); // Accedemos al correo desde el JWT
    const userWithoutPassword = user.toObject(); // Excluir la contraseña

    delete userWithoutPassword.password; // Eliminamos la contraseña antes de devolverla

    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para validar que el email no este registrado
const validateEmailController = async (req, res) => {
  const { email } = req.body;
  const isEmailRegistered = await validateEmail(email);
  res.status(200).json({ isEmailRegistered });
};  

// Controlador para actualizar el perfil del usuario
const updateUserController = async (req, res) => {
  const { userId } = req.params;
  const updatedUser = await updateUser(userId, req.body);
  res.status(200).json(updatedUser);
};


module.exports = {
  registerUserController,
  loginUserController,
  getUserProfileController,
  validateEmailController,
  updateUserController,
};
