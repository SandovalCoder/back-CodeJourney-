const { body, validationResult } = require("express-validator");

const validateComment = [
  body("content")
    .notEmpty()
    .withMessage("Comment content is required")
    .isLength({ min: 2 })
    .withMessage("Comment content must have at least 2 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateComment };
