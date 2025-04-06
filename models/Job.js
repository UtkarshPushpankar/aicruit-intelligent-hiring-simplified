// /models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String },
  tags: [String],
  postedAt: { type: Date, default: Date.now }
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default Job;
