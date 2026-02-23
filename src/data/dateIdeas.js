/**
 * Weekend date ideas — what to do, not just where to go.
 * Ideas-first so you pick an activity, then you can Google a spot if needed.
 * All search links point to Mount Prospect, IL area.
 */

const MP = 'Mount Prospect, Illinois'

function searchUrl(q) {
  return 'https://www.google.com/search?q=' + encodeURIComponent(q + ' near ' + MP)
}

function idea(id, name, category, description, type, budget, emoji, searchQuery = null) {
  return {
    id,
    name,
    category,
    description,
    type,
    budget: budget || '$$',
    emoji: emoji || '✨',
    searchUrl: searchQuery ? searchUrl(searchQuery) : null,
  }
}

// —— Competitive / active ——
const COMPETITIVE = [
  idea('axe', 'Axe Throwing', 'Competitive Fun', 'Channel your inner lumberjack. Great for a playful, competitive date.', 'niche', '$$', '🪓', 'axe throwing'),
  idea('beercade', 'Arcade Bar / Beercade', 'Competitive Fun', 'Retro games, drinks, and bragging rights. Who gets the high score?', 'niche', '$$', '🍺🕹️', 'arcade bar beercade'),
  idea('escape', 'Escape Room', 'Competitive Fun', 'Solve puzzles together under the clock. Teamwork (or friendly sabotage).', 'niche', '$$', '🔐', 'escape room'),
  idea('minigolf', 'Extreme Mini-Golf', 'Competitive Fun', 'Glow-in-the-dark or themed courses. Loser buys dessert.', 'niche', '$', '⛳', 'extreme mini golf'),
  idea('bowling', 'Bowling Night', 'Competitive Fun', 'Classic, low-pressure competition. Sneak in nachos and make it a date.', 'niche', '$', '🎳', 'bowling'),
  idea('trivia', 'Trivia Night', 'Competitive Fun', 'Team up at a pub or bar. Brains + a drink = fun.', 'niche', '$', '📝', 'trivia night'),
  idea('karaoke', 'Karaoke Night', 'Competitive Fun', 'Pick a duet or go solo. No judgment, just laughs.', 'niche', '$', '🎤', 'karaoke'),
  idea('pool', 'Pool or Darts', 'Competitive Fun', 'Low-key competition. Winner picks the next spot.', 'niche', '$', '🎱', 'pool hall'),
  idea('laser-tag', 'Laser Tag', 'Competitive Fun', 'Run around, zap each other, and laugh. Surprisingly fun for adults.', 'niche', '$$', '🔫', 'laser tag'),
  idea('go-karts', 'Go-Karts', 'Competitive Fun', 'Race each other (or the clock). Adrenaline and silliness.', 'niche', '$$', '🏎️', 'go karts'),
  idea('batting-cages', 'Batting Cages', 'Competitive Fun', 'Swing for the fences. No skill required, just fun.', 'niche', '$', '⚾', 'batting cages'),
  idea('topgolf', 'Topgolf or Driving Range', 'Competitive Fun', 'Hit balls, eat, and compete. Great even if you’ve never golfed.', 'niche', '$$', '⛳', 'topgolf driving range'),
  idea('rock-climbing', 'Rock Climbing / Bouldering', 'Competitive Fun', 'Climb together, spot each other, feel accomplished.', 'niche', '$$', '🧗', 'rock climbing bouldering'),
  idea('trampoline', 'Trampoline Park', 'Competitive Fun', 'Jump, dodge, and dunk. Bring out your inner kid.', 'niche', '$$', '🦘', 'trampoline park'),
  idea('vr', 'VR Experience', 'Competitive Fun', 'Virtual reality games or experiences. Weird and memorable.', 'niche', '$$', '🥽', 'VR virtual reality'),
  idea('paintball', 'Paintball', 'Competitive Fun', 'Strategy and splatter. Dress for mess.', 'niche', '$$', '🎨', 'paintball'),
  idea('cornhole', 'Cornhole or Yard Games', 'Competitive Fun', 'Find a bar or park with cornhole. Easy, social, and fun.', 'niche', '$', '🫘', 'cornhole bar'),
  idea('ping-pong', 'Ping Pong Bar', 'Competitive Fun', 'Table tennis, drinks, and good vibes.', 'niche', '$$', '🏓', 'ping pong bar'),
]

