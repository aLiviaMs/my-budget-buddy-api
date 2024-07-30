// Libs
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

// Services
import { MailerService } from './mailer.service';
import { PrismaService } from '../../shared/database/prisma.service';

// Models
import { CreateUserDto } from '../users/models/dto';

describe('MailerService', () => {
  let service: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerService, PrismaService]
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendWelcomeEmail', () => {
    it('should create a new user record and return that', async () => {
      const user: CreateUserDto = {
        email: 'user@example.com',
        name: 'user',
        password: 'password'
      };

      expect(await service.sendWelcomeEmail(user)).toEqual(expect.any(Object));
    });

    it('should create a new user record and return that', async () => {
      const user: CreateUserDto = {
        email: 'user@example.com',
        name: 'user',
        password: 'password'
      };

      jest.spyOn(service, 'sendWelcomeEmail').mockImplementation(() => {
        throw BadRequestException;
      });

      expect(await service.sendWelcomeEmail(user)).rejects.toThrow(BadRequestException);
    });
  });
});
