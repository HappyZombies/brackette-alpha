import { Request } from "express";
import User from "./Users";

export default interface BracketteRequest extends Request {
    user: User;
}
