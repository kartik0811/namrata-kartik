import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import Divider from "./Divider";
import { weddingDate } from "../data/weddingData";

function getRemaining(target) {
  const distance = target - Date.now();
  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    done: false,
  };
}

function Counter({ value, label }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="glass flex min-w-[84px] flex-col items-center rounded-2xl px-4 py-5 shadow-soft md:min-w-[120px] md:px-6">
      <div className="relative h-12 overflow-hidden md:h-16">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="block font-serif text-4xl font-semibold text-shimmer md:text-6xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-cocoa/70 md:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const target = new Date(weddingDate).getTime();
  const [time, setTime] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <section
      id="countdown"
      className="relative overflow-hidden bg-gradient-to-br from-blush/40 via-ivory to-lavender/40 py-24"
    >
      {/* Decorative floating orbs */}
      <div className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-rose/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-52 w-52 rounded-full bg-gold/20 blur-3xl animate-float" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <SectionReveal>
          <p className="font-script text-3xl text-rose">Counting down</p>
          <h2 className="section-title mt-1">Until We Say "I Do"</h2>
          <Divider className="mt-4" />
        </SectionReveal>

        <SectionReveal delay={0.2} className="mt-12">
          {time.done ? (
            <p className="font-script text-4xl text-wine">
              The big day is here — let's celebrate! 🎉
            </p>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
              <Counter value={time.days} label="Days" />
              <Counter value={time.hours} label="Hours" />
              <Counter value={time.minutes} label="Minutes" />
              <Counter value={time.seconds} label="Seconds" />
            </div>
          )}
        </SectionReveal>
      </div>
    </section>
  );
}
