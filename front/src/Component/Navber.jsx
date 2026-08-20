import React, { useState, useEffect } from "react";
import { 
  FaTerminal, 
  FaShieldAlt, 
  FaBars, 
  FaTimes, 
  FaLock, 
  FaUserSecret, 
  FaCheckCircle, 
  FaSearch, 
  FaExclamationTriangle,
  FaNetworkWired,
  FaFingerprint
} from "react-icons/fa";

const Navber = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ANALYZER");
  const [searchQuery, setSearchQuery] = useState("");
  const [systemTime, setSystemTime] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setSystemTime(now.toTimeString().split(" ")[0] + ":" + String(now.getMilliseconds()).padStart(3, "0"));
    };
    updateClock();
    const interval = setInterval(updateClock, 100);
    return () => clearInterval(interval);
  }, []);

  const handleScanSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  const navItems = [
    { id: "ANALYZER", label: "01: PROFILE_ANALYZER", icon: <FaFingerprint className="text-xs" /> },
    { id: "BOT_RADAR", label: "02: BOT_RADAR", icon: <FaNetworkWired className="text-xs" /> },
    { id: "DEEP_SCAN", label: "03: DEEP_SCAN", icon: <FaUserSecret className="text-xs" /> },
    { id: "LOGS", label: "04: THREAT_LOGS", icon: <FaExclamationTriangle className="text-xs" /> },
  ];

  return (
    <header className="w-full bg-[#080b10]/95 backdrop-blur-md border-b border-[#00ff66]/30 text-[#00ff66] font-['Fira_Code',monospace] sticky top-0 z-50 shadow-[0_4px_25px_rgba(0,255,102,0.15)]">
      <div className="bg-[#040609] border-b border-[#00ff66]/15 px-4 py-1 text-[11px] flex flex-wrap justify-between items-center text-[#00ff66]/70 tracking-wider">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#00ff66]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff66]"></span>
            </span>
            <span className="font-bold tracking-widest text-[#00ff66] glow-green">SYSTEM: ONLINE</span>
          </span>
          <span className="hidden sm:inline text-gray-600">|</span>
          <span className="hidden sm:flex items-center gap-1 text-cyan-400">
            <FaLock className="text-[10px]" />
            <span>SEC_PROTOCOL: TLS_v1.3</span>
          </span>
          <span className="hidden md:inline text-gray-600">|</span>
          <span className="hidden md:inline text-emerald-400/80">
            NODE_ID: #0x8F4A9
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs text-amber-400/90 font-['Share_Tech_Mono',monospace]">
            <span className="text-gray-500">[SYS_CLK]:</span>
            <span>{systemTime || "00:00:00:000"}</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 bg-[#00ff66]/10 px-2 py-0.5 rounded border border-[#00ff66]/20 text-[10px]">
            <FaCheckCircle className="text-[#00ff66]" />
            <span className="text-[#00ff66]">DETECTION ENGINE v2.4</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative p-2.5 bg-[#0a111a] border border-[#00ff66]/40 rounded-lg group-hover:border-[#00ff66] transition-all duration-300 shadow-[0_0_12px_rgba(0,255,102,0.2)]">
              <FaShieldAlt className="text-2xl text-[#00ff66] group-hover:scale-110 transition-transform duration-300 glow-green" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#00e5ff] rounded-full animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-wider font-['Share_Tech_Mono',monospace] text-white group-hover:text-[#00ff66] transition-colors glow-green">
                  CYBER<span className="text-[#00ff66]">DETECT</span>
                </span>
                <span className="bg-[#00ff66]/15 text-[#00ff66] text-[10px] px-1.5 py-0.5 rounded border border-[#00ff66]/30 uppercase font-mono">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-[#00e5ff]/80 tracking-tight flex items-center gap-1 font-mono">
                <FaTerminal className="text-[10px] text-[#00ff66]" />
                <span>Fake social media accounts &amp; detection</span>
                <span className="animate-blink font-bold text-[#00ff66]">_</span>
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-1 font-['Share_Tech_Mono',monospace]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs tracking-wider transition-all duration-200 border rounded-md ${
                    isActive
                      ? "bg-[#00ff66]/15 border-[#00ff66] text-[#00ff66] shadow-[0_0_10px_rgba(0,255,102,0.3)] glow-green"
                      : "border-transparent text-gray-400 hover:text-[#00ff66] hover:bg-[#00ff66]/5 hover:border-[#00ff66]/30"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <form onSubmit={handleScanSubmit} className="relative flex items-center">
              <span className="absolute left-3 text-xs text-[#00ff66]/60">@</span>
              <input
                type="text"
                placeholder="Target profile/handle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#040609] border border-[#00ff66]/30 rounded-l-md pl-7 pr-3 py-1.5 text-xs text-[#00ff66] placeholder-[#00ff66]/40 focus:outline-none focus:border-[#00ff66] focus:shadow-[0_0_10px_rgba(0,255,102,0.25)] transition-all font-mono w-44 lg:w-56"
              />
              <button
                type="submit"
                disabled={isScanning}
                className="bg-[#00ff66]/20 border border-l-0 border-[#00ff66]/40 hover:bg-[#00ff66] hover:text-black text-[#00ff66] px-3 py-1.5 text-xs font-bold font-['Share_Tech_Mono',monospace] rounded-r-md transition-all duration-300 flex items-center gap-1.5 group cursor-pointer disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <span className="animate-spin text-xs">🌀</span>
                    <span>SCANNING...</span>
                  </>
                ) : (
                  <>
                    <FaSearch className="text-xs group-hover:scale-110 transition-transform" />
                    <span>SCAN</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md bg-[#0d1520] border border-[#00ff66]/40 text-[#00ff66] hover:bg-[#00ff66]/20 transition-all focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-[#05080c] border-t border-[#00ff66]/30 px-4 pt-3 pb-6 space-y-3 font-['Share_Tech_Mono',monospace]">
          <form onSubmit={handleScanSubmit} className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Target profile username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#090d14] border border-[#00ff66]/40 rounded-l-md px-3 py-2 text-xs text-[#00ff66] placeholder-[#00ff66]/40 focus:outline-none w-full font-mono"
            />
            <button
              type="submit"
              className="bg-[#00ff66] text-black font-bold px-4 py-2 text-xs rounded-r-md hover:bg-[#00ff66]/80 transition-all"
            >
              SCAN
            </button>
          </form>

          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs text-left rounded-md border transition-all ${
                    isActive
                      ? "bg-[#00ff66]/20 border-[#00ff66] text-[#00ff66] font-bold glow-green"
                      : "border-[#00ff66]/10 text-gray-300 hover:border-[#00ff66]/40 hover:text-[#00ff66]"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#00ff66]/20 text-[11px] text-emerald-400/70 flex justify-between items-center">
            <span>STATUS: ACTIVE</span>
            <span>SEC_LEVEL: ALPHA</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navber;
