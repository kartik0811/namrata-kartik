# 💍 Namrata & Kartik — Save the Date

A modern, cinematic, single-page wedding invitation for Namrata and Kartik.

Built with **React + Vite + Tailwind CSS + Framer Motion**.

## ✨ Features

- Cinematic curtain **intro animation** on first load
- Responsive hero with a portrait photo that fills phone screens while retaining
  its balanced composition on larger displays
- Interactive **scratch cards** that reveal the wedding date, followed by a
  lightweight confetti celebration
- Live **animated countdown** with flipping counters
- Reveal-on-scroll for every section
- Animated **wedding timeline** / itinerary
- Event-details section with a responsive venue video
- **RSVP** form that emails submissions through FormSubmit
- Google Calendar and map links for the venue
- Floating **music toggle**, scroll-progress bar, smooth navigation
- Custom champagne NK browser-tab favicon
- Fully **responsive** and **accessible** (keyboard-friendly, `prefers-reduced-motion` support)

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## 🎨 Customising

Most invitation content lives in [`src/data/weddingData.js`](src/data/weddingData.js):
the couple's names, wedding date, venue, timeline, RSVP endpoint, and music track.

- **Hero photo:** replace [`dp.jpg`](dp.jpg) to update the hero background.
- **Venue video:** replace [`venue.mp4`](venue.mp4) to update the Event Details video.
- **Logo and favicon:** NK logo assets are in [`src/assets`](src/assets), and the
  favicon is defined in [`public/nk-favicon.svg`](public/nk-favicon.svg).
- **Colours:** tweak the palette in [`tailwind.config.js`](tailwind.config.js).
- **Music:** set `musicSrc` in the data file to a local `/track.mp3`.
- **RSVP email:** update `submissionEndpoint` in the data file. FormSubmit
  requires the recipient to confirm the first submission before delivery starts.

## 🌐 Deploying to GitHub Pages

1. In [`vite.config.js`](vite.config.js), set `base` to `"/<your-repo-name>/"`.
2. Run `npm run build` and publish the `/dist` folder.
