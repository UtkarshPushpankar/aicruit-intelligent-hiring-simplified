// pages/api/jobs/match.js
import axios from 'axios';
import connectDb from '@/db/connectDb';
import Candidate from '@/models/Candidate';
import Job from '@/models/Job';
import fs from 'fs';
import path from 'path';
import { extract } from 'pdf-text-extract';

const MODEL_API_URL = process.env.MODEL_API_URL || 'http://localhost:5000';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDb();

    const { jobId, candidateId } = req.body;

    if (!jobId || !candidateId) {
      return res.status(400).json({ error: 'Job ID and Candidate ID are required' });
    }

    // Fetch job and candidate from database
    const job = await Job.findById(jobId);
    const candidate = await Candidate.findById(candidateId);

    if (!job || !candidate) {
      return res.status(404).json({ error: 'Job or candidate not found' });
    }

    // Check if candidate has a resume
    if (!candidate.resume || !candidate.resume.fileUrl) {
      return res.status(400).json({ error: 'Candidate does not have a resume uploaded' });
    }

    // Get resume text - either from stored parsed data or by reading the file
    let resumeText = '';
    if (candidate.resume.parsedText) {
      resumeText = candidate.resume.parsedText;
    } else {
      const resumePath = path.join(process.cwd(), 'public', candidate.resume.fileUrl);
      
      if (path.extname(resumePath).toLowerCase() === '.pdf') {
        resumeText = await new Promise((resolve, reject) => {
          extract(resumePath, (err, text) => {
            if (err) reject(err);
            resolve(text.join(' '));
          });
        });
      } else {
        resumeText = fs.readFileSync(resumePath, 'utf8');
      }
    }

    // Get job description
    const jobDescription = job.description;

    // Call the resume matcher model API
    const matchResponse = await axios.post(`${MODEL_API_URL}/match-resume`, {
      resume_text: resumeText,
      job_description: jobDescription
    });

    // Update candidate with matching score
    candidate.jobMatches = candidate.jobMatches || [];
    
    // Check if job match already exists and update or add new
    const existingMatchIndex = candidate.jobMatches.findIndex(
      match => match.jobId.toString() === jobId
    );
    
    const matchData = {
      jobId: jobId,
      jobTitle: job.title,
      companyName: job.company,
      matchingScore: matchResponse.data.matching_score,
      matchingLevel: matchResponse.data.matching_level,
      matchDate: new Date()
    };
    
    if (existingMatchIndex !== -1) {
      candidate.jobMatches[existingMatchIndex] = matchData;
    } else {
      candidate.jobMatches.push(matchData);
    }
    
    await candidate.save();

    // Also update job with candidate match
    job.candidateMatches = job.candidateMatches || [];
    
    const existingCandidateMatchIndex = job.candidateMatches.findIndex(
      match => match.candidateId.toString() === candidateId
    );
    
    const candidateMatchData = {
      candidateId: candidateId,
      candidateName: `${candidate.firstName} ${candidate.lastName}`,
      matchingScore: matchResponse.data.matching_score,
      matchingLevel: matchResponse.data.matching_level,
      matchDate: new Date()
    };
    
    if (existingCandidateMatchIndex !== -1) {
      job.candidateMatches[existingCandidateMatchIndex] = candidateMatchData;
    } else {
      job.candidateMatches.push(candidateMatchData);
    }
    
    await job.save();

    // Return match results
    return res.status(200).json({
      match: matchResponse.data,
      candidateUpdated: true,
      jobUpdated: true
    });

  } catch (error) {
    console.error('Error in job matching:', error);
    return res.status(500).json({ error: 'Failed to match resume with job', details: error.message });
  }
}