import React from 'react';
import { ArrowUp, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function ResumeMatchGauge({ matchScore, matchLevel, recommendation }) {
  // Calculate the position based on the score (0-100)
  const position = matchScore;
  
  // Determine color based on match level
  const getColor = () => {
    if (matchScore >= 70) return 'bg-green-500';
    if (matchScore >= 50) return 'bg-yellow-400';
    return 'bg-red-400';
  };
  
  // Get the icon based on match level
  const getIcon = () => {
    if (matchScore >= 70) return <CheckCircle className="text-green-600" />;
    if (matchScore >= 50) return <AlertTriangle className="text-yellow-600" />;
    return <XCircle className="text-red-600" />;
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-center">Resume Match Analysis</h3>
      
      {/* Score Display */}
      <div className="text-center mb-2">
        <span className="text-4xl font-bold">{matchScore}%</span>
        <p className="text-gray-600">{matchLevel}</p>
      </div>
      
      {/* Gauge */}
      <div className="relative h-8 bg-gray-200 rounded-full mb-4">
        <div 
          className={`absolute top-0 left-0 h-8 rounded-full ${getColor()}`} 
          style={{ width: `${position}%` }}
        />
        <div 
          className="absolute top-0 transform -translate-y-full"
          style={{ left: `${position}%` }}
        >
          <ArrowUp className="h-5 w-5 text-gray-800" />
        </div>
        
        {/* Gauge markers */}
        <div className="absolute w-full flex justify-between px-2 text-xs text-gray-600">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
      
      {/* Color legend */}
      <div className="flex justify-between text-xs mb-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-400 rounded-full mr-1"></div>
          <span>Low Match (0-49%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></div>
          <span>Good Match (50-69%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
          <span>Excellent (70-100%)</span>
        </div>
      </div>
      
      {/* Recommendation */}
      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
        {getIcon()}
        <p className="ml-2 text-gray-700">{recommendation}</p>
      </div>
    </div>
  );
}