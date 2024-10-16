// services/userService.ts
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user"; 
import { ConflictError } from "@/utils/errorHandler";
import bcrypt from "bcryptjs"; 

export async function createUser(email: string, password: string) {
  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ConflictError("User already exists");
  }
  const user = new User({ email, password });
  await user.save();

  return user;
}
