// Libs
import { Body, Controller, Post } from '@nestjs/common';

// Services
import { AuthService } from './auth.service';

// Models
import { SignupDto, SigninDto } from './models/dto';

// Decorators
import { IsPublic } from '../../shared/decorators/IsPublic';

/**
 * AuthController handles authentication-related routes.
 *
 * @remarks
 * This controller is marked with `@IsPublic()` decorator to allow
 * unauthenticated access to its routes.
 *
 * @see {@link AuthService} for the service used by this controller.
 * @see {@link SigninDto} and {@link SignupDto} for the DTOs used in this controller.
 */
@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  /**
   * Handles the POST request to authenticate a user.
   *
   * @param signinDto - The data transfer object for signin containing username and password.
   * @returns The result of the authentication process.
   */
  @Post('signin')
  authenticate(@Body() signinDto: SigninDto) {
    return this._authService.signin(signinDto);
  }

  /**
   * Handles the POST request to create a new user account.
   *
   * @param signupDto - The data transfer object for signup containing user details.
   * @returns The result of the signup process.
   */
  @Post('signup')
  create(@Body() signupDto: SignupDto) {
    return this._authService.signup(signupDto);
  }
}
