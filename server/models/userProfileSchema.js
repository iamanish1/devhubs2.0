import mongoose from "mongoose";
import { Schema } from "mongoose";
import {
  passwordValidator,
  roleValidator,
  skillsValidator,
} from "../validators/userValidators.js";

const userProfileSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    fullName: {
      type: String,
      trim: true,
      minLength: [3, "Name should be more than 3 chars"],
    },
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
    mobileNumber: {
      type: String,
      
      unique: true,
      trim: true,
      sparse: true,
      
      match: [
        /^[6-9]\d{9}$/,
        "Please enter a valid 10-digit Indian mobile number",
      ],
    },
    location: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    skills: {
      type: [String],
      default: [],
    },

    socialLinks: {
      instagram: {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._%-]+$/,
          "Invalid Instagram URL",
        ],
      },
      linkedin: {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9._%-]+$/,
          "Invalid LinkedIn URL",
        ],
      },
      github: {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9._%-]+$/,
          "Invalid GitHub URL",
        ],
      },
      facebook: {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9._%-]+$/,
          "Invalid Facebook URL",
        ],
      },
      custom: {
        type: Map,
        of: String,
        default: new Map(),
      },
    },
    profilePicture: {
      type: [],
      default: ["www.img.common.image.com"],
    },

    savedProject: [{ type: mongoose.Schema.Types.ObjectId }],

    recentProject: [{ type: mongoose.Schema.Types.ObjectId }],

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

  { timestamps: true }
);

export const UserProfile = mongoose.model("UserProfile", userProfileSchema);
