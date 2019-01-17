import { joiValidation } from "./JoiValidations";
import { validateJwt } from "./Jwt";

class Middlewares {
  public static joiValidation = joiValidation;
  public static validateJwt = validateJwt;
}
export default Middlewares;
