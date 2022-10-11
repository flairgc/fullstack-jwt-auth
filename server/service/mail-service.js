const nodemailer = require('nodemailer');

class MailService {

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: `Активация аккаунта на ${process.env.API_URL}`,
      text: '',
      html: `<div><h3>Для активации аккаунта перейдите по ссылке</h3>
<a href="${link}">${link}</a></div>`,
    })
  }
}

module.exports = new MailService();