import { useCallback, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { couple } from "../data/weddingData";

// Rich theatrical red velvet with vertical folds + inner shadow depth.
const velvet = {
  backgroundColor: "#8e0f18",
  backgroundImage:
    "repeating-linear-gradient(90deg, rgba(0,0,0,0.38) 0px, rgba(0,0,0,0) 26px, rgba(255,255,255,0.09) 52px, rgba(0,0,0,0) 78px, rgba(0,0,0,0.38) 104px)",
  boxShadow: "inset 0 0 140px rgba(0,0,0,0.65)",
};

/**
 * A full-screen red curtain shown on first load. Tapping (or pressing
 * Enter/Space) parts the curtains to reveal the site — and, because that tap
 * is a user gesture, it also kicks off the background music.
 */
export default function IntroOverlay({ onFinish }) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  // Trigger music playback when curtains are lifted
  useEffect(() => {
    if (opening) {
      window.dispatchEvent(new Event("wedding:play-music"));
    }
  }, [opening]);

  const open = useCallback(() => {
    setOpening((prev) => {
      if (prev) return prev;
      return true;
    });
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  const curtainDuration = reduce ? 0.01 : 2.0;

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{
        delay: opening ? curtainDuration + 0.2 : 0,
        duration: 0.6,
        ease: "easeInOut",
      }}
      onAnimationComplete={() => {
        if (opening) onFinish();
      }}
      style={{ pointerEvents: opening ? "none" : "auto" }}
      onClick={open}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Tap to open the wedding invitation"
    >
      {/* Left curtain - opens first */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 origin-left"
        style={velvet}
        initial={{ x: 0 }}
        animate={{ x: opening ? "-100%" : 0 }}
        transition={{ duration: curtainDuration, ease: [0.25, 0.46, 0.45, 0.94], delay: opening ? 0 : 0 }}
      />
      {/* Right curtain - slight delay for flowing effect */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 origin-right"
        style={velvet}
        initial={{ x: 0 }}
        animate={{ x: opening ? "100%" : 0 }}
        transition={{ duration: curtainDuration, ease: [0.25, 0.46, 0.45, 0.94], delay: opening ? 0.08 : 0 }}
      />

      {/* Gold parting seam glow - enhanced */}
      <motion.div
        className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-gold to-transparent"
        animate={{ opacity: opening ? 0 : [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: opening ? 0 : Infinity }}
      />

      {/* Center hint */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="animate-heartbeat text-6xl md:text-7xl">💛</div>
        <h1 className="mt-4 font-script text-5xl text-champagne drop-shadow-lg md:text-7xl">
          {couple.partnerOne} &amp; {couple.partnerTwo}
        </h1>
        <p className="mt-3 font-serif text-xs uppercase tracking-[0.4em] text-champagne/80 md:text-sm">
          Save the Date
        </p>
        <motion.p
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-champagne/40 px-5 py-2 text-sm text-champagne/90"
          animate={reduce ? {} : { scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✦ Tap anywhere to open ✦
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
