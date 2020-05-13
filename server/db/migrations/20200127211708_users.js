exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("email").notNullable();
    table.string("displayName").notNullable();
    table.string("password").notNullable();
    table.string("facebookKey").defaultTo(null);
    table.string("challongeKey").defaultTo(null);
    table.string("smashggKey").defaultTo(null);
    table.boolean("admin").defaultTo(false);
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  if (process.env.NODE_ENV !== "production") {
    return knex.schema.dropTableIfExists("users");
  }
};
