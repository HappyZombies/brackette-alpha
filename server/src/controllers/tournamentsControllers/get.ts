import { Request, Response, NextFunction } from "express";

import { IController } from "../RestController";
import Tournaments from "../../models/Tournaments";
import BracketteRequest from "./../../models/BracketteRequest";

class TournamentsControllerGets implements IController {
  // Retrieve only the basic information needed to display all tournaments on dashboard.
  // only a logged in user with appropriate credentials can retrieve their tournaments.
  async getAll(req: BracketteRequest, res: Response): Promise<Response> {
    const data: Tournaments[] = await Tournaments.query()
      .column("id", "nickname", "hoster")
      .where("userId", req.user.id);
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
    return res.json(data);
  }
}

export default TournamentsControllerGets;
