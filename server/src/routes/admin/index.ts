import { Router } from "express";

import IBracketteRoutes from "../IBracketteRoutes";
import Tokens from "./Tokens";

class BracketteAdmin implements IBracketteRoutes {
  routes: Router = Router();
  private tokenRoutes: Tokens = new Tokens();

  constructor() {
    this._defineRoutes();
  }

  _defineRoutes(): void {
    this.routes.use("/tokens", this.tokenRoutes.routes);
  }
}

export default BracketteAdmin;
