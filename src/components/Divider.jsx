import { motion } from "framer-motion";

/**
 * An ornamental floral / gold divider used between sections.
 */
export default function Divider({ className = "" }) {
  return (
    <motion.div
      className={`flex items-center justify-center gap-3 py-2 ${className}`}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
      <span className="text-gold text-xl animate-float">❧</span>
      <span className="text-rose text-2xl">✿</span>
      <span className="text-gold text-xl animate-float">❦</span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
    </motion.div>
  );
}
