"use client";
import React, { useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Slider from '@/components/Slider'

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
    <div className='candidate-nav flex gap-4 m-4'>
      <div className="left w-[30vw] border-2 border-gray-400 rounded-lg h-[95.5vh] shadow-lg">
        {/* <button onClick={() => signOut()} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button> */}
        <div className="profile m-6 mt-3 flex gap-5">
          <img width={100} height={50} className='rounded-full' src={srcUserImage} alt="profile pic" />
          <div className='flex flex-col gap-1 mt-1'>
            <h2 className='font-bold text-xl poppins text-gray-600'>{session?.user?.name}</h2>

            <div className="info flex gap-6 text-gray-500">
              <div className='flex gap-1 items-center'>
                <img width={18} src="telephone.png" alt="" />
                <p>7800181122</p>
              </div>

              <div className='flex gap-1 items-center'>
                <img width={18} src="location.png" alt="" />
                <p>Mumbai</p>
              </div>
            </div>

            <div className="socials flex gap-5">
              <img width={26} src="message.png" alt="" />
              <img width={24} src="copy.png" alt="" />
              <img width={24} src="share.png" alt="" />
            </div>
          </div>
        </div>

        <div className="slider w-[80%] m-auto">
          <Slider />
        </div>
      </div>
      <div className="mid w-[45vw] border-2 border-gray-400 rounded-lg h-[95.5vh] shadow-lg"></div>
      <div className="right w-[25vw] border-2 border-gray-400 rounded-lg h-[95.5vh] shadow-lg"></div>
    </div>
  );
};

export default CandidateDashboard;
