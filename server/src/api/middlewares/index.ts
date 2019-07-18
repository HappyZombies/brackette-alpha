import { validateJwt } from "./jwt";
import * as validatorsSchemas from "./validators";
import { joiValidation } from "./joiValidation";

const allMiddlewares = {
  validateJwt,
  validatorsSchemas,
  joiValidation
};

export default allMiddlewares;
