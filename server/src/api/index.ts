import { Router } from 'express';
import config from '../config';
import admin from './routes/admin';
import api from './routes/api';

const app = Router();
app.use(config.API.PREFIX, api);
app.use(config.API.ADMIN, admin);

export default app;
