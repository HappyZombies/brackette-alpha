import { Router } from "express";

import IBracketteRoutes from "../IBracketteRoutes";
import SomeRoute from "./SomeRoutes";

class BracketteApi implements IBracketteRoutes {
  routes: Router = Router();
  private someRoute: SomeRoute = new SomeRoute();

  constructor() {
    this._defineRoutes();
  }

  _defineRoutes(): void {
    this.routes.use("/someRoutes", this.someRoute.routes);
  }
}

export default BracketteApi;
