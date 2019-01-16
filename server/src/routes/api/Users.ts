import { Router } from "express";

import IBracketteRoutes from "../IBracketteRoutes";
import UsersControllers from "../../controllers/usersControllers";
import middlewares from "../../middlewares";
import { NewUserSchema } from "../../models/Users";

class UserRoutes implements IBracketteRoutes {
  routes: Router = Router();
  private controller: UsersControllers = new UsersControllers();
  constructor() {
    this._defineRoutes();
  }

  _defineRoutes(): void {
    this.defineGets();
    this.definePosts();
  }

  private defineGets(): void {
    this.routes.get("/", this.controller.get.getAll);
    this.routes.get("/:username", this.controller.get.getOne);
  }

  private definePosts() {
    this.routes.post("/login", () => {});
    this.routes.post("/register", middlewares.joiValidation(NewUserSchema), this.controller.create.createNew);
  }
}

export default UserRoutes;
