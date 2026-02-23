/**
 * Curated niche experience cards and home-bound date ideas.
 * Mixed into the swipe deck. All centered on Mount Prospect, IL area.
 */

const MOUNT_PROSPECT_SEARCH = 'Mount Prospect, Illinois'

function searchUrl(query) {
  return 'https://www.google.com/search?q=' + encodeURIComponent(query + ' near ' + MOUNT_PROSPECT_SEARCH)
}

export const COMPETITIVE_FUN = [
  { id: 'niche-axe', name: 'Axe Throwing', category: 'Competitive Fun', description: 'Channel your inner lumberjack. Great for a playful, competitive date.', type: 'niche', budget: '$$', searchUrl: searchUrl('axe throwing'), emoji: '🪓' },
  { id: 'niche-beercade', name: 'Arcade Bar / Beercade', category: 'Competitive Fun', description: 'Retro games, drinks, and bragging rights. Who gets the high score?', type: 'niche', budget: '$$', searchUrl: searchUrl('arcade bar beercade'), emoji: '🍺🕹️' },
  { id: 'niche-escape', name: 'Escape Room', category: 'Competitive Fun', description: 'Solve puzzles together under the clock. Teamwork (or friendly sabotage).', type: 'niche', budget: '$$', searchUrl: searchUrl('escape room'), emoji: '🔐' },
  { id: 'niche-extreme-minigolf', name: 'Extreme Mini-Golf', category: 'Competitive Fun', description: 'Glow-in-the-dark, obstacles, or themed courses. Loser buys dessert.', type: 'niche', budget: '$', searchUrl: searchUrl('extreme mini golf'), emoji: '⛳' },
]

export const CREATIVE_GROWTH = [
  { id: 'niche-pottery', name: 'Pottery Class', category: 'Creative Growth', description: 'Get your hands dirty and make something you can keep (or laugh at).', type: 'niche', budget: '$$', searchUrl: searchUrl('pottery class'), emoji: '🏺' },
  { id: 'niche-sip-paint', name: 'Sip and Paint', category: 'Creative Growth', description: 'Wine, canvas, and zero pressure to be Picasso. Very date-friendly.', type: 'niche', budget: '$$', searchUrl: searchUrl('sip and paint'), emoji: '🍷🎨' },
  { id: 'niche-cooking', name: 'Cooking Workshop', category: 'Creative Growth', description: 'Learn a new dish together, then eat it. Win-win.', type: 'niche', budget: '$$', searchUrl: searchUrl('cooking class'), emoji: '👩‍🍳' },
]

export const RELAX_TRACK = [
  { id: 'niche-candlelight', name: 'Candlelight Concert', category: 'Relax', description: 'Live music by candlelight. Romantic and memorable.', type: 'niche', budget: '$$', searchUrl: searchUrl('candlelight concert'), emoji: '🕯️🎵' },
  { id: 'niche-salt-cave', name: 'Salt Cave / Halotherapy', category: 'Relax', description: 'Unwind in a serene salt room. Unusual and calming.', type: 'niche', budget: '$$', searchUrl: searchUrl('salt cave'), emoji: '🧂' },
  { id: 'niche-botanical-night', name: 'Botanical Garden Night Walk', category: 'Relax', description: 'Gardens after dark—often lit or with special events. Peaceful and pretty.', type: 'niche', budget: '$', searchUrl: searchUrl('botanical garden'), emoji: '🌙🌸' },
]

export const HOME_BOUND = [
  { id: 'home-fort', name: 'Build a Fort & Movie Marathon', category: 'Home', description: 'Blankets, pillows, snacks, and a queue of movies. No plan, no problem.', type: 'home', budget: '$', emoji: '🛋️🍿' },
  { id: 'home-boardgame', name: 'High-Stakes Board Game Night', category: 'Home', description: 'Pick a game, set the stakes (loser does dishes?), and go all in.', type: 'home', budget: '$', emoji: '🎲' },
  { id: 'home-5course', name: 'Cook a 5-Course Meal Together', category: 'Home', description: 'From appetizer to dessert. Split the courses and make a night of it.', type: 'home', budget: '$$', emoji: '🍽️' },
  { id: 'home-puzzle', name: 'Puzzle Night', category: 'Home', description: 'A big jigsaw, music, and no rush. Talk and piece it together.', type: 'home', budget: '$', emoji: '🧩' },
  { id: 'home-diy', name: 'DIY Project Together', category: 'Home', description: 'Build, paint, or craft something for your place. Team effort.', type: 'home', budget: '$', emoji: '🔨' },
]

function shuffle(arr) {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function getNicheAndHomeCards() {
  const all = [...COMPETITIVE_FUN, ...CREATIVE_GROWTH, ...RELAX_TRACK, ...HOME_BOUND]
  return shuffle(all)
}
