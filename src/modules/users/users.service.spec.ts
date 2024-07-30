import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseModule } from '../../shared/database/database.module';
import { PrismaService } from '../../shared/database/prisma.service';
import { UsersRepository } from '../../shared/database/repositories/users.repositories';
import { MailerService } from '../mailer/mailer.service';
import { CreateUserDto } from './models/dto';
import { BadRequestException } from '@nestjs/common';

const mockUsersRepository = {
  create: jest.fn().mockImplementation(dto => dto),
  findByEmail: jest.fn()
};

const mockMailerService = {
  sendMail: jest.fn(),
  _sendWelcomeEmail: jest.fn()
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        PrismaService,
        UsersService,
        UsersRepository,
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

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    const user: CreateUserDto = {
      email: 'user@example.com',
      name: 'user',
      password: 'password'
    };

    mockUsersRepository.findByEmail.mockReturnValueOnce(null);

    expect(await service.create(user)).toEqual(expect.any(Object));
  });

  it('should throw an error if user already exists', async () => {
    const user: CreateUserDto = {
      email: 'existinguser@example.com',
      name: 'existinguser',
      password: 'password'
    };

    // Mock findByEmail to return a user (user already exists)
    mockUsersRepository.findByEmail.mockReturnValueOnce({ id: 1, email: 'existinguser@example.com' });

    await expect(service.create(user)).rejects.toThrow(BadRequestException);
  });
});
