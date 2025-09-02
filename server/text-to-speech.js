import fs from "node:fs/promises";
import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = process.env.SPEECHIFY_API_BASE_URL;
const API_KEY = process.env.SPEECHIFY_API_KEY;
const VOICE_ID = process.env.SPEECHIFY_VOICE_ID;

async function getAudio(text) {
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
    throw new Error(`${res.status} ${res.statusText}\n${await res.text()}`);
  }

  const responseData = await res.json();
  const decodedAudioData = Buffer.from(responseData.audio_data, "base64");

  return decodedAudioData;
}

async function main() {
  const audio = await getAudio(
    "You've gotta dance like there's nobody watching, love like you'll never be hurt, sing like it's heaven on earch.",
  );

  await fs.writeFile("./speeches/speech.mp3", audio);
}

main();
