export interface IConfig {
  DB_HOST: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_USER: string;
  JWT_SECRET: string;
  LOG_LEVEL: string;
  PORT: string;
}

interface IConfiguration {
  development: IConfig;
  testing: IConfig;
  production: IConfig;
}

class AppConfig implements IConfiguration {
  public development: IConfig = {
    DB_HOST: "localhost",
    DB_NAME: "brackette",
    DB_PASSWORD: "password",
    DB_PORT: "28015",
    DB_USER: "root",
    JWT_SECRET: "butts",
    LOG_LEVEL: "debug",
    PORT: "5443"
  };
  public testing: IConfig = {
    DB_HOST: "localhost",
    DB_NAME: "brackette",
    DB_PASSWORD: "password",
    DB_PORT: "28015",
    DB_USER: "root",
    JWT_SECRET: "butts",
    LOG_LEVEL: "debug",
    PORT: "5443"
  };
  public production: IConfig = {
    DB_HOST: "localhost",
    DB_NAME: "brackette",
    DB_PASSWORD: "password",
    DB_PORT: "28015",
    DB_USER: "root",
    JWT_SECRET: "butts",
    LOG_LEVEL: "debug",
    PORT: "5443"
  };
}

if (!process.env.NODE_ENV) { throw new Error("Please specify a NODE_ENV"); }

const CONFIG: IConfig = new AppConfig()[process.env.NODE_ENV];

if (!CONFIG) {
  throw new Error("Please specify a valid NODE_ENV");
}

export default CONFIG;
