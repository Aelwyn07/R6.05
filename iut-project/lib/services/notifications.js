'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class NotificationService extends Service {

    async notifyNewMovie(movie) {
        const { User } = this.server.models();
        const users = await User.query();
        
        const mailService = this.server.services().mailService;
        if (!mailService.transporter) {
            await mailService.initialisation();
        }
        for (const user of users) {
            await mailService.sendNewMovieNotification(user.email, movie.title);    //Envoi un mail aux utilisateurs
        }
    }

    async notifyMovieUpdated(movie) {
        const { User, Favorite } = this.server.models();
        const mailService = this.server.services().mailService;
        if (!mailService.transporter) {
            await mailService.initialisation();
        }

        const users = await User.query()                       // Récupère les utilisateurs ayant le film en favoris
            .join('favorites', 'user.id', 'favorites.user_id')
            .where('favorites.movie_id', movie.id);

        for (const user of users) {
            await mailService.sendMovieUpdatedNotification(user.email, movie.title);
        }
    }
};
