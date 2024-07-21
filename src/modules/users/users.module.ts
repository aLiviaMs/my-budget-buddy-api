// Libs
import { Module } from '@nestjs/common';

// Services
import { UsersService } from './users.service';

// Controllers
import { UsersController } from './users.controller';

const controllers = [UsersController];
const services = [UsersService];

@Module({
  controllers: [...controllers],
  providers: [...services]
})
export class UsersModule {}
