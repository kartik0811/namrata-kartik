// ─────────────────────────────────────────────────────────────
//  💍  WEDDING DETAILS — EDIT EVERYTHING HERE
//  This is the ONLY file you need to touch to customise the site.
// ─────────────────────────────────────────────────────────────

export const couple = {
  // TODO: Replace with your names
  partnerOne: "Namrata",
  partnerTwo: "Kartik",
  monogram: "N & K", // used in navbar + footer
  hashtag: "#KarNamaHoGaya",
};

// TODO: Replace with your wedding date & time (used by the live countdown).
// Format: "Month Day, Year HH:MM:SS"
export const weddingDate = "January 25, 2027 18:00:00";

// A short human-readable version shown in the hero.
export const weddingDatePretty = "25 · 01 · 2027";
export const weddingDateLong = "Monday, 25th January 2027";

// Individual parts revealed by the golden scratch cards in the hero.
// TODO: keep these in sync with your wedding date above.
export const weddingDateParts = {
  day: "25",
  month: "JAN",
  year: "2027",
};

// TODO: Replace with your romantic intro / story.
export const story = {
  title: "Our Story",
  kicker: "Where two hearts became one",
  paragraphs: [
    "It began with a chance meeting and a shared cup of chai — an ordinary evening that quietly turned into forever.",
    "Through laughter, long conversations and a thousand little adventures, we discovered that home was never a place, but a person.",
    "Now, surrounded by the people we love most, we can't wait to begin our happily-ever-after. And we'd be honoured to have you by our side.",
  ],
  // TODO: Drop your photos into /public and update these paths,
  // or leave the Unsplash placeholders while you customise.
  photoOne:
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
  photoTwo:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
};

// TODO: Update event / venue details.
export const eventDetails = {
  venue: "Blueworld Castles",
  address: "Mandhana – Bithoor Road, Kanpur, Uttar Pradesh",
  city: "Kanpur, Uttar Pradesh",
  mapUrl: "https://maps.app.goo.gl/bWFYM7CoVbSjhqLC8",
};

// TODO: Update the celebration timeline / itinerary.
export const timeline = [
  {
    icon: "🌼",
    title: "Haldi Carnival",
    date: "24th January 2027",
    description:
      "Bring on the sunshine, the vibrant colors, and a whole lot of madness! A day of haldi, happy hearts and loud laughs!",
  },
  {
    icon: "🎶",
    title: "Tilak, Ring Ceremony & Sangeet",
    date: "24th January 2027",
    description:
      "From a little tilak to the rings that make it official, followed by a night of music, moves and memories. Come dressed with your dancing shoes, and be ready to dance like nobody’s watching!",
  },
  {
    icon: "🔥",
    title: "Baraat & The Wedding Ceremony",
    date: "25th January 2027",
    description:
      "From the dhol beats and dancing in the baraat to the varmala and pheras — come celebrate as two hearts, two families and one beautiful story come together!",
  },
];

// TODO: Replace with your own gallery photos (local paths or URLs).
export const gallery = [
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
];

// TODO: Update RSVP + contact details.
export const rsvp = {
  message:
    "Your presence is the greatest gift. Kindly let us know if you'll be joining the celebration.",
  // FormSubmit relays each RSVP to this inbox. The recipient must confirm the
  // first submission once before emails are delivered.
  submissionEndpoint: "https://formsubmit.co/ajax/namratakartik25@gmail.com",
};

// Soft flute background music. It starts automatically when the guest opens
// the curtain (a user tap, so browser autoplay policies are satisfied).
// TODO: Drop your own soft flute track at public/blue.mp3. Vite prepends the
// correct base path for local, production, and GitHub Pages deployments.
// Respect Vite's deploy base (including GitHub Pages project sites).
export const musicSrc = `${import.meta.env.BASE_URL}blue.mp3`;
