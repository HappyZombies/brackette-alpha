import { Request, Response, NextFunction } from "express";
import * as httpErrors from "http-errors";

import { IController } from "../RestController";
import User from "../../models/Users";
import BracketteRequest from "models/BracketteRequest";
import { compareSync } from "bcrypt-nodejs";

class UsersControllerGets implements IController {
  async getAll(req: Request, res: Response): Promise<Response> {
    const data: User[] = await User.query().column("username", "displayName");
    return res.json(data);
  }

  async getOne(req: BracketteRequest, res: Response): Promise<Response> {
    let user: User;
    try {
      user = await this.retrieveByUsername(req.params.username);
    } catch (e) {
      const error = httpErrors(500, "Some server error occured.");
      return res.status(error.statusCode).json(error);
    }
    if (!user) {
      const error = httpErrors(404, "User not found.");
      return res.status(error.statusCode).json(error);
    }
    if (user.username === req.user.username) {
      // just return the jwt data...
      const user = { ...req.user };
      delete user.id;
      return res.json(user);
    }
    return res.json(user);
  }

  async usernameTaken(req: BracketteRequest, res: Response): Promise<Response> {
    let user: User;
    try {
      user = await this.retrieveByUsername(req.params.username);
    } catch (e) {
      const error = httpErrors(500, "Some server error occured.");
      return res.status(error.statusCode).json(error);
    }
    if (user) {
      const error = httpErrors(409, "Username is already taken.");
      return res.status(error.statusCode).json(error);
    }
    return res.status(202).json({ username: "available" });
  }

  taken(req: Request, res: Response): Response {
    return res.json({ info: "Use this end point to validate a username." });
  }

  private async retrieveByUsername(username: string): Promise<User> {
    let user: User;
    try {
      user = await User.query()
        .column("username", "displayName")
        .where("username", username ? username : "")
        .first();
    } catch (err) {
      return err.message;
    }
    if (!user) {
      return null;
    }
    return user;
  }
}

export default UsersControllerGets;
