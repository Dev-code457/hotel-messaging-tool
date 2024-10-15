// utils/ApiError.ts
export class ApiError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
    Error.captureStackTrace(this, this.constructor);
  }
}
