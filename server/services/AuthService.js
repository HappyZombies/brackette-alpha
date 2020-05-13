const HttpStatus = require("http-status-codes");
const { Container } = require("typedi");
const jwt = require("jsonwebtoken");

const UsersService = require("./UsersService");
const { validPassword } = require("../utils");
const ApiError = require("./ApiError");
const logger = require("./Logger");
const { AUTH } = require("../utils/constants");

class AuthService {
  constructor() {
    this.UsersService = Container.get(UsersService);
  }
  async authenticate(loginBody) {
    const { username, password } = loginBody;
    let user;
    try {
      user = await this.UsersService.getUserByUsername(username);
    } catch (e) {
      logger.error("Error when user was trying to login!", e);
      throw new ApiError(AUTH.INVALID_PASS, HttpStatus.NOT_FOUND);
    }
    if (!user) {
      logger.debug("User was not found!");
      throw new ApiError(AUTH.INVALID_PASS, HttpStatus.NOT_FOUND);
    }
    if (!validPassword(password, user.password)) {
      logger.warn("Invalid password was entered!!", user.toJSON());
      throw new ApiError(AUTH.INVALID_PASS, HttpStatus.NOT_FOUND);
    }
    // TODO: Store things like ip address, invalid / failed attempts. Post-MVP
    const accesstoken = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
    return { user, accesstoken };
  }
}

module.exports = AuthService;
