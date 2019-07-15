import { Request, Response, NextFunction } from "express";
import * as httpErrors from "http-errors";

import { IController } from "../RestController";
import Tournaments from "../../models/Tournaments";
import BracketteRequest from "./../../models/BracketteRequest";
import User from "models/Users";

class TournamentsControllerGets implements IController {
  // Retrieve only the basic information needed to display all tournaments on dashboard.
  // only a logged in user with appropriate credentials can retrieve their tournaments.
  async getAll(req: BracketteRequest, res: Response): Promise<Response> {
    let data: Tournaments[] = null;
    try {
      data = await this.getAllTournamentsFromUser(req.user);
    } catch (err) {
      const error = httpErrors(500, err.message);
      return res.status(error.statusCode).json(error);
    }
    return res.json(data);
  }

  async getOne(req: BracketteRequest, res: Response): Promise<Response> {
    const data: Tournaments = await Tournaments.query()
      .findById(req.params.tourId)
      .eager("user")
      .modifyEager("user", b => {
        b.column("username");
      })
      .where("userId", req.user.id)
      .first();
    if (!data) {
      const error = httpErrors(
        404,
        "Tournament not found, or you don't have access to view this tournament."
      );
      return res.status(error.statusCode).json(error);
    }
    return res.json(data);
  }

  async getAllTournamentsFromUser(user: User) {
    return await Tournaments.query()
      .column("id", "nickname", "hoster")
      .where("userId", user.id);
  }
}

export default TournamentsControllerGets;
