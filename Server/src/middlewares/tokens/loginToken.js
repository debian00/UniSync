require('dotenv').config();
const jwt = require('jsonwebtoken');

const loginToken = async (user) => {
  return jwt.sign({
    _id: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {expiresIn: "1h"})
}

module.exports = {loginToken}