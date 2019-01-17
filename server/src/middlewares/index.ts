import { joiValidation } from "./JoiValidations";
import { validateJwt } from "./Jwt"

export default class Middlewares {
  public static joiValidation = joiValidation;
  public static validateJwt = validateJwt;
}
