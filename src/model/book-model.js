import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  universityId: { type: Schema.Types.ObjectId, ref: "university", required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: "department", required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "course", required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  edition: { type: String },
  fileUrl: { type: String, required: true },
  marked: { type: Boolean, default: false },
}, { timestamps: true });


export const Book =
  mongoose.models.book ?? mongoose.model("book", bookSchema);

