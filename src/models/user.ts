import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const createUserModel = (hotelID: string) => {
  const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
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
      },
    
      transaction: {
        type: Object,
      },
      planType: {
        type: String,
        default: "Basic",
        enum: ["Basic", "Premium", "Standard"], 
      },
      messageLimit: {
        type: Number,
        default: 100, 
      },
      customerLimit: {
        type: Number,
        default: 50,
      },
      templates: {
        type: Number,
        default: 5,
      },
    },
    {
      timestamps: true,
    }
  );

  userSchema.index({ resetPasswordToken: 1 });
  userSchema.index({ resetPasswordExpire: 1 });

  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error: any) {
      next(error);
    }
  });

  userSchema.methods.matchPassword = async function (
    enteredPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  const modelName = `User_${hotelID.replace(/-/g, "_")}`;
  const User = mongoose.models[modelName] || mongoose.model(modelName, userSchema);

  return User;
};
