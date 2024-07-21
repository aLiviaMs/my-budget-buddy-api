// Libs
import { Injectable } from '@nestjs/common';

import { type Prisma } from '@prisma/client';

// Services
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createDto);
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email }, select: { id: true } });
  }
}
