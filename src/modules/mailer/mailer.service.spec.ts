// Libs
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

// Services
import { MailerService } from './mailer.service';
import { PrismaService } from '../../shared/database/prisma.service';
import { MailerService as MailerMain } from '@nestjs-modules/mailer';

// Models
import { CreateUserDto } from '../users/models/dto';

const mockMailerMain = {
  sendMail: jest.fn()
};

describe('MailerService', () => {
  let service: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailerService,
        PrismaService,
        {
          provide: MailerMain,
          useValue: mockMailerMain
        }
      ]
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendWelcomeEmail', () => {
    it('should send a welcome email', async () => {
      const user: CreateUserDto = {
        email: 'user@example.com',
        name: 'user',
        password: 'password'
      };

      await service.sendWelcomeEmail(user);

      expect(mockMailerMain.sendMail).toHaveBeenCalledWith({
        to: user.email,
        from: `"Oi do seu maior parceiro :)" <${process.env.SMTP_USER}>`,
        subject: 'Bem vindo ao Budget Buddy!',
        text: `Olá ${user.name},\n\nBem-vindo ao Budget Buddy! Estamos empolgados para ajudar você a organizar suas despesas financeiras.`,
        html: expect.any(String)
      });
    });

    it('should throw an error if sendMail fails', async () => {
      const user: CreateUserDto = {
        email: 'user@example.com',
        name: 'user',
        password: 'password'
      };

      mockMailerMain.sendMail.mockImplementationOnce(() => {
        throw new BadRequestException();
      });

      await expect(service.sendWelcomeEmail(user)).rejects.toThrow(BadRequestException);
    });
  });
});
