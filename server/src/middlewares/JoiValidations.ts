import * as Joi from "joi";
import * as createError from "http-errors";
import { Request, Response, NextFunction } from "express";

/**
 * Validates a defined Joi Schema before continuing the request.
 * @param {Joi.SchemaLike} schema A defined SchemaLike object
 */
export const joiValidation = (schema: Joi.SchemaLike) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.validate(req.body, schema);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(",");
      const err = createError(422, message);
      res.status(err.statusCode).json(err);
    }
  };
};
