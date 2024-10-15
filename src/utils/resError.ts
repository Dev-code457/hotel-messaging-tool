// utils/ApiResponse.ts
import { NextResponse } from "next/server"; // Use this for edge/middleware responses

export class ApiResponse<T> {
  public success: boolean;
  public message: string;
  public data?: T;
  public errors?: any[];

  constructor(success: boolean, message: string, data?: T, errors?: any[]) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }

  // Helper method to send the response
  static send<T>(apiResponse: ApiResponse<T>, statusCode: number) {
    return NextResponse.json(apiResponse, { status: statusCode });
  }

  // Success response
  static success<T>(data: T, message = "Request successful", statusCode = 200) {
    const apiResponse = new ApiResponse<T>(true, message, data);
    return this.send(apiResponse, statusCode);
  }

  // Error response
  static error(errors: any[] = [], message = "Request failed", statusCode = 400) {
    const apiResponse = new ApiResponse(false, message, undefined, errors);
    return this.send(apiResponse, statusCode);
  }
}
