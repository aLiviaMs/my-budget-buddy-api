// Libs
import { Global, Module } from '@nestjs/common';

// Services
import { PrismaService } from './prisma.service';

// Repositories
import { UsersRepository } from './repositories/users.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';
import { TransactionsRepository } from './repositories/transactions.repositories';

const services = [PrismaService];
const repositories = [UsersRepository, CategoriesRepository, BankAccountsRepository, TransactionsRepository];

@Global()
@Module({
  providers: [...services, ...repositories],
  exports: [...repositories]
})
export class DatabaseModule {}
