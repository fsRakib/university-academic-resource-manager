import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  departmentId: { type: Schema.Types.ObjectId, ref: "department", required: true },
  universityId: { type: Schema.Types.ObjectId, ref: "university", required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Course =
  mongoose.models.course ?? mongoose.model("course", courseSchema);
