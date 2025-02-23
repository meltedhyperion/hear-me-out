"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MicIcon, StopCircleIcon, UploadIcon } from "lucide-react";
import { createVoice } from "./utils/elevenlabs";

export default function AudioRecorder({
  name,
  onVoiceGenerated,
}: {
  name: string;
  onVoiceGenerated: (audioId: string) => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioFile = new File([audioBlob], "recorded_audio.wav", {
          type: "audio/wav",
        });

        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        const response = await createVoice({ file: audioFile, name });
        if (response) {
          onVoiceGenerated(response);
        }
      };
      audioChunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioURL(URL.createObjectURL(file));

      const response = await createVoice({ file, name });
      if (response?.audioId) {
        onVoiceGenerated(response.audioId);
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 space-y-6">
      <div className="flex flex-row sm:flex-row gap-4 sm:gap-3 justify-center items-center">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          variant={isRecording ? "destructive" : "default"}
          className="w-full sm:w-auto min-w-[160px]"
        >
          {isRecording ? (
            <>
              <StopCircleIcon className="mr-2 h-4 w-4" />
              Stop Recording
            </>
          ) : (
            <>
              <MicIcon className="mr-2 h-4 w-4" />
              Start Recording
            </>
          )}
        </Button>
        <Button onClick={() => fileInputRef.current?.click()}>
          Upload Audio
        </Button>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </div>
      {audioURL && <audio src={audioURL} controls className="w-full" />}
    </div>
  );
}
