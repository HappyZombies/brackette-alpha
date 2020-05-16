const { Router } = require("express");
const { Container } = require("typedi");
const HttpStatus = require("http-status-codes");

const UsersService = require("../../services/UsersService");
const auth = require("../middleware/auth");

const route = Router();

module.exports = (app) => {
  // define route name
  app.use("/users", route);

  // define any middlewares
  route.use(auth);

  // define any specific routes here
  route.get("/", async (req, res, next) => {
    try {
      const userService = Container.get(UsersService);
      const data = await userService.getAllUsers();
      return res.json(data).status(HttpStatus.OK);
    } catch (e) {
      return next(e);
    }
  });

  route.get("/:id", async (req, res, next) => {
    try {
      const userService = Container.get(UsersService);
      const data = await userService.getUserById(req.params.id);
      return res.json(data).status(HttpStatus.OK);
    } catch (e) {
      return next(e);
    }
  });
};
