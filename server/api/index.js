const { Router } = require("express");

const allRoutes = require("./routes");

// this serves as the root path definition
const api = Router();
api.use("/api", allRoutes);

module.exports = api;
