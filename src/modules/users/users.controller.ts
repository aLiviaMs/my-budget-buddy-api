// Libs
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { UsersService } from './users.service';

// Decorators
import { ActiveUserId } from '../../shared/decorators/ActiveUserId';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get('/me')
  @ApiOperation({ summary: "Get the currently authenticated user's information." })
  @ApiResponse({ status: 200, description: 'The user information has been successfully retrieved.' })
  me(@ActiveUserId() id: string) {
    return this._usersService.getUserById(id);
  }
}
