import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './models/dto';

const mockUsersService = {
  create: jest.fn(dto => {
    return {
      id: Date.now(),
      ...dto
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

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123'
    };

    const result = await usersController.create(createUserDto);

    expect(result).toEqual({ id: expect.any(Number), ...createUserDto });
    expect(usersService.create).toHaveBeenCalledWith(createUserDto);
  });
});
