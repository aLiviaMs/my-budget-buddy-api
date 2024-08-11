// Libs
import { Module } from '@nestjs/common';

// Services
import { CategoriesService } from './services/categories.service';
import { ValidateCategoryOwnershipService } from './services/validate-category-ownership.service';

// Controllers
import { CategoriesController } from './categories.controller';

const controllers = [CategoriesController];
const providers = [CategoriesService, ValidateCategoryOwnershipService];
const exportsItems = [ValidateCategoryOwnershipService];

@Module({
  controllers,
  providers,
  exports: [...exportsItems]
})
export class CategoriesModule {}
