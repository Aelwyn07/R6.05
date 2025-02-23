'use strict';

const Favorite = require('../models/favorite');

class FavoriteService {

    static async addFavorite(user_id, movie_id) {

        const existingFavorite = await Favorite.query().where({ user_id, movie_id }).first();  
        if (existingFavorite) {
            throw new Error('Vosu avez déjà ajouté ce film dans vos favoris !');
        }

        return await Favorite.query().insert({ user_id, movie_id });
    }


    static async removeFavorite(user_id, movie_id) {
        const existingFavorite = await Favorite.query().where({ user_id, movie_id }).first();
        if (!existingFavorite) {
            throw new Error('Vous ne pouvez pas supprimer ce film, car il n est pas dans vos favoris');
        }

        return await Favorite.query().delete().where({ user_id, movie_id });
    }


    static async getFavorites(user_id) {        // (Récupère tous les favoris)
        return await Favorite.query().where({ user_id }).select('movie_id');
    }
}



module.exports = FavoriteService;
