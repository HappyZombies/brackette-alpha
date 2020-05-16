const HttpStatus = require("http-status-codes");
const jsonwebtoken = require("jsonwebtoken");

const ApiError = require("../../services/ApiError");
const logger = require("../../services/Logger");
const { retrieveJwt } = require("../../utils");

module.exports = async (req, res, next) => {
  logger.debug("hitting endpoint that requires auth.");
  const token = retrieveJwt(req.headers);
  if (!token) {
    logger.debug("no token was found for endpoint.");
    return next(new ApiError("Unauthorized", HttpStatus.UNAUTHORIZED));
  }
  logger.debug("Token was retrieved");
  // validate jwt
  try {
    const decoded = await jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // TODO: Validate jwt properties
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      logger.info("Token was expired");
      return res.json(
        new ApiError("Your session has expired.", HttpStatus.UNAUTHORIZED)
      );
    }
    logger.info("Token was invalid/something happened when verifying.");
    // whatever
    return res.json(
      new ApiError("Invalid Credentials.", HttpStatus.UNAUTHORIZED)
    );
  }
  next();
};
