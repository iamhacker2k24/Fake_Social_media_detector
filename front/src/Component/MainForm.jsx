import React from "react";
import { FaGlobe, FaSearch, FaExclamationTriangle, FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";

const MainForm = ({
  profileUrl,
  setProfileUrl,
  profileType,
  setProfileType,
  error,
  onSubmit
}) => {
  const platformOptions = [
    { id: "instagram", label: "Instagram", icon: <FaInstagram className="text-pink-500" /> },
    { id: "twitter", label: "Twitter / X", icon: <FaTwitter className="text-sky-400" /> },
    { id: "facebook", label: "Facebook", icon: <FaFacebook className="text-blue-500" /> },
    { id: "linkedin", label: "LinkedIn", icon: <FaLinkedin className="text-blue-400" /> },
    { id: "tiktok", label: "TikTok", icon: <FaTiktok className="text-purple-400" /> },
    { id: "youtube", label: "YouTube", icon: <FaYoutube className="text-red-500" /> }
  ];

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-10 relative z-10 flex flex-col justify-center">
      <div className="text-center mb-8">
        <span className="inline-block bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] text-xs px-3 py-1 rounded-full uppercase tracking-widest font-['Share_Tech_Mono',monospace] mb-3 glow-green">
          NEURAL FORENSIC DETECTOR
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold font-['Share_Tech_Mono',monospace] text-white tracking-wider mb-2 glow-green">
          Fake Social Media Accounts &amp; Their Detection
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto">
          Enter any social media profile URL and select the profile platform type to execute a full forensic analysis.
        </p>
      </div>

      <div className="bg-[#090e17]/90 border border-[#00ff66]/30 rounded-xl p-6 sm:p-8 backdrop-blur-md shadow-[0_0_35px_rgba(0,255,102,0.12)]">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-['Share_Tech_Mono',monospace] text-gray-300 mb-2 tracking-wider flex items-center gap-2">
              <FaGlobe className="text-[#00ff66]" />
              <span>PROFILE URL</span>
            </label>
            <input
              type="url"
              required
              placeholder="https://instagram.com/username"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="w-full bg-[#040609] border border-[#00ff66]/40 rounded-lg px-4 py-3.5 text-sm text-[#00ff66] placeholder-[#00ff66]/30 focus:outline-none focus:border-[#00ff66] focus:shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-['Share_Tech_Mono',monospace] text-gray-300 mb-2 tracking-wider">
              SELECT PROFILE TYPE
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {platformOptions.map((platform) => {
                const isSelected = profileType === platform.id;
                return (
                  <button
                    type="button"
                    key={platform.id}
                    onClick={() => setProfileType(platform.id)}
                    className={`flex items-center gap-2.5 px-3.5 py-3 rounded-lg border text-xs font-['Share_Tech_Mono',monospace] transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#00ff66]/20 border-[#00ff66] text-white shadow-[0_0_12px_rgba(0,255,102,0.3)]"
                        : "bg-[#040609] border-[#00ff66]/20 text-gray-400 hover:border-[#00ff66]/50 hover:text-white"
                    }`}
                  >
                    {platform.icon}
                    <span>{platform.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-3 text-xs text-red-400 flex items-center gap-2 font-mono">
              <FaExclamationTriangle className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#00ff66] text-black font-bold font-['Share_Tech_Mono',monospace] text-sm py-4 px-6 rounded-lg hover:bg-[#00ff66]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:shadow-[0_0_30px_rgba(0,255,102,0.6)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaSearch className="text-base" />
            <span>START FORENSIC ANALYSIS</span>
          </button>
        </form>
      </div>
    </main>
  );
};

export default MainForm;
