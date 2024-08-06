// Libs
import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

// Services
import { AuthService } from './auth.service';
import { PrismaService } from '../../shared/database/prisma.service';
import { MailerService } from '../mailer/mailer.service';

// Repositories
import { UsersRepository } from '../../shared/database/repositories/users.repositories';

// Modules
import { DatabaseModule } from '../../shared/database/database.module';

// Models
import { SigninDto, SignupDto } from './models/dto';

const mockJwtService = {
  signAsync: jest.fn(() => 'mockedJwtToken')
};

const mockUsersRepository = {
  create: jest.fn().mockImplementation(dto => dto),
  findByEmail: jest.fn(),
  findById: jest.fn()
};

const mockMailerService = {
  sendMail: jest.fn(),
  sendWelcomeEmail: jest.fn()
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        AuthService,
        PrismaService,
        {
          provide: JwtService,
          useValue: mockJwtService
        },
        {
          provide: UsersRepository,
          useValue: mockUsersRepository
        },
        {
          provide: MailerService,
          useValue: mockMailerService
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return accessToken', async () => {
    const user: SignupDto = {
      email: 'user@example.com',
      name: 'user',
      password: 'password'
    };

    mockUsersRepository.findByEmail.mockReturnValueOnce(null);

    expect(await service.signup(user)).toEqual(expect.any(Object));
  });

  it('should throw an error if user already exists', async () => {
    const user: SignupDto = {
      email: 'existinguser@example.com',
      name: 'existinguser',
      password: 'password'
    };

    // Mock findByEmail to return a user (user already exists)
    mockUsersRepository.findByEmail.mockReturnValueOnce({ email: user.email, name: user.name });

    await expect(service.signup(user)).rejects.toThrow(BadRequestException);
  });

  it('should throw an error if credentials are wrong', async () => {
    const user: SigninDto = {
      email: 'existinguser@example.com',
      password: 'password'
    };

    // Mock findByEmail to return a user (user already exists)
    mockUsersRepository.findById.mockReturnValueOnce(expect.any(Object));

    await expect(service.signin(user)).rejects.toThrow(UnauthorizedException);
  });
});
