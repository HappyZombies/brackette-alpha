import { Router } from "express";

import IBracketteRoutes from "../IBracketteRoutes";

class UserRoutes implements IBracketteRoutes {
    routes: Router = Router();
    constructor() {
        this._defineRoutes();
    }

    _defineRoutes(): void {
        this.defineGets();
    }

    private defineGets(): void {
        this.routes.get("/", () => { });
        this.routes.get("/:username", () => { });
    }

    private definePosts() {
        this.routes.get("/login", () => { });
        this.routes.get("/register", () => { });
    }
}

export default UserRoutes;
