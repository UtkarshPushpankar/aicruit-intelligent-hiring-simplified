import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true,
  },
  coverLetter: String,
  status: {
    type: String,
    enum: ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected', 'Withdrawn', 'Hired'],
    default: 'Applied',
  },
  aiMatchScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  aiNotes: String,
  hrNotes: String,
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  lastStatusUpdate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
