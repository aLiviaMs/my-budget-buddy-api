// Libs
import { Injectable } from '@nestjs/common';
import { MailerService as mailerMain } from '@nestjs-modules/mailer';

// Models
import { WelcomeEmailTemplate } from '../../templates/WelcomeEmailTemplate';
import { SignupDto } from '../auth/models/dto';

// Utils
import { env } from '../../shared/config/env';

/**
 * Service responsible for handling email operations.
 * Leverages the NestJS MailerModule for sending emails.
 */
@Injectable()
export class MailerService {
  /**
   * Constructs the MailerService.
   * @param mailerMain The injected mailerMain instance for sending emails.
   */
  constructor(private readonly mailerMain: mailerMain) {}

  /**
   * Sends a welcome email to a new user.
   * @param user The user details including email and name.
   */
  async sendWelcomeEmail(user: SignupDto): Promise<void> {
    const { email, name } = user;

    // Send email using the mailerMain instance
    this.mailerMain.sendMail({
      to: email, // Recipient's email address
      from: `"Oi do seu maior parceiro :)" <${env.SMTP_USER}>`, // Sender's email address
      subject: 'Bem vindo ao Budget Buddy!', // Email subject
      text: `Olá ${name},\n\nBem-vindo ao Budget Buddy! Estamos empolgados para ajudar você a organizar suas despesas financeiras.`, // Plain text body
      html: WelcomeEmailTemplate(name) // HTML body
    });
  }
}
