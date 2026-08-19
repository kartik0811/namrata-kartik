import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
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
  const allRevealed = revealedCards === 3;
  
  const handleCardRevealed = () => {
    setRevealedCards((prev) => Math.min(prev + 1, 3));
  };
  
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-1 py-24 sm:py-28"
    >
      <Confetti triggered={allRevealed} />
      {/* Static backdrop keeps scrolling on low-power mobile devices smooth. */}
      <div className="absolute inset-0 -z-10 scale-110 bg-gradient-romance">
        <div
          className="absolute inset-0 bg-[length:70%_auto] bg-[center_44%] bg-no-repeat opacity-40 brightness-110 saturate-110 sm:blur-[2px]"
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
          className="font-serif tracking-[0.5em] text-goldDark uppercase text-xs md:text-sm"
        >
          Together with their families
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-6 font-script text-[clamp(3.25rem,13vw,6rem)] leading-tight text-wine md:text-8xl"
        >
          {couple.partnerOne}
          <span className="mx-3 inline-block animate-heartbeat text-rose">&amp;</span>
          {couple.partnerTwo}
        </motion.h1>

        <motion.div variants={item} className="my-6 flex items-center justify-center gap-4">
          <span className="h-px w-14 bg-gold/60" />
          <h2 className="font-serif text-xl uppercase tracking-[0.35em] text-cocoa/80 md:text-2xl">
            Save the Date
          </h2>
          <span className="h-px w-14 bg-gold/60" />
        </motion.div>

        <motion.div variants={item} className="mt-10">
          <p className="mb-4 font-serif text-sm text-cocoa/70">
            Scratch the golden cards to reveal our date ✨
          </p>
          <div className="flex flex-wrap items-start justify-center gap-[clamp(0.5rem,3vw,1rem)]">
            <ScratchCard label="Day" value={weddingDateParts.day} threshold={0.12} onRevealed={handleCardRevealed} />
            <ScratchCard label="Month" value={weddingDateParts.month} threshold={0.12} onRevealed={handleCardRevealed} />
            <ScratchCard label="Year" value={weddingDateParts.year} threshold={0.12} onRevealed={handleCardRevealed} />
          </div>
        </motion.div>

      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#countdown"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-goldDark"
        animate={reduce ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <span className="text-2xl">⌄</span>
      </motion.a>
    </section>
  );
}
