import { Model } from "objection";
import * as Joi from "joi";
import { join } from "bluebird";

export default class User extends Model {
  static tableName = "users";
  readonly id!: number;
  username!: string;
  email!: string;
  password!: string;
  displayName!: string;
  facebookKey?: string;
  challongeKey?: string;
  smashggKey?: string;
  createdAt?: Date;
  updatedAt?: Date;

  static jsonSchema = {
    type: "object",
    required: ["username", "email", "displayName", "password"],
    properties: {
      id: { type: "integer" },
      username: { type: "string", minLength: 3, maxLength: 255 },
      email: { type: "string", minLength: 3, maxLength: 255 },
      displayName: { type: "string", minLength: 3, maxLength: 255 },
      password: { type: "string", minLength: 8, maxLength: 255 },
      facebookKey: { type: ["string", "null"] },
      challongeKey: { type: ["string", "null"] },
      smashggKey: { type: ["string", "null"] }
    }
  };
}

export const NewUserSchema = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(255)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  displayName: Joi.string()
    .min(3)
    .max(255)
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .options({
      language: {
        any: {
          allowOnly: "must match password"
        }
      }
    })
});

export const LoginUserSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});
