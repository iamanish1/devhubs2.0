import mongoose from "mongoose";
import { Schema } from "mongoose";
import { skillsValidator } from "./validators/userValidators";

const userProfileSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
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
      validate: {
        validator: passwordValidator,
        message:
          "Password should contain one Capital letter ,Special Char and Number should 8 words long",
      },
    },
    mobileNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [
        /^[6-9]\d{9}$/,
        "Please enter a valid 10-digit Indian mobile number",
      ],
    },
    location: {
      type: String,
      default:null
    },
    bio: {
      type: String,
      default:null
    },
    skills: {
      type: [String],
      default: [],
      validate: {
        validator: skillsValidator,
        message: "At least one skill should be selected",
      },
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
      type: String,
      default: ["www.img.common.image.com"],
    },

    savedProject: [{ type: mongoose.Schema.Types.ObjectId }],
    recentProject: [{ type: mongoose.Schema.Types.ObjectId }],
    isUserLoggedIn: false,
    isEmailVerified: false,
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

  { timestamps: true }
);

export default UserProfile = mongoose.model("UserProfile", userProfileSchema);
