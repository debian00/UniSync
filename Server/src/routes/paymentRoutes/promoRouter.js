const { Router } = require("express");
const sendMail = require("../../handlers/promoHandler");

const promoRouter = Router();

promoRouter.post('/', sendMail);

module.exports = promoRouter