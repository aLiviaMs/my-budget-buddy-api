// Libs
import { FastifyRequest, FastifyReply } from 'fastify';

// Controllers
import { CreateUserController } from '../../controllers/CreateUserController';

// Services
import { CreateUserService } from '../../services/user/CreateUserService';

// Models
import { ICreateUserDTO } from '../../models/DTOs';
import { MockRequest, MockReply } from '../common/types';

describe('CreateUserController', () => {
  let createUserService: CreateUserService;
  let createUserController: CreateUserController;
  let mockRequest: MockRequest;
  let mockReply: MockReply;

  beforeEach(() => {
    createUserService = {
      execute: jest.fn()
    } as unknown as CreateUserService;

    createUserController = new CreateUserController(createUserService);

    mockRequest = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      }
    };

    mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  describe('handle', () => {
    it('should create a user and return 201 status code', async () => {
      // Arrange
      const userData: ICreateUserDTO = mockRequest.body as ICreateUserDTO;
      const user = { id: '1', ...userData };

      (createUserService.execute as jest.Mock).mockResolvedValue(user);

      // Act
      await createUserController.handle(mockRequest as FastifyRequest, mockReply as FastifyReply);

      // Assert
      expect(createUserService.execute).toHaveBeenCalledWith(userData);
      expect(mockReply.code).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith(user);
    });

    it('should handle errors and return appropriate response', async () => {
      // Arrange
      const userData: ICreateUserDTO = mockRequest.body as ICreateUserDTO;
      const error = new Error('Test error');

      (createUserService.execute as jest.Mock).mockRejectedValue(error);

      // Act
      await createUserController.handle(mockRequest as FastifyRequest, mockReply as FastifyReply);

      // Assert
      expect(createUserService.execute).toHaveBeenCalledWith(userData);
      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ error: 'An unexpected error occurred' });
    });
  });
});
