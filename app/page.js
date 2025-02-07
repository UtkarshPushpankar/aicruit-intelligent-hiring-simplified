import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container h-screen">
      <Navbar />
      <div className="hero text-center m-10 mt-20">
        <h1 className="text-5xl orbitron text-gradient max-w-[55vw] m-auto">Revolutionize Your Hiring Process with AIcruit</h1>

        <p className="max-w-[65vw] m-auto mt-5 text-lg poppins subtext-gradient">Experience the future of recruitment with AI-powered automation. From resume screening to candidate assessment, AIcruit makes hiring smarter, faster and more efficient</p>

        <div className="buttons mt-10 m-5">
          <button type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mr-3">Learn more about us</button>

          <button type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-3">Start Now</button>

        </div>
      </div>
    </div>
  );
}
