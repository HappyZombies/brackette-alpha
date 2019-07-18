import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import * as HttpStatus from "http-status-codes";
import TournamentService from "../../../services/TournamentService";
import middlewares from "../../middlewares";
import { ITournamentCreateDTO } from "interfaces/ITournament";

const route = Router();

export default (app: Router) => {
  app.use("/tournaments", route);

  route.get(
    "/",
    middlewares.validateJwt,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get("logger");
      logger.debug("Entering GET - tournaments/  endpoint.");
      try {
        const tournamentServiceInstance = Container.get(TournamentService);
        const tournaments = await tournamentServiceInstance.findTournamentsByUserId(
          req.currentUser.id
        );
        return res.json(tournaments).status(HttpStatus.OK);
      } catch (e) {
        logger.error("Error: %o", e);
        return next(e);
      }
    }
  );

  route.get(
    "/:tournamentId",
    middlewares.validateJwt,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get("logger");
      logger.debug("Entering GET - tournaments/:tournamentId  endpoint.");
      try {
        const tournamentServiceInstance = Container.get(TournamentService);
        const tournaments = await tournamentServiceInstance.findTournamentByIdAndUserId(
          req.params.tournamentId,
          req.currentUser.id
        );
        return res.json(tournaments).status(HttpStatus.OK);
      } catch (e) {
        logger.error("Error: %o", e);
        return next(e);
      }
    }
  );

  route.post(
    "/",
    [
      middlewares.validateJwt,
      middlewares.joiValidation(
        middlewares.validatorsSchemas.newTournamentSchema
      )
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get("logger");
      logger.debug("Entering POST - tournaments/  endpoint.");
      try {
        const tournamentServiceInstance = Container.get(TournamentService);
        const tournanament = await tournamentServiceInstance.createNew(
          req.currentUser.id,
          req.body as ITournamentCreateDTO
        );
        return res.json(tournanament).status(HttpStatus.OK);
      } catch (e) {
        logger.error("Error: %o", e);
        return next(e);
      }
    }
  );
};
