import { Router } from "express";

import IBracketteRoutes from "../IBracketteRoutes";
import TournamentsControllers from "../../controllers/tournamentsControllers";
import middlewares from "../../middlewares";
import {
  NewUserSchema,
  LoginUserSchema,
  UpdateUserSchema,
  UpdateUserPasswordSchema
} from "../../models/Users";

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
    this.routes.get("/", middlewares.validateJwt, this.controller.get.getAll);
    this.routes.get(
      "/:tourId",
      middlewares.validateJwt,
      this.controller.get.getOne
    );
  }

  private definePosts() {}

  private definePuts() {}
}

export default UserRoutes;
