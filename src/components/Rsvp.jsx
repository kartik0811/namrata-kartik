import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import Divider from "./Divider";
import { rsvp, couple } from "../data/weddingData";

export default function Rsvp() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", guests: "1", attending: "yes" });

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Bots that fill the hidden honeypot receive the same response, without
    // triggering an email notification.
    if (formData.get("_honey")) {
      setSent(true);
      return;
    }

    const guestName = form.name.trim();
    const nameLetters = [...guestName].filter((character) => /\p{L}/u.test(character));
    if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(guestName) || nameLetters.length < 2) {
      setError("Please enter a name using at least two letters.");
      return;
    }

    const guestCount = Number(form.guests);
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 10) {
      setError("Please enter a whole number of guests between 1 and 10.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(rsvp.submissionEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New RSVP — ${couple.partnerOne} & ${couple.partnerTwo}`,
          _template: "table",
          Name: guestName,
          Attending: form.attending === "yes" ? "Joyfully accepts" : "Regretfully declines",
          "Number of guests": guestCount,
        }),
      });

      const result = await response.json();
      if (!response.ok || result.success === false || result.success === "false") {
        throw new Error("Unable to send RSVP");
      }
      setSent(true);
    } catch {
      setError("We couldn't send your RSVP. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
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
                className="rounded-3xl border border-gold/25 bg-wine p-10 shadow-soft"
              >
                <div className="text-5xl animate-heartbeat">💛</div>
                <h3 className="mt-4 font-script text-3xl text-champagne">Thank you!</h3>
                <p className="mt-2 text-champagne/90">
                  Your response means the world to us. See you at the celebration!
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-5 rounded-3xl border border-gold/25 bg-wine p-8 text-left shadow-soft"
              >
                <input
                  type="text"
                  name="_honey"
                  tabIndex="-1"
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-champagne">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={update}

                    className="w-full rounded-xl border border-gold/40 bg-ivory px-4 py-3 text-cocoa outline-none transition placeholder:text-cocoa/55 focus:border-gold focus:ring-2 focus:ring-gold/40"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="attending" className="mb-1 block text-sm font-medium text-champagne">
                      Attending?
                    </label>
                    <select
                      id="attending"
                      name="attending"
                      value={form.attending}
                      onChange={update}
                      className="w-full rounded-xl border border-gold/40 bg-ivory px-4 py-3 text-cocoa outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40"
                    >
                      <option value="yes">Joyfully accepts 🎉</option>
                      <option value="no">Regretfully declines</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="guests" className="mb-1 block text-sm font-medium text-champagne">
                      Number of Guests
                    </label>
                    <input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      max="10"
                      step="1"
                      required
                      value={form.guests}
                      onChange={update}
                      className="w-full rounded-xl border border-gold/40 bg-ivory px-4 py-3 text-cocoa outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative w-full overflow-hidden rounded-full bg-champagne py-3.5 font-medium text-wine shadow-glow transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                >
                  <span className="relative z-10">{submitting ? "Sending RSVP…" : "Send RSVP 💌"}</span>
                  <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-0" />
                </button>

                {error && <p role="alert" className="text-center text-sm text-champagne">{error}</p>}
              </motion.form>
            )}
          </AnimatePresence>
        </SectionReveal>

      </div>
    </section>
  );
}
