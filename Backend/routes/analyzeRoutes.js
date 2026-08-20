import express from "express";
import { analyzeProfile } from "../controllers/analyzeController.js";

const router = express.Router();

router.post("/analyze-profile", analyzeProfile);

export default router;
