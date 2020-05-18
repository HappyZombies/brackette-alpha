const HttpStatus = require("http-status-codes");

const Users = require("../models/Users");
const logger = require("./Logger");
const ApiError = require("./ApiError");

// A service for the models, does not throw API Errors
class UsersService {
  async getAllUsers() {
    return await Users.query().select();
  }

  async getUserById(id) {
    let user;
    try {
      user = await Users.query().findById(id);
    } catch (e) {
      logger.warn(`Error querying users ${e.message}`);
      throw new ApiError("Internal Server Error Retrieving User.");
    }
    if (!user) throw new ApiError("Not Found", HttpStatus.NOT_FOUND);
    return user;
  }

  async getUserByUsername(username) {
    return await Users.query().findOne({ username });
  }

  async isUsernameAvailable(username) {
    let user;
    try {
      user = await this.findByUsername(username);
    } catch (err) {
      logger.warn(err);
      return false;
    }
    return user == null;
  }

  async getUserByEmail(email) {
    return await Users.query().findOne({ email });
  }
}

module.exports = UsersService;
