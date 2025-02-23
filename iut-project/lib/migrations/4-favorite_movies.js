'use strict';

module.exports = {
    async up(knex) {
        await knex.schema.createTable('favorites', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().references('id').inTable('user').onDelete('CASCADE'); 
            table.integer('movie_id').unsigned().references('id').inTable('movies').onDelete('CASCADE'); 
            table.unique(['user_id', 'movie_id']); // clé primmaire
        });
    },
    async down(knex) {
        await knex.schema.dropTableIfExists('favorites');
    },
}


    
        



