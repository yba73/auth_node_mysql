const Joi = require("joi");

// Validate data from client to register user info
/*======= ValdiateRegister ========*/
const valdiateRegister = (obj) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(4).max(100).trim().email().required(),
    username: Joi.string().trim().min(3).max(100).required(),
    password: Joi.string().trim().min(6).trim().required(),
    password_confirmation: Joi.any().valid(Joi.ref("password")).required(),
    workplace: Joi.string().trim().min(4).max(100).trim().required(),
    profile: Joi.string().trim().min(4).max(100).trim().required(),
    role: Joi.string(),
  });
  return schema.validate(obj);
};
/*=======// ValdiateRegister //========*/

/*======= valdiateLogin ========*/
const valdiateLogin = (obj) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(4).max(100).trim().email().required(),
    password: Joi.string().trim().min(6).trim().required(),
  });
  return schema.validate(obj);
};
/*=======// valdiateLogin //========*/
/*======= valdiateUpdatedUser ========*/
const valdiateUpdatedUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(3).max(100).required(),
    workplace: Joi.string().trim().min(4).max(100).trim().required(),
    profile: Joi.string().trim().min(4).max(100).trim().required(),
  });
  return schema.validate(obj);
};
/*=======// valdiateUpdatedUser //========*/

module.exports = {
  valdiateRegister,
  valdiateUpdatedUser,
  valdiateLogin,
};
