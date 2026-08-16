import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import Divider from "./Divider";
import { rsvp, couple } from "../data/weddingData";

export default function Rsvp() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", guests: "1", attending: "yes" });

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Hook this up to your backend / Google Form / email service.
    // For now we build a friendly mailto so responses reach you.
    const subject = encodeURIComponent(
      `RSVP — ${couple.partnerOne} & ${couple.partnerTwo}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nAttending: ${form.attending}\nGuests: ${form.guests}`
    );
    window.location.href = `mailto:rsvp@example.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-gradient-to-br from-peach/40 via-ivory to-blush/40 py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-rose/20 blur-3xl" />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <SectionReveal>
          <p className="font-script text-3xl text-rose">Will you join us?</p>
          <h2 className="section-title mt-1">RSVP</h2>
          <Divider className="mt-4" />
          <p className="mx-auto mt-4 max-w-md text-cocoa/75">{rsvp.message}</p>
        </SectionReveal>

        <SectionReveal delay={0.15} className="mt-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-3xl p-10 shadow-soft"
              >
                <div className="text-5xl animate-heartbeat">💛</div>
                <h3 className="mt-4 font-script text-3xl text-wine">Thank you!</h3>
                <p className="mt-2 text-cocoa/75">
                  Your response means the world to us. See you at the celebration!
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass space-y-5 rounded-3xl p-8 text-left shadow-soft"
              >
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-cocoa">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={update}
                    placeholder="e.g. Priya Sharma"
                    className="w-full rounded-xl border border-gold/40 bg-white/70 px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="attending" className="mb-1 block text-sm font-medium text-cocoa">
                      Attending?
                    </label>
                    <select
                      id="attending"
                      name="attending"
                      value={form.attending}
                      onChange={update}
                      className="w-full rounded-xl border border-gold/40 bg-white/70 px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40"
                    >
                      <option value="yes">Joyfully accepts 🎉</option>
                      <option value="no">Regretfully declines</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="guests" className="mb-1 block text-sm font-medium text-cocoa">
                      Number of Guests
                    </label>
                    <input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      max="10"
                      value={form.guests}
                      onChange={update}
                      className="w-full rounded-xl border border-gold/40 bg-white/70 px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-full bg-gradient-gold py-3.5 font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
                >
                  <span className="relative z-10">Send RSVP 💌</span>
                  <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-0" />
                </button>

                <p className="text-center text-xs text-cocoa/60">{rsvp.deadline}</p>
              </motion.form>
            )}
          </AnimatePresence>
        </SectionReveal>

        {/* Contacts */}
        <SectionReveal delay={0.25} className="mt-10">
          <p className="text-sm uppercase tracking-[0.25em] text-goldDark">Questions? Call us</p>
          <div className="mt-3 flex flex-wrap justify-center gap-6">
            {rsvp.contacts.map((c) => (
              <a
                key={c.name}
                href={`tel:${c.phone.replace(/\s/g, "")}`}
                className="font-serif text-lg text-wine transition-colors hover:text-goldDark"
              >
                {c.name}: <span className="text-cocoa/80">{c.phone}</span>
              </a>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
