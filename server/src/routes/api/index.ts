import { Router } from "express";
import SomeRoute from "./SomeRoutes";
import BracketteRoutes from "routes/BracketteRoutes";

class BracketteApi implements BracketteRoutes {
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
