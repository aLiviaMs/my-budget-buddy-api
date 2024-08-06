// Libs
import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';

// Controllers
import { MailerController } from './mailer.controller';

// Services
import { MailerService } from './mailer.service';

// Models
import { SignupDto } from '../auth/models/dto';

const mockMailerService = {
  sendWelcomeEmail: jest.fn()
};

describe('MailerController', () => {
  let controller: MailerController;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailerController],
      providers: [MailerService]
    })
      .overrideProvider(MailerService)
      .useValue(mockMailerService)
      .compile();

    controller = module.get<MailerController>(MailerController);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should send welcome email', async () => {
    const createUserDto: SignupDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123'
    };

    await controller.sendWelcomeEmail(createUserDto);
    expect(mailerService.sendWelcomeEmail).toHaveBeenCalledWith(createUserDto);
  });
});
