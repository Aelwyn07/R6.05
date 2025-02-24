

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');
const nodemailer = require('nodemailer');



module.exports = class MailService extends Service {

  // Inititaliser les paramètres nécessaires pour l'envoie de mails

  async initialisation() {

    let transporter = nodemailer.createTransport({
      service: 'smtp',
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,  
        pass: process.env.MAIL_PASS, 
      },
    });

    this.transporter = transporter;
  }

  // Envoyer un mail à un utilisateur donné en paramètre (via le module nodemailer)

  async sendWelcomeMessage(userName, toEmail){

    try {
      const mailOptions = {
        from: process.env.MAIL_FROM_USER,
        to: toEmail,
        subject: 'Bienvenue à vous ici !',
        text: `${userName}, Bienvenue à vous. Nous espérons que vous passerez de bons moments à nos côtés !`,
      };

      const sendMail = await this.transporter.sendMail(mailOptions);
      console.log("C'est envoyé !");
      return sendMail;

    } catch (error) {
      
      console.log("L'envoie ne fonctionne pas");
      
      throw Boom.internal('Erreur lors de la tentative d envoie du mail');
    }
  }

  async sendNewMovieNotification(toEmail, movieTitle) {
    try {
        const mailOptions = {
            from: process.env.MAIL_FROM_USER,
            to: toEmail,
            subject: 'Ajout d un nouveau film',
            text: `Nouveau film ajouté : "${movieTitle}". A regarder rapidement !`,
        };
        await this.transporter.sendMail(mailOptions);

    } catch (error) {
        console.log("L'envoi du mail de notification ne marche pas");

        throw Boom.internal('Erreur lors de l envoi du mail de nouveau film');
    }
  }

  async sendMovieUpdatedNotification(toEmail, movieTitle) {
    try {
        const mailOptions = {
            from: process.env.MAIL_FROM_USER,
            to: toEmail,
            subject: 'MAJ d un film favoris',
            text: `Le film "${movieTitle}" a été mis à jour !!`,
        };

        await this.transporter.sendMail(mailOptions);

    } catch (error) {
        console.log("Erreur lors de l'envoi du mail de mise à jour");
        throw Boom.internal('Erreur lors de l envoi du mail de maj');
    }
  }
}