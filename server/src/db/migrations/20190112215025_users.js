exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(table) {
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

exports.down = function(knex, Promise) {
  if (process.env.NODE_ENV !== "production") {
    return knex.schema.dropTableIfExists("users");
  }
};
