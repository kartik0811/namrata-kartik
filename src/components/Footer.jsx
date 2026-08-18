import { motion } from "framer-motion";
import { couple, weddingDateLong, eventDetails } from "../data/weddingData";
import logo from "../assets/nk_transparent-clean.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-wine text-champagne">
      {/* Soft glow accents */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-rose/20 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6 py-16 text-center">
        <motion.span
          role="img"
          aria-label={`${couple.partnerOne} and ${couple.partnerTwo} monogram`}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mx-auto block aspect-[2025/936] w-44 bg-champagne [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] md:w-52"
          style={{
            maskImage: `url(${logo})`,
            WebkitMaskImage: `url(${logo})`,
          }}
        />

        <h3 className="mt-6 font-script text-4xl text-champagne">
          {couple.partnerOne} &amp; {couple.partnerTwo}
        </h3>
        <p className="mt-2 font-serif tracking-[0.3em] text-champagne/70 uppercase text-sm">
          {weddingDateLong}
        </p>
        <p className="mt-1 text-champagne/60">{eventDetails.venue}, Kanpur</p>

        <p className="mx-auto mt-8 max-w-md font-serif text-lg italic text-champagne/85">
          "And so the adventure begins. Thank you for being part of our story —
          we can't wait to celebrate with you."
        </p>

        <p className="mt-10 font-script text-2xl text-shimmer">{couple.hashtag}</p>
      </div>
    </footer>
  );
}
