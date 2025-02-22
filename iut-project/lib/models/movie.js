'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {
    
    static get tableName() {
        return 'movies';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(1).example('Inception').description('Title of the movie'),
            description: Joi.string().example('A mind-bending thriller').description('Description of the movie'),
            release_date: Joi.date().example('2010-07-16').description('Release date of the movie'),
            director: Joi.string().example('Christopher Nolan').description('Director of the movie'),
            created_at: Joi.date(),
            updated_at: Joi.date()
        });
    }

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = this.created_at;
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }
};
