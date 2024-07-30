// Libs
import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

// Dtos
import { CreateUserDto } from './models/dto';

// Services
import { UsersRepository } from '../../shared/database/repositories/users.repositories';
import { MailerService } from '../mailer/mailer.service';

/**
 * Service responsible for user management, including creation and initialization of user data.
 */
@Injectable()
export class UsersService {
  /**
   * Constructs the UsersService.
   * @param _usersRepository The repository for user data access.
   * @param _mailerService The service for sending emails.
   */
  constructor(
    private readonly _usersRepository: UsersRepository,
    private _mailerService: MailerService
  ) {}

  /**
   * Creates a new user with the provided data, hashes the password, checks for email uniqueness,
   * and initializes default categories for the user.
   * @param data The user data for creating a new user.
   * @returns The created user object.
   * @throws {BadRequestException} If the email is already taken.
   */
  public async create(data: CreateUserDto) {
    const { name, email, password } = data;
    const hashedPassword = await hash(password, 12);
    const emailTaken = await this._usersRepository.findByEmail(email);

    if (emailTaken) {
      throw new BadRequestException();
    }

    const user = await this._usersRepository.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income categories
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Outcome categories
              { name: 'Casa', icon: 'home', type: 'OUTCOME' },
              { name: 'Alimentação', icon: 'food', type: 'OUTCOME' },
              { name: 'Educação', icon: 'education', type: 'OUTCOME' },
              { name: 'Lazer', icon: 'fun', type: 'OUTCOME' },
              { name: 'Mercado', icon: 'grocery', type: 'OUTCOME' },
              { name: 'Roupas', icon: 'clothes', type: 'OUTCOME' },
              { name: 'Transporte', icon: 'transport', type: 'OUTCOME' },
              { name: 'Viagem', icon: 'travel', type: 'OUTCOME' },
              { name: 'Outro', icon: 'other', type: 'OUTCOME' }
            ]
          }
        }
      }
    });

    this._sendWelcomeEmail(user);

    return user;
  }

  /**
   * Sends a welcome email to the newly created user.
   * @param user The user to whom the welcome email will be sent.
   * @private
   */
  private _sendWelcomeEmail(user: CreateUserDto): void {
    try {
      this._mailerService.sendWelcomeEmail(user);
    } catch (error) {
      console.error(error);
      // TODO: Implement logger monitoring
    }
  }
}
