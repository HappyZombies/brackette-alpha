import { Router } from "express";

import IBracketteRoutes from "../IBracketteRoutes";
import UserRoutes from "./Users";
import TournamentsRoutes from "./Tournaments";

class BracketteApi implements IBracketteRoutes {
  routes: Router = Router();
  private userRoutes: UserRoutes = new UserRoutes();
  private tournamentsRoutes: TournamentsRoutes = new TournamentsRoutes();

  constructor() {
    this._defineRoutes();
  }

  _defineRoutes(): void {
    this.routes.use("/users", this.userRoutes.routes);
    this.routes.use("/tournaments", this.tournamentsRoutes.routes);
  }
}

export default BracketteApi;
