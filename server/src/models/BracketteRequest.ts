import { Request } from "express";

import User from "./Users";

interface BracketteRequest extends Request {
  user: User;
}

export default BracketteRequest;
