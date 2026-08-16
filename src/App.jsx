import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import IntroOverlay from "./components/IntroOverlay";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OurStory from "./components/OurStory";
import Countdown from "./components/Countdown";
import EventDetails from "./components/EventDetails";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import Rsvp from "./components/Rsvp";
import Footer from "./components/Footer";
import MusicToggle from "./components/MusicToggle";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  // Slim gold progress bar tracking scroll position.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {!introDone && <IntroOverlay onFinish={() => setIntroDone(true)} />}

      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-gold"
      />

      <Navbar />
      <MusicToggle />

      <main>
        <Hero started={introDone} />
        <OurStory />
        <Countdown />
        <EventDetails />
        <Timeline />
        <Gallery />
        <Rsvp />
      </main>

      <Footer />
    </>
  );
}
