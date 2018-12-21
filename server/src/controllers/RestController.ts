import { RequestHandler } from "express";

export interface Controller {}

export interface RestController {
  create: Controller;
  get: Controller;
  update: Controller;
  delete: Controller;
}
