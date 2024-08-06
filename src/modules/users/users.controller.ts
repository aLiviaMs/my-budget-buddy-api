// Libs
import { Controller, Get } from '@nestjs/common';

// Services
import { UsersService } from './users.service';

// Decorators
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

/**
 * `UsersController` is responsible for handling HTTP requests related to user information.
 * It interacts with the `UsersService` to retrieve user data.
 */
@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  /**
   * Handles the GET request to retrieve the currently authenticated user's information.
   *
   * @param id - The ID of the currently authenticated user, injected by `@ActiveUserId()` decorator.
   * @returns The user information for the given user ID.
   */
  @Get('/me')
  me(@ActiveUserId() id: string) {
    return this._usersService.getUserById(id);
  }
}
