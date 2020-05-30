const HttpStatus = require("http-status-codes");
const { transaction } = require("objection");

const Users = require("../models/Users");
const AlphaTokens = require("../models/AlphaTokens");
const {
  authenticatedResponse,
  validPassword,
  generatePasswordHash,
} = require("../utils");
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
      throw ApiError.internalServerErr();
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

  async updateUser(currentUser, updatedUserObj) {
    if (updatedUserObj.username) {
      // trying to update username, check if it's available
      const usernameIsTaken = await this.isUsernameAvailable(
        updatedUserObj.username
      );
      if (usernameIsTaken) {
        throw new ApiError("Username is taken.", 409);
      }
    }
    if (updatedUserObj.email) {
      // trying to update username, check if it's available
      const emailIsTaken = await this.isEmailAvailable(updatedUserObj.email);
      if (emailIsTaken) {
        throw new ApiError("E-mail is taken.", 409);
      }
    }
    let user;
    try {
      const { id } = currentUser;
      user = await Users.query().patchAndFetchById(id, { ...updatedUserObj });
    } catch (e) {
      logger.error("Couldn't update user preferences. =>" + e);
      throw ApiError.internalServerErr();
    }
    return authenticatedResponse(user);
  }

  async updateUsersPassword(currentUser, updatePasswordObj) {
    const { newPassword, newPasswordConfirm, password } = updatePasswordObj;
    if (newPassword !== newPasswordConfirm) {
      throw new ApiError("Password must match.", 400);
    }
    let user;
    try {
      user = await this.getUserById(currentUser.id);
    } catch (e) {
      logger.error("Could not get user when updating password:" + e);
      throw ApiError.internalServerErr();
    }
    if (!validPassword(password, user.password)) {
      logger.error("Invalid Password given when updating user");
      throw new ApiError("Invalid Password", 400);
    }
    const newPasswordHashed = generatePasswordHash(newPassword);
    try {
      user = await Users.query().patchAndFetchById(user.id, {
        password: newPasswordHashed,
      });
    } catch (e) {
      logger.error("Could not get user when updating password:" + e);
      throw ApiError.internalServerErr();
    }
    return authenticatedResponse(user);
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
