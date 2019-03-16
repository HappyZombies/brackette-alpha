import { Request, Response, NextFunction } from "express";
import * as httpErrors from "http-errors";

import { IController } from "../RestController";
import User from "../../models/Users";
import BracketteRequest from "models/BracketteRequest";
import { generateHash, validPassword } from "../../utils/auth";

class UsersControllerUpdates implements IController {
    async updateUser(req: BracketteRequest, res: Response): Promise<Response> {
        let body: User = req.body;
        let user: User;
        try {
            user = await User.query()
                .patch({ ...body })
                .where("username", req.user.username)
                .first();
        } catch (err) {
            const error = httpErrors(500, err.message);
            return res.status(error.statusCode).json(error);
        }
        if (!user) {
            const error = httpErrors(401, "User update failed because user was not found or you're not allowed to do that.");
            return res.status(error.statusCode).json(error);
        }
        return res.json({ message: "Success!" });
    }
    async updatePassword(req: BracketteRequest, res: Response): Promise<Response> {
        let body: any = req.body;
        let user: User;
        if (body.newPassword !== body.newPasswordConfirm) {
            const error = httpErrors(400, "Passwords must match.");
            return res.status(error.statusCode).json(error);
        }
        try {
            user = await User.query()
                .column("*")
                .where("username", req.user.username)
                .first();
        } catch (err) {
            const error = httpErrors(500, err.message);
            return res.status(error.statusCode).json(error);
        }
        if (!validPassword(body.password, user.password)) {
            const error = httpErrors(401, "Unauthorized.");
            return res.status(error.statusCode).json(error);
        }
        const newpassword = generateHash(body.newPassword);
        try {
            user = await User.query()
                .patch({ password: newpassword })
                .where("username", req.user.username)
                .returning("*").first();
        } catch (err) {
            const error = httpErrors(500, err.message);
            return res.status(error.statusCode).json(error);
        }
        return res.json({ message: "Success!" });
    }
}

export default UsersControllerUpdates;
