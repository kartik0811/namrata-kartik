# 💍 Kartik & Namrata — Save the Date

A modern, cinematic, highly-animated wedding **Save the Date** website, inspired by
[`amitgupta101010/kartik-wedding-invitation`](https://github.com/amitgupta101010/kartik-wedding-invitation)
but rebuilt as a polished, component-based single-page app.

Built with **React + Vite + Tailwind CSS + Framer Motion**.

## ✨ Features

- Cinematic curtain **intro animation** on first load
- Parallax hero with staggered text entrance + shimmering gold typography
- Gently falling **petals / sparkles** across the page
- Live **animated countdown** with flipping counters
- Reveal-on-scroll for every section
- Animated **wedding timeline** / itinerary
- Gallery with hover zoom + **lightbox**
- **RSVP** form (mailto-based; hook up your own backend)
- **Add to Calendar** (.ics) + Open Map buttons
- Floating **music toggle**, scroll-progress bar, smooth navigation
- Fully **responsive** and **accessible** (keyboard-friendly, `prefers-reduced-motion` support)

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## 🎨 Customising

**Everything you need to edit lives in [`src/data/weddingData.js`](src/data/weddingData.js):**
couple names, date, venue, timeline, gallery images, RSVP details, music track and socials.
Each field is marked with a `TODO` comment.

- **Photos:** drop images into `/public` and reference them as `/your-photo.jpg`,
  or update the Unsplash placeholder URLs.
- **Colours:** tweak the palette in [`tailwind.config.js`](tailwind.config.js).
- **Music:** set `musicSrc` in the data file to a local `/track.mp3`.

## 🌐 Deploying to GitHub Pages

1. In [`vite.config.js`](vite.config.js), set `base` to `"/<your-repo-name>/"`.
2. Run `npm run build` and publish the `/dist` folder.

---

Made with 💛