// —— Creative ——
const CREATIVE = [
  idea('pottery', 'Pottery Class', 'Creative', 'Get your hands dirty and make something you can keep (or laugh at).', 'niche', '$$', '🏺', 'pottery class'),
  idea('sip-paint', 'Sip and Paint', 'Creative', 'Wine, canvas, and zero pressure to be Picasso. Very date-friendly.', 'niche', '$$', '🍷🎨', 'sip and paint'),
  idea('cooking', 'Cooking Class Together', 'Creative', 'Learn a new dish together, then eat it. Win-win.', 'niche', '$$', '👩‍🍳', 'cooking class'),
  idea('craft', 'Craft or DIY Workshop', 'Creative', 'Build or paint something for your place. Team effort.', 'niche', '$$', '🔨', 'craft workshop'),
  idea('photo', 'Photo Walk', 'Creative', 'Pick a neighborhood or park and take turns being model and photographer.', 'niche', '$', '📷', 'photo walk'),
  idea('glass-blowing', 'Glass Blowing Workshop', 'Creative', 'Make something out of molten glass. Unique and impressive.', 'niche', '$$$', '🔥', 'glass blowing class'),
  idea('flowers', 'Flower Arranging / Floral Workshop', 'Creative', 'Build a bouquet or centerpiece together. Pretty and hands-on.', 'niche', '$$', '💐', 'flower arranging class'),
  idea('jewelry', 'Jewelry Making', 'Creative', 'Make rings, bracelets, or something for each other.', 'niche', '$$', '💍', 'jewelry making class'),
  idea('chocolate', 'Chocolate or Truffle Making', 'Creative', 'Sweet, messy, and you get to eat the results.', 'niche', '$$', '🍫', 'chocolate making class'),
  idea('cocktail-class', 'Cocktail Making Class', 'Creative', 'Learn to mix drinks together. Then practice at home.', 'niche', '$$', '🍸', 'cocktail making class'),
  idea('wine-tasting', 'Wine Tasting Class', 'Creative', 'Sip, learn, and pick a new favorite bottle.', 'niche', '$$', '🍷', 'wine tasting class'),
  idea('terrarium', 'Terrarium Building', 'Creative', 'Build a little glass garden to take home.', 'niche', '$$', '🪴', 'terrarium workshop'),
  idea('candle-soap', 'Candle or Soap Making', 'Creative', 'Make custom scents together. Cozy and crafty.', 'niche', '$$', '🕯️', 'candle making class'),
  idea('calligraphy', 'Calligraphy or Lettering', 'Creative', 'Learn fancy writing. Great for making cards or signs.', 'niche', '$$', '✒️', 'calligraphy class'),
  idea('woodworking', 'Woodworking Class', 'Creative', 'Build a small project together. Sawdust and satisfaction.', 'niche', '$$', '🪵', 'woodworking class'),
]

