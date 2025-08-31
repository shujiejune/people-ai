import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chat from "./chat.js";
import tts from "./tts.js";

dotenv.config();

const app = express();
app.use(cors());

const PORT = 5001;

app.get("/chat", async (req, res) => {
  const resp = await chat(req.query.question);
  res.send(resp);
});

app.get("/tts", async (req, res) => {
  const audioData = await tts(req.query.words);
  res.setHeader("Content-Type", "audio/mpeg");
  res.send(audioData);
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
