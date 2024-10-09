// services/authService.ts
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user"; 
import { NotFoundError, UnauthorizedError } from "@/utils/errors";
import generateTokens from "@/utils/generateTokens";

export async function loginUser(email: string, password: string) {
  await connectToDatabase(); // Connect to the database

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("User Not Found");
  }

  const isValidPassword = await user.matchPassword(password);
  if (!isValidPassword) {
    throw new UnauthorizedError("Invalid Password");
  }

  const token = generateTokens(user._id);
  return { user, token };
}
