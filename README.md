# Ajay ❤️ Arpita — Our Story

A personal, interactive birthday website. Built with React, Vite, Tailwind CSS, and Framer Motion.

## What's inside

```
src/
 ├── components/
 │    ├── SongGate.jsx        "Press play" gate shown before anything else
 │    ├── Hero.jsx            Opening cinematic sequence
 │    ├── Universe.jsx        5-destination navigation hub
 │    ├── Beginning.jsx       "Where It All Began" section
 │    ├── LongDistance.jsx    "More Than 4 Years Apart..." chapter
 │    ├── FirstMeeting.jsx    Meeting in Lucknow — "The Day Distance Lost"
 │    ├── FirstKiss.jsx       A private, tasteful memory card
 │    ├── Timeline.jsx        "Our Journey" — animated timeline
 │    ├── MemoryGalaxy.jsx    Floating-constellation photo gallery + lightbox
 │    ├── LoveLetters.jsx     Five open-able envelopes
 │    ├── Shayari.jsx         Original short Hinglish poetry
 │    ├── OurSong.jsx         "This Song Reminds Me of Us"
 │    ├── HeartGame.jsx       "Catch My Hearts" mini game (ducks the music)
 │    ├── TimeTogether.jsx    Live years/months/days counter
 │    ├── BirthdayLock.jsx    Locked chapter that gates BirthdayReveal
 │    ├── BirthdayReveal.jsx  Countdown + birthday-day reveal
 │    ├── FinalLetter.jsx     The closing letter
 │    ├── SecretReveal.jsx    Password-locked final surprise
 │    ├── MusicToggle.jsx     Floating player (play/pause, seek, volume)
 │    ├── PhotoFrame.jsx      Image w/ graceful placeholder
 │    ├── StarField.jsx       Ambient star background
 │    └── FloatingHearts.jsx  Ambient floating hearts
 ├── context/
 │    └── MusicContext.jsx    Shared audio player state (used by several components)
 ├── data/
 │    ├── config.js           Names, dates, and all editable section copy
 │    ├── memories.js         Timeline entries
 │    ├── gallery.js          Gallery categories
 │    ├── letters.js          The five letters
 │    └── shayari.js          The five short poems
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

**A note on the birthday lock:** `src/components/BirthdayLock.jsx` has a `devOverrideEnabled` flag at the top. While it's `true`, tapping the lock icon 5 times quickly previews the birthday reveal early, for testing. Set it to `false` before sending the final link if you'd rather that shortcut not exist.

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

1. Drop an MP3 file into `public/music/` and name it `our-song.mp3` (or change the default in `src/context/MusicContext.jsx`).
2. On first visit, a "Play Our Song" screen appears — tapping it starts the music (browsers require a tap before audio can play). "Continue without music" skips it.
3. A small floating player (bottom-right) lets you play/pause, scrub, and adjust volume anywhere on the site. It automatically lowers the volume during the "Catch My Hearts" game and restores it after.

## 5. Canva visual assets (optional)

Two starting designs were generated in Canva for this site — a birthday card and a cinematic title graphic. Open them, tweak the wording/colors if you like, then export as JPG:

- **Title graphic** → export and save as `public/images/hero-title.jpg`. The Hero section will automatically use it as a soft background.
- **Birthday card** → export and save wherever you'd like to keep it (e.g. share it separately as a printable card, or drop it into the gallery).

You can make more of these anytime by asking Claude to generate additional Canva designs for envelopes, timeline decorations, or a QR-code card.

## 6. The secret answer

The final locked section asks "When did our story began?" and expects the digits `16062019` (day-month-year of `storyStartDate`). If you change the story start date, update `secretAnswer` in `src/data/config.js` to match.

## 7. Build for production

```bash
npm run build
```

This creates an optimized `dist/` folder ready to deploy.

Preview the production build locally before deploying:
```bash
npm run preview
```

## 8. Deploy it (so you can send her a link)

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
