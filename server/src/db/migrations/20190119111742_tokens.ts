import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('tokens', (table) => {
    table.increments('id').primary();
    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .defaultTo(null);
    table
      .string('token')
      .unique()
      .notNullable();
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  if (process.env.NODE_ENV !== 'production') {
    return knex.schema.dropTableIfExists('tokens');
  }
}
