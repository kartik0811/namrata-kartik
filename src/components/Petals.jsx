import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Gently falling petals / sparkles drifting across the whole page.
 * Purely decorative and pointer-events-none. Hidden for reduced motion.
 */
export default function Petals({ count = 18 }) {
  const reduce = useReducedMotion();

  const petals = useMemo(() => {
    const glyphs = ["🌸", "🌺", "❀", "✿", "❁", "🍃"];
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
      size: 12 + Math.random() * 18,
      duration: 9 + Math.random() * 10,
      delay: Math.random() * 12,
      drift: (Math.random() - 0.5) * 120,
      opacity: 0.35 + Math.random() * 0.4,
    }));
  }, [count]);

  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal absolute top-[-8%] select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            "--drift": `${p.drift}px`,
          }}
        >
          {p.glyph}
        </span>
      ))}

      <style>{`
        @keyframes petal-fall {
          0%   { transform: translate(0, -10vh) rotate(0deg); }
          100% { transform: translate(var(--drift), 110vh) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
