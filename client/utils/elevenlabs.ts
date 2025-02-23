import { ElevenLabsClient } from "elevenlabs";
const client = new ElevenLabsClient({
  apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_KEY,
});
export async function getVoices() {
  try {
    const voices = await client.voices.getAll();
    return voices;
  } catch (error) {
    console.error("Error fetching voices:", error);
    throw new Error("Failed to fetch voices.");
  }
}

export async function createVoice(voice: any) {
  const res = await client.voices.add({
    files: [voice.file],
    name: voice.name,
    remove_background_noise: false,
  });
  console.log("Voice created:", res);
  return res.voice_id;
}
