// Libs
import { Injectable } from '@nestjs/common';

// Repositories
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

/**
 * Service responsible for managing categories.
 */
@Injectable()
export class CategoriesService {
  constructor(private readonly _categoriesRepository: CategoriesRepository) {}

  /**
   * Retrieves all categories for a specific user.
   *
   * @param userId - ID of the user whose categories are to be retrieved.
   * @returns A list of categories belonging to the user.
   */
  findAllByUserId(userId: string) {
    return this._categoriesRepository.findMany({
      where: { userId }
    });
  }
}
