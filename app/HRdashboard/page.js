"use client";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import React, { useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const JobCard = ({ job }) => (
    <div className="bg-gradient-to-r from-[#4b2060] to-[#7b258c] text-white rounded-2xl shadow-lg p-6 min-w-[280px] max-w-sm hover:scale-105 transition-transform">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl max-w-20 font-semibold">{job.title}</h3>
        <Button className="bg-[#989898] text-black px-2 py-1 rounded-full text-sm">→</Button>
      </div>
      <p className="text-sm mb-2">📅 Posted {job.postedDate}</p>
      <div className="flex gap-2 text-sm mb-4">
        <span>📍 {job.location}</span>
        <span>💼 {job.experience} exp.</span>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-medium">{job.applications} applications</p>
          <p className="text-green-300 text-sm">{job.newApplications} new this week</p>
        </div>
        <Button variant="outline" className="border-white text-white">View Candidates</Button>
      </div>
    </div>
  );

  const jobs = [
    { title: "Sr. UX Designer", postedDate: "2 days ago", location: "Bengaluru", experience: "3 years", applications: 45, newApplications: 25 },
    { title: "Growth Manager", postedDate: "5 days ago", location: "Remote", experience: "2+ years", applications: 38, newApplications: 10 },
    { title: "Financial Analyst", postedDate: "10 days ago", location: "Mumbai", experience: "5+ years", applications: 25, newApplications: 25 },
    { title: "Marketing Lead", postedDate: "3 days ago", location: "Delhi", experience: "4 years", applications: 30, newApplications: 15 },
    { title: "Backend Engineer", postedDate: "1 week ago", location: "Remote", experience: "2+ years", applications: 50, newApplications: 20 },
    { title: "Marketing Lead", postedDate: "3 days ago", location: "Delhi", experience: "4 years", applications: 30, newApplications: 15 },
    { title: "Backend Engineer", postedDate: "1 week ago", location: "Remote", experience: "2+ years", applications: 50, newApplications: 20 },
  ];

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
    // <div className="flex flex-col">
    //     HR Dashboard
    //   <span>Hello {session?.user?.name || "HR"}</span>
    //   <button
    //     className="w-20 p-3 rounded-xl border-2 border-black"
    //     onClick={() => signOut()}
    //   >
    //     Logout
    //   </button>
    // </div>

    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-6 overflow-y-auto h-screen">
        <h1 className="text-[#651d95] text-5xl orbitron flex justify-center text-gradient max-w-[55vw] m-auto p-10">Company Name</h1>
        <h2 className="max-w-[65vw] flex justify-center m-auto mt-5 text-4xl poppins subtext-gradient">Welcome back, {session?.user?.name || "HR"}!</h2>

        <section className="mt-10 px-4">
          <h3 className="text-[#651d95] text-3xl font-semibold mb-6">Current Openings</h3>
          {/* Container for Job Cards with Transparent Scrollbar */}
          <div className="flex gap-4 overflow-x-auto scrollbar-transparent pb-4">
            {jobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HRdashboard;



