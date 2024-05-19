/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import HttpStatusCode from './statusCode';
export class APIError extends Error {
  statusCode: number;
  operationErrorCode?: string;
  errorData = {};

  constructor(message: string, statusCode: number, name?: string, operationErrorCode?: string) {
    super(name);
    this.name = 'APIError';
    this.message = message;
    this.statusCode = statusCode;
    this.operationErrorCode = operationErrorCode;
  }

  static Conflict(message: string) {
    return new APIError(message, HttpStatusCode.CONFLICT, 'APIError::Conflict');
  }

  static BadRequest(message: string) {
    return new APIError(message, HttpStatusCode.BAD_REQUEST, 'APIError::BadRequest');
  }

  static ServerError(message: string) {
    return new APIError(message, HttpStatusCode.INTERNAL_SERVER_ERROR, 'APIError::ServerError');
  }

  static NotFound(message: string) {
    return new APIError(message, HttpStatusCode.NOT_FOUND, 'APIError::NotFound');
  }

  static PaymentRequired(message: string) {
    return new APIError(message, HttpStatusCode.PAYMENT_REQUIRED, 'APIError::PaymentRequired');
  }

  static AlreadyReported(message: string) {
    return new APIError(message, HttpStatusCode.ALREADY_REPORTED, 'APIError::AlreadyReported');
  }

  static Unauthorized(message = 'unauthorized') {
    return new APIError(message, HttpStatusCode.UNAUTHORIZED, 'APIError::Unauthorized');
  }

  static Forbidden(message: string) {
    return new APIError(message, HttpStatusCode.FORBIDDEN, 'APIError::Forbidden');
  }

  static NotImplemented() {
    return new APIError(
      'request route and api not found or not implemented',
      HttpStatusCode.NOT_FOUND,
      'APIError::NotImplemented',
    );
  }
}
