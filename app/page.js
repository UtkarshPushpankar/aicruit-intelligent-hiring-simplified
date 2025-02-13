import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container m-auto h-screen">
      <Navbar/>
      <div className="hero text-center m-10 mt-16">
        <div className="btn flex justify-center mb-10">
          <Link href={"#features"}>
            <button className="flex gap-1 items-center justify-center hover-btn"> Discover All New Features <span><img width={20} src="arrow.png" alt="" /></span></button>
          </Link>
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
          <Link href={"/about"}>
            <button type="button" className="flex items-center gap-1 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-base px-5 py-4 text-center me-2 mb-2 mr-3">
              Learn more about us
              <span><img className="invert" width={20} src="arrow.png" alt="" /></span>
            </button>
          </Link>

          <Link href={"/login"}>
            <button type="button" className="flex items-center gap-1 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-base px-5 py-4 text-center me-2 mb-2 ml-3">
              Start Now
              <span><img width={20} src="arrow.png" alt="" /></span>
            </button>
          </Link>
        </div>

        {/* <div className="search flex justify-center">
            <div className="group">
              <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
              <input placeholder="Search" type="search" className="input" />
            </div>
          </div> */}

        <div className="search m-10 mb-24 flex items-center justify-center">
          <form className="form relative">
            <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1 pt-2">
              <svg
                width="17"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
                className="w-5 h-5 text-gray-700"
              >
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  strokeWidth="1.333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <input
              className="input w-[35vw] rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
              placeholder="Search for Jobs/Candidates..."
              required=""
              type="text"
            />
            <button type="reset" className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </form>

        </div>

        <div className='bg-gray-300 w-[60vw] m-auto h-[2px]'></div>



      </div>

      <div id="features" className="features flex flex-col gap-36 m-10 mb-0 pb-0 mt-5 p-20">
        <div className="feature flex justify-evenly items-center gap-5">
          <div className="feature-left group">
            <img
              className="w-[25vw] h-80 rounded-[40px] img-shadow transform transition duration-300 ease-in-out hover:scale-105 hover:rotate-1 hover:shadow-2xl cursor-pointer"
              src="Hiring_Image.jpg"
              alt="Hiring Image"
            />
          </div>

          <div className="feature-right flex flex-col gap-4 justify-center">
            <h2 className="font-bold text-3xl">Easy-To-Use & User-Friendly Platform</h2>
            <p className="max-w-[35vw] text-center text-lg text-gray-500">No bloated UI or steep learning curves. The AIcruit platform is straightforward but effective; it is available to and pertinent to all recruiters and candidates.</p>
          </div>
        </div>

        <div className="feature flex justify-evenly items-center gap-5">
          <div className="feature-left flex flex-col gap-4 justify-center items-center">
            <h2 className="font-bold text-3xl">AI-assisted Applicant Screening</h2>
            <p className="max-w-[35vw] text-center text-lg text-gray-500">Use AI-powered resume screening tools to parse and evaluate candidate experience quickly. The website also offers AI-driven candidate recommendations. The website will leverage an AI-powered Recruitment Bot to improve hiring efficiency.</p>
          </div>

          <div className="feature-right group">
            <img
              className="w-[30vw] h-80 rounded-[40px] img-shadow transform transition duration-300 ease-in-out hover:scale-105 hover:rotate-1 hover:shadow-2xl cursor-pointer"
              src="Hiring_Image_2.jpg"
              alt="Hiring Img"
            />
          </div>
        </div>

        <div className="feature flex justify-evenly items-center gap-5">
          <div className="feature-left group">
            <img
              className="w-[30vw] h-80 rounded-[40px] img-shadow transform transition duration-300 ease-in-out hover:scale-105 hover:rotate-1 hover:shadow-2xl cursor-pointer"
              src="AI_Hiring_Images.jpg"
              alt="AI Hiring"
            />
          </div>

          <div className="feature-right flex flex-col gap-4 justify-center items-center">
            <h2 className="font-bold text-3xl">Enhanced Interview Scheduling</h2>
            <p className="max-w-[35vw] text-center text-lg text-gray-500">Our website offers automated interview scheduling, the bot automatically finds times suitable for both HR teams and candidates by connecting to Google Calendar and Microsoft Outlook. A considerably streamlined interview process will substantially reduce manual coordination. This will also minimize scheduling conflicts.</p>
          </div>
        </div>

        <div className="feature flex justify-evenly items-center gap-5">
          <div className="feature-left flex flex-col gap-4 justify-center items-center">
            <h2 className="font-bold text-3xl">Hyper-Personalized Candidate Insights</h2>
            <p className="max-w-[40vw] text-center text-lg text-gray-500">Use AI to generate detailed candidate insights beyond standard resume screening, such as:
              Soft skills analysis based on resume language.
              Predictive cultural fit using sentiment analysis and personality traits inferred from resumes or chatbot interactions.
              Highlight growth potential by identifying transferable skills that candidates may not explicitly mention.</p>
          </div>

          <div className="feature-right group">
            <img
              className="w-[30vw] h-80 rounded-[40px] img-shadow transform transition duration-300 ease-in-out hover:scale-105 hover:rotate-1 hover:shadow-2xl cursor-pointer"
              src="Candidate_Profile.jpg"
              alt="Candidate Profile img"
            />
          </div>
        </div>

        <div className="feature flex justify-evenly items-center gap-5">
          <div className="feature-left group">
            <img
              className="w-[30vw] h-80 rounded-[40px] img-shadow transform transition duration-300 ease-in-out hover:scale-105 hover:rotate-1 hover:shadow-2xl cursor-pointer"
              src="Diversity.jpg"
              alt="Diversity image"
            />
          </div>

          <div className="feature-right flex flex-col gap-4 justify-center items-center">
            <h2 className="font-bold text-3xl">Ethics-Driven Recruitment</h2>
            <p className="max-w-[40vw] text-center text-lg text-gray-500">Harness AI to ensure fair and inclusive hiring. Our platform detects and mitigates bias in job descriptions and candidate evaluations, enabling anonymous resume screening that focuses solely on skills and qualifications. Additionally, our diversity tracking tools provide actionable insights and recommendations, empowering organizations to build a more equitable workforce.</p>
          </div>
        </div>

        <div className="feature flex justify-evenly items-center gap-5">
          <div className="feature-left flex flex-col gap-4 justify-center items-center">
            <h2 className="font-bold text-3xl">Instant AI Resume Enhancement</h2>
            <p className="max-w-[40vw] text-center text-lg text-gray-500">Empower your job search with real-time, AI-powered resume insights. Upload your resume and receive personalized feedback on formatting, keyword optimization, and skill relevancy. This actionable guidance not only refines your resume for peak performance but also boosts your visibility to HR professionals, enhancing your overall job prospects.</p>
          </div>

          <div className="feature-right group">
            <img
              className="w-[30vw] h-80 rounded-[40px] img-shadow transform transition duration-300 ease-in-out hover:scale-105 hover:rotate-1 hover:shadow-2xl cursor-pointer"
              src="Resume_Enhancement.jpg"
              alt="Instant AI Resume Enhancement"
            />
          </div>


        </div>
      </div>

      <div className="btn-container">
        <Link href={"/login"} className="button type--C">
          <div className="button__line"></div>
          <div className="button__line"></div>
          <span className="button__text">Get Started</span>
          <div className="button__drow1"></div>
          <div className="button__drow2"></div>
        </Link>
      </div>


      <Footer />


    </div>
  );
}