// —— Relax / low-key ——
const RELAX = [
  idea('candlelight', 'Candlelight Concert', 'Relax', 'Live music by candlelight. Romantic and memorable.', 'niche', '$$', '🕯️🎵', 'candlelight concert'),
  idea('salt-cave', 'Salt Cave / Halotherapy', 'Relax', 'Unwind in a serene salt room. Unusual and calming.', 'niche', '$$', '🧂', 'salt cave'),
  idea('botanical', 'Botanical Garden (Day or Night)', 'Relax', 'Gardens are peaceful; many do evening events. Pretty and low-key.', 'niche', '$', '🌙🌸', 'botanical garden'),
  idea('bookstore', 'Bookstore or Library Date', 'Relax', 'Pick books for each other, then coffee. Quiet and cozy.', 'niche', '$', '📚', 'bookstore cafe'),
  idea('spa', 'Spa or Couples Massage', 'Relax', 'Unwind together. Splurge for a special weekend.', 'niche', '$$$', '💆', 'couples massage spa'),
  idea('rooftop', 'Rooftop Bar with a View', 'Relax', 'Drinks, skyline, and good conversation.', 'niche', '$$', '🌃', 'rooftop bar'),
  idea('sunset-picnic', 'Sunset Picnic', 'Relax', 'Pack a blanket and snacks. Watch the sun go down together.', 'niche', '$', '🌅', 'park picnic'),
  idea('stargazing', 'Stargazing', 'Relax', 'Find a dark spot or observatory. Romantic and free.', 'niche', '$', '⭐', 'stargazing observatory'),
  idea('yoga', 'Yoga Class Together', 'Relax', 'Stretch and breathe. Many studios do couples or drop-in.', 'niche', '$$', '🧘', 'yoga class'),
  idea('sound-bath', 'Sound Bath or Meditation', 'Relax', 'Gongs, bowls, and deep relaxation. Unusual and calming.', 'niche', '$$', '🔔', 'sound bath meditation'),
  idea('tea-house', 'Fancy Tea or Tea House', 'Relax', 'Afternoon tea, scones, and quiet vibes.', 'niche', '$$', '🫖', 'tea house afternoon tea'),
  idea('boat-cruise', 'Boat or River Cruise', 'Relax', 'Scenic cruise with drinks. Romantic and easy.', 'niche', '$$', '⛵', 'boat cruise river'),
  idea('planetarium', 'Planetarium', 'Relax', 'Lay back and watch the stars inside. Cozy and educational.', 'niche', '$', '🌌', 'planetarium'),
  idea('aquarium', 'Aquarium', 'Relax', 'Watch fish and sea life. Peaceful and mesmerizing.', 'niche', '$$', '🐠', 'aquarium'),
  idea('outdoor-movie', 'Outdoor Movie in the Park', 'Relax', 'Bring chairs and a blanket. Free movies in summer.', 'niche', '$', '🎬', 'outdoor movie park'),
  idea('fire-pit', 'Fire Pit Evening', 'Relax', 'Find a spot with fire pits, s’mores, and drinks.', 'niche', '$$', '🔥', 'fire pit restaurant'),
]

