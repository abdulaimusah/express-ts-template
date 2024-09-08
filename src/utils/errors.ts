export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(message: string) {
      super(message, 404);
    }
  }
  
  export class ValidationError extends AppError {
    constructor(message: string) {
      super(message, 400);
    }
  }
  
  export class UnauthorizedError extends AppError {
    constructor(message: string) {
      super(message, 401);
    }
  }
  
  export class ForbiddenError extends AppError {
    constructor(message: string) {
      super(message, 403);
    }
  }