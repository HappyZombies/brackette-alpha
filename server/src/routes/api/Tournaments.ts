import { Router } from "express";

import IBracketteRoutes from "../IBracketteRoutes";
import TournamentsControllers from "../../controllers/tournamentsControllers";
import middlewares from "../../middlewares";
import { NewTournamentSchema } from "../../models/Tournaments";

class UserRoutes implements IBracketteRoutes {
  routes: Router = Router();
  private controller: TournamentsControllers = new TournamentsControllers();
  constructor() {
    this._defineRoutes();
  }

  _defineRoutes(): void {
    this.defineGets();
    this.definePosts();
    this.definePuts();
  }

  private defineGets(): void {
    this.routes.get(
      "/",
      middlewares.validateJwt,
      this.controller.get.getAll.bind(this.controller.get)
    );
    this.routes.get(
      "/:tourId",
      middlewares.validateJwt,
      this.controller.get.getOne.bind(this.controller.get)
    );
  }

  private definePosts() {
    this.routes.post(
      "/",
      [middlewares.validateJwt, middlewares.joiValidation(NewTournamentSchema)],
      this.controller.create.createNew.bind(this.controller.create)
    );
  }

  private definePuts() {}
}

export default UserRoutes;