// —— Out & about ——
const OUT_ABOUT = [
  idea('brunch-crawl', 'Brunch Crawl', 'Out & About', 'Hit 2–3 spots: coffee, then pastries, then brunch. Make a morning of it.', 'niche', '$$', '🥐', 'brunch'),
  idea('farmers-market', 'Farmers Market Morning', 'Out & About', 'Browse, taste, grab ingredients for a meal together later.', 'niche', '$', '🥬', 'farmers market'),
  idea('drive-in', 'Drive-In Movie', 'Out & About', 'Back-seat vibes, snacks, and a double feature. Old-school date.', 'niche', '$', '🚗🎬', 'drive in movie'),
  idea('comedy', 'Comedy Show', 'Out & About', 'Laugh together. Check local clubs or theaters.', 'niche', '$$', '🎤', 'comedy show'),
  idea('concert', 'Live Music (Local Band or Venue)', 'Out & About', 'Find a small venue or outdoor summer show. Music + drinks.', 'niche', '$$', '🎵', 'live music'),
  idea('new-cuisine', 'Try a Cuisine You’ve Never Had', 'Out & About', 'Pick a type of food you’ve never tried and find a spot together.', 'niche', '$$', '🍽️', 'new restaurant'),
  idea('dessert-date', 'Dessert-Only Date', 'Out & About', 'Skip dinner; hit a bakery, ice cream spot, or dessert bar.', 'niche', '$', '🍦', 'dessert cafe'),
  idea('scenic-drive', 'Scenic Drive + Small Town', 'Out & About', 'Drive somewhere pretty, walk Main Street, grab a bite.', 'niche', '$', '🛣️', 'scenic drive Illinois'),
  idea('antique', 'Antique or Vintage Market', 'Out & About', 'Hunt for treasures and weird finds. Great for people-watching.', 'niche', '$', '🪑', 'antique market'),
  idea('flea', 'Flea Market', 'Out & About', 'Early morning, coffee, and bargain hunting.', 'niche', '$', '🛒', 'flea market'),
  idea('food-trucks', 'Food Truck Rally', 'Out & About', 'Multiple trucks, share a few dishes, eat outside.', 'niche', '$$', '🚚', 'food truck rally'),
  idea('ice-cream-crawl', 'Ice Cream Crawl', 'Out & About', 'Hit 2–3 ice cream spots and compare. Sweet and silly.', 'niche', '$', '🍨', 'ice cream shop'),
  idea('coffee-hop', 'Coffee Shop Hop', 'Out & About', 'Try two or three cafés. Compare lattes and vibes.', 'niche', '$', '☕', 'coffee shop'),
  idea('brewery', 'Brewery Tour or Taproom', 'Out & About', 'Taste flights, learn a little, enjoy the atmosphere.', 'niche', '$$', '🍺', 'brewery taproom'),
  idea('winery', 'Winery Visit', 'Out & About', 'Wine, views, and a relaxed afternoon.', 'niche', '$$', '🍇', 'winery'),
  idea('distillery', 'Distillery Tour', 'Out & About', 'Whiskey, gin, or vodka. Learn and taste.', 'niche', '$$', '🥃', 'distillery tour'),
  idea('street-fest', 'Street Festival', 'Out & About', 'Music, food, and crowds. Check local event listings.', 'niche', '$', '🎪', 'street festival'),
  idea('zoo', 'Zoo Day', 'Out & About', 'Animals, walking, and maybe a silly souvenir.', 'niche', '$$', '🦁', 'zoo'),
  idea('historic', 'Historic or Walking Tour', 'Out & About', 'Learn about your town or a nearby one. Educational and active.', 'niche', '$', '🏛️', 'walking tour historic'),
  idea('ghost-tour', 'Ghost Tour', 'Out & About', 'Spooky stories and history. Fun even if you don’t believe.', 'niche', '$$', '👻', 'ghost tour'),
  idea('bike-ride', 'Bike Ride + Lunch', 'Out & About', 'Rent bikes or use your own. Ride, then eat.', 'niche', '$$', '🚲', 'bike trail rental'),
  idea('kayak', 'Kayaking or Canoeing', 'Out & About', 'Paddle together on a calm river or lake.', 'niche', '$$', '🛶', 'kayak rental'),
  idea('ice-skate-out', 'Outdoor Ice Skating', 'Out & About', 'Winter classic. Hold hands and try not to fall.', 'niche', '$', '⛸️', 'outdoor ice skating'),
  idea('sledding', 'Sledding', 'Out & About', 'Find a hill, borrow a sled, act like kids.', 'niche', '$', '🛷️', 'sledding hill'),
  idea('beach-day', 'Beach or Lake Day', 'Out & About', 'Sand, water, and a cooler. Summer staple.', 'niche', '$', '🏖️', 'beach lake'),
  idea('road-trip', 'Mini Road Trip', 'Out & About', 'Pick a town an hour away. Drive, explore, eat.', 'niche', '$$', '🛣️', 'day trip Illinois'),
  idea('late-diner', 'Late-Night Diner', 'Out & About', 'Find a 24-hour or late spot. Comfort food and conversation.', 'niche', '$', '🍳', 'late night diner'),
  idea('bookstore-crawl', 'Bookstore Crawl', 'Out & About', 'Hit a few bookshops. Pick a book for each other.', 'niche', '$', '📖', 'independent bookstore'),
  idea('record-store', 'Record Store Digging', 'Out & About', 'Flip through vinyl, find weird covers, buy one to spin at home.', 'niche', '$', '💿', 'record store'),
  idea('thrift-challenge', 'Thrift Shopping Challenge', 'Out & About', 'Set a budget or theme. Who finds the best (or weirdest) thing?', 'niche', '$', '👔', 'thrift store'),
]

