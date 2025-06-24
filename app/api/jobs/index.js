// pages/api/jobs/index.js
import connectDb from '@/db/connectDb';
import Job from '@/models/Job';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  // Connect to MongoDB
  await connectDb();

  // GET request - retrieve all jobs or filter by params
  if (req.method === 'GET') {
    try {
      const { category, location, company, search } = req.query;
      const query = {};
      
      // Apply filters if they exist
      if (category) query.category = category;
      if (location) query.location = location;
      if (company) query.company = company;
      
      // Apply search across multiple fields
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } }
        ];
      }
      
      const jobs = await Job.find(query).sort({ postedDate: -1 }).limit(100);
      
      return res.status(200).json({ success: true, data: jobs });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
  
  // POST request - create a new job
  else if (req.method === 'POST') {
    // Check authentication for job creation
    if (!session || !session.user) {
      return res.status(401).json({ success: false, error: 'You must be logged in to create a job listing' });
    }
    
    try {
      const jobData = {
        ...req.body,
        postedDate: new Date(),
        postedBy: session.user.id || session.user.email
      };
      
      const job = await Job.create(jobData);
      return res.status(201).json({ success: true, data: job });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
  
  // Method not allowed
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }
}