'use client';

import { useEffect, useRef, useState } from 'react';

const musicTrack = new URL('../../assets/background-music.mp3', import.meta.url).href;

const GESTURES = ['pointerdown', 'keydown', 'touchstart'] as const;

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const stoppedByUserRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const play = () => {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };

    // Browsers block unmuted autoplay until the visitor interacts, so retry
    // on the first gesture unless they have switched the music off themselves.
    play();

    const onGesture = () => {
      if (stoppedByUserRef.current || !audio.paused) return;
      play();
    };

    GESTURES.forEach((event) => window.addEventListener(event, onGesture));
    return () => GESTURES.forEach((event) => window.removeEventListener(event, onGesture));
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      stoppedByUserRef.current = false;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      stoppedByUserRef.current = true;
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicTrack} loop preload="auto" />
      <div className="audio-dock">
        <button
          type="button"
          className="audio-toggle"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? 'இசையை நிறுத்து' : 'இசையை இயக்கு'}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
            {playing ? (
              <>
                <path d="M15.5 9.5a3.6 3.6 0 0 1 0 5" />
                <path d="M18.2 7a7.2 7.2 0 0 1 0 10" />
              </>
            ) : (
              <>
                <path d="m15.6 9.6 5 4.8" />
                <path d="m20.6 9.6-5 4.8" />
              </>
            )}
          </svg>
        </button>
      </div>
    </>
  );
}
