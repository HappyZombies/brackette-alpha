exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_tokens", function(table) {
    table.increments("id").primary();
    table
      .integer("userId")
      .unsigned()
      .references("id")
      .inTable("users")
      .defaultTo(null);
    table
      .string("token")
      .unique()
      .notNullable();
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  if (process.env.NODE_ENV !== "production") {
    return knex.schema.dropTableIfExists("user_tokens");
  }
};
