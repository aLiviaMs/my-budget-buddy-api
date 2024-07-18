// Libs
import { FastifyReply } from 'fastify';

// Erros
import { AppError } from '../errors/AppError';

/**
 * BaseController
 *
 * This class provides common functionality for all controllers,
 * including error handling.
 */
class BaseController {
  /**
   * handleError method
   *
   * This method is invoked to handle errors that occur during the request handling.
   *
   * @param error Error - The error that occurred.
   * @param reply FastifyReply - The response object, used to send the response to the client.
   *
   * @returns void
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
