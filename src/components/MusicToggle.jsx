import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { musicSrc } from "../data/weddingData";

/**
 * A floating, animated music toggle. Audio starts muted/paused (browsers
 * block autoplay) and the guest can choose to play the romantic track.
 */
export default function MusicToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    audio.loop = true;

    // The curtain intro dispatches this within a user tap, so autoplay is
    // allowed. If the browser still blocks it, the toggle stays available.
    const startFromCurtain = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };
    window.addEventListener("wedding:play-music", startFromCurtain);
    return () => window.removeEventListener("wedding:play-music", startFromCurtain);
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      // Autoplay/permission may be blocked — silently ignore.
      setPlaying(false);
    }
  };

  return (
    <>
      {/* TODO: swap musicSrc in weddingData.js for your own track */}
      <audio ref={audioRef} src={musicSrc} preload="none" />

      <motion.button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.4, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold text-white shadow-glow"
      >
        <span className={playing ? "animate-spinSlow text-xl" : "text-xl"}>
          {playing ? "♫" : "♪"}
        </span>
      </motion.button>
    </>
  );
}
