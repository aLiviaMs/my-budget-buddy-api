// Libs
import { Body, Controller, Get } from '@nestjs/common';

// Services
import { MailerService } from './mailer.service';

// Dtos
import { CreateUserDto } from '../users/models/dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Get('welcome')
  public async sendWelcomeEmail(@Body() user: CreateUserDto) {
    return this.mailerService.sendWelcomeEmail(user);
  }
}
