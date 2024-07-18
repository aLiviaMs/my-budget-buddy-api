// Libs
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';

// Controllers
import { CreateUserController } from './controllers/CreateUserController';

export async function routes(fastify: FastifyInstance, _options: FastifyPluginOptions): Promise<void> {
  fastify.post('/user', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateUserController().handle(request, reply);
  });
}
