import { Router } from "express";
import SomeRoute from "./api/SomeRoutes";
import BracketteApi from "./api";
import BracketteRoutes from "./BracketteRoutes";

class AllRoutes implements BracketteRoutes {
  routes: Router = Router();
  private apiRoutes: BracketteApi = new BracketteApi();
  constructor() {
    this._defineRoutes();
  }
  _defineRoutes(): void {
    this.routes.use("/api", this.apiRoutes.routes);
  }
}

export default AllRoutes;
