import Image from "next/image";

export default function Home() {
  return (
    <div className="container h-screen">
      <div className="hero text-center m-10 mt-16">
        <div className="btn flex justify-center mb-7">
          <button className="flex gap-1 items-center justify-center hover-btn"> Discover All New Features <span><img width={20} src="arrow.png" alt="" /></span></button>
        </div>

        {/* <div className="hero-btn mb-7">
          <button
            className="group/button relative inline-flex gap-1 items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
          >
            <span className="text-lg">Discover All New Features</span>
            <span><img className="invert" width={20} src="arrow.png" alt="" /></span>
            <div
              className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
            >
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </button>

        </div> */}

        <h1 className="text-5xl orbitron text-gradient max-w-[55vw] m-auto">Revolutionize Your Hiring Process with AIcruit</h1>

        <p className="max-w-[65vw] m-auto mt-5 text-lg poppins subtext-gradient">Experience the future of recruitment with AI-powered automation. From resume screening to candidate assessment, AIcruit makes hiring smarter, faster and more efficient</p>

        <div className="buttons flex justify-center mt-10 m-5">
          <button type="button" className="flex items-center gap-1 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-base px-5 py-4 text-center me-2 mb-2 mr-3">
            Learn more about us
            <span><img className="invert" width={20} src="arrow.png" alt="" /></span>
          </button>

          <button type="button" className="flex items-center gap-1 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-base px-5 py-4 text-center me-2 mb-2 ml-3">
            Start Now
            <span><img width={20} src="arrow.png" alt="" /></span>
          </button>

        </div>
      </div>
    </div>
  );
}
