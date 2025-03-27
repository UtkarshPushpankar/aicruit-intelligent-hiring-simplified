"use client";
import React, { useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Slider from '@/components/Slider'
import Search from "@/components/Search"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


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

        <div className="menu flex flex-col gap-12 justify-start m-8">
          <div className='text-gray-600 text-sm'>MAIN MENU</div>
          <ul className='flex flex-col gap-8'>
            <li className='flex gap-4 cursor-pointer'>
              <img width={25} src="profile.png" alt="" />
              <div className='poppins'>Profile</div> 
            </li>

            <li className='flex gap-4 cursor-pointer'>
              <img width={25} src="application.png" alt="" />
              <div className='poppins'>Applications</div> 
            </li>

            <li className='flex gap-4 cursor-pointer'>
              <img width={25} src="interview.png" alt="" />
              <div className='poppins'>Interviews</div> 
            </li>

            <li className='flex gap-4 cursor-pointer'>
              <img width={25} src="message.png" alt="" />
              <div className='poppins'>Messages</div> 
            </li>

            <li className='flex gap-4 cursor-pointer'>
              <img width={25} src="analytics.png" alt="" />
              <div className='poppins'>Analytics</div> 
            </li>
          </ul>
        </div>
      </div>

      <div className="main w-[84vw]">
        <div className="top h-[10vh] border-b-2 border-b-gray-300 flex items-center justify-between">
          <div className="search m-10">
            <Search />
          </div>

          <div className="right flex gap-8 items-center justify-center m-6">
            <img className='cursor-pointer' width={25} src="notification.png" alt="" />
            <img className='cursor-pointer' width={25} src="message.png" alt="" />
            <div className="profile flex gap-4 items-center">
              <img width={35} className='rounded-full cursor-pointer' src={srcUserImage} alt="" />

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className='poppins font-semiboldbold'>{session?.user?.name}</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="dashboard">
          <h1 className='poppins text-xl m-10 mt-8 mb-4'>Dashboard</h1>
          <div className="dashboard-cards poppins flex gap-4">
            <div className="dashboard-card flex flex-col gap-1 border-2 rounded-xl ml-10 p-3 mt-0 bg-orange-100/70 backdrop-blur-lg shadow-md w-[200px] h-[110px]">
              <div>Total Applications</div>
              <div className='text-3xl'>24</div>
              <div className='text-xm'>4 new reverts</div>
            </div>

            <div className="dashboard-card flex flex-col gap-1 border-2 rounded-xl mt-0 p-3 bg-blue-100/70 backdrop-blur-lg shadow-md w-[200px] h-[110px]">
              <div>Interviews Scheduled</div>
              <div className='text-3xl'>10</div>
              <div className='text-sm'>2 upcoming interviews</div>
            </div>

            <div className="dashboard-card flex flex-col gap-1 border-2 rounded-xl mt-0 p-3 bg-pink-100/70 backdrop-blur-lg shadow-md w-[200px] h-[110px]">
              <div>Profile Views</div>
              <div className='text-3xl'>34</div>
              <div className='text-sm'>26 new visitors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
