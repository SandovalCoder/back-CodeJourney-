const { body, validationResult } = require("express-validator");

const validateUser = [
  body("name")
    .notEmpty()
    .withMessage("The name is required")
    .isLength({ min: 2 })
    .withMessage("Name must have at least 2 characters"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name must have at least 2 characters"),

  body("email")
    .notEmpty()
    .withMessage("The email is required")
    .isEmail()
    .withMessage("The email must be valid")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("The password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateUser };
