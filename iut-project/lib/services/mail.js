'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');
const nodemailer = require('nodemailer');



module.exports = class MailService extends Service {

  async initialisation() {

    const transporter = nodemailer.createTransport({
      service: 'smtp',
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,  // Le nom d'utilisateur de ton serveur de mail
        pass: process.env.MAIL_PASS,  // Le mot de passe de ton serveur de mail
      },
    });

    this.transporter = transporter;
  }

  async sendWelcomeMessage(userName, toEmail){
    try {
      const mailOptions = {
        from: process.env.MAIL_FROM_USER,
        to: toEmail,
        subject: 'Bienvenue à vous ici !',
        text: `${userName}, Bienvenue à vous. Nosu espérons que vous passerez un bon moment à nos côtés !`,
      };

      const sendMail = await this.transporter.sendMail(mailOptions);

      return sendMail;

    } catch (error) {
      throw Boom.internal('Erreur lors de la tentative d envoie du mail');
    }
  }
}