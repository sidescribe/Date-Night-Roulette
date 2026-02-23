/**
 * Live events near Mount Prospect, IL.
 * Ticketmaster Discovery API (requires free API key: https://developer.ticketmaster.com/)
 * Set VITE_TICKETMASTER_API_KEY in .env for events to appear in the deck.
 */

const MOUNT_PROSPECT = { lat: 42.0664, lng: -87.9373 }
const RADIUS_MILES = 25

export async function fetchEventsNearMountProspect() {
  const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY
  if (!apiKey) return []

  const params = new URLSearchParams({
    apikey: apiKey,
    latlong: `${MOUNT_PROSPECT.lat},${MOUNT_PROSPECT.lng}`,
    radius: RADIUS_MILES,
    unit: 'miles',
    size: 50,
    sort: 'date,asc',
    classificationName: 'Music,Comedy,Film,Theatre', // concerts, comedy, theatre
  })

  const url = `https://app.ticketmaster.com/discovery/v2/events.json?${params}`

  try {
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json()
    const events = data._embedded?.events || []
    return events.map((ev) => ({
      id: `tm-${ev.id}`,
      name: ev.name,
      category: ev.classifications?.[0]?.segment?.name || 'Event',
      type: 'event',
      budget: '$$',
      description: ev._embedded?.venues?.[0]?.name
        ? `at ${ev._embedded.venues[0].name}`
        : null,
      url: ev.url,
      date: ev.dates?.start?.localDate || ev.dates?.start?.dateTime,
      emoji: ev.classifications?.[0]?.segment?.name === 'Comedy' ? '🎤' : ev.classifications?.[0]?.segment?.name === 'Theatre' ? '🎭' : '🎵',
    }))
  } catch (e) {
    console.warn('Ticketmaster fetch failed', e)
    return []
  }
}
