'use strict';

module.exports = {
    async up(knex) {
        await knex.schema.createTable('movies', (table) => {
            table.increments('id').primary();
            table.string('title').notNull().unique();
            table.text('description').notNull();
            table.date('release_date').notNull();
            table.string('director').notNull();
            table.dateTime('created_at').notNull().defaultTo(knex.fn.now());
            table.dateTime('updated_at').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('movies');
    }
};
