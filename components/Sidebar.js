// components/Sidebar.js
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-[#398ab0] to-[#b7e0f3] text-white p-6 shadow-lg border-r border-[#7b258c]/50">
      {/* Logo and Company Name */}
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
          <span className="text-[#4b2060] text-xl font-bold">C</span>
        </div>
        <h2 className="text-[2vw] font-bold">Company</h2>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="space-y-3">
          <li>
            <Button
              variant="ghost"
              className="w-full justify-start text-white text-[1.5vw] hover:bg-[#398ab0] hover:scale-105 transition-transform duration-200"
            >
            Home
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-[#398ab0] hover:scale-105 transition-transform duration-200 text-[1.5vw]"
            >
            Analytics
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-[#398ab0] hover:scale-105 transition-transform duration-200 text-[1.5vw]"
            >
            Candidates
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-[#398ab0] hover:scale-105 transition-transform duration-200 text-[1.5vw]"
            >
            Settings
            </Button>
          </li>
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex items-center gap-3 bg-[#005eff] p-3 rounded-lg">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#4b2060] text-xl font-bold">S</span>
          </div>
          <div>
            <p className="font-semibold text-[1.5vw]">Sarah</p>
            <p className="text-sm text-white/80">HR Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;