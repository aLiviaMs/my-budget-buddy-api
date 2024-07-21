// Libs
import { FastifyInstance } from 'fastify';

// Routes
import { userRoutes } from './userRoutes';

/**
 * registerRoutes
 *
 * This function is responsible for registering all the routes in the Fastify application.
 * It imports and registers individual route modules, such as `userRoutes`, to the Fastify instance.
 *
 * @param app FastifyInstance - The Fastify instance to which the routes will be registered.
 *
 * @returns Promise<void> - A promise that resolves when all routes have been registered.
 */
export default async function registerRoutes(app: FastifyInstance): Promise<void> {
  await app.register(userRoutes);
}
