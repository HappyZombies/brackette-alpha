import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('tournaments', (table) => {
    table.increments('id').primary();
    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .notNullable();
    table.enu('hoster', ['SMASHGG', 'CHALLONGE']).notNullable();
    table.string('socketId').defaultTo(null);
    table.string('tournamentId').notNullable(); // ???
    table.string('nickname').defaultTo(null);
    table.json('players').defaultTo(null);
    table.json('devices').defaultTo(null);
    table.json('openMatches').defaultTo(null);
    table
      .string('roomCode')
      .unique()
      .notNullable();
    table.string('subdomain').defaultTo(null);
    table.integer('limit').defaultTo(100); // TODO: Is this really needed?
    table.boolean('archived').defaultTo(false);
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  if (process.env.NODE_ENV !== 'production') {
    return knex.schema.dropTableIfExists('tournaments');
  }
}
