import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRoutes from "./routes/analyzeRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", analyzeRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", server: "CyberDetect Backend API v1.0" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
