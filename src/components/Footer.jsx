import { motion } from "framer-motion";
import { couple, weddingDateLong, socials, eventDetails } from "../data/weddingData";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-wine text-champagne">
      {/* Soft glow accents */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-rose/20 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6 py-16 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold/60 font-script text-3xl text-shimmer shadow-glow"
        >
          {couple.monogram}
        </motion.div>

        <h3 className="mt-6 font-script text-4xl text-champagne">
          {couple.partnerOne} &amp; {couple.partnerTwo}
        </h3>
        <p className="mt-2 font-serif tracking-[0.3em] text-champagne/70 uppercase text-sm">
          {weddingDateLong}
        </p>
        <p className="mt-1 text-champagne/60">{eventDetails.venue}, Jaipur</p>

        <p className="mx-auto mt-8 max-w-md font-serif text-lg italic text-champagne/85">
          "And so the adventure begins. Thank you for being part of our story —
          we can't wait to celebrate with you."
        </p>

        {socials?.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-[0.2em] text-champagne/70 transition-colors hover:text-gold"
              >
                {s.label}
              </a>
            ))}
          </div>
        )}

        <p className="mt-10 font-script text-2xl text-shimmer">{couple.hashtag}</p>
        <p className="mt-4 text-xs text-champagne/50">
          Made with 💛 · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
