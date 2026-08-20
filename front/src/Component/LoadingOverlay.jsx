import React from "react";
import { FaShieldAlt, FaTerminal } from "react-icons/fa";

const LoadingOverlay = ({
  profileUrl,
  profileType,
  scanProgress,
  scanLogStep,
  scanStepsMessages
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#04070d]/96 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center font-['Fira_Code',monospace]">
      <div className="max-w-xl w-full bg-[#080d16] border border-[#00ff66]/40 rounded-2xl p-8 shadow-[0_0_60px_rgba(0,255,102,0.25)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff66] to-transparent animate-pulse" />

        <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-t-[#00ff66] border-r-transparent border-b-[#00e5ff] border-l-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-t-transparent border-r-[#00ff66]/50 border-b-transparent border-l-[#00ff66]/50 animate-[spin_2s_linear_infinite_reverse]" />
          <FaShieldAlt className="text-4xl text-[#00ff66] animate-pulse glow-green" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-['Share_Tech_Mono',monospace] text-white tracking-wider mb-2 glow-green">
          DEEP FORENSIC SCANNING IN PROGRESS
        </h2>

        <p className="text-xs text-cyan-400 font-mono mb-6">
          TARGET: <span className="text-white font-bold">{profileUrl}</span> [{profileType.toUpperCase()}]
        </p>

        <div className="w-full bg-[#040609] border border-[#00ff66]/30 rounded-full h-4 p-0.5 mb-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#00ff66] to-[#00e5ff] h-full rounded-full transition-all duration-150 shadow-[0_0_12px_rgba(0,255,102,0.8)]"
            style={{ width: `${scanProgress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs font-['Share_Tech_Mono',monospace] mb-6">
          <span className="text-[#00ff66]">PROGRESS: {scanProgress}%</span>
          <span className="text-cyan-400 animate-pulse">STATUS: ACTIVE</span>
        </div>

        <div className="bg-[#030508] border border-[#00ff66]/20 rounded-lg p-3 text-left font-mono text-[11px] text-gray-300 space-y-1">
          <div className="flex items-center gap-2 text-[#00ff66] border-b border-[#00ff66]/10 pb-1 mb-1">
            <FaTerminal className="text-xs shrink-0" />
            <span className="font-bold">SYSTEM LOG MESSAGES</span>
          </div>
          <p className="text-[#00ff66] animate-pulse">
            &gt; {scanStepsMessages[scanLogStep]}
          </p>
          <p className="text-gray-500">
            &gt; Memory block allocation: 0x4F829A ... [OK]
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
