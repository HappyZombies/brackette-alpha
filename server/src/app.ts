import "reflect-metadata"; // We need this in order to use @Decorators

import config from "./config";

import * as express from "express";

import Logger from "./loaders/logger";

async function startServer() {
  const app = express();

  await require("./loaders").default({ expressApp: app });

  app.listen(config.PORT, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      #########################################################
      👍  Brackette Server listening on port: ${config.PORT} 👍
      #########################################################
    `);
  });
}

startServer();
