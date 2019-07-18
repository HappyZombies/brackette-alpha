import { Router, Request, Response } from "express";
import { Container } from "typedi";
import * as HttpStatus from "http-status-codes";
import TokenService from "../../../services/TokenService";

const route = Router();

export default (app: Router) => {
  app.use("/tokens", route);

  route.post("/", async (req: Request, res: Response) => {
    const tokenServiceInstance = Container.get(TokenService);
    const token = await tokenServiceInstance.generateNewToken();
    return res.json(token).status(HttpStatus.OK);
  });
};
