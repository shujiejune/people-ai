import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chat from "./chat.js";
import tts from "./tts.js";

dotenv.config();

const app = express();
app.use(cors());

const PORT = 5001;

// Middleware to log every single request
app.use((req, res, next) => {
  console.log(`[Request Logger] Received: ${req.method} ${req.url}`);
  next();
});

app.get("/chat", async (req, res) => {
  try {
    const resp = await chat(req.query.question);
    res.send(resp);
  } catch (error) {
    console.error("Error in /chat endpoint:", error);
    res.status(500).send("An error occurred while processing the chat request.");
  }
});

/* --- OPTIMIZATION: In-Memory Cache for TTS --- */
// This Map will store text as the key and the PROMISE of the audio data as the value.
const ttsCache = new Map();

app.get("/tts", async (req, res) => {
  try {
    const { words } = req.query;
    if (!words) {
      return res.status(400).send("Missing 'words' query parameter.");
    }

    // 1. Check if a PROMISE for this result is already in the Cache
    if (ttsCache.has(words)) {
      console.log(`[Cache HIT] Waiting an existing promise for: "${words}"`);
      const audioData = await ttsCache.get(words);
      res.setHeader("Content-Type", "audio/mpeg");
      return res.send(audioData);
    }

    // 2. If cache miss, fetch from the API
    // IMPORTANT: We do NOT await here. We get the promise object itself.
    console.log(`[Cache MISS] Creating new PROMISE for: "${words}"`);
    const ttsPromise = tts(words);

    // 3. Store the PROMISE in the cache immediately
    ttsCache.set(words, ttsPromise);

    // 4. Now, await the promise to get the actual audio data.
    const audioData = await ttsPromise;

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(audioData);
  } catch (error) {
    console.error("Error in /tts endpoint:", error);
    // If the TTS call fails, remove the failed promise from the cache
    // so the next request can try again.
    const { words } = req.query;
    if (words) {
      ttsCache.delete(words);
    }
    res.status(500).send("An error occurred while processing the tts request.");
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
