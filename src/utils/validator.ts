// utils/validators.ts
import { BadRequestError } from "./errors";

export function validateUserInput(email: string, password: string) {
  if (!email || !password) {
    throw new BadRequestError("All fields are mandatory.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new BadRequestError("Invalid email format.");
  }
}
