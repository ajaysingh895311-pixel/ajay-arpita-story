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
  message: '[Write your personal memory here]',
}

// ── The song that's "yours" ──
export const ourSong = {
  intro: 'Before we begin...',
  subtitle: 'Press play and let our memories begin.',
  sectionTitle: 'This Song Reminds Me of Us',
  reason: '[Write why this song is special to us]',
}
