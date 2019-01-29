import { Router } from "express";

import BracketteApi from "./api";
import BracketteAdmin from "./admin";
import IBracketteRoutes from "./IBracketteRoutes";

class AllRoutes implements IBracketteRoutes {
  routes: Router = Router();
  private apiRoutes: BracketteApi = new BracketteApi();
  private adminRoutes: BracketteAdmin = new BracketteAdmin();

  constructor() {
    this._defineRoutes();
  }

  _defineRoutes(): void {
    this.routes.use("/api", this.apiRoutes.routes);
    this.routes.use("/admin", this.adminRoutes.routes);
  }
}

export default AllRoutes;
