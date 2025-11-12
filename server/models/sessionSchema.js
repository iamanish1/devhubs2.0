import mongoose from "mongoose";
import { Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    refreshToken: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    ip: {
      type: String,
    },

    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Session = mongoose.model("Session", sessionSchema);