// —— Home ——
const HOME = [
  idea('home-fort', 'Build a Fort & Movie Marathon', 'Home', 'Blankets, pillows, snacks, and a queue of movies. No plan, no problem.', 'home', '$', '🛋️🍿'),
  idea('home-boardgame', 'High-Stakes Board Game Night', 'Home', 'Pick a game, set the stakes (loser does dishes?), and go all in.', 'home', '$', '🎲'),
  idea('home-5course', 'Cook a 5-Course Meal Together', 'Home', 'From appetizer to dessert. Split the courses and make a night of it.', 'home', '$$', '🍽️'),
  idea('home-puzzle', 'Puzzle Night', 'Home', 'A big jigsaw, music, and no rush. Talk and piece it together.', 'home', '$', '🧩'),
  idea('home-diy', 'DIY Project Together', 'Home', 'Build, paint, or craft something for your place. Team effort.', 'home', '$', '🔨'),
  idea('home-theme', 'Themed Movie Night', 'Home', 'Pick a theme (80s, horror, rom-com), make snacks to match, and binge.', 'home', '$', '🎞️'),
  idea('home-cookoff', 'At-Home Cook-Off', 'Home', 'Same ingredient or dish, different recipes. Judge each other’s plate.', 'home', '$$', '👨‍🍳'),
  idea('home-camp', 'Living Room Campout', 'Home', 'Pitch a tent or build a blanket fort, “camp” with snacks and stories.', 'home', '$', '⛺'),
  idea('home-no-plan', 'No-Plan Night', 'Home', 'No agenda. Order in, watch whatever, just be together.', 'home', '$', '😌'),
  idea('home-breakfast-bed', 'Breakfast in Bed', 'Home', 'One person cooks, both eat in bed. Simple and sweet.', 'home', '$', '🛏️'),
  idea('home-fondue', 'Fondue Night', 'Home', 'Cheese or chocolate (or both). Dip, chat, repeat.', 'home', '$$', '🍫'),
  idea('home-wine-cheese', 'Wine and Cheese Night', 'Home', 'Pick a few cheeses and a bottle. No cooking, just tasting.', 'home', '$$', '🍷'),
  idea('home-theme-dinner', 'Theme Dinner at Home', 'Home', 'Italian, Mexican, Thai — cook the whole menu together.', 'home', '$$', '🍝'),
  idea('home-videogame', 'Video Game Tournament', 'Home', 'Co-op or versus. Loser does cleanup.', 'home', '$', '🎮'),
  idea('home-binge', 'Binge a New Show', 'Home', 'Pick something you’ve never seen. No spoilers, no phones.', 'home', '$', '📺'),
  idea('home-magic', 'Learn a Magic Trick', 'Home', 'YouTube a simple trick and try to fool each other.', 'home', '$', '🃏'),
  idea('home-vacation', 'Plan Your Next Vacation', 'Home', 'Dream together. Research, pin places, make a list.', 'home', '$', '✈️'),
  idea('home-letters', 'Write Each Other Letters', 'Home', 'Old-school. Mail them or hide them for the other to find.', 'home', '$', '✉️'),
  idea('home-playlists', 'Make Playlists for Each Other', 'Home', 'Curate a “for you” playlist. Listen together and explain your picks.', 'home', '$', '🎵'),
  idea('home-spa', 'Home Spa Night', 'Home', 'Face masks, foot soak, maybe a massage. Low-cost relaxation.', 'home', '$', '💆'),
  idea('home-picnic', 'Indoor Picnic', 'Home', 'Spread a blanket on the floor. Finger food and no table needed.', 'home', '$$', '🧺'),
  idea('home-candlelit', 'Candlelit Dinner at Home', 'Home', 'Cook or order in. Turn off the overhead light and light candles.', 'home', '$$', '🕯️'),
  idea('home-bake', 'Bake Something New', 'Home', 'Pick a recipe you’ve never tried. Flour everywhere, worth it.', 'home', '$', '🧁'),
  idea('home-karaoke', 'Karaoke at Home', 'Home', 'YouTube karaoke, sing duets, no audience needed.', 'home', '$', '🎤'),
  idea('home-dance', 'Dance Party in the Living Room', 'Home', 'Put on a playlist and just dance. No skill required.', 'home', '$', '💃'),
  idea('home-stargaze', 'Stargazing from the Backyard', 'Home', 'Blanket, maybe a telescope or app. Look up together.', 'home', '$', '⭐'),
  idea('home-backyard-movie', 'Backyard Movie', 'Home', 'Projector + sheet or screen. Outdoor movie at home.', 'home', '$$', '🎬'),
  idea('home-garden', 'Gardening Together', 'Home', 'Plant something. Herbs, flowers, or veggies. Watch them grow.', 'home', '$', '🌱'),
  idea('home-pizza', 'Make Homemade Pizza', 'Home', 'Dough, sauce, toppings. Build your own and compare.', 'home', '$$', '🍕'),
  idea('home-sushi', 'Sushi Rolling at Home', 'Home', 'Get a kit or ingredients. Messy, fun, and you get to eat it.', 'home', '$$', '🍣'),
  idea('home-taco', 'Build-Your-Own Taco Night', 'Home', 'All the fixings. Everyone builds their perfect taco.', 'home', '$$', '🌮'),
  idea('home-lego', 'Build a Lego Set Together', 'Home', 'One big set or two small ones. Patience and teamwork.', 'home', '$$', '🧱'),
  idea('home-cards', 'Card Games Night', 'Home', 'Euchre, poker, Uno — whatever you like. Loser cleans.', 'home', '$', '🃏'),
  idea('home-coop', 'Co-op Video Games', 'Home', 'Play a game together on the couch. Same screen, same team.', 'home', '$', '🎮'),
  idea('home-doc', 'Documentary + Discuss', 'Home', 'Watch a doc, then talk about it. Learn something together.', 'home', '$', '📺'),
  idea('home-podcast', 'Podcast Together', 'Home', 'Pick an episode, listen, then discuss. No screens needed.', 'home', '$', '🎧'),
  idea('home-bucket', 'Write a Bucket List Together', 'Home', 'Dream big. Travel, food, experiences. Compare and merge.', 'home', '$', '📝'),
  idea('home-time-capsule', 'Make a Time Capsule', 'Home', 'Put in letters, photos, small items. Bury or hide for a future date.', 'home', '$', '📦'),
]

const ALL_IDEAS = [
  ...COMPETITIVE,
  ...CREATIVE,
  ...RELAX,
  ...OUT_ABOUT,
  ...HOME,
]

function shuffle(arr) {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/** Filter: 'all' | 'in' (staying in) | 'out' (going out) | 'surprise' (all, same as all). */
export function getDateIdeasDeck(filter = 'all') {
  let list = ALL_IDEAS
  if (filter === 'in') list = list.filter((i) => i.type === 'home')
  if (filter === 'out') list = list.filter((i) => i.type === 'niche')
  if (filter === 'surprise' || filter === 'all') list = [...list]
  return shuffle(list)
}

/** A few indoor-heavy ideas for "Rainy? Try these" strip. */
export function getIndoorIdeas(count = 5) {
  const indoor = ALL_IDEAS.filter(
    (i) =>
      i.type === 'home' ||
      ['escape', 'bowling', 'pottery', 'sip-paint', 'cooking', 'candlelight', 'salt-cave', 'bookstore', 'spa', 'comedy', 'vr', 'aquarium', 'planetarium'].includes(i.id)
  )
  return shuffle(indoor).slice(0, count)
}

export { COMPETITIVE, CREATIVE, RELAX, OUT_ABOUT, HOME }
