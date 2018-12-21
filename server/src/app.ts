import * as express from "express";
import * as bodyParser from "body-parser";
import * as boom from "express-boom";
import * as morgan from "morgan";

import AllRoutes from "./routes";

class App {
  public app: express.Application;
  public allRoutes: AllRoutes = new AllRoutes();
  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(boom());
    this.app.use(morgan("combined"));
    this.app.use("/", this.allRoutes.routes);
  }
}

export default new App().app;
