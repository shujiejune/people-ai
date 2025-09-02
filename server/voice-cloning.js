import fs from "node:fs/promises";

const API_BASE_URL = process.env.SPECCHIFY_API_BASE_URL;
const API_KEY = process.env.SPEECHIFY_API_KEY;

async function createVoice(name, filePath) {
  const sampleFile = await fs.readFile(filePath);

  const consent = JSON.stringify({
    fullName: "John McVoices",
    email: "me@voices.audio",
  });

  const formData = new FormData();
  formData.set("name", name);
  formData.set("consent", consent);
  formData.set("sample", new Blob([sampleFile]));

  const res = await fetch(`${API_BASE_URL}/v1/voices`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}\n${await res.text()}`);
  }

  const responseData = await res.json();

  return responseData;
}

async function main() {
  const voiceData = await createVoice("spongebob_voice", "voices/spongebob.mp4");
  console.log(voiceData.id);
}

main();
