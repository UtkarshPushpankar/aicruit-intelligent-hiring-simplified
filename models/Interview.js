// /models/Interview.js
import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" }
});

const Interview = mongoose.models.Interview || mongoose.model("Interview", interviewSchema);
export default Interview;
