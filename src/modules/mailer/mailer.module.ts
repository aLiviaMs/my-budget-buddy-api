// Libs
import { Module } from '@nestjs/common';

// Services
import { MailerService } from './mailer.service';

// Controllers
import { MailerController } from './mailer.controller';

@Module({
  controllers: [MailerController],
  providers: [MailerService],
  exports: [MailerService]
})
export class MailerModule {}
