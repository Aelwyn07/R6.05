'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/movies',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },     //Condition pour que seul les admins puissent créer un film
            validate: {
                payload: Joi.object({
                    title: Joi.string().required().min(1),
                    description: Joi.string().required(),
                    release_date: Joi.date().required(),
                    director: Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            return await movieService.createMovie(request.payload);
        }
    },
    {
        method: 'get',              // Récupérer tous les films
        path: '/movies',
        options: { 
            tags: ['api']
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            return await movieService.getMovies();
        }
    },
    {
        method: 'get',              // Récupérer un film par id
        path: '/movies/{id}',
        options: {
            tags: ['api'],
            validate: { params: Joi.object({ id: Joi.number().integer().required().min(1) }) }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            return await movieService.getMovieById(request.params.id);
        }
    },
    {
        method: 'patch',            // Modifier certains champs du film
        path: '/movies/{id}',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: {
                params: Joi.object({ id: Joi.number().integer().required().min(1) }),
                payload: Joi.object({
                    title: Joi.string().min(1),
                    description: Joi.string(),
                    release_date: Joi.date(),
                    director: Joi.string()
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            return await movieService.updateMovie(request.params.id, request.payload);
        }
    },
    {
        method: 'delete',               // Supprimer un film
        path: '/movies/{id}',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: { params: Joi.object({ id: Joi.number().integer().required().min(1) }) }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            return await movieService.deleteMovie(request.params.id);
        }
    }
];
