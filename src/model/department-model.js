import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema({
  universityId: { type: mongoose.Schema.Types.ObjectId, ref: "university", required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Department =
  mongoose.models.department ?? mongoose.model("department", departmentSchema);
