/**
 * Fetches date-night-friendly places near Mount Prospect, Illinois from OpenStreetMap (Overpass API).
 * No API key required.
 */

const MOUNT_PROSPECT = {
  lat: 42.0664,
  lng: -87.9373,
}

// Bounding box ~12 miles around Mount Prospect (south, west, north, east)
const BBOX = [
  MOUNT_PROSPECT.lat - 0.15,
  MOUNT_PROSPECT.lng - 0.18,
  MOUNT_PROSPECT.lat + 0.15,
  MOUNT_PROSPECT.lng + 0.18,
].join(',')

// Use a shorter timeout so we fail fast and can try fallback
const OVERPASS_TIMEOUT = 20

const OVERPASS_SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]

// Food, drink & entertainment (amenity) + activities (tourism, leisure)
const PLACES_QUERY = `
[out:json][timeout:${OVERPASS_TIMEOUT}];
(
  node["amenity"~"restaurant|cafe|bar|pub|fast_food|cinema|theatre|ice_cream|arts_centre"](${BBOX});
  way["amenity"~"restaurant|cafe|bar|pub|fast_food|cinema|theatre|ice_cream|arts_centre"](${BBOX});
  node["tourism"~"museum|gallery|attraction|theme_park|zoo|viewpoint"](${BBOX});
  way["tourism"~"museum|gallery|attraction|theme_park|zoo|viewpoint"](${BBOX});
  node["leisure"~"park|water_park|mini_golf|miniature_golf|bowling_alley|ice_rink|stadium|fitness_centre|golf_course|nature_reserve|escape_game|dance|amusement_arcade|marina|garden|disc_golf_course|horse_riding|beach_resort|fishing|pitch|common"](${BBOX});
  way["leisure"~"park|water_park|mini_golf|miniature_golf|bowling_alley|ice_rink|stadium|fitness_centre|golf_course|nature_reserve|escape_game|dance|amusement_arcade|marina|garden|disc_golf_course|horse_riding|beach_resort|fishing|pitch|common"](${BBOX});
);
out body center;
`.trim()

// Lighter query if the full one times out (fewer types = faster)
const PLACES_QUERY_LIGHT = `
[out:json][timeout:15];
(
  node["amenity"~"restaurant|cafe|bar|cinema|theatre"](${BBOX});
  way["amenity"~"restaurant|cafe|bar|cinema|theatre"](${BBOX});
  node["tourism"~"museum|gallery|attraction"](${BBOX});
  way["tourism"~"museum|gallery|attraction"](${BBOX});
  node["leisure"~"park|bowling_alley|ice_rink|escape_game"](${BBOX});
  way["leisure"~"park|bowling_alley|ice_rink|escape_game"](${BBOX});
);
out body center;
`.trim()

const AMENITY_LABELS = {
  restaurant: 'Restaurant',
  cafe: 'Cafe',
  bar: 'Bar',
  pub: 'Pub',
  fast_food: 'Quick Bite',
  cinema: 'Cinema',
  theatre: 'Theatre',
  ice_cream: 'Dessert',
  arts_centre: 'Arts & Culture',
}

const TOURISM_LABELS = {
  museum: 'Museum',
  gallery: 'Gallery',
  attraction: 'Attraction',
  theme_park: 'Theme Park',
  zoo: 'Zoo',
  viewpoint: 'Viewpoint',
}

const LEISURE_LABELS = {
  park: 'Park',
  water_park: 'Water Park',
  mini_golf: 'Mini Golf',
  miniature_golf: 'Mini Golf',
  bowling_alley: 'Bowling',
  ice_rink: 'Ice Skating',
  stadium: 'Stadium',
  fitness_centre: 'Fitness',
  golf_course: 'Golf',
  nature_reserve: 'Nature',
  escape_game: 'Escape Room',
  dance: 'Dance',
  amusement_arcade: 'Arcade',
  marina: 'Marina',
  garden: 'Garden',
  disc_golf_course: 'Disc Golf',
  horse_riding: 'Horseback Riding',
  beach_resort: 'Beach',
  fishing: 'Fishing',
  pitch: 'Sports',
  common: 'Green Space',
}

