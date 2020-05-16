const Joi = require("@hapi/joi");

module.exports = {
  loginSchema: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
