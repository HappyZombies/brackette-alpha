import { Request, Response, NextFunction } from "express";
import * as httpErrors from "http-errors";
import * as jsonwebtoken from "jsonwebtoken";

import { IController } from "../RestController";
import User from "../../models/Users";
import BracketteRequest from "../../models/BracketteRequest";
import { generateHash } from "../../utils/auth";
import CONFIG from "../../config";

class UsersControllerCreates implements IController {
  async createNew(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let newUser: User;
    let body: User = req.body;

    // username taken?
    try {
      newUser = await User.query()
        .where("username", body.username)
        .first();
    } catch (err) {
      const error = httpErrors(500, err.message);
      return res.status(error.statusCode).json(error);
    }
    if (newUser) {
      const error = httpErrors(409, "A user with this username already exists.");
      return res.status(error.statusCode).json(error);
    }

    // email taken?
    try {
      newUser = await User.query()
        .where("email", body.email)
        .first();
    } catch (err) {
      const error = httpErrors(500, err.message);
      return res.status(error.statusCode).json(error);
    }
    if (newUser) {
      const error = httpErrors(409, "A user with this email already exists.");
      return res.status(error.statusCode).json(error);
    }

    // all is good, continue creating the user.
    body.password = generateHash(body.password);
    try {
      newUser = await User.query()
        .insert(body)
        .returning("*");
    } catch (err) {
      const error = httpErrors(500, err.message);
      return res.status(error.statusCode).json(error);
    }
    // user was created, give them the JSON token so they can just log in instantly.
    if (newUser) {
      newUser.password = "";
      const token = jsonwebtoken.sign({ data: newUser }, CONFIG.JWT_SECRET);
      return res.status(201).json({
        message: "User created succesfully.",
        accessToken: token
      });
    }
    // ... something happened?
    const weirdError = httpErrors(400, "Error Creating the User!");
    return res.status(weirdError.statusCode).json(weirdError);
  }

  async login(req: BracketteRequest, res: Response): Promise<Response> {
    return res.json(req.body);
  }
}

export default UsersControllerCreates;
