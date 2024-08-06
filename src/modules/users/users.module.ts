// Libs
import { Module } from '@nestjs/common';

// Services
import { UsersService } from './users.service';

// Controllers
import { UsersController } from './users.controller';

// Modules
import { AuthModule } from '../auth/auth.module';

const modules = [AuthModule];
const controllers = [UsersController];
const providers = [UsersService];

@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [...providers]
})
export class UsersModule {}
