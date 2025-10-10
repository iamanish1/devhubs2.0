import mongoose from "mongoose";
import { Schema } from "mongoose";
import { passwordValidator, roleValidator } from "./validators/userValidators";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9_]{3,20}$/,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },
    professionalRole: {
      type: String,
      enum: ["Developer", "Designer", "Project Owner"],
      default: "Developer",
      validate: {
        validator: roleValidator,
        message: "At least 1 role should be selected",
      },
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minLength: [8, "Password should at least 8 chars required"],
      validate: {
        validator: passwordValidator,
        message:
          "Password should contain one Capital letter ,Special Char and Number should 8 words long",
      },
    },
    isEmailVerified: false,
    isUserLoggedIn: false,
    isNumberVerified: false,
    otp: {
      type: Number,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    accessToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default User = mongoose.model("User", userSchema);
