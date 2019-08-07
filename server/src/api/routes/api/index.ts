import { Router } from 'express';
import tournaments from './tournaments';
import user from './user';

const app = Router();
user(app);
tournaments(app);

export default app;
