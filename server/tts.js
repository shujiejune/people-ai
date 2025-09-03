import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = process.env.SPEECHIFY_API_BASE_URL;
const API_KEY = process.env.SPEECHIFY_API_KEY;
const VOICE_ID = process.env.SPEECHIFY_VOICE_ID;

async function tts(text) {
  console.log(`[tts.js] Attempting to fetch audio for: "${text}"`);

  const res = await fetch(`${API_BASE_URL}/v1/audio/speech`, {
    method: "POST",
    body: JSON.stringify({
      input: `<speak>${text}</speak>`,
      voice_id: VOICE_ID,
      audio_format: "mp3",
    }),
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("[tts.js] API call failed!", res.status, res.statusText);
    throw new Error(`${res.status} ${res.statusText}\n${await res.text()}`);
  }

  console.log(`[tts.js] Successfully fetched audio for: "${text}"`);
  const responseData = await res.json();
  const decodedAudioData = Buffer.from(responseData.audio_data, "base64");

  return decodedAudioData;
}

export default tts;
