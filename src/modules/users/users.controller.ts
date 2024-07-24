// Libs
import { Controller, Post, Body } from '@nestjs/common';

// Services
import { UsersService } from './users.service';

// DTOs
import { CreateUserDto } from './models/dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
