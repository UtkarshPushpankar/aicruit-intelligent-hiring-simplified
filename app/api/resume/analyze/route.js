// app/api/resumes/analyze/route.js
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/db/connectDb';
import Resume from '../../../../models/Resume';
import Job from '../../../../models/Job';
import { parseResume, analyzeResumeJobFit } from '../../../../lib/openai';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { resumeId, jobId, resumeText } = body;
    
    // Validate inputs
    if (!resumeId || !jobId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Resume ID and Job ID are required',
        },
        { status: 400 }
      );
    }
    
    // Get resume and job data
    const resume = await Resume.findById(resumeId);
    const job = await Job.findById(jobId);
    
    if (!resume || !job) {
      return NextResponse.json(
        {
          success: false,
          message: 'Resume or Job not found',
        },
        { status: 404 }
      );
    }
    
    // Parse resume if not already parsed
    if (!resume.parsedData && resumeText) {
      const parsedData = await parseResume(resumeText);
      resume.parsedData = parsedData;
      await resume.save();
    }
    
    // Analyze resume-job fit
    const analysis = await analyzeResumeJobFit(resume.parsedData, {
      title: job.title,
      requirements: job.requirements,
      responsibilities: job.responsibilities,
      skills: job.skills,
      experience: job.experience,
    });
    
    // Update resume with analysis
    resume.aiAnalysis = {
      keyStrengths: analysis.keyStrengths,
      potentialFit: [analysis.recommendation],
      suggestedRoles: [job.title],
      skillGaps: analysis.skillGaps,
    };
    resume.lastUpdated = new Date();
    await resume.save();
    
    return NextResponse.json({
      success: true,
      data: {
        matchScore: analysis.matchScore,
        keyStrengths: analysis.keyStrengths,
        skillGaps: analysis.skillGaps,
        recommendation: analysis.recommendation,
      },
    });
  } catch (error) {
    console.error('Resume analysis error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error analyzing resume',
      },
      { status: 500 }
    );
  }
}