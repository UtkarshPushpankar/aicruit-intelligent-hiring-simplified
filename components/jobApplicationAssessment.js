// Completing the component that was cut off in the document
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ChevronDown, ChevronUp, FileText, User, Building } from 'lucide-react';
import ResumeMatchGauge from './ResumeMatchGauge';

export default function JobApplicationAssessment({ candidateId }) {
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  
  // Fetch candidate resume data and job listings on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch candidate data with resume
        const candidateRes = await axios.get(`/api/candidates/${candidateId}`);
        setResumeData(candidateRes.data.data.resume);
        
        // Fetch jobs
        const jobsRes = await axios.get('/api/jobs');
        setJobs(jobsRes.data.data);
        setFilteredJobs(jobsRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [candidateId]);
  
  // Match resume with selected job
  const matchWithJob = async (jobId) => {
    if (!resumeData) {
      alert('No resume found for this candidate');
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post('/api/jobs/match', {
        jobId,
        candidateId
      });
      
      setMatchResult(response.data.match);
      // Find and set the selected job
      const job = jobs.find(j => j._id === jobId);
      setSelectedJob(job);
    } catch (error) {
      console.error('Error matching resume with job:', error);
      alert('Failed to match resume with job.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    // Filter jobs based on search term
    if (term.trim() === '') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(job => 
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term)
      );
      setFilteredJobs(filtered);
    }
  };
  
  // Handle sort toggle
  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    
    const sorted = [...filteredJobs].sort((a, b) => {
      if (newOrder === 'asc') {
        return new Date(a.postedDate) - new Date(b.postedDate);
      } else {
        return new Date(b.postedDate) - new Date(a.postedDate);
      }
    });
    
    setFilteredJobs(sorted);
  };
  
  // Handle category filter change
  const handleCategoryFilter = (category) => {
    setFilterCategory(category);
    
    if (category === '') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(job => job.category === category);
      setFilteredJobs(filtered);
    }
  };
  
  // Extract unique categories from jobs
  const categories = [...new Set(jobs.map(job => job.category))];
  
  if (loading && !resumeData && !jobs.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Job Application Assessment</h2>
      
      {!resumeData ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-lg text-gray-600 mb-4">No resume found for this candidate</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Upload Resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Resume summary and job list */}
          <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg">
            <div className="mb-4 p-3 bg-white rounded shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Resume Summary</h3>
              <div className="text-sm text-gray-600">
                <p><span className="font-medium">Skills:</span> {resumeData.parsedData?.skills.join(', ')}</p>
                <p><span className="font-medium">Experience:</span> {resumeData.parsedData?.experience[0]?.level}</p>
                <p><span className="font-medium">Position:</span> {resumeData.parsedData?.experience[0]?.title}</p>
              </div>
            </div>
            
            {/* Job search & filter */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 w-full border rounded-md"
                />
              </div>
              
              <div className="mt-2 flex justify-between">
                <button 
                  onClick={() => setShowFilterOptions(!showFilterOptions)}
                  className="text-sm flex items-center text-gray-600 hover:text-gray-900"
                >
                  Filters
                  {showFilterOptions ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                </button>
                
                <button 
                  onClick={toggleSortOrder}
                  className="text-sm flex items-center text-gray-600 hover:text-gray-900"
                >
                  Date Posted
                  {sortOrder === 'desc' ? <ChevronDown className="h-4 w-4 ml-1" /> : <ChevronUp className="h-4 w-4 ml-1" />}
                </button>
              </div>
              
              {/* Filter options */}
              {showFilterOptions && (
                <div className="mt-2 p-3 bg-white border rounded-md">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => handleCategoryFilter(e.target.value)}
                    className="w-full border rounded-md p-2 text-sm"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            {/* Job list */}
            <div className="overflow-y-auto max-h-96">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No jobs found matching your criteria
                </div>
              ) : (
                filteredJobs.map(job => (
                  <div 
                    key={job._id}
                    className={`mb-3 p-3 bg-white rounded-lg cursor-pointer border ${selectedJob && selectedJob._id === job._id ? 'border-blue-500' : 'border-gray-200'} hover:border-blue-300`}
                    onClick={() => matchWithJob(job._id)}
                  >
                    <h4 className="font-medium">{job.title}</h4>
                    <div className="text-sm text-gray-600 flex items-center mt-1">
                      <Building className="h-3 w-3 mr-1" />
                      {job.company}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Right column - Match results */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : matchResult && selectedJob ? (
              <div>
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-lg">{selectedJob.title}</h3>
                  <p className="text-gray-700">{selectedJob.company}</p>
                </div>
                
                <ResumeMatchGauge 
                  matchScore={matchResult.matching_score}
                  matchLevel={matchResult.matching_level}
                  recommendation={matchResult.recommendation}
                />
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Top Skills Required</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills && selectedJob.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Matching Insights</h4>
                  <p className="text-gray-700">
                    Based on the analysis, here are recommendations to improve your match:
                  </p>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                    {matchResult.matching_score < 70 && (
                      <>
                        <li>Consider highlighting relevant skills like {selectedJob.skills?.slice(0, 3).join(', ')}</li>
                        <li>Add more specific experience related to {selectedJob.category}</li>
                        <li>Adjust your resume to better align with the job requirements</li>
                      </>
                    )}
                    {matchResult.matching_score >= 70 && (
                      <>
                        <li>Your resume is well-aligned with this job position</li>
                        <li>Consider emphasizing your experience in {selectedJob.category}</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50 rounded-lg">
                <FileText className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-xl text-gray-500 text-center">
                  Select a job from the list to check compatibility with your resume
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}