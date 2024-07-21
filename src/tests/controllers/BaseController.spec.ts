// Libs
import { FastifyReply } from 'fastify';

// Erros
import { AppError } from '../../errors/AppError';

// Controller
import { BaseController } from '../../controllers/BaseController';

// Subclasse de Teste
class TestBaseController extends BaseController {
  public testHandleError(error: unknown, reply: FastifyReply): void {
    this.handleError(error, reply);
  }
}

describe('BaseController', () => {
  let testBaseController: TestBaseController;
  let replyMock: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    testBaseController = new TestBaseController();
    replyMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as never;
  });

  describe('handleError', () => {
    it('should send the correct response for AppError', () => {
      // Arrange
      const error = new AppError('Custom error message', 400);

      // Act
      testBaseController.testHandleError(error, replyMock);

      // Assert
      expect(replyMock.status).toHaveBeenCalledWith(400);
      expect(replyMock.send).toHaveBeenCalledWith({ error: 'Custom error message' });
    });

    it('should send the correct response for unknown errors', () => {
      // Arrange
      const error = new Error('Unknown error');

      // Act
      testBaseController.testHandleError(error, replyMock);

      // Assert
      expect(replyMock.status).toHaveBeenCalledWith(500);
      expect(replyMock.send).toHaveBeenCalledWith({ error: 'An unexpected error occurred' });
    });

    it('should send the correct response for non-error objects', () => {
      // Arrange
      const error = 'A string error';

      // Act
      testBaseController.testHandleError(error, replyMock);

      // Assert
      expect(replyMock.status).toHaveBeenCalledWith(500);
      expect(replyMock.send).toHaveBeenCalledWith({ error: 'An unexpected error occurred' });
    });
  });
});
