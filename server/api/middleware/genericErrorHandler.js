const HttpStatus = require("http-status-codes");

const ApiError = require("../../services/ApiError");
const logger = require("../../services/Logger");

module.exports = (err, req, res, next) => {
  logger.warn(`An API Error is going to be returned => '${err}'`);
  let errorMessage = err instanceof ApiError ? err : new ApiError(err.message);
  res.status(errorMessage.code || HttpStatus.INTERNAL_SERVER_ERROR);
  res.json(errorMessage);
};
