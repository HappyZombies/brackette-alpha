import { Router } from "express";

import IBracketteRoutes from "../IBracketteRoutes";
import UsersControllers from "../../controllers/usersControllers";
import middlewares from "../../middlewares";
import {
  NewUserSchema,
  LoginUserSchema,
  UpdateUserSchema,
  UpdateUserPasswordSchema
} from "../../models/Users";

class UserRoutes implements IBracketteRoutes {
  routes: Router = Router();
  private controller: UsersControllers = new UsersControllers();
  constructor() {
    this._defineRoutes();
  }

  _defineRoutes(): void {
    this.defineGets();
    this.definePosts();
    this.definePuts();
  }

  private defineGets(): void {
    this.routes.get("/", middlewares.validateJwt, this.controller.get.getAll);
    this.routes.get(
      "/:username/taken",
      middlewares.validateJwt,
      this.controller.get.usernameTaken.bind(this.controller.get)
    );
    this.routes.get(
      "/:username",
      middlewares.validateJwt,
      this.controller.get.getOne.bind(this.controller.get)
    );
  }

  private definePosts() {
    this.routes.post(
      "/login",
      middlewares.joiValidation(LoginUserSchema),
      this.controller.create.login
    );
    this.routes.post(
      "/register",
      middlewares.joiValidation(NewUserSchema),
      this.controller.create.createNew
    );
    this.routes.post(
      "/validate",
      middlewares.validateJwt,
      this.controller.create.validate
    );
  }

  private definePuts() {
    this.routes.put(
      "/update",
      [middlewares.validateJwt, middlewares.joiValidation(UpdateUserSchema)],
      this.controller.update.updateUser
    );
    this.routes.put(
      "/update-password",
      [
        middlewares.validateJwt,
        middlewares.joiValidation(UpdateUserPasswordSchema)
      ],
      this.controller.update.updatePassword
    );
  }
}

export default UserRoutes;
