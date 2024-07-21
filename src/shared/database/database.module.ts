// Libs
import { Global, Module } from '@nestjs/common';

// Services
import { PrismaService } from './prisma.service';

// Repositories
import { UsersRepository } from './repositories/users.repositories';

const services = [PrismaService];
const repositories = [UsersRepository];

@Global()
@Module({
  providers: [...services, ...repositories],
  exports: [...repositories]
})
export class DatabaseModule {}
