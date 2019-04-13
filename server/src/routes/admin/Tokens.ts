import { Router } from "express";

import IBracketteRoutes from "../IBracketteRoutes";
import TokenControllers from "../../controllers/tokenControllers";

class TokenRoutes implements IBracketteRoutes {
  routes: Router = Router();
  private controller: TokenControllers = new TokenControllers();
  constructor() {
    this._defineRoutes();
  }

  _defineRoutes(): void {
    this.definePosts();
  }

  private definePosts() {
    this.routes.post("/", this.controller.create.createNew);
  }
}

export default TokenRoutes;
