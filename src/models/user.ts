// src/models/user.ts

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the user schema
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
    username: {
      type: String,
      required: false,  // Make this field optional
      unique: false,    // Remove uniqueness
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
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if the model already exists to prevent OverwriteModelError
const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
