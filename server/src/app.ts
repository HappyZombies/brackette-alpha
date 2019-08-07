import * as express from 'express';
import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';
import logger from './loaders/logger';

async function startServer() {
  const app = express();

  await require('./loaders').default({ expressApp: app });

  app.listen(config.PORT, (err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
      return;
    }
    logger.info(`
      #########################################################
      👍  Brackette Server listening on port: ${config.PORT} 👍
      #########################################################
    `);
  });
}

startServer();
