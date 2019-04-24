import { Request, Response, NextFunction } from "express";
import * as httpErrors from "http-errors";

import { IController } from "../RestController";
import Tournaments, { NewTournamentSchema } from "../../models/Tournaments";
import BracketteRequest from "./../../models/BracketteRequest";
import { generateRoomCode } from "../../utils";
import TournamentsControllerGets from "./get";

class TournamentsControllerCreates implements IController {
  getController = new TournamentsControllerGets();
  async createNew(req: BracketteRequest, res: Response): Promise<Response> {
    let body: Tournaments = req.body;
    body.roomCode = generateRoomCode();
    body.userId = req.user.id;
    let newTournament: Tournaments = null;
    try {
      newTournament = await Tournaments.query().insert(body);
    } catch (err) {
      const error = httpErrors(500, err.message);
      return res.status(error.statusCode).json(error);
    }
    let allTournaments: Tournaments[] = null;
    try {
      allTournaments = await this.getController.getAllTournamentsFromUser(
        req.user
      );
    } catch (err) {
      const error = httpErrors(500, err.message);
      return res.status(error.statusCode).json(error);
    }
    // ... sorry
    return res.json({ newTournament: newTournament.id, allTournaments });
  }
}

export default TournamentsControllerCreates;
