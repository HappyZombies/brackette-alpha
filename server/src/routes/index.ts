import { Router } from "express";

import BracketteApi from "./api";
import IBracketteRoutes from "./IBracketteRoutes";

class AllRoutes implements IBracketteRoutes {
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
