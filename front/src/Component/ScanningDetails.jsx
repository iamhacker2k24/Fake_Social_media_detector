import React from "react";
import { 
  FaArrowLeft, 
  FaRobot, 
  FaUserCheck, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaTerminal, 
  FaRedo,
  FaCalendarAlt,
  FaFileAlt,
  FaClock,
  FaUsers,
  FaUserPlus,
  FaImage,
  FaFont,
  FaChartLine,
  FaMoon,
  FaHeart,
  FaComment,
  FaPercentage
} from "react-icons/fa";

const ScanningDetails = ({ result, onReset }) => {
  const parameterItems = [
    { label: "Account Creation Date", value: result.date_of_account_creation || "N/A", icon: <FaCalendarAlt className="text-pink-400" /> },
    { label: "Account Age", value: result.account_age || "N/A", icon: <FaClock className="text-cyan-400" /> },
    { label: "Total Posts", value: result.total_post ?? result.post_count ?? "0", icon: <FaFileAlt className="text-amber-400" /> },
    { label: "Followers Count", value: result.followers?.toLocaleString() || "0", icon: <FaUsers className="text-[#00ff66]" /> },
    { label: "Following Count", value: result.following?.toLocaleString() || "0", icon: <FaUserPlus className="text-[#00e5ff]" /> },
    { label: "Profile Picture Exists", value: result.profile_image_exists ? "YES (Verified)" : "NO (Default Avatar)", icon: <FaImage className="text-purple-400" /> },
    { label: "Bio Text Length", value: `${result.bio_length || 0} characters`, icon: <FaFont className="text-blue-400" /> },
    { label: "Username Character Length", value: `${result.username_length || 0} chars`, icon: <FaFont className="text-[#00ff66]" /> },
    { label: "Posts Per Day Rate", value: `${result.posts_per_day || 0} posts/day`, icon: <FaChartLine className="text-emerald-400" /> },
    { label: "Avg Time Between Posts", value: result.average_time_between_posts || "N/A", icon: <FaClock className="text-yellow-400" /> },
    { label: "Posting Frequency Pattern", value: result.posting_frequency || "N/A", icon: <FaChartLine className="text-sky-400" /> },
    { label: "Night Activity Ratio (00:00 - 06:00)", value: result.night_activity_ratio || "0%", icon: <FaMoon className="text-indigo-400" /> },
    { label: "Average Likes per Post", value: result.average_likes?.toLocaleString() || "0", icon: <FaHeart className="text-rose-400" /> },
    { label: "Average Comments per Post", value: result.average_comments?.toLocaleString() || "0", icon: <FaComment className="text-teal-400" /> },
    { label: "Like-to-Follower Ratio", value: result.like_follower_ratio ?? "N/A", icon: <FaPercentage className="text-green-400" /> },
    { label: "Comment-to-Follower Ratio", value: result.comment_follower_ratio ?? "N/A", icon: <FaPercentage className="text-cyan-400" /> },
    { label: "Follower-to-Following Ratio", value: result.follower_following_ratio ?? "N/A", icon: <FaUsers className="text-emerald-400" /> },
    { label: "Overall Engagement Ratio", value: result.engagement_ratio || "0%", icon: <FaPercentage className="text-amber-400" /> }
  ];

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 relative z-10 space-y-6 font-['Fira_Code',monospace]">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#090e17] p-4 rounded-xl border border-[#00ff66]/30">
        <button
          onClick={onReset}
          className="flex items-center gap-2 bg-[#040609] border border-[#00ff66]/40 text-[#00ff66] hover:bg-[#00ff66]/15 px-4 py-2 rounded-lg text-xs font-['Share_Tech_Mono',monospace] transition-all cursor-pointer"
        >
          <FaArrowLeft className="text-xs" />
          <span>SCAN ANOTHER PROFILE</span>
        </button>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-gray-400">REPORT ID: <span className="text-cyan-400 font-bold">{result.scanId}</span></span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">TIME: <span className="text-white">{result.scannedAt}</span></span>
        </div>
      </div>

      <div className={`p-6 sm:p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] ${
        result.isFake 
          ? "bg-red-950/20 border-red-500/50 text-red-400"
          : "bg-emerald-950/20 border-emerald-500/50 text-emerald-400"
      }`}>
        <div className="flex items-center gap-5">
          <div className={`p-4 rounded-2xl border ${
            result.isFake ? "bg-red-500/10 border-red-500/40" : "bg-emerald-500/10 border-emerald-500/40"
          }`}>
            {result.isFake ? (
              <FaRobot className="text-5xl text-red-500 shrink-0 animate-pulse" />
            ) : (
              <FaUserCheck className="text-5xl text-emerald-400 shrink-0" />
            )}
          </div>
          <div>
            <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase mb-1 font-mono ${
              result.isFake ? "bg-red-500/20 border-red-500/40 text-red-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
            }`}>
              {result.riskLevel}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Share_Tech_Mono',monospace] text-white">
              {result.isFake ? "DETECTION: FAKE / BOT ACCOUNT" : "DETECTION: AUTHENTIC HUMAN"}
            </h2>
            <p className="text-xs text-gray-300 mt-1 font-mono">
              TARGET URL: <span className="text-white underline">{result.url}</span> [{result.type?.toUpperCase()}]
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 bg-[#040609]/80 p-5 rounded-xl border border-current w-full md:w-auto justify-around">
          <div className="text-center">
            <span className="text-[10px] text-gray-400 font-mono uppercase block mb-1">Authenticity Score</span>
            <span className={`text-4xl font-bold font-['Share_Tech_Mono',monospace] ${
              result.isFake ? "text-red-500" : "text-emerald-400"
            }`}>
              {result.score}<span className="text-sm text-gray-500">/100</span>
            </span>
          </div>
          <div className="w-px h-10 bg-gray-800" />
          <div className="text-center">
            <span className="text-[10px] text-gray-400 font-mono uppercase block mb-1">Confidence</span>
            <span className="text-2xl font-bold font-['Share_Tech_Mono',monospace] text-cyan-400">
              {result.confidence}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#090e17] border border-[#00ff66]/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,255,102,0.08)]">
        <div className="flex items-center gap-2 border-b border-[#00ff66]/20 pb-3 mb-5 text-[#00ff66] font-['Share_Tech_Mono',monospace]">
          <FaTerminal className="text-base" />
          <h3 className="text-sm font-bold tracking-wider">ALL EXTRACTED BACKEND FORENSIC PARAMETERS</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {parameterItems.map((item, idx) => (
            <div key={idx} className="bg-[#040609] p-3.5 rounded-xl border border-[#00ff66]/15 flex items-center justify-between gap-3 hover:border-[#00ff66]/40 transition-all">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="text-sm shrink-0">{item.icon}</span>
                <div className="truncate">
                  <span className="text-[10px] text-gray-400 font-mono uppercase block truncate">{item.label}</span>
                  <span className="text-xs text-white font-mono font-bold truncate block">{item.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {result.metrics?.map((metric, idx) => (
          <div key={idx} className="bg-[#090e17] p-5 rounded-xl border border-[#00ff66]/20 flex flex-col justify-between space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                {metric.isGood ? (
                  <FaCheckCircle className="text-emerald-400 text-base shrink-0" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-base shrink-0" />
                )}
                <span className="text-xs font-bold text-white font-['Share_Tech_Mono',monospace]">{metric.name}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${
                metric.isGood ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-red-500/15 text-red-400 border border-red-500/30"
              }`}>
                {metric.score}% MATCH
              </span>
            </div>

            <div className="w-full bg-[#040609] border border-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full rounded-full ${metric.isGood ? "bg-emerald-400" : "bg-red-500"}`}
                style={{ width: `${metric.score}%` }}
              />
            </div>

            <p className="text-xs text-gray-300 font-mono">
              Analysis Detail: <span className={metric.isGood ? "text-emerald-300" : "text-red-300"}>{metric.status}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="bg-[#090e17] border border-[#00ff66]/25 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-[#00ff66]/15 pb-3">
          <div className="flex items-center gap-2 text-xs font-['Share_Tech_Mono',monospace] text-[#00ff66]">
            <FaTerminal className="text-sm" />
            <span className="font-bold">SYSTEM SCAN LOG VERIFICATIONS</span>
          </div>
          <span className="text-[11px] text-gray-500 font-mono">{result.logs?.length || 5} CHECKS EXECUTED</span>
        </div>

        <div className="space-y-2">
          {result.logs?.map((log) => (
            <div key={log.id} className="bg-[#040609] p-3 rounded-lg border border-gray-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 text-[10px]">{log.id}</span>
                <span className="text-gray-300">{log.check}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-[10px]">{log.time}</span>
                <span className={`font-bold text-[10px] px-2 py-0.5 rounded ${
                  log.result === "PASSED" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                }`}>
                  {log.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        <button
          onClick={onReset}
          className="flex-1 bg-[#00ff66] text-black font-bold font-['Share_Tech_Mono',monospace] text-xs py-3.5 px-6 rounded-xl hover:bg-[#00ff66]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,255,102,0.3)]"
        >
          <FaRedo className="text-xs" />
          <span>ANALYZE ANOTHER PROFILE</span>
        </button>
      </div>
    </main>
  );
};

export default ScanningDetails;
