export interface Config {
  PORT: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  LOG_LEVEL: string;
  JWT_SECRET: string;
}

interface Configuration {
  development: Config;
  testing: Config;
  production: Config;
}

class AppConfig implements Configuration {
  development: Config = {
    PORT: "5443",
    DB_HOST: "localhost",
    DB_PORT: "28015",
    DB_USER: "root",
    DB_PASSWORD: "password",
    DB_NAME: "brackette",
    LOG_LEVEL: "debug",
    JWT_SECRET: "butts"
  };
  testing: Config = {
    PORT: "5443",
    DB_HOST: "localhost",
    DB_PORT: "28015",
    DB_USER: "root",
    DB_PASSWORD: "password",
    DB_NAME: "brackette",
    LOG_LEVEL: "debug",
    JWT_SECRET: "somethingelse"
  };
  production: Config = {
    PORT: "5443",
    DB_HOST: "localhost",
    DB_PORT: "28015",
    DB_USER: "root",
    DB_PASSWORD: "password",
    DB_NAME: "brackette",
    LOG_LEVEL: "debug",
    JWT_SECRET: "prod"
  };
}

if (!process.env.NODE_ENV) throw new Error("Please specify a NODE_ENV");

const CONFIG: Config = new AppConfig()[process.env.NODE_ENV];

if (!CONFIG) throw new Error("Please specify a valid NODE_ENV");

export default CONFIG;
