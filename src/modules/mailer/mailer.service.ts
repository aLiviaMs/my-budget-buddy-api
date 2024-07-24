// Libs
import { Injectable } from '@nestjs/common';
import { MailerService as mailerMain } from '@nestjs-modules/mailer';

// Models
import { CreateUserDto } from '../users/models/dto';
import { WelcomeEmailTemplate } from 'src/templates/WelcomeEmailTemplate';

@Injectable()
export class MailerService {
  constructor(private readonly mailerMain: mailerMain) {}

  public async sendWelcomeEMail(user: CreateUserDto): Promise<void> {
    const { email, name } = user;

    this.mailerMain.sendMail({
      to: email,
      from: `"Oi do seu maior parceiro :)" <${process.env.SMTP_USER}>`,
      subject: 'Bem vindo ao Budget Buddy!',
      text: `Olá ${name},\n\nBem-vindo ao Budget Buddy! Estamos empolgados para ajudar você a organizar suas despesas financeiras.`,
      html: WelcomeEmailTemplate(name)
    });
  }
}
