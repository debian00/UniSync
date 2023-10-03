const {Router} = require('express');
const {resetPassHandler} = require('../handlers/resetPassHandler');

const resetPasswordRouter = Router();

resetPasswordRouter.post('/:id/:token',resetPassHandler);

module.exports = resetPasswordRouter;