"use client";

import { useRef, useState } from "react";
import styles from "./commercial.module.css";

interface CommercialVideoProps {
  src: string;
  poster: string;
}

export default function CommercialVideo({ src, poster }: CommercialVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    if (!next && v.paused) v.play().catch(() => {});
    setMuted(next);
  };

  return (
    <div className={styles.videoWrap}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <button
        type="button"
        onClick={toggleSound}
        className={styles.soundToggle}
        aria-label={muted ? "Unmute video" : "Mute video"}
        aria-pressed={!muted}
      >
        {muted ? (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M3 9v6h4l5 5V4L7 9H3zm13.59 3L19 9.41 17.59 8 15 10.59 12.41 8 11 9.41 13.59 12 11 14.59 12.41 16 15 13.41 17.59 16 19 14.59 16.59 12z"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12zm-2.5-7v2.06a7 7 0 0 1 0 13.88V22a9 9 0 0 0 0-17z"
            />
          </svg>
        )}
        <span className={styles.soundToggleLabel}>
          {muted ? "Sound off" : "Sound on"}
        </span>
      </button>
    </div>
  );
}
