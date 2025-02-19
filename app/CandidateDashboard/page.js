"use client";
import React, { useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const CandidateDashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  // If session isn't loaded, return null (or a loading indicator)
  if (!session) {
    return null;
  }

  return (
    <div className='candidate-nav'>
      <div className="greetings m-10">
        Candidate Dashboard
        <span>Hello {session?.user?.name || "Candidate"}</span>
      </div>
      <button
        className='w-20 p-3 rounded-xl border-2 border-black'
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default CandidateDashboard;
