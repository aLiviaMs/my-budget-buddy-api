import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
  constructor(private readonly _categoriesRepository: CategoriesRepository) {}

  findAllByUserId(userId: string) {
    return this._categoriesRepository.findMany({
      where: { userId }
    });
  }
}
