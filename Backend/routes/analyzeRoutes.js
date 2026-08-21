import express from "express";
import { analyzeProfile } from "../controllers/analyzeController.js";
import { storeOnBlockchain, verifyEvidenceController, reportAccount } from "../controllers/blockchainController.js";

const router = express.Router();

router.post("/analyze-profile", analyzeProfile);
router.post("/blockchain/store", storeOnBlockchain);
router.post("/blockchain/verify", verifyEvidenceController);
router.post("/report-account", reportAccount);

export default router;
