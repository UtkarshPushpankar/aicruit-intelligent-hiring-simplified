"use client";
import React, { useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const HRdashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  // If session is not available, don't render the dashboard (or show a loading state)
  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col">
        HR Dashboard
      <span>Hello {session?.user?.name || "HR"}</span>
      <button
        className="w-20 p-3 rounded-xl border-2 border-black"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default HRdashboard;
