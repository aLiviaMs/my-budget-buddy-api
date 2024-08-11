// Libs
import { Controller, Get } from '@nestjs/common';

// Services
import { CategoriesService } from './services/categories.service';

// Models
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

/**
 * Controller responsible for managing categories.
 */
@Controller('categories')
export class CategoriesController {
  constructor(private readonly _categoriesService: CategoriesService) {}

  /**
   * Retrieves all categories for a specific user.
   *
   * @param userId - ID of the active user.
   * @returns A list of categories belonging to the user.
   */
  @Get()
  findAllByUserId(@ActiveUserId() userId: string) {
    return this._categoriesService.findAllByUserId(userId);
  }
}
