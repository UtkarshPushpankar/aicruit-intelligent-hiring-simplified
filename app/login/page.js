"use client"
import React, { useState } from 'react';
import LoginNavbar from '@/components/LoginNavbar';
import HRLoginForm from '@/components/HRLoginForm';
import CandidateLoginForm from '@/components/CandidateLoginForm';
import Switch from '@/components/Switch';

const Login = () => {
  // false: HR login; true: Candidate login.
  const [isCandidate, setIsCandidate] = useState(false);

  const handleToggle = (e) => {
    setIsCandidate(e.target.checked);
  };

  return (
    <div className="container flex flex-col gap-6 items-center justify-center">
      <LoginNavbar />
      <div className="flex items-center gap-4">
        {isCandidate ? <span className="text-xl poppins text-gray-400">Login as HR</span> : <span className="text-xl poppins">Login as HR</span>}

        <Switch onChange={handleToggle} />

        {isCandidate ? <span className="text-xl poppins">Login as Candidate</span> : <span className="text-xl poppins text-gray-400">Login as Candidate</span>}
        
      </div>
      {isCandidate ? <CandidateLoginForm /> : <HRLoginForm />}
    </div>
  );
};

export default Login;
