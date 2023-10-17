
const {Router} = require('express');
const sendMail = require('../../handlers/emailHandler');

const emailContact = Router();

emailContact.post ('/', sendMail);
module.exports = emailContact