import { Router } from "express";

interface BracketteRoutes {
  routes: Router;
  _defineRoutes(): void;
}

export default BracketteRoutes;
