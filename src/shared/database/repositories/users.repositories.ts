// Libs
import { Injectable } from '@nestjs/common';

import { type Prisma } from '@prisma/client';

// Services
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  create(createDto: Prisma.UserCreateArgs) {
    return this._prismaService.user.create(createDto);
  }

  findByEmail(email: string) {
    return this._prismaService.user.findUnique({ where: { email }, select: { id: true, email: true, password: true } });
  }

  findById(id: string) {
    return this._prismaService.user.findUnique({
      where: { id },
      select: {
        name: true,
        email: true
      }
    });
  }
}
