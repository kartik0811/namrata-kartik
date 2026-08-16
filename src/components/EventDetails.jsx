import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import Divider from "./Divider";
import { eventDetails, couple, weddingDate } from "../data/weddingData";

const cards = [
  { icon: "📅", label: "Date", value: eventDetails.date },
  { icon: "🕕", label: "Time", value: eventDetails.time },
  { icon: "💒", label: "Venue", value: eventDetails.venue },
  { icon: "👗", label: "Dress Code", value: eventDetails.dressCode },
];

/** Build an .ics file on the fly and trigger a download (Add to Calendar). */
function addToCalendar() {
  const start = new Date(weddingDate);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000); // 4h event
  const fmt = (d) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SaveTheDate//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@savethedate`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${couple.partnerOne} & ${couple.partnerTwo} — Wedding`,
    `LOCATION:${eventDetails.venue}, ${eventDetails.address}`,
    "DESCRIPTION:We can't wait to celebrate with you!",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "save-the-date.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export default function EventDetails() {
  return (
    <section id="details" className="relative bg-ivory py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal className="text-center">
          <p className="font-script text-3xl text-rose">Join the celebration</p>
          <h2 className="section-title mt-1">Event Details</h2>
          <Divider className="mt-4" />
        </SectionReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <SectionReveal key={c.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 30px 60px -25px rgba(122,59,70,0.35)" }}
                className="glass flex h-full flex-col items-center rounded-3xl p-8 text-center shadow-soft"
              >
                <span className="text-4xl animate-float">{c.icon}</span>
                <h3 className="mt-4 font-serif text-sm uppercase tracking-[0.25em] text-goldDark">
                  {c.label}
                </h3>
                <p className="mt-2 font-serif text-xl text-wine">{c.value}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        {/* Venue + address + actions */}
        <SectionReveal delay={0.2} className="mt-12">
          <div className="glass mx-auto max-w-2xl rounded-3xl p-8 text-center shadow-soft">
            <h3 className="font-serif text-2xl text-wine">{eventDetails.venue}</h3>
            <p className="mt-2 text-cocoa/75">{eventDetails.address}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href={eventDetails.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-gold px-7 py-3 font-medium text-white shadow-glow transition-transform hover:scale-105"
              >
                📍 Open Map
              </a>
              <button
                onClick={addToCalendar}
                className="rounded-full border border-gold/70 px-7 py-3 font-medium text-wine transition-all hover:bg-gold/10 hover:scale-105"
              >
                🗓️ Add to Calendar
              </button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
