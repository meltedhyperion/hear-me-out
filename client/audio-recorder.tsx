"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MicIcon, StopCircleIcon, UploadIcon, PlayIcon, PauseIcon } from "lucide-react"

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState < string | null > (null)
  const [isPlaying, setIsPlaying] = useState(false)
  const mediaRecorderRef = useRef < MediaRecorder | null > (null)
  const audioChunksRef = useRef < Blob[] > ([])
  const audioRef = useRef < HTMLAudioElement | null > (null)
  const fileInputRef = useRef < HTMLInputElement > (null)
  const streamRef = useRef < MediaStream | null > (null) // Store media stream

  useEffect(() => {
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL)
      }
    }
  }, [audioURL])

  const startRecording = async () => {
    try {
      const permission = await navigator.permissions.query({ name: "microphone" as any })
      if (permission.state === "denied") {
        alert("Microphone access is denied. Please enable it in your browser settings.")
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream // Store stream to stop it later
      mediaRecorderRef.current = new MediaRecorder(stream)
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const url = URL.createObjectURL(audioBlob)
        setAudioURL(url)
      }
      audioChunksRef.current = []
      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Failed to access microphone. Check browser permissions and ensure the site is served over HTTPS.")
    }
  }


  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      streamRef.current?.getTracks().forEach(track => track.stop())
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAudioURL(url)
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  // Reset play button when audio ends
  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

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
        <div className="w-full sm:w-auto relative">
  <Button
    onClick={triggerFileUpload}
    className="w-full sm:w-auto min-w-[160px]"
  >
    <UploadIcon className="mr-2 h-4 w-4" />
    Upload Audio
  </Button>
  <input
    type="file"
    accept="audio/*"
    onChange={handleFileUpload}
    ref={fileInputRef}
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    style={{ display: "none" }}
  />
</div>

      </div>
      {audioURL && (
        <div className="space-y-6 w-full max-w-lg mx-auto">
          <div className="w-full bg-secondary rounded-lg p-3 gap-3">
            <audio
              ref={audioRef}
              src={audioURL}
              className="w-full"
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleAudioEnded}
            />
          </div>
          <div className="w-full flex justify-center">
            <Button
              onClick={togglePlayPause}
              variant="outline"
              className="w-full sm:w-auto min-w-[160px]"
            >
              {isPlaying ? (
                <>
                  <PauseIcon className="mr-2 h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <PlayIcon className="mr-2 h-4 w-4" />
                  Play
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
