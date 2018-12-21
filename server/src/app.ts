import * as express from "express";
import * as bodyParser from "body-parser";
import * as boom from "express-boom";
import * as morgan from "morgan";

import { Routes } from './routes/SomeRoute';

class App {

    public app: express.Application;

    public routePrv: Routes = new Routes();
    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(boom());
        this.app.use(morgan("combined"));
        this.routePrv.routes(this.app);
    }

}

export default new App().app;
