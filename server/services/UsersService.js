const HttpStatus = require("http-status-codes");

const Users = require("../models/Users");
const logger = require("./Logger");

// A service for the models, does not throw API Errors
class UsersService {
  async getAllUsers() {
    return await Users.query().select();
  }
  async getUserById(id) {
    return await Users.query().findById(id);
  }
  async getUserByUsername(username) {
    return await Users.query().findOne({ username });
  }
  async getUserByEmail(email) {
    return await Users.query().findOne({ email });
  }
}

module.exports = UsersService;
