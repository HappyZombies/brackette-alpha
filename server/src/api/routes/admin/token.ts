import { Request, Response, Router } from 'express';
import * as HttpStatus from 'http-status-codes';
import { Container } from 'typedi';
import TokenService from '../../../services/TokenService';

const route = Router();

export default (app: Router) => {
  app.use('/tokens', route);

  route.post('/', async (req: Request, res: Response) => {
    const tokenServiceInstance = Container.get(TokenService);
    const token = await tokenServiceInstance.generateNewToken();
    return res.json(token).status(HttpStatus.OK);
  });
};
