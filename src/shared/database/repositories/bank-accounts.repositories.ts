// Libs
import { Injectable } from '@nestjs/common';

import { type Prisma } from '@prisma/client';

// Services
import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  create(createDto: Prisma.BankAccountCreateArgs) {
    return this._prismaService.bankAccount.create(createDto);
  }

  findMany<T extends Prisma.BankAccountFindManyArgs>(findManyDto: Prisma.SelectSubset<T, Prisma.BankAccountFindManyArgs>) {
    return this._prismaService.bankAccount.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.BankAccountFindFirstArgs) {
    return this._prismaService.bankAccount.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.BankAccountUpdateArgs) {
    return this._prismaService.bankAccount.update(updateDto);
  }

  delete(deleteDto: Prisma.BankAccountDeleteArgs) {
    return this._prismaService.bankAccount.delete(deleteDto);
  }
}
