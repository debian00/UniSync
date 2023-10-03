const {Router} = require('express');
const forgotPassHandler = require('../handlers/forgotPassHandler');

const forgotPassRouter = Router();

forgotPassRouter.post ('/', forgotPassHandler);

module.exports = forgotPassRouter