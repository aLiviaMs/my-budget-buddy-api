// Libs
import { Injectable } from '@nestjs/common';

import { type Prisma } from '@prisma/client';

// Services
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  create(createDto: Prisma.TransactionCreateArgs) {
    return this._prismaService.transaction.create(createDto);
  }

  findMany(findManyDto: Prisma.TransactionFindManyArgs) {
    return this._prismaService.transaction.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.TransactionFindFirstArgs) {
    return this._prismaService.transaction.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.TransactionUpdateArgs) {
    return this._prismaService.transaction.update(updateDto);
  }

  delete(deleteDto: Prisma.TransactionDeleteArgs) {
    return this._prismaService.transaction.delete(deleteDto);
  }
}
