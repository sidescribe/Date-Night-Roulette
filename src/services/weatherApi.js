/**
 * Weather for Mount Prospect, IL via Open-Meteo (free, no API key).
 * Used to prioritize indoor options when it's raining or snowing.
 */

const MOUNT_PROSPECT = { lat: 42.0664, lng: -87.9373 }

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast'

// WMO weather codes: 61-67 = rain, 71-77 = snow, 80-99 = showers/thunderstorm
const INDOOR_WEATHER_CODES = new Set([
  61, 63, 65, 66, 67,  // rain
  71, 73, 75, 77,      // snow
  80, 81, 82, 85, 86, 95, 96, 99,  // showers, thunderstorm
])

/**
 * Fetch current weather for Mount Prospect.
 * @returns { Promise<{ isIndoorDay: boolean, summary?: string, precipitation?: number, weatherCode?: number }> }
 */
export async function getWeatherForMountProspect() {
  const params = new URLSearchParams({
    latitude: MOUNT_PROSPECT.lat,
    longitude: MOUNT_PROSPECT.lng,
    current: 'precipitation,weather_code',
    forecast_days: '1',
  })

  const res = await fetch(`${OPEN_METEO_URL}?${params}`)
  if (!res.ok) {
    console.warn('Weather fetch failed, defaulting to no indoor prioritization')
    return { isIndoorDay: false }
  }

  const data = await res.json()
  const current = data.current || {}
  const precipitation = Number(current.precipitation) || 0
  const weatherCode = Number(current.weather_code) || 0

  const isIndoorDay = precipitation > 0 || INDOOR_WEATHER_CODES.has(weatherCode)

  return {
    isIndoorDay,
    precipitation,
    weatherCode,
    summary: isIndoorDay ? 'Rain or snow today — we’re surfacing more indoor options first.' : null,
  }
}
