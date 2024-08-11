// Libs
import { Body, Controller, Get } from '@nestjs/common';
import { ApiExcludeController, ApiOperation, ApiResponse } from '@nestjs/swagger';

// Services
import { MailerService } from './mailer.service';

// Dtos
import { SignupDto } from '../auth/models/dto';

@ApiExcludeController()
@Controller('mailer')
export class MailerController {
  constructor(private readonly _mailerService: MailerService) {}

  @Get('welcome')
  @ApiOperation({ summary: 'Send a welcome email to a new user.' })
  @ApiResponse({ status: 200, description: 'The welcome email has been successfully sent.' })
  async sendWelcomeEmail(@Body() user: SignupDto) {
    return this._mailerService.sendWelcomeEmail(user);
  }
}
