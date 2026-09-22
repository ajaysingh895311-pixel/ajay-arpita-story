# Ajay ❤️ Arpita — Our Story

A personal, interactive birthday website. Built with React, Vite, Tailwind CSS, and Framer Motion.

## What's inside

```
src/
 ├── components/
 │    ├── Hero.jsx            Opening cinematic sequence
 │    ├── Beginning.jsx       "Where It All Began" section
 │    ├── Timeline.jsx        "Our Journey" — animated timeline
 │    ├── Memories.jsx        Photo gallery with lightbox
 │    ├── LoveLetters.jsx     Five open-able envelopes
 │    ├── HeartGame.jsx       "Catch My Hearts" mini game
 │    ├── TimeTogether.jsx    Live years/months/days counter
 │    ├── BirthdayReveal.jsx  Countdown + birthday-day reveal
 │    ├── FinalLetter.jsx     The closing letter
 │    ├── SecretReveal.jsx    Password-locked final surprise
 │    ├── MusicToggle.jsx     Optional background music button
 │    ├── PhotoFrame.jsx      Image w/ graceful placeholder
 │    ├── StarField.jsx       Ambient star background
 │    └── FloatingHearts.jsx  Ambient floating hearts
 ├── data/
 │    ├── config.js           Names, key dates, secret answer
 │    ├── memories.js         Timeline entries
 │    ├── gallery.js          Gallery categories
 │    └── letters.js          The five letters
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

All the content you'll want to personalize lives in `src/data/` — you shouldn't need to touch component code at all.

## 1. Run it locally

You'll need [Node.js](https://nodejs.org) (18 or newer) installed.

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`) in your browser. Changes you make to files save and reload automatically.

## 2. Personalize the content

**Names and key dates** — `src/data/config.js`
```js
export const names = { him: 'Ajay', her: 'Arpita' }
export const storyStartDate = '2019-06-16T00:00:00'
export const herBirthday = '10-02' // MM-DD, repeats every year
```

**Timeline** — `src/data/memories.js`. Add, remove, or reorder entries freely:
```js
{
  date: '20 July 2019',
  title: 'First Trip',
  description: 'Write what happened here...',
  image: '/images/first-trip.jpg', // or null for a placeholder
}
```

**Gallery** — `src/data/gallery.js`. Set `image` on each category once you have a photo.

**Letters** — `src/data/letters.js`. Keep titles short (they're what shows on the closed envelope); write the message in `message`.

**The final letter** — edit the text directly inside `src/components/FinalLetter.jsx`.

## 3. Add your photos

1. Put image files in `public/images/` (e.g. `public/images/first-photo.jpg`).
2. Reference them from `src/data/memories.js` or `src/data/gallery.js` as `/images/first-photo.jpg`.
3. Leave `image: null` anywhere you don't have a photo yet — a tasteful placeholder shows instead, so nothing looks broken.

Square-ish, well-lit photos work best for the gallery grid. The timeline photos use a wider frame.

## 4. Add music

1. Drop an MP3 file into `public/music/` and name it `song.mp3` (or update the path in `src/components/MusicToggle.jsx`).
2. That's it — the 🔇/🔊 button in the bottom-right corner will control it. It starts off, since browsers block autoplaying audio.

## 5. The secret answer

The final locked section asks "When did our story began?" and expects the digits `16062019` (day-month-year of `storyStartDate`). If you change the story start date, update `secretAnswer` in `src/data/config.js` to match.

## 6. Build for production

```bash
npm run build
```

This creates an optimized `dist/` folder ready to deploy.

Preview the production build locally before deploying:
```bash
npm run preview
```

## 7. Deploy it (so you can send her a link)

The easiest free options:

**Netlify Drop** — no account needed for a quick share:
1. Run `npm run build`.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag in the `dist/` folder.
3. You'll get a live link instantly.

**Vercel:**
1. Install the CLI: `npm i -g vercel`
2. Run `vercel` in the project folder and follow the prompts.

**GitHub Pages:**
1. Push this project to a GitHub repo.
2. In `vite.config.js`, add `base: '/your-repo-name/'` inside `defineConfig({...})`.
3. Run `npm run build`, then deploy the `dist/` folder using the `gh-pages` package or GitHub's Pages settings.

Once deployed, send the link — it'll look great opened from WhatsApp on her phone.

## Notes

- The site respects `prefers-reduced-motion` for anyone with that accessibility setting on.
- The birthday section automatically shows the countdown before 2 October and switches to the full reveal (with confetti) on the day itself — no manual toggle needed.
- The "Our Time Together" counter recalculates itself from `storyStartDate`, so it'll always be accurate whenever she opens the site.
