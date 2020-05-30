const HttpStatus = require("http-status-codes");
const { Container } = require("typedi");
const jwt = require("jsonwebtoken");

const UsersService = require("./UsersService");
const AlphaTokenService = require("./AlphaTokenService");
const {
  validPassword,
  generatePasswordHash,
  authenticatedResponse,
} = require("../utils");
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
    return authenticatedResponse(user);
  }

  async signup(registerBody) {
    const { token, username, email } = registerBody;
    const isTokenUsed = await this.alphaTokenService.isTokenUsed(token);
    if (isTokenUsed) {
      throw new ApiError(
        "The token provided is incorrect or has been used already.",
        HttpStatus.UNAUTHORIZED
      );
    }
    // username taken?
    const usernameIsTaken = await this.usersService.isUsernameAvailable(
      username
    );
    if (usernameIsTaken) {
      throw new ApiError(
        "A user with this username already exists.",
        HttpStatus.CONFLICT
      );
    }
    const emailIsTaken = await this.usersService.isEmailAvailable(email);
    if (emailIsTaken) {
      throw new ApiError(
        "A user with this email already exists.",
        HttpStatus.CONFLICT
      );
    }
    // all good, create the user in the database
    registerBody.password = generatePasswordHash(registerBody.password);
    let newUser;
    try {
      newUser = await this.usersService.createUser(registerBody);
    } catch (err) {
      logger.error(err);
      throw new ApiError(
        "Error when creating new user.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return authenticatedResponse(newUser);
  }
}

module.exports = AuthService;
