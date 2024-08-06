// Libs
import { Test, TestingModule } from '@nestjs/testing';

// Controller
import { UsersController } from './users.controller';

// Services
import { UsersService } from './users.service';

const mockUsersService = {
  getUserById: jest.fn(() => {
    return {
      email: '',
      name: ''
    };
  })
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it("should get user's information", async () => {
    const id = '1';
    const result = await usersController.me(id);

    expect(result).toEqual({ email: expect.any(String), name: expect.any(String) });
    expect(usersService.getUserById).toHaveBeenCalledWith(id);
  });
});
