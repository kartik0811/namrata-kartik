import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Sparkle confetti triggered once all scratch cards are revealed. The count
 * scales down on touch devices so the animation remains smooth on iPhones.
 */
export default function Confetti({ triggered = false }) {
  const reduce = useReducedMotion();
  const confetti = useMemo(() => {
    if (!triggered || reduce) return [];

    const isPhone = window.matchMedia("(max-width: 640px)").matches;
    const isTablet = window.matchMedia("(max-width: 1024px)").matches;
    const lowPowerDevice = (navigator.hardwareConcurrency || 4) <= 4;
    const count = isPhone ? (lowPowerDevice ? 8 : 12) : isTablet ? 24 : 40;

    return Array.from({ length: count }).map((_, id) => ({
      id,
      left: Math.random() * 100,
      size: 15 + Math.random() * 13,
      duration: 2.6 + Math.random() * 1.2,
      delay: Math.random() * 0.3,
      drift: (Math.random() - 0.5) * 180,
      rotation: Math.random() * 540,
      opacity: 0.75 + Math.random() * 0.25,
    }));
  }, [reduce, triggered]);

  if (!triggered || confetti.length === 0) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[40] overflow-hidden">
      {confetti.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute top-0 select-none"
          initial={{
            left: `${particle.left}%`,
            opacity: particle.opacity,
            rotate: 0,
          }}
          animate={{
            opacity: 0,
            rotate: particle.rotation,
            y: "110vh",
            x: particle.drift,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeIn",
          }}
          style={{ fontSize: `${particle.size}px` }}
        >
          ✨
        </motion.span>
      ))}
    </div>
  );
}
