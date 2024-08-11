// Libs
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { CategoriesService } from './services/categories.service';

// Models
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly _categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all categories for a specific user.' })
  @ApiResponse({ status: 200, description: 'A list of categories belonging to the user.' })
  findAllByUserId(@ActiveUserId() userId: string) {
    return this._categoriesService.findAllByUserId(userId);
  }
}
