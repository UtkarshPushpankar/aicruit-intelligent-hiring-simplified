"use client";
import React, { useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Search from "@/components/Search"
import SparklineChart from '@/components/SparklineChart';
import Link from 'next/link';

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

  const monthlyTrend = [
    { name: "Jan", value: 10 },
    { name: "Feb", value: 12 },
    { name: "Mar", value: 9 },
    { name: "Apr", value: 14 },
    { name: "May", value: 16 },
  ];

  return (
    <div className="candidate-container flex h-screen">
      <div className="sidebar w-[16vw] border-r-2 border-r-gray-300 bg-gradient-to-r from-[#398ab0] to-[#b7e0f3]">
        <h1 className='m-4 p-2 text-center uncial text-4xl text-gradient-3'>
          AIcruit
        </h1>

        <div className="menu flex flex-col gap-12 justify-start m-8">
          <div className='text-gray-600 text-sm'>MAIN MENU</div>
          <ul className='flex flex-col gap-8'>
            <Link href={"/CandidateDashboard/profile"}>
              <li className='flex gap-4 cursor-pointer'>
                <img width={25} src="profile.png" alt="" />
                <div className='poppins'>Profile</div>
              </li>
            </Link>

            <Link href={"/CandidateDashboard/applications"}>
              <li className='flex gap-4 cursor-pointer'>
                <img width={25} src="application.png" alt="" />
                <div className='poppins'>Applications</div>
              </li></Link>

            <Link href={"/CandidateDashboard/interviews"}>
              <li className='flex gap-4 cursor-pointer'>
                <img width={25} src="interview.png" alt="" />
                <div className='poppins'>Interviews</div>
              </li></Link>

            <Link href={"/CandidateDashboard/messages"}>
              <li className='flex gap-4 cursor-pointer'>
                <img width={25} src="message.png" alt="" />
                <div className='poppins'>Messages</div>
              </li></Link>

            <Link href={"/CandidateDashboard/analytics"}>
              <li className='flex gap-4 cursor-pointer'>
                <img width={25} src="analytics.png" alt="" />
                <div className='poppins'>Analytics</div>
              </li></Link>
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

        <div className="dashboard flex gap-2">
          <div className="dashboard-mid w-[700px]">
            <h1 className='poppins text-xl m-6 ml-10 mt-3 mb-2'>Dashboard</h1>
            <div className="dashboard-cards poppins flex gap-4 m-4 ml-0 mt-0">
              <div className="dashboard-card flex flex-col gap-1 border-2 rounded-xl ml-10 p-3 mt-0 bg-orange-100/70 backdrop-blur-lg shadow-md w-[200px] h-[110px]">
                <div>Total Applications</div>
                <div className='text-3xl'>24</div>
                <div className='text-sm text-red-500'>6 in Progress</div>
              </div>

              <div className="dashboard-card flex flex-col gap-1 border-2 rounded-xl mt-0 p-3 bg-blue-100/70 backdrop-blur-lg shadow-md w-[200px] h-[110px]">
                <div>Active Interviews</div>
                <div className='text-3xl'>10</div>
                <div className='text-sm text-blue-500'>2 Upcoming Interviews</div>
              </div>

              <div className="dashboard-card flex flex-col gap-1 border-2 rounded-xl mt-0 p-3 bg-pink-100/70 backdrop-blur-lg shadow-md w-[200px] h-[110px]">
                <div>Recommended Jobs</div>
                <div className='text-3xl'>12</div>
                <div className='text-sm text-pink-500'>5 Actively Hiring</div>
              </div>
            </div>

            <div className="graph-cards m-4 ml-10 mt-0 flex gap-7 poppins">
              <div className="graph-card flex flex-col gap-2 justify-center w-[300px] h-[130px] border-2 rounded-xl border-gray-300 p-3">
                <div className="graph-container flex justify-between items-center">
                  <div className="graph-text flex flex-col gap-1">
                    <div>Profile Views</div>
                    <div className='text-3xl'>80</div>
                  </div>

                  <div className="sparkline">
                    <SparklineChart data={monthlyTrend} color="#FF6F61" />
                  </div>
                </div>

                <div className="graph-content flex items-center justify-between text-sm">
                  <div className='text-gray-500'>2 Messages</div>
                  <div className='bg-blue-100/90 text-xs rounded-lg p-3 pt-1 pb-1 backdrop-blur-lg'>+5% Past week</div>
                </div>
              </div>

              <div className="graph-card flex flex-col gap-2 justify-center w-[300px] h-[130px] border-2 rounded-xl border-gray-300 p-3">
                <div className="graph-container flex items-center justify-between">
                  <div className="graph-text flex flex-col gap-1">
                    <div>Application Success Rate</div>
                    <div className='text-3xl'>30%</div>
                  </div>

                  <div className="sparkline">
                    <SparklineChart data={monthlyTrend} color="#FF6F61" />
                  </div>
                </div>

                <div className="graph-content flex items-center justify-between text-sm">
                  <div className='text-gray-500'>3 Interviews out of 10</div>
                  <div className='bg-blue-100/90 text-xs rounded-lg p-3 pt-1 pb-1 backdrop-blur-lg'>+10% Past month</div>
                </div>
              </div>
            </div>

            <div className="application-list p-4 pt-2 poppins border-2 border-gray-300 rounded-xl w-[630px] h-[330px] ml-10">
              <div className="application-top flex justify-between">
                <div className='text-lg'>Active Applications</div>
              </div>

              <div className="application-main flex flex-col gap-2 justify-center mt-1 mb-0">
                <div className="application-card hover:bg-gray-300 cursor-pointer w-[98%] p-2 pl-4 border border-gray-400 h-[70px] rounded-lg">
                  <h1 className='text-lg'>Frontend Developer at Tech Solutions</h1>
                  <div className="application-sub-text flex justify-between text-sm text-gray-500">
                    <div>Applied 2 days ago</div>
                    <div>Yesterday, 12:30 PM</div>
                  </div>
                </div>

                <div className="application-card hover:bg-gray-300 cursor-pointer w-[98%] p-2 pl-4 border border-gray-400 h-[70px] rounded-lg">
                  <h1 className='text-lg'>UI/UX Designer at Creatives Inc. </h1>
                  <div className="application-sub-text flex justify-between text-sm text-gray-500">
                    <div>Interview Scheduled</div>
                    <div>5 Minutes ago</div>
                  </div>
                </div>

                <div className="application-card hover:bg-gray-300 cursor-pointer w-[98%] p-2 pl-4 border border-gray-400 h-[70px] rounded-lg">
                  <h1 className='text-lg'>Marketing Specialist at Growth Co.</h1>
                  <div className="application-sub-text flex justify-between text-sm text-gray-500">
                    <div>Under Review</div>
                    <div>2 days ago</div>
                  </div>
                </div>

                <Link href={"/CandidateDashboard/applications"}>
                  <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[98%]">See All Applications</button>
                </Link>

              </div>

            </div>
          </div>
          <div className="dashboard-right poppins flex flex-col gap-4 m-10 ml-0 mt-11">
            <div className="recommended-jobs-box bg-[rgb(18,24,67)] w-[500px] h-[275px] rounded-lg text-white p-4">
              <h1 className='text-xl mb-2'>Recommended Jobs</h1>

              <div className="job-cards flex flex-col gap-2 items-center">
                <div className="job-card hover:bg-gray-400 w-[98%] h-[70px] border-2 border-gray-500 rounded-lg p-2 cursor-pointer">
                  <h1 className='text-lg'>Marketing Specialist at Growth Co.</h1>
                  <div className="application-sub-text flex justify-between text-sm text-gray-500">
                    <div>Under Review</div>
                    <div>2 days ago</div>
                  </div>
                </div>

                <div className="job-card hover:bg-gray-400 w-[98%] h-[70px] border-2 border-gray-500 rounded-lg p-2 cursor-pointer">
                  <h1 className='text-lg'>Marketing Specialist at Growth Co.</h1>
                  <div className="application-sub-text flex justify-between text-sm text-gray-500">
                    <div>Under Review</div>
                    <div>2 days ago</div>
                  </div>
                </div>

                <button type="button" className="w-[98%] mt-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">See more recommended jobs</button>

              </div>
            </div>

            <div className="scheduled-interview-box border-2 border-gray-300 w-[500px] h-[280px] rounded-lg p-4">
              <h1 className='text-xl mb-3'>Scheduled Interviews</h1>

              <div className="interviews-cards flex flex-col gap-2 items-center">
                <div className="interview-card w-[98%] hover:bg-gray-200 h-[70px] border-2 border-gray-500 rounded-lg p-2 cursor-pointer">
                  <h1 className='text-lg'>Interview at Growth Co.</h1>
                  <div className="application-sub-text flex justify-between text-sm text-gray-500">
                    <div>Under Review</div>
                    <div>2 days ago</div>
                  </div>
                </div>

                <div className="interview-card w-[98%] hover:bg-gray-200 h-[70px] border-2 border-gray-500 rounded-lg p-2 cursor-pointer">
                  <h1 className='text-lg'>Interview at Tech Solutions</h1>
                  <div className="application-sub-text flex justify-between text-sm text-gray-500">
                    <div>Applied 2 days ago</div>
                    <div>Yesterday, 12:30 PM</div>
                  </div>
                </div>

                <Link className='w-[100%]' href={"/CandidateDashboard/interviews"}>
                  <button type="button" className="mt-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[98%]">See your entire schedule</button>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
