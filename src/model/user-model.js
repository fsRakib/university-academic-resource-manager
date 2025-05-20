import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    university: {
      type: String,
      default: "",
    },
    department: {
      type: String,
      default: "",
    },
    session: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotToken: String,
    forgotTokenExpiry: Date,
    otp: String,
    otpExpiry: Date,
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User ?? mongoose.model("User", userSchema);
