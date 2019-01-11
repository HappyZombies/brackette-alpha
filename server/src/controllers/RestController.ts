import { RequestHandler } from "express";

export interface IController { }

export interface IRestController {
  create: IController;
  get: IController;
  update: IController;
  delete: IController;
}
