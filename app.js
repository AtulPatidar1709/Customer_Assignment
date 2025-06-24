import express from "express";
import dotenv from "dotenv";
import identifyRouter from "./routes/identify.js";
import { connection } from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/identify", identifyRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Temporal anomaly detected. Seek alternate dimension." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
connection();