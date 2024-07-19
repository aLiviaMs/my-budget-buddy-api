import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { WelcomeEmailTemplate } from './WelcomeEmailTemplate';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * EmailService
 *
 * This class is responsible for sending emails using the nodemailer library.
 */
class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT ?? '0', 10),
      secure: process.env.SMTP_PORT === '465', // false para 587 (TLS), true para 465 (SSL)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  /**
   * sendWelcomeEmail
   *
   * Sends a welcome email to the newly registered user.
   *
   * @param to - The recipient's email address.
   * @param name - The recipient's name.
   *
   * @returns - A promise that resolves when the email has been sent.
   */
  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const mailOptions = {
      from: `"Oi do seu Budget Buddy :)" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Bem vindo ao Budget Buddy!',
      text: `Olá ${name},\n\nBem-vindo ao Budget Buddy! Estamos empolgados para ajudar você a organizar suas despesas financeiras.`,
      html: WelcomeEmailTemplate(name)
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export { EmailService };
