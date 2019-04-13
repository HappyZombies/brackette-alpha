import { Router } from "express";

import IBracketteRoutes from "../IBracketteRoutes";
import UserRoutes from "./Users";

class BracketteApi implements IBracketteRoutes {
  routes: Router = Router();
  private userRoutes: UserRoutes = new UserRoutes();

  constructor() {
    this._defineRoutes();
  }

  _defineRoutes(): void {
    this.routes.use("/users", this.userRoutes.routes);
  }
}

export default BracketteApi;
