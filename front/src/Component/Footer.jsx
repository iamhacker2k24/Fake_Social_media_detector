import React from "react";
import { FaShieldAlt, FaTerminal, FaLock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#040609] border-t border-[#00ff66]/20 text-[#00ff66] font-['Fira_Code',monospace] py-6 px-4 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <FaShieldAlt className="text-base text-[#00ff66] glow-green" />
          <span className="font-bold font-['Share_Tech_Mono',monospace] text-white tracking-wider">
            CYBER<span className="text-[#00ff66]">DETECT</span>
          </span>
          <span className="text-gray-500 text-[10px]">|</span>
          <span className="text-gray-400 text-[11px]">Fake Social Media Accounts &amp; Detection System</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <FaTerminal className="text-[10px] text-[#00ff66]" />
            <span>v2.4 FORENSIC ENGINE</span>
          </span>
          <span className="text-gray-700">|</span>
          <span className="flex items-center gap-1 text-cyan-400">
            <FaLock className="text-[10px]" />
            <span>ENCRYPTED CONNECTION</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
