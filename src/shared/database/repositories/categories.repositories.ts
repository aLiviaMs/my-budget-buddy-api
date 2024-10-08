// Libs
import { Injectable } from '@nestjs/common';

import { type Prisma } from '@prisma/client';

// Services
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  findMany(findManyDto: Prisma.CategoryFindManyArgs) {
    return this._prismaService.category.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.CategoryFindFirstArgs) {
    return this._prismaService.category.findFirst(findFirstDto);
  }
}
