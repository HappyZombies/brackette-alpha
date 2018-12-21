import * as winston from "winston";
import Config from "../config";
import { Format } from "logform";

const myFormat: Format = winston.format.printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

export const logger: winston.Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: Config.LOG_LEVEL,
      format: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), myFormat)
    })
  ]
});
