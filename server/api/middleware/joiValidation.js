const HttpStatus = require("http-status-codes");

const ApiError = require("../../services/ApiError");
const logger = require("../../services/Logger");

module.exports = (schema, container = "body") => (req, res, next) => {
  const { error, value } = schema.validate(req[container]);
  if (value && error == null) {
    // any default values from joi we need put them in.
    req[container] = { ...value };
    return next();
  }
  if (error == null) {
    return next();
  }
  const { details } = error;
  const message = details ? details.map((i) => i.message).join(",") : error;
  logger.debug(
    `The express req.${container} was invalid, see it here => ${req[container]}`
  );
  return next(new ApiError(message, HttpStatus.BAD_REQUEST));
};
