import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import Divider from "./Divider";
import { story } from "../data/weddingData";

export default function OurStory() {
  return (
    <section id="story" className="relative bg-ivory py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal className="text-center">
          <p className="font-script text-3xl text-rose">{story.kicker}</p>
          <h2 className="section-title mt-1">{story.title}</h2>
          <Divider className="mt-4" />
        </SectionReveal>

        <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
          {/* Photos */}
          <SectionReveal className="relative h-[420px]">
            <motion.img
              src={story.photoOne}
              alt="The couple"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6 }}
              className="absolute left-0 top-0 h-64 w-52 rounded-2xl object-cover shadow-soft md:h-72 md:w-60"
            />
            <motion.img
              src={story.photoTwo}
              alt="The couple"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-0 right-0 h-64 w-52 rounded-2xl object-cover shadow-soft ring-4 ring-white md:h-72 md:w-60"
            />
            <div className="absolute left-1/2 top-1/2 -z-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush/60 blur-2xl" />
          </SectionReveal>

          {/* Text */}
          <div>
            {story.paragraphs.map((p, i) => (
              <SectionReveal
                key={i}
                delay={i * 0.15}
                as={motion.p}
                className="mb-5 font-serif text-lg leading-relaxed text-cocoa/85 md:text-xl"
              >
                {p}
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
