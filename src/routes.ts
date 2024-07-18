// Libs
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';

// Controllers
import { CreateUserController } from './controllers/CreateUserController';

// Services
import { CreateUserService } from './services/CreateUserService';

export async function routes(fastify: FastifyInstance, _options: FastifyPluginOptions): Promise<void> {
  fastify.post('/user', async (request: FastifyRequest, reply: FastifyReply) => {
    // Instantiate the service
    const createUserService = new CreateUserService();

    // Instantiate the controller with the service
    const createUserController = new CreateUserController(createUserService);

    return createUserController.handle(request, reply);
  });
}
