const router = require('express').Router();
const signupController = require('../../controllers/signupController');
const signupDataValidationController = require('../../controllers/signupDataValidationController');
const loginController = require('../../controllers/loginController');
const emailVerificationController = require('../../controllers/emailVerificationController');
const foodItemController = require('../../controllers/foodItemController');
const storeController = require('./../../controllers/storeController');
const checkAccess = require('../../services/checkAccess');
const userTypeController = require('../../controllers/userTypeController');
const userController = require('../../controllers/userController');

// User Routes
router.get('/users/:email', userController.getUserByEmail);

// Food Item Routes
router.post('/food-item', foodItemController.createFoodItem);
router.get('/food-item', foodItemController.getFoodItems);
router.put('/food-item/:id', foodItemController.updateFoodItem);
router.delete('/food-item/:id', foodItemController.deleteFoodItem);

console.log('UserAuthentication/routes/v1/authRouter.js');
// Authentication Routes
router.post('/signup', signupDataValidationController, signupController.signup);
router.post('/login', loginController.loginUser);
router.get('/verify-email', emailVerificationController.verifyEmail);
// Store Routes
router.post('/stores', checkAccess('createOwn', 'store'), storeController.createStore);
router.get('/stores/:storeId', storeController.getStoreById);
router.get('/stores', storeController.getAllStores);
router.put('/stores/:storeId',checkAccess('updateOwn', 'store'), storeController.updateStore);
router.delete('/stores/:storeId',checkAccess('deleteOwn', 'store'), storeController.deleteStore);
router.get('/stores/owner/:ownerId', storeController.getStoresByOwnerId);

// User Type Routes
router.post('/user-types', checkAccess('createAny', 'userType'), userTypeController.createUserType);
router.get('/user-types/:id', checkAccess('readAny', 'userType'), userTypeController.getUserType);
router.get('/user-types', userTypeController.getAllUserTypes);
router.put('/user-types/:id', checkAccess('updateAny', 'userType'), userTypeController.updateUserType);
router.delete('/user-types/:id', checkAccess('deleteAny', 'userType'), userTypeController.deleteUserType);



module.exports = router;