/**
 * AppError
 *
 * This class extends the built-in Error class to provide a custom error type
 * that includes an HTTP status code. It is used to handle application-specific
 * errors in a more structured way.
 *
 * @extends Error
 */
class AppError extends Error {
  /** The HTTP status code associated with this error. */
  public readonly statusCode: number;

  /**
   * Creates an instance of AppError.
   *
   * @param message - The error message.
   * @param statusCode - The HTTP status code associated with the error.
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export { AppError };
