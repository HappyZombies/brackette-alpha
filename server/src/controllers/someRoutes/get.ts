import { Request, Response, NextFunction } from "express";
import { Controller } from "../RestController";

const dummyUser = [{ id: "123", name: "jacob" }, { id: "1233", name: "daniel" }];

class SomeRouterGets implements Controller {
  getAll(req: Request, res: Response): Response {
    return res.json(dummyUser);
  }

  getOne(req: Request, res: Response): Response {
    const user = dummyUser[req.params.arrPos];
    return res.json(user ? user : {});
  }
}

export default SomeRouterGets;
