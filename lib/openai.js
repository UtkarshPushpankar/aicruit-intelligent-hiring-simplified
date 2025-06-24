// lib/openai.js
import OpenAI from 'openai';

// Configuration for OpenAI Direct API
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Parse a resume to extract structured information
 * @param {string} resumeText - The text content of the resume
 * @returns {Object} - Structured resume data
 */
export async function parseResume(resumeText) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = `
    Parse the following resume text into a structured JSON format. Extract the following information:
    - Full Name
    - Email
    - Phone Number
    - Summary/Objective
    - Education (institution, degree, field, dates, GPA)
    - Work Experience (company, title, dates, description)
    - Skills
    - Certifications
    - Languages
    
    Resume Text:
    ${resumeText}
    
    Provide the output as valid JSON only, with no additional text.
  `;

  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are an AI assistant that parses resume content into structured data." },
      { role: "user", content: prompt }
    ],
    temperature: 0,
    max_tokens: 4000
  });

  try {
    // Extract and parse the JSON from the completion
    const jsonContent = response.choices[0].message.content;
    return JSON.parse(jsonContent);
  } catch (error) {
    console.error("Error parsing resume JSON:", error);
    throw new Error("Failed to parse resume content");
  }
}

/**
 * Analyze resume to job fit
 * @param {Object} resumeData - Structured resume data
 * @param {Object} jobData - Structured job data
 * @returns {Object} - Analysis results
 */
export async function analyzeResumeJobFit(resumeData, jobData) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = `
    Analyze the candidate's resume against the job requirements and provide:
    1. A match score from 0-100
    2. Key strengths relevant to the position
    3. Potential skill gaps
    4. Overall recommendation
    
    Resume Information:
    ${JSON.stringify(resumeData)}
    
    Job Information:
    ${JSON.stringify(jobData)}
    
    Provide the output as valid JSON only, with no additional text, using this structure:
    {
      "matchScore": 85,
      "keyStrengths": ["strength1", "strength2", ...],
      "skillGaps": ["gap1", "gap2", ...],
      "recommendation": "Strong Match / Moderate Match / Weak Match"
    }
  `;

  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are an AI assistant that analyzes candidate resumes against job requirements." },
      { role: "user", content: prompt }
    ],
    temperature: 0.2,
    max_tokens: 2000
  });

  try {
    // Extract and parse the JSON from the completion
    const jsonContent = response.choices[0].message.content;
    return JSON.parse(jsonContent);
  } catch (error) {
    console.error("Error parsing analysis JSON:", error);
    throw new Error("Failed to analyze resume job fit");
  }
}

/**
 * Generate AI-powered responses for the chatbot
 * @param {Array} messages - Previous conversation messages
 * @param {Object} context - Additional context (job info, application status, etc.)
 * @returns {string} - AI response
 */
export async function generateChatbotResponse(messages, context = {}) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  // Format conversation history
  const conversationHistory = messages.map(msg => ({
    role: msg.sender === 'bot' ? 'assistant' : 'user',
    content: msg.content
  }));

  // Add system message with context
  const systemMessage = {
    role: "system",
    content: `
      You are an AI recruitment assistant helping candidates with their job applications.
      ${context.jobTitle ? `The user is interested in the ${context.jobTitle} position.` : ''}
      ${context.applicationStatus ? `Their application status is: ${context.applicationStatus}` : ''}
      
      Be helpful, professional, and concise. Provide accurate information about the application process.
      If you don't know something, politely say you don't have that information.
    `
  };

  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [systemMessage, ...conversationHistory],
    temperature: 0.7,
    max_tokens: 500
  });

  return response.choices[0].message.content;
}

export default {
  parseResume,
  analyzeResumeJobFit,
  generateChatbotResponse
};