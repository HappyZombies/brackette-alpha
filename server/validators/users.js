const Joi = require("@hapi/joi");

module.exports = {
  updateUserSchema: Joi.object().keys({
    displayName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    username: Joi.string().optional(),
    facebookKey: Joi.string().optional(),
    challongeKey: Joi.string().optional(),
    smashggKey: Joi.string().optional(),
  }),
  updatePasswordSchema: Joi.object().keys({
    password: Joi.string().required(),
    newPassword: Joi.string().required(),
    newPasswordConfirm: Joi.string().required(),
  }),
};
