// Libs
import { FastifyReply } from 'fastify';

// Errors
import { AppError } from '../errors/AppError';

/**
 * BaseController
 *
 * This class provides common functionality for all controllers,
 * including error handling.
 */
class BaseController {
  /**
   * handleError
   *
   * This method is invoked to handle errors that occur during the request handling.
   *
   * @param error - The error that occurred.
   * @param reply - The response object, used to send the response to the client.
   */
  protected handleError(error: unknown, reply: FastifyReply): void {
    if (error instanceof AppError) {
      reply.status(error.statusCode).send({ error: error.message });
    } else {
      reply.status(500).send({ error: 'An unexpected error occurred' });
    }
  }
}

export { BaseController };
