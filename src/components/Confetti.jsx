import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Confetti burst that animates down from the top when triggered.
 * Triggers only when all scratch cards are fully revealed.
 */
export default function Confetti({ triggered = false }) {
  const confetti = useMemo(() => {
    if (!triggered) return [];
    
    const shapes = ["\ud83c\udf89", "\ud83c\udf89", "\ud83c\udf89", "\ud83c\udf8a", "\u2728", "\ud83d\udcab", "\u2b50", "\ud83c\udf1f"];
    return Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: 14 + Math.random() * 24,
      duration: 2.5 + Math.random() * 1.5,
      delay: Math.random() * 0.3,
      drift: (Math.random() - 0.5) * 200,
      rotation: Math.random() * 720,
      opacity: 0.7 + Math.random() * 0.3,
    }));
  }, [triggered]);

  if (!triggered || confetti.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[40] overflow-hidden"
    >
      {confetti.map((c) => (
        <motion.span
          key={c.id}
          className="confetti absolute top-0 select-none"
          initial={{
            left: `${c.left}%`,
            opacity: c.opacity,
            rotate: 0,
          }}
          animate={{
            opacity: 0,
            rotate: c.rotation,
            y: window.innerHeight + 100,
            x: c.drift,
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            ease: "easeIn",
          }}
          style={{
            fontSize: `${c.size}px`,
          }}
        >
          {c.shape}
        </motion.span>
      ))}
    </div>
  );
}
