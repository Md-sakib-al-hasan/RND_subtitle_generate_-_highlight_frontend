"use client";
import { useState } from "react";

export default function Home() {
  const [audio, setAudio] = useState(null);

  const uploadAudio = async (e: any) => {
    const file = e.target.files[0];
    const form = new FormData();
    form.append("audio", file);

    const res = await fetch("http://localhost:3001/speech/upload", {
      method: "POST",
      body: form,
    });

    const json = await res.json();
    setAudio(json);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Upload Audio</h1>
      <input type="file" accept="audio/*" onChange={uploadAudio} />

      {audio && (
        <a href={`/player?audio=${encodeURIComponent(JSON.stringify(audio))}`}>
          Open Player ➜
        </a>
      )}
    </div>
  );
}
