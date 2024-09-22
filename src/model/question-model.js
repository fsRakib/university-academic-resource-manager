import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  universityId: { type: Schema.Types.ObjectId, ref: "university", required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: "department", required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "course", required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  name: { type: String, required: true },
  questionType: { type: String, enum: ["semester", "term test"], required: true },
  fileUrl: { type: String, required: true },
  marked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Question =
  mongoose.models.question ?? mongoose.model("question", questionSchema);

