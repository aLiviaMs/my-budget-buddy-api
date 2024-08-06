// Services
import { PrismaService } from '../../shared/database/prisma.service';
import { MailerService } from '../mailer/mailer.service';

// Repositories
import { UsersRepository } from '../../shared/database/repositories/users.repositories';

// Models
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

// Modules
import { DatabaseModule } from '../../shared/database/database.module';

const mockUsersRepository = {
  create: jest.fn().mockImplementation(dto => dto),
  findByEmail: jest.fn(),
  findById: jest.fn()
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

  it('should call user repositor to get user user data', async () => {
    mockUsersRepository.findById.mockReturnValueOnce({ email: 'foo@bar.com', name: 'bar' });

    expect(await service.getUserById('123')).toEqual(expect.any(Object));
  });
});
