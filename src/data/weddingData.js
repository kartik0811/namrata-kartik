// ─────────────────────────────────────────────────────────────
//  💍  WEDDING DETAILS — EDIT EVERYTHING HERE
//  This is the ONLY file you need to touch to customise the site.
// ─────────────────────────────────────────────────────────────

export const couple = {
  // TODO: Replace with your names
  partnerOne: "Namrata",
  partnerTwo: "Kartik",
  monogram: "N & K", // used in navbar + footer
  hashtag: "#NamrataWedsKartik",
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
  date: "31st January 2027",
  time: "6:00 PM onwards",
  venue: "The Royal Palace",
  address: "Amber Fort Road, Jaipur, Rajasthan 302001",
  dressCode: "Indian Festive / Formal",
  // A Google Maps search link — replace with your exact venue link.
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Amber+Fort+Jaipur",
};

// TODO: Update the celebration timeline / itinerary.
export const timeline = [
  {
    icon: "🌿",
    title: "Mehendi",
    date: "30 January 2027",
    time: "11:00 AM",
    description: "Intricate henna, music and colour to open the celebrations.",
  },
  {
    icon: "🎶",
    title: "Sangeet & Ring Ceremony",
    date: "30 January 2027",
    time: "7:00 PM",
    description: "An evening of dance, dazzle and the exchange of rings.",
  },
  {
    icon: "🔥",
    title: "Wedding Ceremony",
    date: "31 January 2027",
    time: "6:00 PM",
    description: "The sacred vows, taken hand in hand around the holy fire.",
  },
  {
    icon: "🥂",
    title: "Reception",
    date: "31 January 2027",
    time: "9:00 PM",
    description: "A grand celebration with dinner, toasts and dancing.",
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
  // Where the RSVP form / button should point. Could be a Google Form, mailto, etc.
  rsvpUrl: "mailto:rsvp@example.com?subject=RSVP%20—%20Namrata%20%26%20Kartik",
  deadline: "Please RSVP by 1st January 2027",
  contacts: [
    { name: "Namrata", phone: "+91 91234 56780" },
    { name: "Kartik", phone: "+91 98765 43210" },
  ],
};

// Soft flute background music. It starts automatically when the guest opens
// the curtain (a user tap, so browser autoplay policies are satisfied).
// TODO: Drop your own soft flute track at public/blue.mp3 (this path is
// served from the site root). To use a hosted file instead, paste its URL here.
export const musicSrc = "/blue.mp3";

// TODO: Optional social / contact links shown in the footer.
export const socials = [
  { label: "Email", href: "mailto:hello@example.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "WhatsApp", href: "https://wa.me/919876543210" },
];
