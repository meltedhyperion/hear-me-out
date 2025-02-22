import AudioRecorder from "@/audio-recorder";
import Hero from "@/components/hero";

export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
      <AudioRecorder />
      </main>
    </>
  );
}
