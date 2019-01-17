import { Request, Response, NextFunction } from "express";
import * as httpErrors from "http-errors";

import { IController } from "../RestController";
import User from "../../models/Users";
import BracketteRequest from "models/BracketteRequest";

class UsersControllerGets implements IController {
  async getAll(req: Request, res: Response): Promise<Response> {
    const data: User[] = await User.query().column("username", "displayName");
    return res.json(data);
  }

  async getOne(req: BracketteRequest, res: Response): Promise<Response> {
    let user: User;
    try {
      user = await User.query()
        .column("username", "displayName")
        .where("username", req.params.username)
        .first();
    } catch (err) {
      const error = httpErrors(500, err.message);
      return res.status(error.statusCode).json(error);
    }
    if (!user) {
      const error = httpErrors(404, "User not found.");
      return res.status(error.statusCode).json(error);
    }
    if (user.username === req.user.username) {
      // just return the jwt data...
      return res.json(req.user);
    }

    return res.json(user);
  }
}

export default UsersControllerGets;
