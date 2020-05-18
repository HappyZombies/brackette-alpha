const AlphaTokens = require("../models/AlphaTokens");
const logger = require("./Logger");

// A service for the models, does not throw API Errors
class AlphaTokenService {
  async isTokenUsed(token) {
    let alphaToken;
    try {
      alphaToken = await AlphaTokens.query()
        .where({ token })
        .andWhere("userId", null)
        .first();
    } catch (e) {
      logger.warn(e);
      return true;
    }
    return !alphaToken;
  }
}

module.exports = AlphaTokenService;
