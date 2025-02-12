import React from 'react';

const GlassCard = ({ dataText, rotation, children }) => (
  <div data-text={dataText} style={{ '--r': `${rotation}` }} className="glass">
    {children}
  </div>
);

const teamMembers = [
  {
    name: "Utkarsh Pushpankar",
    role: "Convener",
    image: "lexi.jpg",
    twitter: "https://x.com/U_Kshitij17",
    linkedin: "https://www.linkedin.com/in/kshitij-upadhyay17?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    github: "https://github.com/ukshitij17"
  },
  {
    name: "Kshitij Upadhyay",
    role: "Co Convener",
    image: "/palak.jpg",
    twitter: "https://x.com/U_Kshitij17",
    linkedin: "https://www.linkedin.com/in/kshitij-upadhyay17?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    github: "https://github.com/ukshitij17"
  },
  {
    name: "Kushal Patni",
    role: "Events & Finance Head",
    image: "/manas.jpg",
    twitter: "https://x.com/U_Kshitij17",
    linkedin: "https://www.linkedin.com/in/kshitij-upadhyay17?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    github: "https://github.com/ukshitij17"
  },
  {
    name: "Prakhar Soni",
    role: "Outreach Head",
    image: "/dhruv.jpg",
    twitter: "https://x.com/U_Kshitij17",
    linkedin: "https://www.linkedin.com/in/kshitij-upadhyay17?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    github: "https://github.com/ukshitij17"
  }
];

const About = () => {
  return (
    <div className="font-bold">
      <h1 className="text-5xl orbitron items-center justify-center flex text-gradient max-w-[55vw] m-auto p-10">
        About US
      </h1>

      <h2 className="max-w-[65vw] flex items-center justify-center m-auto mt-5 text-3xl poppins subtext-gradient">
        "Smart Hiring, Smarter Candidates!"
      </h2>

      <p className="max-w-[65vw] m-auto mt-5 text-center text-2xl poppins text-[#575757]">
        We bridge the gap between HR and candidates. While HR benefits from advanced automation, candidates receive AI-driven insights to optimize their resumes and present their best selves to potential employers.
      </p>

      <h2 className="max-w-[65vw] flex items-center justify-center m-auto mt-14 text-3xl poppins subtext-gradient">
        What makes us unique?
      </h2>

      <div className="about-container" style={{ marginTop: '50px' }}>
        <div data-text="Github" style={{ '--r': '-15' }} className="glass">
          <svg viewBox="0 0 496 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M165.9 397.4c0 2..." />
          </svg>
          <h2 className='glass_h'>Hyper-Personalized Candidate Insights</h2>
          <p className='glass_p'>Unlock the True Potential of Talent</p>
          <ul >
            <li className='glass_l'>- Analyze candidates beyond resumes, focusing on their soft skills and personality traits.</li>
            <li className='glass_l'>- Gain valuable insights to predict cultural fit and future performance.</li>
          </ul>
        </div>

        <div data-text="Code" style={{ '--r': '5' }} className="glass">
          <svg viewBox="0 0 640 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M392.8 1.2c-17..." />
          </svg>
          <h2 className='glass_h'>Ethics-Driven Recruitment</h2>
          <p className='glass_p'>Fair, Transparent, and Inclusive Hiring</p>
          <ul>
            <li className='glass_l'>- Remove biases with ethical AI-powered decision-making tools.</li>
            <li className='glass_l'>- Ensure fair assessment of candidates from diverse backgrounds.</li>
          </ul>
        </div>

        <div data-text="Earn" style={{ '--r': '25' }} className="glass">
          <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M64 64C28.7..." />
          </svg>
          <h2 className='glass_h'>Dynamic Job Description Optimization</h2>
          <p className='glass_p'>Write Job Descriptions That Attract Top Talent</p>
          <ul>
            <li className='glass_l'>- Generate AI-driven job descriptions tailored to roles and market trends.</li>
            <li className='glass_l'>- Optimize content to engage and attract better-qualified candidates.</li>
          </ul>
        </div>
      </div>


      <div className="us-container min-h-screen flex items-center justify-center p-10">
        <div className="about-grid flex justify-center  gap-10 max-w-6xl">

          {teamMembers.map((member, index) => (
            <div key={index} className="about-card bg-[#fac8da] min-w-[20vw] text-white rounded-2xl p-6 shadow-lg flex flex-col items-center">
              <div className="about-profileimage w-28 h-28  rounded-full overflow-hidden border-4 border-gray-600">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="about-details text-center mt-4">
                <h2 className="about-name text-xl font-bold">{member.name}</h2>
                <p className="about-role text-gray-400">{member.role}</p>
              </div>

              {/* Social Media Icons and Email */}
              <div className="about-socials mt-4 flex flex-col items-center">

                <div className="social-links">
                  <a href={`${member.twitter}`} target="_blank" rel="noopener noreferrer">
                    <div id="twitter" className="social-btn flex-center">
                      <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                      </svg>
                      <span>@{member.name.split(" ")[0]}</span>
                    </div>
                  </a>

                  <a href={`${member.linkedin}`} target="_blank" rel="noopener noreferrer">
                    <div id="linkedin" className="social-btn flex-center">
                      <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                      </svg>
                      <span>in/{member.name.split(" ")[0]}</span>
                    </div>
                  </a>

                  <a href={`${member.github}`} target="_blank" rel="noopener noreferrer">
                    <div id="github" className="social-btn flex-center">
                      <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                      </svg>
                      <span>{member.name.split(" ")[0]}</span>
                    </div>
                  </a>

                </div>
              </div>
            </div>
  ))}

        </div >


    </div >
    </div >
    

  );
};

export default About;