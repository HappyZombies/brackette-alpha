import { NextFunction, Request, Response, Router } from 'express';
import * as HttpStatus from 'http-status-codes';
import { Container } from 'typedi';

import {
  IUserCreateDTO,
  IUserLoginDTO,
  IUserUpdateDTO,
  IUserUpdatePasswordDTO,
} from '../../../interfaces/IUser';
import AuthService from '../../../services/AuthService';
import UserService from '../../../services/UserService';
import middlewares from '../../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get(
    '/',
    middlewares.validateJwt,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get('logger');
      logger.debug('Entering GET - users/ endpoint.');
      try {
        const userServiceInstance = Container.get(UserService);
        const users = await userServiceInstance.findAll();
        return res.status(HttpStatus.OK).json(users);
      } catch (e) {
        logger.error('Error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/register',
    middlewares.joiValidation(middlewares.validatorsSchemas.newUserValidation),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get('logger');
      logger.debug(
        'Entering POST - users/register endpoint with body: %o',
        req.body,
      );
      try {
        const authServiceInstance = Container.get(AuthService);
        const { user, accessToken } = await authServiceInstance.register(
          req.body as IUserCreateDTO,
        );
        return res.status(HttpStatus.CREATED).json({ user, accessToken });
      } catch (e) {
        logger.error('Error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/login',
    middlewares.joiValidation(middlewares.validatorsSchemas.loginUserSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get('logger');
      logger.debug(
        'Calling POST - users/login endpoint with body: %o',
        req.body,
      );
      try {
        const authServiceInstance = Container.get(AuthService);
        const { user, accessToken } = await authServiceInstance.login(
          req.body as IUserLoginDTO,
        );
        return res.status(HttpStatus.CREATED).json({ user, accessToken });
      } catch (e) {
        logger.error('Error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/validate',
    middlewares.validateJwt,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get('logger');
      logger.debug(
        'Entering POST - users/validate endpoint with body: %o',
        req.body,
      );
      if (req.currentUser) {
        try {
          const authServiceInstance = Container.get(AuthService);
          const user = await authServiceInstance.getUser(req.currentUser.id);
          Reflect.deleteProperty(user, 'password');
          return res.json(user);
        } catch (e) {
          logger.error('Error: %o', e);
          return next(e);
        }
      }
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials.' });
    },
  );

  route.put(
    '/',
    [
      middlewares.validateJwt,
      middlewares.joiValidation(middlewares.validatorsSchemas.updateUserSchema),
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get('logger');
      logger.debug('Entering PUT - users/ endpoint with body: %o', req.body);
      if (req.currentUser) {
        try {
          const authServiceInstance = Container.get(AuthService);
          const user = await authServiceInstance.updateUser(
            req.currentUser,
            req.body as IUserUpdateDTO,
          );
          return res.json(user);
        } catch (e) {
          logger.error('Error: %o', e);
          return next(e);
        }
      }
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials.' });
    },
  );

  route.put(
    '/pass',
    [
      middlewares.validateJwt,
      middlewares.joiValidation(
        middlewares.validatorsSchemas.updateUserPasswordSchema,
      ),
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: any = Container.get('logger');
      logger.debug(
        'Entering PUT - users/pass endpoint with body: %o',
        req.body,
      );
      if (req.currentUser) {
        try {
          const authServiceInstance = Container.get(AuthService);
          const user = await authServiceInstance.updatePassword(
            req.currentUser,
            req.body as IUserUpdatePasswordDTO,
          );
          return res.json(user);
        } catch (e) {
          logger.error('Error: %o', e);
          return next(e);
        }
      }
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials.' });
    },
  );
};
