// Libs
import bcrypt from 'bcrypt';

// Prisma
import prismaClient from '../prisma';

// DTOs
import { ICreateUserDTO } from '../models/DTOs';
import { ICreateUserDTOResponse } from '../models/DTOs/User/ICreateUserDTOResponse';

// Errors
import { AppError } from '../errors/AppError';

class CreateUserService {
  /**
   * Executes the user creation process.
   *
   * @param userData - The user data.
   * @returns The created user.
   * @throws If user creation fails.
   */
  async execute(userData: ICreateUserDTO): Promise<ICreateUserDTOResponse> {
    await CreateUserService.validateInput(userData);

    const passwordHash = await CreateUserService.hashPassword(userData.password);

    try {
      const user = await prismaClient.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: passwordHash,
          status: true
        }
      });

      return user;
    } catch {
      throw new AppError('Erro ao criar usuário. Por favor, tente novamente.', 400);
    }
  }

  /**
   * Validates user input and checks for email uniqueness.
   * @param param0 - User input data.
   * @throws If validation fails.
   */
  private static async validateInput({ name, email, password }: ICreateUserDTO): Promise<void> {
    if (!name || !email || !password) {
      throw new AppError('Preencha todos os campos', 400);
    }

    if (password.length < 8) {
      throw new AppError('A senha deve ter pelo menos 8 caracteres', 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new AppError('Email inválido', 400);
    }

    const emailExists = await prismaClient.user.findUnique({
      where: { email }
    });
    if (emailExists) {
      throw new AppError('Erro ao criar usuário. Por favor, tente novamente.', 400);
    }
  }

  /**
   * Hashes the user's password.
   * @param password - The user's password.
   * @returns The hashed password.
   */
  private static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}

export { CreateUserService };
