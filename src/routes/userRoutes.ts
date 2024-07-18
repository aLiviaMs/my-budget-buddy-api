// Libs
import { FastifyInstance } from 'fastify';

// Controllers
import { CreateUserController } from '../controllers/CreateUserController';

// Services
import { CreateUserService } from '../services/CreateUserService';

/**
 * userRoutes
 *
 * This function is responsible for registering user-related routes in the application.
 * It instantiates the necessary services and controllers, and then registers the routes with the instance.
 *
 * @param app FastifyInstance - The Fastify instance to which the routes will be registered.
 *
 * @returns Promise<void> - A promise that resolves when all user-related routes have been registered.
 */
export async function userRoutes(app: FastifyInstance): Promise<void> {
  // Instantiate the services
  const createUserService = new CreateUserService();

  // Instantiate the controllers with the services
  const createUserController = new CreateUserController(createUserService);

  // Register the routes
  app.post('/user', async (request, reply) => {
    return createUserController.handle(request, reply);
  });
}
