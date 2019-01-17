import * as jsonwebtoken from "jsonwebtoken";
import * as createError from "http-errors";
import { Request, Response, NextFunction } from "express";
import BracketteRequest from "../models/BracketteRequest";
import CONFIG from "../config";

export default class Jwt {

    private static
}


export const validateJwt = async (req: BracketteRequest, res: Response, next: NextFunction) => {
    const jwtToken = retrieveJwt(req);
    if (!jwtToken) {
        const error = createError(401, "Invalid Credentials.");
        res.status(error.statusCode).json(error);
        return;
    }

    // check if jwt is valid
    try {
        const decoded = <any>(await jsonwebtoken.verify(jwtToken, CONFIG.JWT_SECRET));
        req.user = decoded.data || decoded; // add the user to the request anytime this middleware is used.
    } catch (err) {
        //If it's an expiration error, let's report that specifically.
        if (err.name === "TokenExpiredError") {
            const error = createError(401, "Invalid Credentials. This token is timed out!");
            res.status(error.statusCode).json(error);
            return;
        }
        // whatever
        const error = createError(401, "Invalid Credentials");
        res.status(error.statusCode).json(error);
        return;
    }
    // good to go, continue with the user attached to the request.
    next();
}

function retrieveJwt(req: Request) {
    if (!req.headers || !req.headers.authorization) {
        return null;
    }
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];
        if (scheme === "Bearer:") {
            return credentials;
        }
    }
    return null;
}
