import * as knex from 'knex';
import { Model } from 'objection';

import Tokens from '../models/Tokens';
import Tournaments from '../models/Tournaments';
import Users from '../models/Users';

const knexConfig = require('../config/knexfile');

export default async (): Promise<any> => {
  const k = knex(knexConfig);
  Model.knex(k);

  // individually add the models so that they can be accessed in dependency injection
  const userModel = {
    name: 'usersModel',
    model: Users,
  };
  const tokenModel = {
    name: 'tokensModel',
    model: Tokens,
  };
  const tournamentsModel = {
    name: 'tournamentsModel',
    model: Tournaments,
  };
  return [userModel, tokenModel, tournamentsModel];
};
