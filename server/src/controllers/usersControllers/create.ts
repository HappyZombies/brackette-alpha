import { Request, Response, NextFunction } from "express";
import * as httpErrors from "http-errors";
import * as jsonwebtoken from "jsonwebtoken";

import { IController } from "../RestController";
import User from "../../models/Users";
import Tokens from "../../models/UserTokens";
import BracketteRequest from "../../models/BracketteRequest";
import { generateHash, validPassword } from "../../utils";
import CONFIG from "../../config";

class UsersControllerCreates implements IController {
  async createNew(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    let newUser: User;
    let userToken: Tokens;
    let body: User = req.body;
    // check if the token is valid or taken already.
    try {
      userToken = await Tokens.query()
        .where("token", body.token)
        .first();
    } catch (err) {
      const error = httpErrors(500, err.message);
      return res.status(error.statusCode).json(error);
    }

    if (!userToken) {
      const error = httpErrors(
        401,
        "This token is incorrect or has been used already."
      );
      return res.status(error.statusCode).json(error);
    }
    if (userToken.userId) {
      const error = httpErrors(
        401,
        "This token is incorrect or has been used already."
      );
      return res.status(error.statusCode).json(error);
    }

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
      const error = httpErrors(
        409,
        "A user with this username already exists."
      );
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

    // update the user tokens with the new user id
    try {
      await Tokens.query()
        .patch({ userId: newUser.id })
        .where("id", userToken.id)
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
    let foundUser: User;
    const body: User = req.body;

    try {
      foundUser = await User.query()
        .column("id", "username", "email", "password", "displayName")
        .where("username", body.username)
        .first();
    } catch (err) {
      const error = httpErrors(500, err.message);
      return res.status(error.statusCode).json(error);
    }
    if (!foundUser) {
      // this user does not exist, but throw the same error message anyways.
      const error = httpErrors(401, "Incorrect username and/or password.");
      return res.status(error.statusCode).json(error);
    }

    // the user does exist, so check password
    if (!validPassword(body.password, foundUser.password)) {
      const error = httpErrors(401, "Incorrect username and/or password.");
      return res.status(error.statusCode).json(error);
    }
    // TODO: store things like ip address, # of logins, etc.
    delete foundUser.password;
    const token = jsonwebtoken.sign({ data: foundUser }, CONFIG.JWT_SECRET);
    return res.json({ accessToken: token });
  }

  async validate(req: BracketteRequest, res: Response): Promise<Response> {
    let user: User;
    if (req.user) {
      try {
        user = await User.query()
          .column("*")
          .where("id", req.user.id)
          .first();
      } catch (err) {
        const error = httpErrors(500, err.message);
        return res.status(error.statusCode).json(error);
      }
      delete user.password;
      return res.json(user);
    }
    return res.status(401).json({ message: "Invalid credentials." });
  }
}

export default UsersControllerCreates;
