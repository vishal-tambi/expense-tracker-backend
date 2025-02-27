const jwt = require('jsonwebtoken');

const generateToken = (userId, secret, expiresIn) => {
  return jwt.sign({ userId }, secret, { expiresIn });
};

module.exports = generateToken;