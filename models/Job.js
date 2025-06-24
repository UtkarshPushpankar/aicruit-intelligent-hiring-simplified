import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [String],
  responsibilities: [String],
  skills: [String],
  experience: {
    min: Number,
    max: Number,
  },
  salary: {
    min: Number,
    max: Number,
    currency: String,
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'On Hold'],
    default: 'Open',
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  applicationDeadline: Date,
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);