import { Router } from "express";

import IBracketteRoutes from "../IBracketteRoutes";
import SomeRoute from "./SomeRoutes";
import UserRoutes from "./Users";

class BracketteApi implements IBracketteRoutes {
  routes: Router = Router();
  private someRoute: SomeRoute = new SomeRoute();
  private userRoutes: UserRoutes = new UserRoutes();

  constructor() {
    this._defineRoutes();
  }

  _defineRoutes(): void {
    this.routes.use("/someRoutes", this.someRoute.routes);
    this.routes.use("/users", this.userRoutes.routes)
  }
}

export default BracketteApi;
