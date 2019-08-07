import { NextFunction, Request, Response } from 'express';
import * as createError from 'http-errors';
import * as jsonwebtoken from 'jsonwebtoken';

import config from '../../config';

/**
 * Checks and validates the JWT that is passed from the header.
 * @param {BracketteRequest} req A custom Express.Request object that contains the "user" property.
 * @param {Express.Response} res The Express response property
 * @param {NextFunction} next The Express NextFunction
 */
export const validateJwt = async (req: Request, res, next) => {
  const jwtToken = retrieveJwt(req);
  if (!jwtToken) {
    const error = createError(401, 'Invalid Credentials.');
    res.status(error.statusCode).json(error);
    return;
  }

  // check if jwt is valid
  try {
    const decoded = <any>await jsonwebtoken.verify(jwtToken, config.JWT_SECRET);
    req.currentUser = decoded.data || decoded; // add the user to the request anytime this middleware is used.
  } catch (err) {
    // If it's an expiration error, let's report that specifically.
    if (err.name === 'TokenExpiredError') {
      const error = createError(
        401,
        'Invalid Credentials. This token is timed out!',
      );
      res.status(error.statusCode).json(error);
      return;
    }
    // whatever
    const error = createError(401, 'Invalid Credentials');
    res.status(error.statusCode).json(error);
    return;
  }
  // good to go, continue with the user attached to the request.
  next();
};

/**
 * Parses the JWT from the header.
 * @param {Request} req The Express Request parameter, which contains the header.
 */
const retrieveJwt = (req: Request) => {
  if (!req.headers || !req.headers.authorization) {
    return null;
  }
  const parts = req.headers.authorization.split(' ');
  if (parts.length === 2) {
    const scheme = parts[0];
    const credentials = parts[1];
    if (scheme === 'Bearer:') {
      return credentials;
    }
  }
  return null;
};
