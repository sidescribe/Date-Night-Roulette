import { useState, useEffect, useRef } from 'react'
import SwipeCard from './components/SwipeCard'
import ManageView from './components/ManageView'
import { fetchPlacesNearMountProspect } from './services/placesApi'
import { getWeatherForMountProspect } from './services/weatherApi'
import { fetchEventsNearMountProspect } from './services/eventsApi'
import { getDateIdeasDeck, getIndoorIdeas } from './data/dateIdeas'

const THIS_WEEKEND_KEY = 'dateNightThisWeekend'
const DONE_HISTORY_KEY = 'dateNightDoneHistory'
const MAX_THIS_WEEKEND = 3

function App() {
  const [view, setView] = useState('home') // home, manage, swipe, mystery
  const [spots, setSpots] = useState([])
  const [wildcards, setWildcards] = useState([])
  const [swipeDeck, setSwipeDeck] = useState([])
  const [loadingPlaces, setLoadingPlaces] = useState(false)
  const [placesError, setPlacesError] = useState(null)
  const [weatherSummary, setWeatherSummary] = useState(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [mysteryLocation, setMysteryLocation] = useState(null)
  const [thisWeekend, setThisWeekend] = useState([])
  const [doneHistory, setDoneHistory] = useState([])
  const [deckFilter, setDeckFilter] = useState('all') // 'all' | 'in' | 'out' | 'surprise'

  const cardRef = useRef(null)
  const startXRef = useRef(0)
  const currentXRef = useRef(0)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSpots = localStorage.getItem('dateNightSpots')
    const savedWildcards = localStorage.getItem('dateNightWildcards')

    if (savedSpots) {
      setSpots(JSON.parse(savedSpots))
    } else {
      const defaultSpots = [
        { id: 1, name: 'Bella Vista', type: 'restaurant', budget: '$$', category: 'Italian' },
        { id: 2, name: 'Sunset Cinema', type: 'activity', budget: '$', category: 'Entertainment' },
        { id: 3, name: 'The Rooftop Bar', type: 'bar', budget: '$$$', category: 'Drinks' },
      ]
      setSpots(defaultSpots)
      localStorage.setItem('dateNightSpots', JSON.stringify(defaultSpots))
    }

    if (savedWildcards) {
      setWildcards(JSON.parse(savedWildcards))
    } else {
      const defaultWildcards = [
        { id: 1, idea: "Try a new cuisine we've never had", budget: '$$' },
        { id: 2, idea: 'Stargazing at the park', budget: '$' },
        { id: 3, idea: 'Take a cooking class together', budget: '$$$' },
      ]
      setWildcards(defaultWildcards)
      localStorage.setItem('dateNightWildcards', JSON.stringify(defaultWildcards))
    }

    const savedWeekend = localStorage.getItem(THIS_WEEKEND_KEY)
    if (savedWeekend) setThisWeekend(JSON.parse(savedWeekend))

    const savedDone = localStorage.getItem(DONE_HISTORY_KEY)
    if (savedDone) setDoneHistory(JSON.parse(savedDone))
  }, [])

  // Save to localStorage whenever spots or wildcards change
  useEffect(() => {
    if (spots.length > 0) {
      localStorage.setItem('dateNightSpots', JSON.stringify(spots))
    }
  }, [spots])

  useEffect(() => {
    if (wildcards.length > 0) {
      localStorage.setItem('dateNightWildcards', JSON.stringify(wildcards))
    }
  }, [wildcards])

  useEffect(() => {
    localStorage.setItem(THIS_WEEKEND_KEY, JSON.stringify(thisWeekend))
  }, [thisWeekend])

  useEffect(() => {
    localStorage.setItem(DONE_HISTORY_KEY, JSON.stringify(doneHistory))
  }, [doneHistory])

  const addSpot = (spot) => {
    const newSpot = { ...spot, id: Date.now() }
    setSpots([...spots, newSpot])
  }

  const deleteSpot = (id) => {
    setSpots(spots.filter(s => s.id !== id))
  }

  const addWildcard = (wildcard) => {
    const newWildcard = { ...wildcard, id: Date.now() }
    setWildcards([...wildcards, newWildcard])
  }

  const deleteWildcard = (id) => {
    setWildcards(wildcards.filter(w => w.id !== id))
  }

  const startPlacesSwipe = async () => {
    setPlacesError(null)
    setLoadingPlaces(true)
    try {
      const places = await fetchPlacesNearMountProspect()
      if (places.length === 0) {
        setPlacesError('Couldn’t load spots right now (server busy). Try again in a minute.')
        return
      }
      setSwipeDeck(places)
      setCurrentCardIndex(0)
      setSelectedSpot(null)
      setView('swipe')
    } catch (err) {
      console.error(err)
      setPlacesError(err.message || 'Couldn’t load spots. Try again.')
    } finally {
      setLoadingPlaces(false)
    }
  }

  const startSwipe = async () => {
    setPlacesError(null)
    setWeatherSummary(null)
    setLoadingPlaces(true)
    try {
      const [weatherResult, eventsResult] = await Promise.allSettled([
        getWeatherForMountProspect(),
        fetchEventsNearMountProspect(),
      ])

      const weather = weatherResult.status === 'fulfilled' ? weatherResult.value : { isIndoorDay: false }
      const events = eventsResult.status === 'fulfilled' ? eventsResult.value : []

      const ideas = getDateIdeasDeck(deckFilter)
      const combined = deckFilter === 'in' ? ideas : [...ideas, ...events]
      for (let i = combined.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combined[i], combined[j]] = [combined[j], combined[i]]
      }

      if (weather.summary) setWeatherSummary(weather.summary)

      setSwipeDeck(combined)
      setCurrentCardIndex(0)
      setSelectedSpot(null)
      setView('swipe')
    } catch (err) {
      console.error(err)
      setPlacesError(err.message || 'Something went wrong. Try again.')
    } finally {
      setLoadingPlaces(false)
    }
  }

  const generateMysteryLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const randomAngle = Math.random() * 2 * Math.PI
        const randomRadius = Math.random() * 0.29

        const newLat = latitude + (randomRadius * Math.cos(randomAngle))
        const newLng = longitude + (randomRadius * Math.sin(randomAngle))

        setMysteryLocation({
          lat: newLat.toFixed(6),
          lng: newLng.toFixed(6),
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${newLat},${newLng}`
        })
        setView('mystery')
      },
      (error) => {
        alert('Unable to get your location. Please enable location services.')
        console.error(error)
      }
    )
  }

  const getAllCards = () => {
    const spotCards = spots.map(s => ({ ...s, type: 'spot' }))
    const wildcardCards = wildcards.map(w => ({ ...w, type: 'wildcard' }))
    return [...spotCards, ...wildcardCards].sort(() => Math.random() - 0.5)
  }

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    if (!cardRef.current) return
    currentXRef.current = e.touches[0].clientX
    const diff = currentXRef.current - startXRef.current
    cardRef.current.style.transform = `translateX(${diff}px) rotate(${diff * 0.1}deg)`

    if (diff > 50) {
      cardRef.current.style.opacity = 1 - (diff / 300)
    } else if (diff < -50) {
      cardRef.current.style.opacity = 1 - (Math.abs(diff) / 300)
    }
  }

  const handleTouchEnd = () => {
    if (!cardRef.current) return
    const diff = currentXRef.current - startXRef.current

    if (diff > 100) {
      handleSwipe('right')
    } else if (diff < -100) {
      handleSwipe('left')
    } else {
      cardRef.current.style.transform = 'translateX(0) rotate(0)'
      cardRef.current.style.opacity = '1'
    }
  }

  const addToThisWeekend = (card) => {
    if (!card) return
    setThisWeekend((prev) => {
      const next = [...prev]
      const exists = next.some((c) => (c.id && c.id === card.id) || c.name === card.name)
      if (exists) return prev
      if (next.length >= MAX_THIS_WEEKEND) next.pop()
      return [{ ...card, addedAt: Date.now() }, ...next]
    })
  }

  const removeFromThisWeekend = (index) => {
    setThisWeekend((prev) => prev.filter((_, i) => i !== index))
  }

  const markAsDone = (index) => {
    const item = thisWeekend[index]
    if (!item) return
    setDoneHistory((prev) => [{ id: item.id, name: item.name, date: new Date().toISOString().slice(0, 10), type: item.type }, ...prev.slice(0, 99)])
    removeFromThisWeekend(index)
  }

  const handleSwipe = (direction) => {
    const cards = swipeDeck

    if (direction === 'right') {
      const card = cards[currentCardIndex]
      setSelectedSpot(card)
      addToThisWeekend(card)
      setSwipeDirection('right')
      setTimeout(() => {
        setView('home')
        setSwipeDirection(null)
      }, 500)
    } else {
      setSwipeDirection('left')
      setTimeout(() => {
        if (currentCardIndex < cards.length - 1) {
          setCurrentCardIndex(currentCardIndex + 1)
          setSwipeDirection(null)
          if (cardRef.current) {
            cardRef.current.style.transform = 'translateX(0) rotate(0)'
            cardRef.current.style.opacity = '1'
          }
        } else {
          setView('home')
          setSwipeDirection(null)
        }
      }, 300)
    }
  }

  return (
    <div className="min-h-screen p-5 md:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-3">
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">Date Night Roulette</span>
          </h1>
          <p className="text-gray-600 text-lg">Never have the &ldquo;idk what do you want to do&rdquo; loop again!</p>
        </header>

        {/* Home View */}
        {view === 'home' && (
          <div className="space-y-4">
            {/* Reminder banners by day */}
            {(() => {
              const day = new Date().getDay()
              const isFriday = day === 5
              const isSaturday = day === 6
              if (isFriday && thisWeekend.length === 0) {
                return (
                  <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4 mb-5 text-amber-900 shadow-soft">
                    <p className="font-medium">📅 Plan your weekend — pick an idea or two!</p>
                  </div>
                )
              }
              if (isSaturday && thisWeekend.length > 0) {
                return (
                  <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-4 mb-5 text-emerald-900 shadow-soft">
                    <p className="font-medium">✨ You’ve got {thisWeekend.length} on the list — go do it!</p>
                  </div>
                )
              }
              return null
            })()}

            {/* This Weekend — we're doing this */}
            {thisWeekend.length > 0 && (
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 mb-6 shadow-soft border border-slate-200/80">
                <h3 className="text-lg font-bold text-slate-800 mb-4">📌 This Weekend</h3>
                <ul className="space-y-4">
                  {thisWeekend.map((item, index) => (
                    <li key={item.addedAt || index} className="bg-slate-50/80 rounded-xl p-4 shadow-sm border border-slate-100">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="font-bold text-slate-900">{item.name}</p>
                          <p className="text-sm text-slate-600">{item.category || item.type}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromThisWeekend(index)}
                          className="text-slate-400 hover:text-red-600 text-sm"
                          aria-label="Remove"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.searchUrl && (
                          <a href={item.searchUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-sm hover:shadow transition-all">
                            🔍 Find near Mount Prospect
                          </a>
                        )}
                        {item.url && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-sm hover:shadow transition-all">
                            🎟️ Get tickets
                          </a>
                        )}
                        {item.type === 'home' && (
                          <span className="text-slate-500 text-sm">No place needed — you’re staying in.</span>
                        )}
                        {item.googleMapsUrl && (
                          <a href={item.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-sm hover:shadow transition-all">
                            🧭 Open in Maps
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => markAsDone(index)}
                          className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-sm hover:shadow transition-all"
                        >
                          ✓ We did it
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedSpot && (
              <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-6 mb-6 shadow-soft">
                <h3 className="text-xl font-bold text-emerald-900 mb-3">🎉 Tonight&apos;s Pick!</h3>
                {selectedSpot.type === 'spot' && (
                  <div>
                    <p className="text-2xl font-bold text-emerald-900">{selectedSpot.name}</p>
                    <p className="text-emerald-700">{selectedSpot.category} • {selectedSpot.budget}</p>
                    {selectedSpot.googleMapsUrl && (
                      <a href={selectedSpot.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3.5 rounded-xl font-semibold shadow-sm hover:shadow transition-all">
                        🧭 Open in Google Maps
                      </a>
                    )}
                  </div>
                )}
                {selectedSpot.type === 'event' && (
                  <div>
                    <p className="text-2xl font-bold text-emerald-900">{selectedSpot.name}</p>
                    <p className="text-emerald-700">{selectedSpot.category}{selectedSpot.description ? ` • ${selectedSpot.description}` : ''} • {selectedSpot.budget}</p>
                    {selectedSpot.url && (
                      <a href={selectedSpot.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3.5 rounded-xl font-semibold shadow-sm hover:shadow transition-all">
                        🎟️ Get tickets
                      </a>
                    )}
                  </div>
                )}
                {selectedSpot.type === 'niche' && (
                  <div>
                    <p className="text-2xl font-bold text-emerald-900">{selectedSpot.name}</p>
                    <p className="text-emerald-700">{selectedSpot.category} • {selectedSpot.budget}</p>
                    {selectedSpot.searchUrl && (
                      <a href={selectedSpot.searchUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3.5 rounded-xl font-semibold shadow-sm hover:shadow transition-all">
                        🔍 Find near Mount Prospect
                      </a>
                    )}
                  </div>
                )}
                {selectedSpot.type === 'home' && (
                  <div>
                    <p className="text-2xl font-bold text-emerald-900">{selectedSpot.name}</p>
                    <p className="text-emerald-700">{selectedSpot.category} • {selectedSpot.budget}</p>
                    {selectedSpot.description && <p className="text-emerald-800 mt-1 text-sm">{selectedSpot.description}</p>}
                  </div>
                )}
                {selectedSpot.type === 'wildcard' && (
                  <div>
                    <p className="text-2xl font-bold text-emerald-900">{selectedSpot.idea}</p>
                    <p className="text-emerald-700">Wildcard • {selectedSpot.budget}</p>
                  </div>
                )}
              </div>
            )}

            {/* Filter: what kind of ideas */}
            <div className="flex flex-wrap gap-2 mb-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'in', label: 'Staying in' },
                { key: 'out', label: 'Going out' },
                { key: 'surprise', label: 'Surprise me' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDeckFilter(key)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    deckFilter === key
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-white/80 border border-slate-200 text-slate-700 hover:border-primary-200 hover:bg-primary-50/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-gray-500 text-xs mb-2">Rainy? Pick “Staying in” for indoor ideas.</p>
            {thisWeekend.length < MAX_THIS_WEEKEND && (() => {
              const indoor = getIndoorIdeas(3)
              return (
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-gray-500 text-xs w-full">Quick add indoor:</span>
                  {indoor.map((idea) => (
                    <button
                      key={idea.id}
                      type="button"
                      onClick={() => addToThisWeekend(idea)}
                      className="text-xs bg-white/80 border border-slate-200 hover:border-primary-200 hover:bg-primary-50/50 text-slate-700 px-3.5 py-2 rounded-xl transition-all"
                    >
                      {idea.emoji} {idea.name}
                    </button>
                  ))}
                </div>
              )
            })()}
            {doneHistory.length > 0 && (() => {
              const recent = doneHistory.slice(0, 5)
              const allHome = recent.length >= 2 && recent.every((d) => d.type === 'home')
              if (allHome) {
                return <p className="text-amber-700 text-xs mb-2">Haven’t gone out in a while? Try “Going out” for a change.</p>
              }
              return null
            })()}

            <div className="grid gap-4 md:grid-cols-2">
              <button
                onClick={startSwipe}
                disabled={loadingPlaces}
                className="bg-primary-500 hover:bg-primary-600 disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-2xl p-8 text-xl font-bold shadow-soft hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
              >
                {loadingPlaces ? '⏳ Loading ideas…' : '🎲 Start Swiping'}
              </button>
              {placesError && (
                <p className="text-red-600 text-sm col-span-2">{placesError}</p>
              )}

              <button
                onClick={startPlacesSwipe}
                disabled={loadingPlaces}
                className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-2xl p-6 text-lg font-semibold shadow-soft hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
              >
                📍 Surprise me with a spot
              </button>
              <button
                onClick={generateMysteryLocation}
                className="bg-violet-500 hover:bg-violet-600 text-white rounded-2xl p-8 text-xl font-bold shadow-soft hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
              >
                🗺️ Mystery Adventure
              </button>

              <button
                onClick={() => setView('manage')}
                className="bg-slate-700 hover:bg-slate-800 text-white rounded-2xl p-8 text-xl font-bold shadow-soft hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
              >
                ⚙️ Manage Spots
              </button>

              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-soft border border-slate-200/80">
                <p className="text-gray-500 text-sm mb-2">Your Collection</p>
                <p className="text-2xl font-bold text-gray-800">{spots.length} Spots</p>
                <p className="text-2xl font-bold text-gray-800">{wildcards.length} Wildcards</p>
              </div>
            </div>
          </div>
        )}

        {/* Swipe View */}
        {view === 'swipe' && (
          <div className="relative">
            <button
              onClick={() => setView('home')}
              className="mb-4 text-slate-600 hover:text-slate-900 font-medium py-1 px-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              ← Back
            </button>
            {weatherSummary && (
              <p className="mb-4 text-sm text-sky-800 bg-sky-50/90 border border-sky-200/80 rounded-xl px-4 py-2.5 shadow-soft">
                🌧️ {weatherSummary}
              </p>
            )}

            <SwipeCard
              cards={swipeDeck}
              currentIndex={currentCardIndex}
              cardRef={cardRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onSwipe={handleSwipe}
            />
          </div>
        )}

        {/* Manage View */}
        {view === 'manage' && (
          <ManageView
            spots={spots}
            wildcards={wildcards}
            addSpot={addSpot}
            deleteSpot={deleteSpot}
            addWildcard={addWildcard}
            deleteWildcard={deleteWildcard}
            onBack={() => setView('home')}
          />
        )}

        {/* Mystery Location View */}
        {view === 'mystery' && mysteryLocation && (
          <div className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-card border border-slate-200/80">
            <button
              onClick={() => setView('home')}
              className="mb-4 text-slate-600 hover:text-slate-900 font-medium py-1 px-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              ← Back
            </button>

            <h2 className="text-3xl font-bold text-violet-700 mb-6">🗺️ Mystery Destination</h2>

            <div className="bg-violet-50/80 rounded-xl p-6 mb-6 border border-violet-100">
              <p className="text-gray-700 mb-4">
                Your mystery coordinates are waiting! This random spot is within 20 miles of your current location.
              </p>

              <div className="bg-white rounded-lg p-4 mb-4 font-mono text-sm border border-violet-100">
                <p className="text-gray-600">Latitude: {mysteryLocation.lat}</p>
                <p className="text-gray-600">Longitude: {mysteryLocation.lng}</p>
              </div>

              <a
                href={mysteryLocation.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-violet-500 hover:bg-violet-600 text-white text-center py-4 rounded-xl font-semibold shadow-soft hover:shadow transition-all"
              >
                🧭 Open in Google Maps
              </a>
            </div>

            <button
              onClick={generateMysteryLocation}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3.5 rounded-xl font-medium transition-colors"
            >
              🔄 Generate New Location
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
