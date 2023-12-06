const router = require('express').Router();
const signupController = require('../../controllers/signupController');
const signupDataValidationController = require('../../controllers/signupDataValidationController');
const loginController = require('../../controllers/loginController');
const emailVerificationController = require('../../controllers/emailVerificationController');

console.log('UserAuthentication/routes/v1/authRouter.js');
router.post('/signup', signupDataValidationController, signupController.signup);
router.post('/login', loginController.loginUser);
router.get('/verify-email', emailVerificationController.verifyEmail);
 
module.exports = router;