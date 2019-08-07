import { Router } from 'express';
import token from './token';

const app = Router();
token(app);

export default app;
