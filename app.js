import express from "express";
import dotenv from "dotenv";
import identifyRouter from "./routes/identify.js";
import { connection } from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

// Set up the root route
app.get("/", (req, res) => {
  res.send("Welcome to the Zamazon API");
});

// Use the identify router for handling contact identification and retrieval
app.use("/identify", identifyRouter);

const PORT = process.env.PORT || 3000;

// Start the server and connect to the database
app.listen(PORT, () => {
  console.log(`🚀 Server listening on ${process.env.URL}`);
});

connection();