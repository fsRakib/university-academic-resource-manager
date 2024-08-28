import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  age: Number,
  dept: String,
});

export const User =
  mongoose.models.users || mongoose.model("users", UserSchema);
