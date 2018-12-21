import * as winston from "winston";
import ApplicationConfig, { Config } from '../config';
import { Format } from "logform";

if (!process.env.NODE_ENV) throw new Error("Please specify a NODE_ENV");

if (!ApplicationConfig[process.env.NODE_ENV])
    throw new Error("Please specify a valid NODE_ENV");

const config: Config = ApplicationConfig[process.env.NODE_ENV]

const myFormat: Format = winston.format.printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`
});

export const logger: winston.Logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: config.LOG_LEVEL,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                myFormat
            ),
        })
    ]
});
