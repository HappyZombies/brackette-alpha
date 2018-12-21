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
    testing: Config;
    production: Config;
}

export default new AppConfig();
