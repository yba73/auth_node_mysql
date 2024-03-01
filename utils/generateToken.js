const jwt = require("jsonwebtoken");

const generateToken = (sub, role) => {
  return jwt.sign({ sub, role }, process.env.SECRET_KEY);
};

module.exports = generateToken;
