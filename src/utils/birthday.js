/**
 * Birthday date logic, kept in one place.
 *
 * - Before her birthday this year: countdown to it (`unlocked: false`).
 * - On or after her birthday this year: birthday mode (`unlocked: true`)
 *   — never a negative countdown, and no jump to "next year" on Oct 3.
 *
 * `mmdd` is "MM-DD" (see `herBirthday` in src/data/config.js).
 */
export function getBirthdayState(mmdd, now = new Date()) {
  const [month, day] = mmdd.split('-').map(Number)
  const target = new Date(now.getFullYear(), month - 1, day, 0, 0, 0)
  return { target, unlocked: now >= target }
}

export function getRemaining(target, now = new Date()) {
  const diff = Math.max(0, target - now)
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}
