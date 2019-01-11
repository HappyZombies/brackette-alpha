import { Router } from "express";

import SomeRoutesControllers from "../../controllers/someRoutes";
import IBracketteRoutes from "../IBracketteRoutes";
class SomeRoutes implements IBracketteRoutes {
  routes: Router = Router();
  private controller: SomeRoutesControllers = new SomeRoutesControllers();
  constructor() {
    this._defineRoutes();
  }

  _defineRoutes(): void {
    this.routes.get("/", this.controller.get.getAll);
    this.routes.get("/:arrPos", this.controller.get.getOne);
  }
}

export default SomeRoutes;
