module.exports = {
  development: {
    client: "mysql2",
    useNullAsDefault: true,
    connection: {
      host: "localhost",
      user: "root",
      password: "password",
      database: "brackette"
    },
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  }
};
