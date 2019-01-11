import { Router } from "express";

interface IBracketteRoutes {
  routes: Router;
  _defineRoutes(): void;
}

export default IBracketteRoutes;
