// Libs
import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

// Dtos
import { CreateUserDto } from './models/dto';

// Services
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly _usersRepository: UsersRepository,
    private _mailerService: MailerService
  ) {}

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
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },

              // OUTCOME
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

    this._sendWelcomeEMail(user);

    return user;
  }

  private _sendWelcomeEMail(user: CreateUserDto): void {
    try {
      this._mailerService.sendWelcomeEMail(user);
    } catch (error) {
      console.error(error);
      // TODO: Create logger monitoring
    }
  }
}
