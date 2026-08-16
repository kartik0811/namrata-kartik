import { motion, useReducedMotion } from "framer-motion";

/**
 * Wraps content and reveals it with a smooth fade + slide once it scrolls
 * into view. Respects the user's reduced-motion preference.
 */
export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  as: Tag = motion.div,
}) {
  const reduce = useReducedMotion();

  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
