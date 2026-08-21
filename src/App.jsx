import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import IntroOverlay from "./components/IntroOverlay";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MusicToggle from "./components/MusicToggle";

// These sections are below the first viewport. Loading them after the intro
// keeps the first animation responsive on mobile, especially on iOS.
const Countdown = lazy(() => import("./components/Countdown"));
const EventDetails = lazy(() => import("./components/EventDetails"));
const Timeline = lazy(() => import("./components/Timeline"));
const Rsvp = lazy(() => import("./components/Rsvp"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [introRevealing, setIntroRevealing] = useState(false);
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  // Slim gold progress bar tracking scroll position.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!introDone) return undefined;

    const showBelowFold = () => setBelowFoldReady(true);
    // Let the hero's first animation frames finish before parsing, rendering,
    // and preloading the parts of the invitation that are not yet visible.
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(showBelowFold, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(showBelowFold, 250);
    return () => window.clearTimeout(timer);
  }, [introDone]);

  return (
    <>
      {!introDone && (
        <IntroOverlay
          onReveal={() => setIntroRevealing(true)}
          onFinish={() => setIntroDone(true)}
        />
      )}

      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-gold"
      />

      <Navbar />
      <MusicToggle />

      <main>
        <Hero started={introRevealing} />
        {belowFoldReady && (
          <Suspense fallback={null}>
            <Countdown />
            <EventDetails />
            <Timeline />
            <Rsvp />
          </Suspense>
        )}
      </main>

      {belowFoldReady && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </>
  );
}
