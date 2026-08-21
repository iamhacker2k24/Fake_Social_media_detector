import React, { useState } from "react";
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
  FaPercentage,
  FaCube,
  FaShieldAlt,
  FaCopy,
  FaTimes,
  FaCheck,
  FaExternalLinkAlt,
  FaSearch
} from "react-icons/fa";

const ScanningDetails = ({ result, onReset }) => {
  const [isStoringBlockchain, setIsStoringBlockchain] = useState(false);
  const [blockchainData, setBlockchainData] = useState(null);

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const [copiedField, setCopiedField] = useState(null);

  const [isReporting, setIsReporting] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [reportReason, setReportReason] = useState("Automated Neural Bot Detection");
  const [errorMessage, setErrorMessage] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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

  const handleStoreBlockchain = async () => {
    setIsStoringBlockchain(true);
    setErrorMessage(null);
    try {
      const response = await fetch(`${API_URL}/blockchain/store`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scanResult: result })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setBlockchainData(data);
      } else {
        setErrorMessage(data.error || "Failed to store on blockchain");
      }
    } catch (err) {
      setErrorMessage(err.message || "Network error connecting to blockchain service");
    } finally {
      setIsStoringBlockchain(false);
    }
  };

  const handleVerifyEvidence = async () => {
    setIsVerifying(true);
    setErrorMessage(null);
    try {
      const response = await fetch(`${API_URL}/blockchain/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scanId: result.scanId, scanResult: result })
      });

      const data = await response.json();
      if (response.ok) {
        setVerificationResult(data);
      } else {
        setErrorMessage(data.error || "Verification failed");
      }
    } catch (err) {
      setErrorMessage(err.message || "Network error connecting to verification service");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReportAccount = async () => {
    setIsReporting(true);
    setErrorMessage(null);
    try {
      const response = await fetch(`${API_URL}/report-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scanResult: result, reason: reportReason })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setReportData(data);
      } else {
        setErrorMessage(data.error || "Failed to submit report");
      }
    } catch (err) {
      setErrorMessage(err.message || "Network error connecting to report service");
    } finally {
      setIsReporting(false);
    }
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const bcInfo = blockchainData?.blockchain;
  const getExplorerUrl = (txHash, networkStr) => {
    if (!txHash) return "#";
    if (bcInfo?.explorerUrl) return bcInfo.explorerUrl;
    if (networkStr && networkStr.toLowerCase().includes("solana")) {
      return `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
    }
    return `https://sepolia.etherscan.io/tx/${txHash}`;
  };

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

      {errorMessage && (
        <div className="bg-red-950/40 border border-red-500/50 p-4 rounded-xl flex items-center justify-between text-red-400 text-xs font-mono">
          <span>ERROR: {errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="text-gray-400 hover:text-white cursor-pointer">
            <FaTimes />
          </button>
        </div>
      )}

      <div className={`p-6 sm:p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] ${
        result.isFake 
          ? "bg-red-950/20 border-red-500/50 text-red-400"
          : "bg-emerald-950/20 border-emerald-500/50 text-emerald-400"
      }`}>
        <div className="flex items-center gap-5">
          <div className={`p-1.5 rounded-2xl border shrink-0 ${
            result.isFake ? "bg-red-500/10 border-red-500/40" : "bg-emerald-500/10 border-emerald-500/40"
          }`}>
            {result.avatarUrl ? (
              <img 
                src={result.avatarUrl} 
                alt={result.name || result.username} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#00ff66]/40 shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
            ) : null}
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl items-center justify-center ${result.avatarUrl ? "hidden" : "flex"}`}>
              {result.isFake ? (
                <FaRobot className="text-4xl text-red-500 shrink-0 animate-pulse" />
              ) : (
                <FaUserCheck className="text-4xl text-emerald-400 shrink-0" />
              )}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase font-mono ${
                result.isFake ? "bg-red-500/20 border-red-500/40 text-red-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
              }`}>
                {result.riskLevel}
              </span>
              {result.name && (
                <span className="text-xs font-bold text-cyan-400 font-mono">
                  {result.name} (@{result.username})
                </span>
              )}
            </div>
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

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <button
          onClick={onReset}
          className="bg-[#00ff66] text-black font-bold font-['Share_Tech_Mono',monospace] text-xs py-3 px-3 rounded-xl hover:bg-[#00ff66]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,255,102,0.3)]"
        >
          <FaRedo className="text-xs" />
          <span>ANALYZE ANOTHER</span>
        </button>

        <button
          onClick={handleStoreBlockchain}
          disabled={isStoringBlockchain}
          className="bg-[#040609] border border-cyan-500/50 text-cyan-400 font-bold font-['Share_Tech_Mono',monospace] text-xs py-3 px-3 rounded-xl hover:bg-cyan-500/15 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.2)] disabled:opacity-50"
        >
          <FaCube className="text-xs text-cyan-400" />
          <span>{isStoringBlockchain ? "HASHING..." : "STORE ON BLOCKCHAIN"}</span>
        </button>

        <button
          onClick={handleVerifyEvidence}
          disabled={isVerifying}
          className="bg-[#040609] border border-emerald-500/50 text-emerald-400 font-bold font-['Share_Tech_Mono',monospace] text-xs py-3 px-3 rounded-xl hover:bg-emerald-500/15 hover:border-emerald-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50"
        >
          <FaSearch className="text-xs text-emerald-400" />
          <span>{isVerifying ? "VERIFYING..." : "VERIFY EVIDENCE"}</span>
        </button>

        <button
          onClick={() => setIsReporting(true)}
          className="bg-[#040609] border border-red-500/50 text-red-400 font-bold font-['Share_Tech_Mono',monospace] text-xs py-3 px-3 rounded-xl hover:bg-red-500/15 hover:border-red-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.2)]"
        >
          <FaShieldAlt className="text-xs text-red-500" />
          <span>REPORT FAKE ACCOUNT</span>
        </button>
      </div>

      <div className="bg-[#090e17] border border-cyan-500/40 rounded-2xl p-5 space-y-4 shadow-[0_0_30px_rgba(0,229,255,0.1)] font-mono">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-['Share_Tech_Mono',monospace]">
            <FaCube className="text-base" />
            <h3 className="text-sm font-bold tracking-wider">BLOCKCHAIN AUDIT & IMMUTABLE EVIDENCE LEDGER</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded border border-emerald-500/40 bg-emerald-500/15 text-emerald-400 font-bold">
            STATUS: {bcInfo ? "VERIFIED & REGISTERED" : "READY FOR ON-CHAIN STORAGE"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          <div className="bg-[#040609] p-3 rounded-xl border border-gray-800">
            <span className="text-gray-400 text-[10px] block">NETWORK ARCHITECTURE</span>
            <span className="text-white font-bold">{bcInfo?.network || "Solana Devnet / Ethereum Sepolia"}</span>
          </div>

          <div className="bg-[#040609] p-3 rounded-xl border border-gray-800">
            <span className="text-gray-400 text-[10px] block">PROGRAM / CONTRACT ADDRESS</span>
            <span className="text-cyan-400 font-bold truncate block text-[11px]">
              {bcInfo?.contractAddress || "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"}
            </span>
          </div>

          <div className="bg-[#040609] p-3 rounded-xl border border-gray-800">
            <span className="text-gray-400 text-[10px] block">SLOT / BLOCK NUMBER</span>
            <span className="text-emerald-400 font-bold">{bcInfo?.blockNumber ? `#${bcInfo.blockNumber}` : "Pending Registration"}</span>
          </div>

          <div className="bg-[#040609] p-3 rounded-xl border border-gray-800 col-span-1 sm:col-span-2 lg:col-span-3">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[10px]">SHA-256 CANONICAL EVIDENCE HASH:</span>
              {bcInfo?.evidenceHash && (
                <button 
                  onClick={() => handleCopy(bcInfo.evidenceHash, "dashEvHash")}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer text-[10px]"
                >
                  {copiedField === "dashEvHash" ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                  <span>{copiedField === "dashEvHash" ? "COPIED" : "COPY"}</span>
                </button>
              )}
            </div>
            <span className="text-emerald-400 font-mono font-bold break-all block text-[11px] bg-emerald-950/20 p-2 rounded border border-emerald-500/30">
              {bcInfo?.evidenceHash || "SHA-256 fingerprint generated upon clicking Store on Blockchain"}
            </span>
          </div>

          {bcInfo?.transactionHash && (
            <div className="bg-[#040609] p-3 rounded-xl border border-gray-800 col-span-1 sm:col-span-2 lg:col-span-3">
              <div className="flex items-center justify-between text-gray-400 mb-1">
                <span className="text-[10px]">BLOCKCHAIN TRANSACTION SIGNATURE / HASH:</span>
                <a
                  href={getExplorerUrl(bcInfo.transactionHash, bcInfo.network)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[10px]"
                >
                  <span>EXPLORER</span>
                  <FaExternalLinkAlt />
                </a>
              </div>
              <span className="text-cyan-400 font-mono font-bold break-all block text-[11px] bg-cyan-950/20 p-2 rounded border border-cyan-500/30">
                {bcInfo.transactionHash}
              </span>
            </div>
          )}
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

      {verificationResult && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className={`bg-[#090e17] border rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative font-mono ${
            verificationResult.verified ? "border-emerald-500/50 shadow-emerald-500/20" : "border-red-500/50 shadow-red-500/20"
          }`}>
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-3">
                {verificationResult.verified ? (
                  <FaCheckCircle className="text-2xl text-emerald-400" />
                ) : (
                  <FaTimesCircle className="text-2xl text-red-500" />
                )}
                <div>
                  <h3 className="text-base font-bold font-['Share_Tech_Mono',monospace] text-white">
                    {verificationResult.verified ? "EVIDENCE INTEGRITY VERIFIED" : "EVIDENCE INTEGRITY MISMATCH"}
                  </h3>
                  <span className="text-xs text-gray-400">SCAN ID: {verificationResult.scanId}</span>
                </div>
              </div>
              <button 
                onClick={() => setVerificationResult(null)}
                className="text-gray-400 hover:text-white p-2 rounded-lg bg-gray-900 border border-gray-800 cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#040609] p-3 rounded-xl border border-gray-800 space-y-1">
                <span className="text-gray-400 text-[10px] block">STORED ON-CHAIN EVIDENCE HASH:</span>
                <span className="text-emerald-400 font-mono font-bold break-all block text-[11px]">
                  {verificationResult.storedHash || "N/A"}
                </span>
              </div>

              <div className="bg-[#040609] p-3 rounded-xl border border-gray-800 space-y-1">
                <span className="text-gray-400 text-[10px] block">RE-CALCULATED OFF-CHAIN HASH:</span>
                <span className="text-cyan-400 font-mono font-bold break-all block text-[11px]">
                  {verificationResult.calculatedHash || "N/A"}
                </span>
              </div>

              {verificationResult.transactionHash && (
                <div className="bg-[#040609] p-3 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 text-[10px] block">BLOCKCHAIN TRANSACTION SIGNATURE / HASH:</span>
                  <a
                    href={getExplorerUrl(verificationResult.transactionHash, bcInfo?.network)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 font-mono font-bold break-all hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>{verificationResult.transactionHash}</span>
                    <FaExternalLinkAlt className="shrink-0" />
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setVerificationResult(null)}
                className="bg-emerald-500 text-black font-bold font-['Share_Tech_Mono',monospace] text-xs py-2.5 px-5 rounded-xl hover:bg-emerald-400 transition-all cursor-pointer"
              >
                CLOSE VERIFICATION
              </button>
            </div>
          </div>
        </div>
      )}

      {blockchainData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#090e17] border border-cyan-500/50 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-[0_0_50px_rgba(0,229,255,0.25)] relative font-mono">
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
              <div className="flex items-center gap-3 text-cyan-400">
                <FaCube className="text-2xl animate-pulse" />
                <div>
                  <h3 className="text-lg font-bold font-['Share_Tech_Mono',monospace] text-white">BLOCKCHAIN LEDGER ANCHOR</h3>
                  <span className="text-xs text-gray-400">SHA-256 PROOF OF FORENSIC METRICS</span>
                </div>
              </div>
              <button 
                onClick={() => setBlockchainData(null)}
                className="text-gray-400 hover:text-white p-2 rounded-lg bg-gray-900 border border-gray-800 cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#040609] p-3.5 rounded-xl border border-cyan-500/20 space-y-1">
                <div className="flex items-center justify-between text-gray-400">
                  <span>SHA-256 CANONICAL EVIDENCE HASH:</span>
                  <button 
                    onClick={() => handleCopy(bcInfo?.evidenceHash, "sha256")} 
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedField === "sha256" ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                    <span>{copiedField === "sha256" ? "COPIED!" : "COPY"}</span>
                  </button>
                </div>
                <div className="text-white font-mono font-bold break-all text-[11px] bg-cyan-950/20 p-2 rounded border border-cyan-500/30">
                  {bcInfo?.evidenceHash}
                </div>
              </div>

              <div className="bg-[#040609] p-3.5 rounded-xl border border-cyan-500/20 space-y-1">
                <div className="flex items-center justify-between text-gray-400">
                  <span>BLOCKCHAIN TRANSACTION HASH (TxHash):</span>
                  <button 
                    onClick={() => handleCopy(bcInfo?.transactionHash, "txHash")} 
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedField === "txHash" ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                    <span>{copiedField === "txHash" ? "COPIED!" : "COPY"}</span>
                  </button>
                </div>
                <div className="text-emerald-400 font-mono font-bold break-all text-[11px] bg-emerald-950/20 p-2 rounded border border-emerald-500/30">
                  {bcInfo?.transactionHash}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-[#040609] p-3 rounded-xl border border-gray-800">
                  <span className="text-gray-400 text-[10px] block">SLOT / BLOCK NUMBER</span>
                  <span className="text-white font-bold text-xs">#{bcInfo?.blockNumber}</span>
                </div>
                <div className="bg-[#040609] p-3 rounded-xl border border-gray-800">
                  <span className="text-gray-400 text-[10px] block">NETWORK</span>
                  <span className="text-cyan-400 font-bold text-xs">{bcInfo?.network}</span>
                </div>
                <div className="bg-[#040609] p-3 rounded-xl border border-gray-800">
                  <span className="text-gray-400 text-[10px] block">PROGRAM / CONTRACT ADDRESS</span>
                  <span className="text-gray-300 font-bold text-[10px] truncate block">{bcInfo?.contractAddress}</span>
                </div>
                <div className="bg-[#040609] p-3 rounded-xl border border-gray-800">
                  <span className="text-gray-400 text-[10px] block">LEDGER STATUS</span>
                  <span className="text-emerald-400 font-bold text-xs uppercase">{bcInfo?.status || "CONFIRMED"}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <a
                href={getExplorerUrl(bcInfo?.transactionHash, bcInfo?.network)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono"
              >
                <span>VIEW ON BLOCKCHAIN EXPLORER</span>
                <FaExternalLinkAlt />
              </a>

              <button
                onClick={() => setBlockchainData(null)}
                className="bg-cyan-500 text-black font-bold font-['Share_Tech_Mono',monospace] text-xs py-2.5 px-5 rounded-xl hover:bg-cyan-400 transition-all cursor-pointer"
              >
                CLOSE BLOCKCHAIN PROOF
              </button>
            </div>
          </div>
        </div>
      )}

      {isReporting && !reportData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#090e17] border border-red-500/50 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-[0_0_50px_rgba(239,68,68,0.25)] relative font-mono">
            <div className="flex items-center justify-between border-b border-red-500/30 pb-3">
              <div className="flex items-center gap-2 text-red-400">
                <FaShieldAlt className="text-xl" />
                <h3 className="text-base font-bold font-['Share_Tech_Mono',monospace] text-white">REPORT FAKE ACCOUNT TAKEDOWN</h3>
              </div>
              <button 
                onClick={() => setIsReporting(false)}
                className="text-gray-400 hover:text-white p-1.5 rounded-lg bg-gray-900 border border-gray-800 cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            <p className="text-xs text-gray-300">
              Select the primary forensic violation for <span className="text-white font-bold">{result.url}</span>:
            </p>

            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full bg-[#040609] border border-red-500/40 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-red-400 font-mono"
            >
              <option value="Automated Neural Bot Detection">Automated Neural Bot Detection</option>
              <option value="Impersonation / Fake Celebrity Profile">Impersonation / Fake Profile</option>
              <option value="High Fake Follower Manipulation">High Fake Follower Manipulation</option>
              <option value="Suspicious Night Spikes Activity">Suspicious Night Spikes Activity</option>
            </select>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsReporting(false)}
                className="flex-1 bg-gray-900 border border-gray-800 text-gray-400 font-bold font-['Share_Tech_Mono',monospace] text-xs py-2.5 rounded-xl hover:bg-gray-800 transition-all cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={handleReportAccount}
                className="flex-1 bg-red-600 text-white font-bold font-['Share_Tech_Mono',monospace] text-xs py-2.5 rounded-xl hover:bg-red-500 transition-all cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              >
                SUBMIT TAKEDOWN FLAG
              </button>
            </div>
          </div>
        </div>
      )}

      {reportData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#090e17] border border-emerald-500/50 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-[0_0_50px_rgba(16,185,129,0.25)] relative font-mono text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 text-3xl">
              <FaCheckCircle />
            </div>

            <div>
              <h3 className="text-lg font-bold font-['Share_Tech_Mono',monospace] text-white">TAKEDOWN FLAG SUBMITTED</h3>
              <p className="text-xs text-gray-400 mt-1">FORENSIC CASE ID: <span className="text-cyan-400 font-bold">{reportData.caseId}</span></p>
            </div>

            <div className="bg-[#040609] p-3 rounded-xl border border-gray-800 text-left text-xs space-y-1">
              <div className="text-gray-400">STATUS: <span className="text-emerald-400 font-bold">{reportData.status}</span></div>
              <div className="text-gray-400">REASON: <span className="text-white">{reportData.reason}</span></div>
              <div className="text-gray-400">TIMESTAMP: <span className="text-gray-300">{reportData.timestamp}</span></div>
            </div>

            <button
              onClick={() => {
                setReportData(null);
                setIsReporting(false);
              }}
              className="w-full bg-emerald-500 text-black font-bold font-['Share_Tech_Mono',monospace] text-xs py-3 rounded-xl hover:bg-emerald-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              DONE
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ScanningDetails;
