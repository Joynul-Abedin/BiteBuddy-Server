const { validationResult, body } = require('express-validator');
const userService = require('../services/userService');

const signupDataValidationController = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters')
    .trim(),

  body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        throw new Error('User already exists');
      }
    })
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
 
  (req, res, next) => {
    console.log('signupDataValidationController.js', req.body);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = signupDataValidationController;