function getCategoryLabel(tags) {
  const amenity = (tags?.amenity || '').toLowerCase()
  if (AMENITY_LABELS[amenity]) return AMENITY_LABELS[amenity]
  const tourism = (tags?.tourism || '').toLowerCase()
  if (TOURISM_LABELS[tourism]) return TOURISM_LABELS[tourism]
  const leisure = (tags?.leisure || '').toLowerCase()
  if (LEISURE_LABELS[leisure]) return LEISURE_LABELS[leisure]
  if (tags?.cuisine) return tags.cuisine
  return 'Spot'
}

function getBudget() {
  const r = Math.random()
  if (r < 0.4) return '$'
  if (r < 0.8) return '$$'
  return '$$$'
}

function parseElement(el) {
  const tags = el.tags || {}
  const name = tags.name || tags.brand || null
  if (!name || name.length < 2) return null

  let lat = el.lat
  let lon = el.lon
  if (el.center) {
    lat = el.center.lat
    lon = el.center.lon
  }
  if (lat == null || lon == null) return null

  // Must have at least one of amenity, tourism, or leisure to be a venue we want
  const hasVenueTag = tags.amenity || tags.tourism || tags.leisure
  if (!hasVenueTag) return null

  const category = getCategoryLabel(tags)
  const isIndoor = isIndoorCategory(tags)

  return {
    id: `osm-${el.type}-${el.id}`,
    name: name.trim(),
    category,
    budget: getBudget(),
    type: 'spot',
    lat,
    lon,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
    isIndoor,
  }
}

function isIndoorCategory(tags) {
  const a = (tags?.amenity || '').toLowerCase()
  const t = (tags?.tourism || '').toLowerCase()
  const l = (tags?.leisure || '').toLowerCase()
  const indoorAmenity = ['restaurant', 'cafe', 'bar', 'pub', 'fast_food', 'cinema', 'theatre', 'ice_cream', 'arts_centre']
  const indoorTourism = ['museum', 'gallery', 'attraction', 'theme_park', 'zoo']
  const indoorLeisure = ['bowling_alley', 'ice_rink', 'stadium', 'fitness_centre', 'escape_game', 'dance', 'amusement_arcade', 'water_park']
  const outdoorLeisure = ['park', 'garden', 'nature_reserve', 'golf_course', 'disc_golf_course', 'horse_riding', 'beach_resort', 'fishing', 'pitch', 'common', 'marina']
  if (indoorAmenity.includes(a) || indoorTourism.includes(t) || indoorLeisure.includes(l)) return true
  if (outdoorLeisure.includes(l)) return false
  if (t === 'viewpoint') return false
  return null
}

function dedupeByName(places) {
  const seen = new Set()
  return places.filter((p) => {
    const key = p.name.toLowerCase().trim()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function parseOverpassResponse(data) {
  const elements = data.elements || []
  const places = elements.map(parseElement).filter(Boolean)
  const unique = dedupeByName(places)
  for (let i = unique.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [unique[i], unique[j]] = [unique[j], unique[i]]
  }
  return unique
}

async function tryOverpassFetch(url, query) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(query)}`,
  })
  if (!res.ok) throw new Error(`Places request failed: ${res.status}`)
  const data = await res.json()
  return parseOverpassResponse(data)
}

/**
 * Fetch places near Mount Prospect, IL. Tries primary Overpass server, then fallback, then lighter query.
 * Returns [] on total failure so the app can still show events + niche/home cards.
 */
export async function fetchPlacesNearMountProspect() {
  const queries = [PLACES_QUERY, PLACES_QUERY_LIGHT]

  for (const server of OVERPASS_SERVERS) {
    for (const query of queries) {
      try {
        const places = await tryOverpassFetch(server, query)
        if (places.length > 0) return places
      } catch (e) {
        if (e.message?.includes('504') || e.message?.includes('Gateway')) continue
        throw e
      }
    }
  }

  console.warn('All Overpass attempts failed (e.g. 504). Returning no places.')
  return []
}

export { MOUNT_PROSPECT }
