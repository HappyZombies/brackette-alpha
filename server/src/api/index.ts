import { Router } from "express";
import mainApi from "./routes/api";
import admin from "./routes/admin";
import config from "../config";

const app = Router();
app.use(config.API.PREFIX, mainApi);
app.use(config.API.ADMIN, admin);

export default app;
