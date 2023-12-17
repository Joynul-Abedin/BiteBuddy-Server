const router = require('express').Router();
const signupController = require('../../controllers/signupController');
const signupDataValidationController = require('../../controllers/signupDataValidationController');
const loginController = require('../../controllers/loginController');
const emailVerificationController = require('../../controllers/emailVerificationController');
const foodItemController = require('../../controllers/foodItemController');
const storeController = require('./../../controllers/storeController');

router.post('/food-item', foodItemController.createFoodItem);
router.get('/food-item', foodItemController.getFoodItems);
router.put('/food-item/:id', foodItemController.updateFoodItem);
router.delete('/food-item/:id', foodItemController.deleteFoodItem);
console.log('UserAuthentication/routes/v1/authRouter.js');
router.post('/signup', signupDataValidationController, signupController.signup);
router.post('/login', loginController.loginUser);
router.get('/verify-email', emailVerificationController.verifyEmail);
router.post('/stores', storeController.createStore);
router.get('/stores/:storeId', storeController.getStoreById);
router.get('/stores', storeController.getAllStores);
router.put('/stores/:storeId', storeController.updateStore);
router.delete('/stores/:storeId', storeController.deleteStore);
router.get('/stores/owner/:ownerId', storeController.getStoresByOwnerId);


module.exports = router;