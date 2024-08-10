// Libs
import { Injectable } from '@nestjs/common';

// Repositories
import { UsersRepository } from '../../shared/database/repositories/users.repositories';

/**
 * Service responsible for user management.
 */
@Injectable()
export class UsersService {
  constructor(private _usersRepository: UsersRepository) {}

  /**
   * Retrieves a user's information by their ID.
   *
   * @param id - The unique identifier of the user.
   * @returns The user object if found, otherwise null.
   */
  getUserById(id: string) {
    return this._usersRepository.findById(id);
  }
}
