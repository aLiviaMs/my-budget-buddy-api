// Libs
import { Injectable, NotFoundException } from '@nestjs/common';

// Repositories
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

/**
 * Service responsible for validating category ownership.
 */
@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly _categoriesRepository: CategoriesRepository) {}

  /**
   * Validates whether a category belongs to a specific user.
   *
   * @param userId - ID of the user to validate ownership.
   * @param categoryId - ID of the category to be validated.
   * @throws NotFoundException if the category does not belong to the user.
   */
  async validate(userId: string, categoryId: string) {
    const isOwner = await this._categoriesRepository.findFirst({
      where: { id: categoryId, userId }
    });

    if (!isOwner) {
      throw new NotFoundException('Category not found');
    }
  }
}
