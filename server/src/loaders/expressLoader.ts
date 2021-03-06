import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as morgan from 'morgan';
import * as swStats from 'swagger-stats';
import * as swaggerUi from 'swagger-ui-express';
import api from '../api';
import { BracketteError } from '../utils';
const swaggerDoc = require('../docs/swagger.json');

export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoint
   */
  app.use('/healthcheck', require('express-healthcheck')());
  // any middlewares
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  app.use(swStats.getMiddleware({ swaggerSpec: swaggerDoc }));

  // Load all API routes
  app.use('/', api);

  app.use((req, res, next) => {
    const err = new BracketteError('Not Found', 404);
    next(err);
  });

  // for any other error handlers
  app.use((err, req, res, next) => {
    res.status(err.httpStatusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    res.json(err);
  });
};
