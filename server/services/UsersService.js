const HttpStatus = require("http-status-codes");
const { transaction } = require("objection");

const Users = require("../models/Users");
const AlphaTokens = require("../models/AlphaTokens");
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

  async getUserByEmail(email) {
    return await Users.query().findOne({ email });
  }

  async createUser(newUserObj) {
    return await transaction(Users, AlphaTokens, async (Users, AlphaTokens) => {
      const token = newUserObj.token;
      delete newUserObj.token;
      const newUser = await Users.query().insert(newUserObj);
      await AlphaTokens.query().patch({ userId: newUser.id }).where({ token });
      return newUser;
    });
  }

  async isUsernameAvailable(username) {
    let user;
    try {
      user = await this.getUserByUsername(username);
    } catch (err) {
      logger.warn(err);
      return false;
    }
    return user;
  }

  async isEmailAvailable(email) {
    let user;
    try {
      user = await this.getUserByEmail(email);
    } catch (err) {
      logger.warn(err);
      return false;
    }
    return user;
  }
}

module.exports = UsersService;
