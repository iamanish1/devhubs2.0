import mongoose from "mongoose";
import { Schema } from "mongoose";
import {
  passwordValidator,
  roleValidator,
} from "../validators/userValidators.js";

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
      //removed validate because it was causing error in saving when hashed
    },

    //using verifiedAt like this because we have some more info that just a boolean

    verifiedAt: {
      type: Date,
      default: null,
    },

    loggedInAt: {
      type: Date,
      default: null,
    },

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

export const User = mongoose.model("User", userSchema);
