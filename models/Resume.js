import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  parsedData: {
    name: String,
    email: String,
    phone: String,
    education: [{
      institution: String,
      degree: String,
      field: String,
      startDate: Date,
      endDate: Date,
      gpa: Number,
    }],
    experience: [{
      company: String,
      title: String,
      location: String,
      description: String,
      startDate: Date,
      endDate: Date,
    }],
    skills: [String],
    summary: String,
    languages: [String],
    certifications: [String],
  },
  aiAnalysis: {
    keyStrengths: [String],
    potentialFit: [String],
    suggestedRoles: [String],
    skillGaps: [String],
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: Date,
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
