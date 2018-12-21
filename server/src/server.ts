import * as express from "express";

import { logger } from "./utils/logger";
import app from "./app";

const PORT: number = 3000;

app.listen(PORT, (err: express.Errback) => {
  if (err) {
    logger.error(err);
    throw err;
  }
  logger.info(`Express Server is listening at port: ${PORT}`);
});
