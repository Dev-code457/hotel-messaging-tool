// src/models/user.ts

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Function to create a dynamic user model based on hotelName
export const createUserModel = (hotelName: string) => {
  const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Optional: Convert to lowercase
        trim: true, // Optional: Trim whitespace
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
      },
      resetPasswordToken: {
        type: String,
        required: false,
      },
      resetPasswordExpire: {
        type: Date,
        required: false,
      },
      hotelName: {
        type: String,
        required: true,
        unique: false, // Remove uniqueness
      },
    },
    {
      timestamps: true,
    }
  );

  // Indexes for efficient querying
  userSchema.index({ resetPasswordToken: 1 });
  userSchema.index({ resetPasswordExpire: 1 });

  // Pre-save middleware to hash passwords
  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error: any) {
      next(error); // Pass error to next middleware
    }
  });

  // Method to compare entered password with hashed password
  userSchema.methods.matchPassword = async function (
    enteredPassword: string
  ): Promise<boolean> {
    console.log(enteredPassword);
    
    return await bcrypt.compare(enteredPassword, this.password);
  };

  // Generate a model name based on the hotel name
  const modelName = `User_${hotelName.replace(/\s+/g, '_')}`;

  // Check if the model already exists to prevent OverwriteModelError
  const User =
    mongoose.models[modelName] || mongoose.model(modelName, userSchema);

  return User;
};
