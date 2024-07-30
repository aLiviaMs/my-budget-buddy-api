// Libs
import { Controller, Post, Body } from '@nestjs/common';

// Services
import { UsersService } from './users.service';

// DTOs
import { CreateUserDto } from './models/dto';

/**
 * A controller for handling user-related actions.
 * Utilizes the `UsersService` to manage user data.
 */
@Controller('users')
export class UsersController {
  /**
   * Instantiates the `UsersController`.
   * @param usersService The injected `UsersService` instance for managing users.
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Endpoint to create a new user.
   * @param createUserDto The user data transferred in the request body, used to create a new user.
   * @returns The result of the `UsersService.create` method, typically the newly created user.
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
