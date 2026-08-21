import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Sparkle confetti triggered once all scratch cards are revealed. Emoji glyphs
 * scale to the available device headroom so phones remain smooth.
 */
export default function Confetti({ triggered = false }) {
  const reduce = useReducedMotion();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!triggered) setCompleted(false);
  }, [triggered]);

  const confetti = useMemo(() => {
    if (!triggered || reduce) return [];

    const isPhone = window.matchMedia("(max-width: 640px)").matches;
    const isTablet = window.matchMedia("(max-width: 1024px)").matches;
    const deviceMemory = navigator.deviceMemory || 4;
    const lowPowerDevice = (navigator.hardwareConcurrency || 4) <= 4 || deviceMemory <= 4;
    // Emoji glyphs cost more to render than simple shapes. The CSS-only motion
    // and brief stagger let us use a fuller burst without a frame-time spike.
    const count = isPhone
      ? lowPowerDevice
        ? 13
        : 16
      : isTablet
        ? lowPowerDevice
          ? 20
          : 28
        : lowPowerDevice
          ? 32
          : 44;

    const particles = Array.from({ length: count }).map((_, id) => {
      const duration = 4.4 + Math.random() * 1.6;
      const delay = Math.random() * (isPhone ? 0.75 : 0.3);

      return {
        id,
        left: Math.random() * 100,
        size: (isPhone ? 14 : 16) + Math.random() * (isPhone ? 5 : 7),
        duration,
        delay,
        drift: (Math.random() - 0.5) * 180,
        rotation: Math.random() * 540,
        opacity: 0.75 + Math.random() * 0.25,
        finishAt: duration + delay,
      };
    });
    const latestFinish = Math.max(...particles.map((particle) => particle.finishAt));

    return particles.map((particle) => ({
      ...particle,
      finishesLast: particle.finishAt === latestFinish,
    }));
  }, [reduce, triggered]);

  if (!triggered || completed || confetti.length === 0) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[40] overflow-hidden">
      {confetti.map((particle) => (
        <span
          key={particle.id}
          className="confetti-sparkle"
          onAnimationEnd={particle.finishesLast ? () => setCompleted(true) : undefined}
          style={{
            "--confetti-left": `${particle.left}%`,
            "--confetti-size": `${particle.size}px`,
            "--confetti-duration": `${particle.duration}s`,
            "--confetti-delay": `${particle.delay}s`,
            "--confetti-drift": `${particle.drift}px`,
            "--confetti-rotation": `${particle.rotation}deg`,
            "--confetti-opacity": particle.opacity,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
}
