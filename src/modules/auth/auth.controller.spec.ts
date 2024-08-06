// Libs
import { Test, TestingModule } from '@nestjs/testing';

// Controllers
import { AuthController } from './auth.controller';

// Services
import { AuthService } from './auth.service';

// Models
import { SigninDto, SignupDto } from './models/dto';

const mockAuthService = {
  signin: jest.fn(() => {
    return {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmUxNGJjNy05MzMxLTQxM2UtYTMxMy0xN2UxMDUzNTU4NDYiLCJpYXQiOjE3MjI5MDUzMTQsImV4cCI6MTcyMjk5MTcxNH0.CfKDfWRzzIuuOYXiKfJhz26JygAsu0WqivcwhZZyIIs'
    };
  }),
  signup: jest.fn(() => {
    return {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmUxNGJjNy05MzMxLTQxM2UtYTMxMy0xN2UxMDUzNTU4NDYiLCJpYXQiOjE3MjI5MDUzMTQsImV4cCI6MTcyMjk5MTcxNH0.CfKDfWRzzIuuOYXiKfJhz26JygAsu0WqivcwhZZyIIs'
    };
  })
};

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: SignupDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123'
    };

    const result = await controller.create(createUserDto);

    expect(result).toEqual({ accessToken: expect.any(String) });
    expect(authService.signup).toHaveBeenCalledWith(createUserDto);
  });

  it('should authenticate a user', async () => {
    const user: SigninDto = {
      email: 'test@example.com',
      password: 'test123'
    };

    const result = await controller.authenticate(user);

    expect(result).toEqual({ accessToken: expect.any(String) });
    expect(authService.signin).toHaveBeenCalledWith(user);
  });
});
