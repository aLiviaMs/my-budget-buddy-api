import { FastifyReply, FastifyRequest } from 'fastify';

export type MockRequest = Partial<FastifyRequest>;
export type MockReply = Partial<FastifyReply>;
