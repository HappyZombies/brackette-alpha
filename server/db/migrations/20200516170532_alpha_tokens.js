exports.up = function (knex) {
  return knex.schema.createTable("alpha_tokens", (table) => {
    table.increments("id").primary();
    table
      .integer("userId")
      .unsigned()
      .references("id")
      .inTable("users")
      .defaultTo(null);
    table.string("token").unique().notNullable();
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  if (process.env.NODE_ENV !== "production") {
    return knex.schema.dropTableIfExists("tokens");
  }
};
