import { joiValidation } from './joiValidation';
import { validateJwt } from './jwt';
import * as validatorsSchemas from './validators';

const allMiddlewares = {
  validateJwt,
  validatorsSchemas,
  joiValidation,
};

export default allMiddlewares;
