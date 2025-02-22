import AudioRecorder from "@/audio-recorder";
import Hero from "@/components/hero";
import Dementia from "@/app/istockphoto-1336974187-612x612.jpg";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-1">
        <div className="flex flex-col gap-6">
          <h1 className="text-6xl font-bold">ReMIND</h1>
          <p className="text-xl text-gray-600">
            Help Your Loved Ones in fighting Demenita.
          </p>
          <Image
            src="/istockphoto-1336974187-612x612.jpg"
            width="500"
            height="500"
            alt="Dementia"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">
            You wouldn't want them to forget you, would you?
          </h2>
          <p className="text-lg text-gray-600">
            Every hour, someone develops dementia. Many forget their daily
            lives, their stories—even their loved ones. But memory loss isn't
            just fate. With care, it can be slowed.
          </p>
        </div>

        <AudioRecorder />
      </main>
    </>
  );
}
