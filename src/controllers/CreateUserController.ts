// Libs
import { FastifyRequest, FastifyReply } from 'fastify';

// Services
import { CreateUserService } from '../services/CreateUserService';

// Models
import { ICreateUserDTO } from '../models/DTOs';

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { name, email, password } = request.body as ICreateUserDTO;

    const userService = new CreateUserService();
    const user = await userService.execute({ name, email, password });

    reply.send(user);
  }
}

export { CreateUserController };
