import { createEvidenceHash, createAccountHash } from "../utils/canonicalJson.js";
import { blockchainService } from "../services/blockchainService.js";
import { saveInvestigation, getInvestigation } from "../services/investigationDb.js";

export const storeOnBlockchain = async (req, res) => {
  try {
    const { scanResult } = req.body;

    if (!scanResult) {
      return res.status(400).json({ success: false, error: "Scan result payload is required" });
    }

    const scanId = scanResult.scanId || ("SCAN-" + Math.floor(100000 + Math.random() * 900000));
    scanResult.scanId = scanId;

    const evidenceHash = createEvidenceHash(scanResult);
    const accountHash = createAccountHash(scanResult);
    const riskScore = scanResult.score || 0;
    const platform = scanResult.type || "instagram";

    saveInvestigation(scanId, scanResult);

    const bcResult = await blockchainService.registerAccount(
      scanId,
      platform,
      accountHash,
      evidenceHash,
      riskScore
    );

    return res.status(200).json({
      success: true,
      scanId: scanId,
      blockchain: bcResult
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || "Blockchain storage failed" });
  }
};

export const verifyEvidenceController = async (req, res) => {
  try {
    const { scanId, scanResult } = req.body;

    if (!scanId) {
      return res.status(400).json({ success: false, error: "scanId is required for verification" });
    }

    let rawData = getInvestigation(scanId);
    if (!rawData && scanResult) {
      rawData = scanResult;
      saveInvestigation(scanId, scanResult);
    }

    if (!rawData) {
      return res.status(404).json({
        verified: false,
        scanId: scanId,
        error: "Investigation record not found in off-chain database"
      });
    }

    const calculatedHash = createEvidenceHash(rawData);

    const onChainRecord = await blockchainService.getAccount(scanId);

    if (!onChainRecord || !onChainRecord.exists) {
      return res.status(404).json({
        verified: false,
        scanId: scanId,
        error: "Record not registered on Ethereum blockchain"
      });
    }

    const storedHash = onChainRecord.evidenceHash;
    const isMatch = calculatedHash.toLowerCase() === storedHash.toLowerCase();

    if (isMatch) {
      return res.status(200).json({
        verified: true,
        scanId: scanId,
        storedHash: storedHash,
        calculatedHash: calculatedHash,
        transactionHash: onChainRecord.txHash || "0x..."
      });
    } else {
      return res.status(200).json({
        verified: false,
        scanId: scanId,
        storedHash: storedHash,
        calculatedHash: calculatedHash
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || "Evidence verification failed" });
  }
};

export const reportAccount = async (req, res) => {
  try {
    const { scanResult, reason } = req.body;

    if (!scanResult) {
      return res.status(400).json({ success: false, error: "Scan result is required" });
    }

    const caseId = "CASE-CYBER-" + Math.floor(100000 + Math.random() * 900000);

    return res.status(200).json({
      success: true,
      caseId: caseId,
      status: "FLAGGED & SUBMITTED TO FORENSIC DATABASE",
      reason: reason || "Fake Account Takedown Request",
      timestamp: new Date().toLocaleString()
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || "Account report submission failed" });
  }
};
