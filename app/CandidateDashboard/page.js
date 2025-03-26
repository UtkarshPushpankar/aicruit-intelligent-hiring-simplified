"use client";
import React, { useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Slider from '@/components/Slider'
import Search from "@/components/Search"

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

  const srcUserImage = session?.user?.image

  return (
    <div className="candidate-container flex h-screen">
      <div className="sidebar w-[16vw] border-r-2 border-r-gray-300 bg-gradient-to-r from-[#398ab0] to-[#b7e0f3]">
        <h1 className='m-4 p-2 text-center uncial text-4xl text-gradient-3'>
          AIcruit
        </h1>
      </div>

      <div className="main w-[84vw]">
        <div className="top h-[10vh] border-b-2 border-b-gray-300 flex items-center justify-between">
          <div className="search m-10">
            <Search/>
          </div>

          <div className="right flex gap-8 items-center justify-center m-6">
            <img className='cursor-pointer' width={25} src="notification.png" alt="" />
            <img className='cursor-pointer' width={25} src="message.png" alt="" />
            <div className="profile flex gap-4 items-center">
              <img width={35} className='rounded-full cursor-pointer' src={srcUserImage} alt="" />
              <div className='poppins font-semiboldbold'>{session?.user?.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
