import { Router } from "express";

import IBracketteRoutes from "../IBracketteRoutes";
import UsersControllers from "../../controllers/usersControllers";

class UserRoutes implements IBracketteRoutes {
    routes: Router = Router();
    private controller: UsersControllers = new UsersControllers();
    constructor() {
        this._defineRoutes();
    }

    _defineRoutes(): void {
        this.defineGets();
    }

    private defineGets(): void {
        this.routes.get("/", this.controller.get.getAll);
        this.routes.get("/:username", this.controller.get.getOne);
    }

    private definePosts() {
        this.routes.get("/login", () => { });
        this.routes.get("/register", () => { });
    }
}

export default UserRoutes;
