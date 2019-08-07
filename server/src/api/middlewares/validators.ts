import * as Joi from 'joi';

export const newUserValidation = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(255)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  token: Joi.string().required(),
  displayName: Joi.string()
    .min(3)
    .max(255)
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
});

export const loginUserSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object().keys({
  displayName: Joi.string(),
  email: Joi.string().email(),
  username: Joi.string(),
  currentUsername: Joi.string(),
  challongeKey: Joi.string().allow(''),
  facebookKey: Joi.string().allow(''),
  smashggKey: Joi.string().allow(''),
});

export const updateUserPasswordSchema = Joi.object().keys({
  password: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .required(),
  newPasswordConfirm: Joi.string()
    .min(8)
    .required(),
});

export const newTournamentSchema = Joi.object().keys({
  hoster: Joi.string().required(),
  nickname: Joi.string().required(),
  tournamentId: Joi.string().required(),
  subdomain: Joi.string()
    .allow('')
    .optional(),
});
