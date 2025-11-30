"use client";

import { useSearchParams } from "next/navigation";
import AudioHighlighter from "@/components/AudioHighlighter";

export default function Player() {
  const searchParams = useSearchParams();

  const audioParam = searchParams.get("audio");
  console.log("Audio Param:", audioParam);
  if (!audioParam) return <p>Loading...</p>;

  const audioData = JSON.parse(audioParam);

  return (
    <AudioHighlighter
      audioUrl={audioData.audioUrl}
      subtitles={audioData.subtitles}
    />
  );
}
