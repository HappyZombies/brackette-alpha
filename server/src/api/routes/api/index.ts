import { Router } from "express";
import user from "./user";
import tournaments from "./tournaments";

const app = Router();
user(app);
tournaments(app);

export default app;
