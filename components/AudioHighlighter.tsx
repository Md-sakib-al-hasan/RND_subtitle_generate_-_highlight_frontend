// import { useEffect, useRef, useState } from "react";

// export default function AudioHighlighter({ audioUrl, subtitles }) {
//   const audioRef = useRef(null);
//   const [active, setActive] = useState({ s: -1, w: -1 });

//   useEffect(() => {
//     const id = setInterval(() => {
//       const t = audioRef.current?.currentTime;

//       subtitles?.forEach((s, si) => {
//         s.words?.forEach((w, wi) => {
//           if (t >= w.start && t <= w.end) {
//             setActive({ s: si, w: wi });
//           }
//         });
//       });
//     }, 50);

//     return () => clearInterval(id);
//   }, []);

//   return (
//     <div style={{ padding: 40 }}>
//       <audio ref={audioRef} controls src={audioUrl} />

//       {subtitles?.map((s, si) => (
//         <p key={si} style={{ fontSize: 22 }}>
//           {s.words?.map((w, wi) => (
//             <span
//               key={wi}
//               style={{
//                 background:
//                   active.s === si && active.w === wi ? "yellow" : "transparent",
//               }}
//             >
//               {w.word + " "}
//             </span>
//           ))}
//         </p>
//       ))}
//     </div>
//   );
// }


"use client";
import { useEffect, useRef, useState } from "react";

export default function AudioHighlighter({ audioUrl, subtitles }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      const time = audio.currentTime;
      const idx = subtitles.findIndex(
        (s) => time >= s.start && time <= s.end
      );
      setCurrentIndex(idx);
    };

    audio.addEventListener("timeupdate", update);

    return () => audio.removeEventListener("timeupdate", update);
  }, [subtitles]);

  return (
    <div style={{ padding: 40 }}>
      <audio ref={audioRef} src={audioUrl} controls style={{ width: "100%" }} />

      <div style={{ marginTop: 20, fontSize: 20, lineHeight: "28px" }}>
        {subtitles.map((s, i) => (
          <span
            key={i}
            style={{
              backgroundColor: i === currentIndex ? "yellow" : "transparent",
              padding: "2px 4px",
              marginRight: 6,
              display: "inline-block",
            }}
          >
            {s.text}
          </span>
        ))}
      </div>
    </div>
  );
}

