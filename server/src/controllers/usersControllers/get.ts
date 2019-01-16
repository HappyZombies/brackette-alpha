import { Request, Response, NextFunction } from "express";
import { IController } from "../RestController";
import User from "../../models/Users";
import BracketteRequest from "models/BracketteRequest";

class UsersControllerGets implements IController {
    async getAll(req: Request, res: Response): Promise<Response> {
        const data: User[] = await User.query().column("username", "displayName");
        return res.json(data);
    }

    async getOne(req: BracketteRequest, res: Response): Promise<Response> {
        const data: User[] = await User.query().column("username", "displayName");
        return res.json(data[0]);
    }

}

export default UsersControllerGets;
