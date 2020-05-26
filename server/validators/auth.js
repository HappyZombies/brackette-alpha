const Joi = require("@hapi/joi");

module.exports = {
  loginSchema: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  signupSchema: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    token: Joi.string().required(),
    displayName: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
