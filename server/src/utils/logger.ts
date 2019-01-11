
import { Format } from "logform";
import * as winston from "winston";

import Config from "../config";

const myFormat: Format = winston.format.printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

export const logger: winston.Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), myFormat),
      level: Config.LOG_LEVEL
    })
  ]
});
