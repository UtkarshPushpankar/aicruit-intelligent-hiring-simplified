// pages/api/jobs/batch-match.js
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

    const { candidateId, jobIds } = req.body;

    if (!candidateId || !jobIds || !Array.isArray(jobIds) || jobIds.length === 0) {
      return res.status(400).json({ error: 'Candidate ID and an array of Job IDs are required' });
    }

    // Fetch candidate
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
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

    // Fetch all relevant jobs
    const jobs = await Job.find({ _id: { $in: jobIds } });
    if (jobs.length === 0) {
      return res.status(404).json({ error: 'No jobs found with the provided IDs' });
    }

    // Process each job and match with resume
    const matchResults = [];
    for (const job of jobs) {
      // Call the resume matcher model API
      const matchResponse = await axios.post(`${MODEL_API_URL}/match-resume`, {
        resume_text: resumeText,
        job_description: job.description
      });

      // Store match result
      const matchResult = {
        jobId: job._id,
        jobTitle: job.title,
        companyName: job.company,
        matchingScore: matchResponse.data.matching_score,
        matchingLevel: matchResponse.data.matching_level,
        recommendation: matchResponse.data.recommendation,
        matchDate: new Date()
      };
      
      matchResults.push(matchResult);

      // Update candidate's job matches
      candidate.jobMatches = candidate.jobMatches || [];
      const existingMatchIndex = candidate.jobMatches.findIndex(
        match => match.jobId.toString() === job._id.toString()
      );
      
      if (existingMatchIndex !== -1) {
        candidate.jobMatches[existingMatchIndex] = matchResult;
      } else {
        candidate.jobMatches.push(matchResult);
      }

      // Update job's candidate matches
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
    }

    // Save candidate with all updated matches
    await candidate.save();

    // Return all match results
    return res.status(200).json({
      matches: matchResults,
      updatedJobs: jobs.length,
      candidateUpdated: true
    });

  } catch (error) {
    console.error('Error in batch job matching:', error);
    return res.status(500).json({ 
      error: 'Failed to match resume with jobs', 
      details: error.message 
    });
  }
}