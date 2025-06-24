import mongoose from 'mongoose';

const InterviewSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  },
  interviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  scheduledDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,  // in minutes
    required: true,
  },
  type: {
    type: String,
    enum: ['Phone', 'Video', 'In-person', 'Technical', 'HR'],
    required: true,
  },
  location: String,
  meetingLink: String,
  description: String,
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled', 'No-show'],
    default: 'Scheduled',
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

export default mongoose.models.Interview || mongoose.model('Interview', InterviewSchema);
