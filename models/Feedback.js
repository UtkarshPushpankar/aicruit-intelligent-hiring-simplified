import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true,
  },
  providedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ratings: {
    technicalSkills: {
      type: Number,
      min: 1,
      max: 5,
    },
    communication: {
      type: Number,
      min: 1,
      max: 5,
    },
    problemSolving: {
      type: Number,
      min: 1,
      max: 5,
    },
    culturalFit: {
      type: Number,
      min: 1,
      max: 5,
    },
    overallImpression: {
      type: Number,
      min: 1,
      max: 5,
    }
  },
  strengths: [String],
  areasOfImprovement: [String],
  comments: String,
  recommendation: {
    type: String,
    enum: ['Strong Hire', 'Hire', 'Maybe', 'Do Not Hire'],
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);