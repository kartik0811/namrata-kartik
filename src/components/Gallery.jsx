import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import Divider from "./Divider";
import { gallery } from "../data/weddingData";

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="relative bg-ivory py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal className="text-center">
          <p className="font-script text-3xl text-rose">Captured moments</p>
          <h2 className="section-title mt-1">Our Gallery</h2>
          <Divider className="mt-4" />
        </SectionReveal>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((src, i) => (
            <SectionReveal key={src} delay={(i % 3) * 0.1}>
              <motion.button
                onClick={() => setActive(src)}
                whileHover={{ scale: 1.02 }}
                className="group relative block h-full w-full overflow-hidden rounded-2xl shadow-soft focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label={`View photo ${i + 1}`}
              >
                <img
                  src={src}
                  alt={`Wedding gallery ${i + 1}`}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110 md:h-64"
                />
                <span className="absolute inset-0 bg-wine/0 transition-colors duration-500 group-hover:bg-wine/20" />
                <span className="absolute inset-0 flex items-center justify-center text-2xl text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  🔍
                </span>
              </motion.button>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.img
              src={active}
              alt="Enlarged"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-2xl text-white hover:bg-white/30"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
