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

// ── First meeting, in Lucknow ──
export const firstMeeting = {
  title: 'The Day Distance Lost',
  city: 'Lucknow',
  description: '[Write about the day we finally met in Lucknow]',
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
