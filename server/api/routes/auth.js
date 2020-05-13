const { Router } = require("express");
const { Container } = require("typedi");
const HttpStatus = require("http-status-codes");

const AuthService = require("../../services/AuthService");

const route = Router();

module.exports = app => {
  app.use("/auth", route);

  route.post("/login", async (req, res, next) => {
    const authService = Container.get(AuthService);
    try {
      const data = await authService.authenticate(req.body);
      return res.json(data).status(HttpStatus.OK);
    } catch (e) {
      return next(e);
    }
  });
};
