const HttpStatus = require("http-status-codes");
const { Container } = require("typedi");
const jwt = require("jsonwebtoken");

const UsersService = require("./UsersService");
const AlphaTokenService = require("./AlphaTokenService");
const { validPassword } = require("../utils");
const ApiError = require("./ApiError");
const logger = require("./Logger");
const { AUTH } = require("../utils/constants");

class AuthService {
  constructor() {
    this.usersService = Container.get(UsersService);
    this.alphaTokenService = Container.get(AlphaTokenService);
  }
  async authenticate(loginBody) {
    const { username, password } = loginBody;
    let user;
    try {
      user = await this.usersService.getUserByUsername(username);
    } catch (e) {
      logger.error("Error when user was trying to login!", e);
      throw new ApiError(
        "Request cannot be processed at this time",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    if (!user) {
      logger.debug("User was not found!");
      throw new ApiError(AUTH.INVALID_PASS, HttpStatus.UNAUTHORIZED);
    }
    if (!validPassword(password, user.password)) {
      logger.warn("Invalid password was entered!!", user.toJSON());
      throw new ApiError(AUTH.INVALID_PASS, HttpStatus.UNAUTHORIZED);
    }
    return this._authenticatedResponse(user);
  }

  async signup(registerBody) {
    const { token } = registerBody;
    const isTokenUsed = await this.alphaTokenService.isTokenUsed(token);
    if (isTokenUsed) {
      throw new ApiError(
        "The token provided is incorrect or has been used already.",
        HttpStatus.UNAUTHORIZED
      );
    }
    return { dope: true };
  }

  _authenticatedResponse(user) {
    // TODO: Store things like ip address, invalid / failed attempts. Post-MVP
    const accesstoken = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
    return { user, accesstoken };
  }
}

module.exports = AuthService;
