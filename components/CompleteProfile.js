import React from 'react';
import { useSession } from "next-auth/react";

const CompleteProfile = () => {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form method="POST" action="#">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                                Name
                            </label>
                            <div className="mt-1">
                                <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required autoComplete="name" value={session?.user?.name} type="text" name="name" id="name" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="github">
                                Github
                            </label>
                            <div className="mt-1">
                                <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"  autoComplete="github" type="text" name="github" id="github" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="location">
                                Location
                            </label>
                            <div className="mt-1">
                                <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required autoComplete="location" type="text" name="location" id="location" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="skills">
                                Skills
                            </label>
                            <div className="mt-1">
                                <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required autoComplete="skills" type="text" name="skills" id="skills" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="linkedin">
                                LinkedIn
                            </label>
                            <div className="mt-1">
                                <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"  autoComplete="linkedin" type="password" name="linkedin" id="linkedin" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="dob">
                                Date of Birth
                            </label>
                            <div className="mt-1">
                                <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required type="date" name="dob" id="dob" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-3">
                            <span className="mr-3 text-gray-700 font-medium">Gender:</span>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio h-5 w-5 text-pink-600" name="gender" defaultValue="Male" />
                                <span className="ml-2 text-gray-700">Male</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input type="radio" className="form-radio h-5 w-5 text-purple-600" name="gender" defaultValue="Female" />
                                <span className="ml-2 text-gray-700">Female</span>
                            </label>
                        </div>
                       
                        <div className="mt-3">
                            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">
                                Complete Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CompleteProfile;
