// Libs
import { Body, Controller, Get } from '@nestjs/common';

// Services
import { MailerService } from './mailer.service';

// Dtos
import { SignupDto } from '../auth/models/dto';

/**
 * A controller for handling mailer actions within the application.
 * Utilizes the `MailerService` to send emails.
 */
@Controller('mailer')
export class MailerController {
  /**
   * Instantiates the `MailerController`.
   * @param _mailerService The injected `MailerService` instance for sending emails.
   */
  constructor(private readonly _mailerService: MailerService) {}

  /**
   * Endpoint to send a welcome email to a new user.
   * @param user The user data transferred in the request body, used to send the email.
   * @returns A promise resolved by the `MailerService`'s `sendWelcomeEmail` method.
   */
  @Get('welcome')
  async sendWelcomeEmail(@Body() user: SignupDto) {
    return this._mailerService.sendWelcomeEmail(user);
  }
}
