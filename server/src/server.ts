import * as express from "express";
import { createServer } from "http";

import app from "./app";
import { logger } from "./utils/logger";
import { startSocketio } from "./controllers/tournamentRooms/SocketEvents";

const PORT: number = 4000;

const server = createServer(app);
startSocketio(server);

server.listen(PORT, (err: express.Errback) => {
  if (err) {
    logger.error(err);
    throw err;
  }
  logger.info(`Express Server is listening at port: ${PORT}`);
});
