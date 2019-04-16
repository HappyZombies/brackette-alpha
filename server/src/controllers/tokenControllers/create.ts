import { Request, Response, NextFunction } from "express";
import * as httpErrors from "http-errors";

import { IController } from "../RestController";
import Tokens from "../../models/UserTokens";
import { generateToken } from "../../utils";

class TokenControllerCreates implements IController {
  async createNew(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    //TODO: do auth here / middleware to authenticate for admin.
    let token: Tokens;
    try {
      token = await Tokens.query()
        .insert({ token: generateToken() })
        .returning("*");
    } catch (err) {
      const error = httpErrors(500, err.message);
      return res.status(error.statusCode).json(error);
    }
    return res.json(token);
  }
}

export default TokenControllerCreates;
