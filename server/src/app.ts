import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as knex from "knex";

import AllRoutes from "./routes";
import { Model } from "objection";
const knexConfig = require("./knexfile");

class App {
  public app: express.Application;
  public allRoutes: AllRoutes = new AllRoutes();
  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    const k = knex(knexConfig.development);
    Model.knex(k);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(morgan("combined"));
    this.app.use("/", this.allRoutes.routes);
  }
}

export default new App().app;
