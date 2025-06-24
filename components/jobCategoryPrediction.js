import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Briefcase, Award, TrendingUp, Check, ArrowRight } from 'lucide-react';

export default function JobCategoryPrediction({ candidateId }) {
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  
  // Fetch candidate data and perform prediction on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch candidate data with resume
        const candidateRes = await axios.get(`/api/candidates/${candidateId}`);
        setResumeData(candidateRes.data.data.resume);
        
        // If resume exists, predict job category
        if (candidateRes.data.data.resume) {
          const predictionRes = await axios.post('/api/jobs/predict-category', {
            candidateId
          });
          
          setPredictionResult(predictionRes.data);
          
          // Find relevant jobs based on the predicted category
          if (predictionRes.data.predictedCategory) {
            const jobsRes = await axios.get('/api/jobs', {
              params: { category: predictionRes.data.predictedCategory }
            });
            
            setRecommendedJobs(jobsRes.data.data.slice(0, 5)); // Get top 5 jobs
          }
        }
      } catch (error) {
        console.error('Error fetching data or making prediction:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [candidateId]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!resumeData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Job Category Prediction</h2>
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-lg text-gray-600 mb-4">No resume found for this candidate</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Upload Resume
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Job Category Prediction</h2>
      
      {/* Prediction Result */}
      {predictionResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Prediction details */}
          <div className="lg:col-span-1">
            <div className="bg-blue-50 p-5 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Best Match</h3>
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              
              <div className="mb-6">
                <div className="text-3xl font-bold text-blue-700 mb-2">
                  {predictionResult.predictedCategory}
                </div>
                <p className="text-gray-600">
                  Based on your skills, experience, and background
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Top Skills Identified</h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData.parsedData?.skills.slice(0, 5).map((skill, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center"
                    >
                      <Check className="h-3 w-3 mr-1" /> {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Why This Category?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="mt-0.5 mr-2">•</span>
                    Based on your expertise in {resumeData.parsedData?.skills.slice(0, 2).join(' and ')}
                  </li>
                  <li className="flex items-start">
                    <span className="mt-0.5 mr-2">•</span>
                    Your experience aligns with industry requirements
                  </li>
                  <li className="flex items-start">
                    <span className="mt-0.5 mr-2">•</span>
                    Your profile matches professionals in this field
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Alternative Categories */}
            {predictionResult.alternativeCategories && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Alternative Categories</h4>
                <ul className="space-y-2">
                  {predictionResult.alternativeCategories.map((category, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{category}</span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {90 - index * 10}% match
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Right column - Recommended Jobs */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Recommended Jobs</h3>
              
              {recommendedJobs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No recommended jobs found in this category
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendedJobs.map(job => (
                    <div key={job._id} className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-lg">{job.title}</h4>
                      <div className="text-sm text-gray-600 mb-2">{job.company} • {job.location}</div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.skills && job.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                        {job.description.substring(0, 120)}...
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                        <button className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-800">
                          View Job <ArrowRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6">
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-medium">
                  View All Jobs in {predictionResult.predictedCategory}
                </button>
              </div>
            </div>
            
            {/* Skills Development Section */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Skills Development</h4>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                To increase your chances in the {predictionResult.predictedCategory} field, consider developing these skills:
              </p>
              
              <div className="flex flex-wrap gap-2">
                {predictionResult.recommendedSkills?.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600">
            Unable to predict job category for this resume
          </p>
        </div>
      )}
    </div>
  );
}