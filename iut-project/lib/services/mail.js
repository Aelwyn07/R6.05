

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

  // Envoyer un mail à un utilisateur donné en paramètre via le module nodemailer

  async sendWelcomeMessage(userName, toEmail){

    try {
      const mailOptions = {
        from: process.env.MAIL_FROM_USER,
        to: toEmail,
        subject: 'Bienvenue à vous ici !',
        text: `${userName}, Bienvenue à vous. Nosu espérons que vous passerez un bon moment à nos côtés !`,
      };

      const sendMail = await this.transporter.sendMail(mailOptions);
      console.log("C'est envoyé !");
      return sendMail;

    } catch (error) {
      
      console.log("L'envoie ne fonctionne pas");
      
      throw Boom.internal('Erreur lors de la tentative d envoie du mail');
    }
  }
}