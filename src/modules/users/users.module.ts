// Libs
import { Module } from '@nestjs/common';

// Services
import { UsersService } from './users.service';

// Controllers
import { UsersController } from './users.controller';

// Modules
import { MailerModule } from '../mailer/mailer.module';

const modules = [MailerModule];
const controllers = [UsersController];
const services = [UsersService];

@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [...services]
})
export class UsersModule {}
