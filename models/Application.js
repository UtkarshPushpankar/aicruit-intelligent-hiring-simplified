// /models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  status: { type: String, enum: ["Applied", "Under Review", "Interview", "Rejected"], default: "Applied" },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema);
export default Application;
