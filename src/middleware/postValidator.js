const { body, validationResult } = require("express-validator");

const validatePost = [
  body("title")
    .notEmpty()
    .withMessage("Post title is required")
    .isLength({ min: 2 })
    .withMessage("Post title must have at least 2 characters"),

  body("content")
    .notEmpty()
    .withMessage("Post content is required")
    .isLength({ min: 2 })
    .withMessage("Post content must have at least 2 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validatePost };
