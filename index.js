const v1AuthRouter = require('./routes/v1/authRouter');

console.log('UserAuthentication/index.js');
const combinedRouter = require('express').Router();

combinedRouter.use('/v1', v1AuthRouter);

module.exports = combinedRouter;