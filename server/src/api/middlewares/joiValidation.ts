import { NextFunction, Request, Response } from 'express';
import * as createError from 'http-errors';
import * as Joi from 'joi';
/**
 * Validates a defined Joi Schema before continuing the request.
 * @param {Joi.SchemaLike} schema A defined SchemaLike object
 */
export const joiValidation = (schema: Joi.SchemaLike) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.validate(req.body, schema);
    if (error == null) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      const err = createError(422, message);
      return res.status(err.statusCode).json({ error: err });
    }
  };
};
