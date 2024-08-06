// Libs
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

// Repositories
import { UsersRepository } from '../../shared/database/repositories/users.repositories';

// Services
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '../mailer/mailer.service';

// Models
import { SigninDto, SignupDto } from './models/dto';

/**
 * `AuthService` provides authentication functionalities including signing in and signing up users.
 * It utilizes bcrypt for password hashing and comparison, and JWT for generating access tokens.
 * Additionally, it integrates with a mailer service to send welcome emails to new users.
 *
 * Dependencies:
 * - `UsersRepository`: To interact with the users database.
 * - `JwtService`: To generate JWT tokens for authenticated users.
 * - `MailerService`: To send emails.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly _usersRepository: UsersRepository,
    private readonly _jwtService: JwtService,
    private _mailerService: MailerService
  ) {}

  /**
   * Authenticates a user with their email and password.
   *
   * @param signinDto - Data Transfer Object containing email and password.
   * @returns An object containing the access token if authentication is successful.
   * @throws `UnauthorizedException` if authentication fails.
   */
  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this._usersRepository.findByEmail(email);
    const hashPassword = user ? await compare(password, user.password) : false;

    if (!user || !hashPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this._generateAccessToken(user.id);

    return { accessToken };
  }

  /**
   * Registers a new user with the provided details, hashes their password, and sends a welcome email.
   *
   * @param signupDto - Data Transfer Object containing user registration details.
   * @returns An object containing the access token for the newly created user.
   * @throws `BadRequestException` if the email is already in use.
   */
  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;
    const hashedPassword = await hash(password, 12);
    const emailTaken = await this._usersRepository.findByEmail(email);

    if (emailTaken) {
      throw new BadRequestException('Email already in use');
    }

    const user = await this._usersRepository.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    this._sendWelcomeEmail(user);

    const accessToken = await this._generateAccessToken(user.id);

    return { accessToken };
  }

  /**
   * Generates a JWT access token for a given user ID.
   *
   * @param id - The user ID for which to generate the token.
   * @returns A promise that resolves to the JWT access token.
   * @private
   */
  private async _generateAccessToken(id: string): Promise<string> {
    return await this._jwtService.signAsync({ sub: id });
  }

  /**
   * Sends a welcome email to a newly registered user.
   *
   * @param user - The user object containing the email and other details.
   * @private
   */
  private _sendWelcomeEmail(user: SignupDto): void {
    try {
      this._mailerService.sendWelcomeEmail(user);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      // TODO: Error handling or logging strategy should be implemented here.
    }
  }
}
