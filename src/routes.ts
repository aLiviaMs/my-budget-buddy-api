import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';

export async function routes(fastify: FastifyInstance, _options: FastifyPluginOptions): Promise<void> {
  fastify.get('/test', async (_request: FastifyRequest, _reply: FastifyReply) => {
    return { ok: true };
  });
}
