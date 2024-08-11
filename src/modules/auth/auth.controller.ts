// Libs
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { AuthService } from './auth.service';

// Models
import { SignupDto, SigninDto } from './models/dto';

// Decorators
import { IsPublic } from '../../shared/decorators/IsPublic';

@IsPublic()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Authenticate a user.' })
  @ApiResponse({ status: 201, description: 'Authenticate a user and returns an accessToken' })
  authenticate(@Body() signinDto: SigninDto) {
    return this._authService.signin(signinDto);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiResponse({ status: 201, description: 'Create a new user and returns an accessToken' })
  create(@Body() signupDto: SignupDto) {
    return this._authService.signup(signupDto);
  }
}
