import mongoose, { Schema } from "mongoose";

const universitySchema = new Schema({
  name: { type: String, required: true },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const University =
  mongoose.models.university ?? mongoose.model("university", universitySchema);
