import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const joiValidation = (schema: Joi.SchemaLike) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.validate(req.body, schema);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(",");

      console.log("error", message);
      res.status(422).json({ error: message });
    }
  };
};
