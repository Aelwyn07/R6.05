'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',                 // Ajouter des films en favoris
        path: '/favorites',
        options: {
            tags: ['api'],
            auth: { scope: ['user'] },
            validate: {
                payload: Joi.object({
                    movie_id: Joi.number().integer().required().min(1)
                })
            }
        },

        handler: async (request, h) => {
            const { favoriteService } = request.services();

            return await favoriteService.addFavorite(request.auth.credentials.id, request.payload.movie_id);
        }
    },
    {
        method: 'delete',                   // Supprimer des films en favoris
        path: '/favorites/{movie_id}',
        options: {
            tags: ['api'],
            auth: { scope: ['user'] },
            validate: {
                params: Joi.object({
                    movie_id: Joi.number().integer().required().min(1)
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            return await favoriteService.removeFavorite(request.auth.credentials.id, request.params.movie_id);
        }
    },
    {
        method: 'get',                      // Voir les films en favoris
        path: '/favorites',
        options: {
            tags: ['api'],
            auth: { scope: ['user'] },
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            return await favoriteService.getFavorites(request.auth.credentials.id);
        }
    }
];
