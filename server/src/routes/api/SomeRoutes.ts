import { Router } from "express";
import BracketteRoutes from "../BracketteRoutes";
import SomeRoutesControllers from "../../controllers/someRoutes";

class SomeRoutes implements BracketteRoutes {
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
