// Libs
import bcrypt from 'bcrypt';
import prismaClient from '../../prisma';

// Services
import { CreateUserService } from '../../services/user/CreateUserService';

jest.mock('../../services/email/EmailService', () => ({
  EmailService: jest.fn().mockImplementation(() => ({
    sendWelcomeEmail: jest.fn()
  }))
}));

describe('CreateUserService', () => {
  let createUserService: CreateUserService;

  beforeEach(() => {
    createUserService = new CreateUserService();
  });

  describe('execute', () => {
    it('should throw an error if any field is missing', async () => {
      // Arrange
      const userData = { name: '', email: '', password: '' };

      // Act & Assert
      await expect(createUserService.execute(userData)).rejects.toThrow('Preencha todos os campos');
    });

    it('should throw an error if password is less than 8 characters', async () => {
      // Arrange
      const userData = { name: 'Test', email: 'test@test.com', password: '1234567' };

      // Act & Assert
      await expect(createUserService.execute(userData)).rejects.toThrow('A senha deve ter pelo menos 8 caracteres');
    });

    it('should throw an error if email is invalid', async () => {
      // Arrange
      const userData = { name: 'Test', email: 'invalid_email', password: '12345678' };

      // Act & Assert
      await expect(createUserService.execute(userData)).rejects.toThrow('Email inválido');
    });

    it('should throw an error if email already exists', async () => {
      // Arrange
      const userData = { name: 'Test', email: 'test@test.com', password: '12345678' };
      (prismaClient.user.findUnique as jest.Mock).mockResolvedValueOnce({});

      // Act & Assert
      await expect(createUserService.execute(userData)).rejects.toThrow('Erro ao criar usuário. Por favor, tente novamente.');
    });

    it('should create a user successfully', async () => {
      // Arrange
      const userData = { name: 'Test', email: 'test@test.com', password: '12345678' };
      const createdUser = { id: '1', ...userData, password: 'hashed_password', status: true };
      (prismaClient.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashed_password');
      (prismaClient.user.create as jest.Mock).mockResolvedValueOnce(createdUser);

      // Act
      const result = await createUserService.execute(userData);

      // Assert
      expect(result).toEqual(createdUser);
      expect(prismaClient.user.create).toHaveBeenCalledWith({
        data: {
          name: userData.name,
          email: userData.email,
          password: 'hashed_password',
          status: true
        }
      });
    });

    it('should throw an error if user creation fails', async () => {
      // Arrange
      const userData = { name: 'Test', email: 'test@test.com', password: '12345678' };
      (prismaClient.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashed_password');
      (prismaClient.user.create as jest.Mock).mockRejectedValueOnce({});

      // Act & Assert
      await expect(createUserService.execute(userData)).rejects.toThrow('Erro ao criar usuário. Por favor, tente novamente.');
    });
  });
});
