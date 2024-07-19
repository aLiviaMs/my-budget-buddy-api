// Libs
import { FastifyRequest, FastifyReply } from 'fastify';

// Services
import { CreateUserService } from '../services/user/CreateUserService';

// Models
import { ICreateUserDTO } from '../models/DTOs';

// Controllers
import { BaseController } from './BaseController';

/**
 * CreateUserController
 *
 * This class is responsible for handling requests to create new users.
 * It uses the `CreateUserService` to create a user and send the appropriate response.
 */
class CreateUserController extends BaseController {
  /** Instance of user service */
  private createUserService: CreateUserService;

  constructor(createUserService: CreateUserService) {
    super();
    this.createUserService = createUserService;
  }

  /**
   * This method is invoked to handle a request for creating a new user.
   * It extracts user data from the request body, uses the `CreateUserService`
   * to create the user in the database, and then sends the created user as a response.
   *
   * @param request FastifyRequest - The received request, containing user data in the body.
   * @param reply FastifyReply - The response object, used to send the response to the client.
   *
   * @returns Promise<void> - A promise that resolves when the response has been sent.
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { name, email, password } = request.body as ICreateUserDTO;
      const user = await this.createUserService.execute({ name, email, password });

      reply.code(201).send(user);
    } catch (error) {
      this.handleError(error, reply);
    }
  }
}

export { CreateUserController };
