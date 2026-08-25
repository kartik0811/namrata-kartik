import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { couple, weddingDateParts } from "../data/weddingData";
import ScratchCard from "./ScratchCard";
import Confetti from "./Confetti";
import dpImage from "../../dp.jpg";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ started = true }) {
  const reduce = useReducedMotion();
  const [revealedCards, setRevealedCards] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const allRevealed = revealedCards === 3;

  // Let the final card's reveal paint before mounting the confetti animation.
  // This avoids a burst of layout/compositing work in the same frame on phones.
  useEffect(() => {
    if (!allRevealed) return undefined;
    const timer = window.setTimeout(() => setShowConfetti(true), 120);
    return () => window.clearTimeout(timer);
  }, [allRevealed]);
  
  const handleCardRevealed = () => {
    setRevealedCards((prev) => Math.min(prev + 1, 3));
  };
  
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-1 py-24 sm:py-28"
    >
      <Confetti triggered={showConfetti} />
      {/* Static backdrop keeps scrolling on low-power mobile devices smooth. */}
      <div className="absolute inset-0 -z-10 scale-110 bg-gradient-romance">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 brightness-110 saturate-110 sm:bg-[length:70%_auto] sm:bg-[center_44%] sm:blur-[2px]"
          style={{ backgroundImage: `url(${dpImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/20 via-transparent to-blush/35" />
        {/* Soft radial glow */}
        <div className="absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-2xl sm:h-[70vh] sm:w-[70vh] sm:blur-3xl" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={started ? "show" : "hidden"}
        className="relative z-10 mx-auto w-full max-w-3xl px-4 text-center sm:px-6"
      >
        <motion.p
          variants={item}
          className="font-serif text-xl font-bold text-cocoa/80 md:text-2xl"
        >
          For the wedding celebrations of
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-6 font-script text-[clamp(3.25rem,13vw,6rem)] leading-tight text-wine md:text-8xl"
        >
          {couple.partnerOne}
          <span className="mx-5 inline-block animate-heartbeat text-[0.6em] text-wine md:mx-7">&amp;</span>
          {couple.partnerTwo}
        </motion.h1>

        <motion.div variants={item} className="mt-10">
          <p className="mb-5 font-serif text-lg font-medium text-cocoa/70 md:text-xl">
            Scratch the golden cards to reveal our date ✨
          </p>
          <div className="flex flex-wrap items-start justify-center gap-[clamp(0.5rem,3vw,1rem)]">
            <ScratchCard label="Day" value={weddingDateParts.day} threshold={0.12} onRevealed={handleCardRevealed} />
            <ScratchCard
              label="Month"
              value={weddingDateParts.month}
              threshold={0.12}
              onRevealed={handleCardRevealed}
            />
            <ScratchCard label="Year" value={weddingDateParts.year} threshold={0.12} onRevealed={handleCardRevealed} />
          </div>
        </motion.div>

      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-8">
        <motion.a
          href="#countdown"
          aria-label="Scroll down to the wedding countdown"
          className="block bg-[linear-gradient(135deg,#caa24a_0%,#f6e7ad_45%,#f6e7ad_55%,#b8860b_100%)] bg-clip-text text-5xl leading-none text-transparent drop-shadow-[0_0_10px_rgba(202,162,74,0.9)] transition hover:scale-125 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-gold"
          animate={reduce ? {} : { y: [0, 14, 0], scale: [1, 1.16, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
        >
          <span aria-hidden="true">⌄</span>
        </motion.a>
      </div>

      {/* Kaala Teeka for Nazar */}
      <div 
        className="absolute bottom-0 right-0 z-20 h-2 w-2 rounded-full bg-black/90"
        aria-hidden="true"
      />
    </section>
  );
}
