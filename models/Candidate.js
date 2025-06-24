// lib/models/candidate.js
import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    profileComplete: {
      type: Boolean,
      default: false,
    },
    resume: {
      fileName: String,
      fileUrl: String,
      uploadDate: Date,
      parsedText: String,
      parsedData: {
        skills: [String],
        experience: [
          {
            title: String,
            company: String,
            duration: String,
            level: String,
            description: String,
            startDate: Date,
            endDate: Date,
          },
        ],
        education: [
          {
            institution: String,
            degree: String,
            field: String,
            graduationDate: Date,
          },
        ],
      },
    },
    jobMatches: [
      {
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Job',
        },
        jobTitle: String,
        companyName: String,
        matchingScore: Number,
        matchingLevel: String,
        recommendation: String,
        matchDate: Date,
      },
    ],
    interviews: [
      {
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Job',
        },
        scheduleId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'InterviewSchedule',
        },
        status: {
          type: String,
          enum: ['scheduled', 'completed', 'canceled', 'missed'],
          default: 'scheduled',
        },
        feedback: {
          rating: Number,
          comments: String,
          strengths: [String],
          weaknesses: [String],
          submittedBy: String,
          submittedDate: Date,
        },
      },
    ],
    // Auth-related fields
    password: {
      type: String,
      select: false, // Don't return password by default
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    accountType: {
      type: String,
      enum: ['candidate', 'recruiter', 'admin'],
      default: 'candidate',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure this model isn't recreated if it already exists
export default mongoose.models.Candidate || mongoose.model('Candidate', CandidateSchema);