import { motion, useReducedMotion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import Divider from "./Divider";
import { timeline } from "../data/weddingData";

export default function Timeline() {
  const reduce = useReducedMotion();

  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-gradient-to-b from-lavender/30 via-ivory to-peach/40 py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <SectionReveal className="text-center">
          <p className="font-script text-3xl text-rose">The festivities</p>
          <h2 className="section-title mt-1">Wedding Timeline</h2>
          <Divider className="mt-4" />
        </SectionReveal>

        <div className="relative mt-16">
          {/* Central animated line */}
          <motion.span
            aria-hidden="true"
            className="absolute left-4 top-0 h-full w-[3px] origin-top bg-gradient-to-b from-rose via-gold to-lavender md:left-1/2 md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />

          <ul className="space-y-12">
            {timeline.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <li key={e.title} className="relative">
                  {/* Node */}
                  <motion.span
                    className="absolute left-4 top-6 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-gold text-sm shadow-glow md:left-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 260 }}
                  >
                    {e.icon}
                  </motion.span>

                  <motion.div
                    initial={{
                      opacity: 0,
                      x: reduce ? 0 : left ? -60 : 60,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.02 }}
                    className={`glass ml-12 rounded-2xl p-6 shadow-soft md:ml-0 md:w-[45%] ${
                      left ? "md:mr-auto md:text-right" : "md:ml-auto"
                    }`}
                  >
                    <span className="font-sans text-xs uppercase tracking-[0.25em] text-goldDark">
                      {e.date} · {e.time}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl text-wine">{e.title}</h3>
                    <p className="mt-2 text-cocoa/75">{e.description}</p>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
