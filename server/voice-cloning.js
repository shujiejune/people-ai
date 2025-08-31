import fs from "node:fs/promises";

const API_BASE_URL = "https://api.sws.speechify.com";
const API_KEY = "placeholder";

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
  const voiceData = await createVoice("my_voice", "voices/English - voice cloning.mp4");
  console.log(voiceData.id);
}

main();
