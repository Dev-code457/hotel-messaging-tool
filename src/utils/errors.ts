// BaseError class to extend for specific error types
export abstract class BaseError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean; // Indicates if the error is operational or programming
  
    constructor(message: string, statusCode: number, isOperational: boolean) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      this.name = this.constructor.name; // Set the name dynamically to the class name
      Error.captureStackTrace(this, this.constructor); // Capture stack trace for debugging
    }
  }
  
  // BadRequestError for 400 status codes
  export class BadRequestError extends BaseError {
    constructor(message: string) {
      super(message, 400, true);
    }
  }
  
  // ConflictError for 409 status codes
  export class ConflictError extends BaseError {
    constructor(message: string) {
      super(message, 409, true);
    }
  }
  
  // NotFoundError for 404 status codes
  export class NotFoundError extends BaseError {
    constructor(message: string) {
      super(message, 404, true);
    }
  }
  
  // UnauthorizedError for 401 status codes
  export class UnauthorizedError extends BaseError {
    constructor(message: string) {
      super(message, 401, true);
    }
  }
  
  // InternalServerError for 500 status codes
  export class InternalServerError extends BaseError {
    constructor(message: string) {
      super(message, 500, false); // Not operational
    }
  }
  
  // ValidationError for custom validation errors
  export class ValidationError extends BaseError {
    public readonly errors: Record<string, string[]>; // Store validation error details
  
    constructor(errors: Record<string, string[]>) {
      super('Validation failed', 422, true); // Unprocessable Entity
      this.errors = errors;
    }
  }
  
  // Example logging function
  const logError = (error: BaseError): void => {
    // Here you could integrate a logging service or framework
    console.error(`Error: ${error.message}, StatusCode: ${error.statusCode}, Stack: ${error.stack}`);
  };
  

