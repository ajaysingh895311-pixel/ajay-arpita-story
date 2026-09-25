// ───────────────────────────────────────────────
// EDIT ME: the core facts and copy of your story.
// Everything on the site is built from this file —
// you shouldn't need to touch any component to
// personalize the experience.
// ───────────────────────────────────────────────

export const names = {
  him: 'Ajay',
  her: 'Arpita',
}

// Format: 'YYYY-MM-DDTHH:mm:ss' (local time)
export const storyStartDate = '2019-06-16T00:00:00'

// Format: 'MM-DD' (no year — it repeats every year)
export const herBirthday = '10-02'

// Password for the secret section at the end.
// Shown as digits of the story-start date: DDMMYYYY
export const secretAnswer = '16062019'
export const secretQuestion = 'When did our story begin?'

// The three lines that appear one at a time in the opening.
export const heroLines = ['Some stories are planned.', 'Some just happen.', 'Ours began on...']
export const heroTagline = 'A story worth remembering.'
export const enterButtonLabel = 'Enter Our Story'

// "Our Universe" — the five destinations shown as a navigation
// hub right after the opening. `target` must match a `data-section`
// value set on the section you want it to scroll to.
export const universeDestinations = [
  { emoji: '🌱', label: 'The Beginning', target: 'beginning' },
  { emoji: '📸', label: 'Our Memories', target: 'memories' },
  { emoji: '💌', label: 'Things I Never Said', target: 'letters' },
  { emoji: '🎮', label: 'Our Little Game', target: 'game' },
  { emoji: '🎂', label: 'Her Day', target: 'birthday' },
]

// Shown on the birthday-lock card before the date arrives.
export const lockMessages = {
  eyebrow: "There's one chapter left...",
  line: 'It opens on October 2.',
}

// The two lines that appear during the birthday reveal itself.
export const birthdayRevealMessage = [
  'Today the world celebrates the day you were born.',
  'I celebrate the day the world got someone who became so special to me.',
]

// A short personal note shown just above the final letter.
export const birthdayNote = [
  'May your birthday keep coming back every year, and may my every prayer carry your name in it.',
  'From 16 June 2019 to today, every memory has made our story a little more beautiful.',
]

// ── "Where It All Began" ──
export const beginningStory = {
  title: 'Where It All Began',
  message:
    "The day our story began, I had no idea that one ordinary moment would become the beginning of something so special.\n\nAt that time, I didn't know how important you would become to me. I didn't know that a simple conversation, a simple meeting, or that first little moment would eventually give me so many reasons to smile.\n\nLooking back now, it feels like the universe quietly brought you into my life without telling me how much you would mean to me someday. \u2764\ufe0f\n\nI may not remember every little detail of that first moment perfectly, but I'll always remember how everything started.\n\nBecause that ordinary day gave me something I never knew I was looking for\u2014\n\nYou. \ud83e\udd0d\u2764\ufe0f\n\nAnd if I could go back to that very first moment, I wouldn't change a single thing.\n\nI'd just smile and think,\n\n\u201cThis is where our story begins.\u201d \u267e\ufe0f",
}

// ── Long distance chapter ──
export const longDistance = {
  title: 'More Than 4 Years Apart, Never Apart at Heart',
  intro:
    'Distance was one of the biggest chapters of our story — and instead of pulling us apart, it just proved how strong we already were.',
  stages: [
    { label: 'Distance', caption: 'Miles apart, hearts still close ❤️' },
    { label: 'Waiting', caption: 'Every second feels incomplete without you 🥺' },
    { label: 'Calls', caption: 'Your voice is my favourite part of the day 📞❤️' },
    { label: 'Messages', caption: 'Little texts that keep us close 💌' },
    { label: 'Hope', caption: 'One day, no distance… just you and me, together forever 🫶♾️' },
    { label: 'Meeting Again ❤️', caption: '' },
  ],
}

// ── College memories ──
export const firstMeeting = {
  title: 'Our College Memories',
  description:
    "This may look like just a college picture, but to me, it holds a thousand little memories.\n\nSomewhere between ordinary college days, random conversations, silly laughs, and those little moments we shared, you became one of the most beautiful parts of my life. \u2764\ufe0f\n\nI never knew that a place I went to for my studies would also become the place where I would find someone who would mean so much to me.\n\nI have graduated now, and you are still continuing your journey there. Things are changing, chapters are turning, and college life is slowly becoming a memory for me.\n\nBut whenever I look at this picture, I don't just see a college building or a moment from the past.\n\nI see us.\n\nI see the days we shared, the smiles we exchanged, the little moments that made those days special, and a chapter of my life that I will always carry with me. \ud83e\udd79\u2764\ufe0f\n\nMaybe one day, we'll look back at this picture together and smile at how young we were and how we never realized that these simple days would become some of our favourite memories.\n\nI may have graduated from college, but I'll never graduate from the memories I made with you there. \u2764\ufe0f\n\nBecause some places become special not because of what they are\u2026\n\nbut because of who we found there. \ud83e\udd0d\u2764\ufe0f",
}

// ── First kiss / a private memory — keep this tasteful and optional ──
export const firstKiss = {
  title: "A Moment We'll Always Remember",
  message:
    "Maybe it wasn't a grand moment. Maybe it was just one of those ordinary moments that somehow became special because it was you and me.\n\nI still love thinking about the times when we talked for hours without realizing how quickly the time was passing. The random conversations, the stupid jokes, the little things we shared, and those moments when neither of us really wanted to say \u201cgoodbye.\u201d\n\nI wish I could go back to those moments sometimes\u2014not to change anything, but just to live them one more time.\n\nBecause that's what I love about us. We didn't need a perfect place, a perfect day, or anything extraordinary. Your presence was enough to make an ordinary moment feel unforgettable.\n\nAnd years from now, when life has changed and we've grown older, I hope we'll look back at these moments, smile, and say:\n\n\u201cRemember when it was just you and me, and we had no idea how beautiful those days were?\u201d \u2764\ufe0f\n\nI think those are the memories I'll always keep closest to my heart.\n\nNot because they were perfect\u2026 but because they were ours. \ud83e\udd0d\u2764\ufe0f",
}

// ── The song that's "yours" ──
export const ourSong = {
  intro: 'Before we begin...',
  subtitle: 'Press play and let our memories begin.',
  sectionTitle: 'This Song Reminds Me of Us',
  reason: '[Write why this song is special to us]',
}
