import * as express from "express";

import app from "./app";
import { logger } from "./utils/logger";

const PORT: number = 3000;

app.listen(PORT, (err: express.Errback) => {
  if (err) {
    logger.error(err);
    throw err;
  }
  logger.info(`Express Server is listening at port: ${PORT}`);
});
