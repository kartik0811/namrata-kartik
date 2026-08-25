import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { couple } from "../data/weddingData";
import logo from "../assets/nk_black-clean.png";
// 1. Import your Ganesha icon/image here (a PNG with a transparent background or an SVG)
import ganeshIcon from "../assets/ganesh.png"; 

const links = [
  { label: "Countdown", href: "#countdown" },
  { label: "Details", href: "#details" },
  { label: "Timeline", href: "#timeline" },
  { label: "RSVP", href: "#rsvp" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 3, duration: 0.8 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-soft py-2" : "bg-transparent py-4"
      }`}
    >
      {/* 2. Added 'relative' to the <nav> so the absolute positioned Ganesha stays inside it */}
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-5">
        <a
          href="#top"
          className="block h-11 w-[clamp(5.5rem,22vw,7rem)] md:h-12"
          aria-label="Back to top"
        >
          <span
            role="img"
            aria-label={`${couple.partnerOne} and ${couple.partnerTwo} monogram`}
            className="block h-full w-full bg-cocoa/80 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
            style={{
              maskImage: `url(${logo})`,
              WebkitMaskImage: `url(${logo})`,
            }}
          />
        </a>

        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            role="img"
            aria-label="Lord Ganesha"
            className="block h-8 w-8 bg-cocoa/80 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] md:h-10 md:w-10"
            style={{
              maskImage: `url(${ganeshIcon})`,
              WebkitMaskImage: `url(${ganeshIcon})`,
            }}
          />
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative font-sans text-sm font-medium text-cocoa/80 transition-colors hover:text-wine"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-wine md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="text-2xl">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass mx-4 mt-2 overflow-hidden rounded-2xl md:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 font-sans text-cocoa/80 transition-colors hover:bg-white/40 hover:text-wine"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
