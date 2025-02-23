'use strict';

const Movie = require('../models/movie');

class MovieService {

    static async createMovie(data) {
        if (!data.title || !data.description || !data.release_date || !data.director) {
            throw new Error('Veuillez remplir tous les champs !');
        }
        return await Movie.query().insert(data);
    }

    static async getMovieById(id) {
        const movie = await Movie.query().findById(id);
        if (!movie) {
            throw new Error(`Pas de film trouvé avec l'id ${id}`);
        }
        return movie;
    }
  
    static async getMovies() {
        return await Movie.query();
    }

    static async updateMovie(id, data) {
        const updatedRows = await Movie.query().findById(id).patch(data);
        if (!updatedRows) {
            throw new Error(`Impossible de modifier, pas de film trouvé avec l'id ${id}`);
        }
        return Movie.query().findById(id);      // Retourner le film mis à jour
    }

    static async deleteMovie(id) {
        const deletedRows = await Movie.query().deleteById(id);
        if (!deletedRows) {
            throw new Error(`Impossible de supprimer, pas de film trouvé avec l'id ${id}`);
        }
        return {message: 'Le film a bien été supprimé'};
    }
}


module.exports = MovieService;