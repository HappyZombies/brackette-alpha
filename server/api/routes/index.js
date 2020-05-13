const { Router } = require("express");
const users = require("./users");
const auth = require("./auth");

// any endpoints for api/{anything} will be here
const api = Router();
users(api);
auth(api);

module.exports = api;
