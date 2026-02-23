const CATEGORY_EMOJI = {
  Restaurant: '🍝',
  Cafe: '☕',
  Bar: '🍹',
  Pub: '🍺',
  'Quick Bite': '🍔',
  Cinema: '🎬',
  Theatre: '🎭',
  Dessert: '🍦',
  'Arts & Culture': '🎨',
  Museum: '🏛️',
  Gallery: '🖼️',
  Attraction: '⭐',
  'Theme Park': '🎢',
  Zoo: '🦁',
  Viewpoint: '🌄',
  Park: '🌳',
  'Water Park': '🌊',
  'Mini Golf': '⛳',
  Bowling: '🎳',
  'Ice Skating': '⛸️',
  Stadium: '🏟️',
  Fitness: '💪',
  Golf: '⛳',
  Nature: '🍃',
  'Escape Room': '🔐',
  Dance: '💃',
  Arcade: '🕹️',
  Marina: '⛵',
  Garden: '🌸',
  'Disc Golf': '🥏',
  'Horseback Riding': '🐴',
  Beach: '🏖️',
  Fishing: '🎣',
  Sports: '⚽',
  'Green Space': '🌿',
}

function SwipeCard({ cards, currentIndex, cardRef, onTouchStart, onTouchMove, onTouchEnd, onSwipe }) {
  if (cards.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur rounded-2xl p-10 text-center shadow-card border border-slate-200/80">
        <p className="text-gray-600 text-lg">No cards available. Add some spots or wildcards!</p>
      </div>
    )
  }

  if (currentIndex >= cards.length) {
    return (
      <div className="bg-white/90 backdrop-blur rounded-2xl p-10 text-center shadow-card border border-slate-200/80">
        <p className="text-2xl font-bold text-gray-800 mb-3">🎉 All done!</p>
        <p className="text-gray-600">You&apos;ve gone through all the options.</p>
      </div>
    )
  }

  const card = cards[currentIndex]

  return (
    <div className="relative h-[500px] flex items-center justify-center">
      {/* Instructions */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-8 text-sm text-gray-500">
        <span>← Swipe left to pass</span>
        <span>Swipe right to choose →</span>
      </div>

      {/* Card Stack Background */}
      {currentIndex + 1 < cards.length && (
        <div className="absolute bg-slate-200/60 rounded-3xl w-80 h-96 top-12 transform scale-95 opacity-60"></div>
      )}

      {currentIndex + 2 < cards.length && (
        <div className="absolute bg-slate-300/50 rounded-3xl w-80 h-96 top-12 transform scale-90 opacity-40"></div>
      )}

      {/* Active Card */}
      <div
        ref={cardRef}
        className="swipe-card bg-white rounded-3xl w-80 h-96 shadow-card border border-slate-200/80 p-8 flex flex-col justify-between cursor-grab active:cursor-grabbing absolute"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {card.type === 'spot' && (
          <>
            <div>
              <div className="text-5xl mb-4">{CATEGORY_EMOJI[card.category] || '📍'}</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{card.name}</h3>
              <p className="text-gray-600 text-lg">{card.category}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-primary-100 rounded-lg px-4 py-2 inline-block w-fit">
                <p className="text-primary-800 font-bold text-xl">{card.budget}</p>
              </div>
              {card.googleMapsUrl && (
                <a href={card.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline">🗺️ View on map</a>
              )}
            </div>
          </>
        )}

        {card.type === 'niche' && (
          <>
            <div>
              <div className="text-5xl mb-4">{card.emoji || '✨'}</div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{card.category}</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1 mb-2">{card.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-amber-100 rounded-lg px-4 py-2 inline-block w-fit">
                <p className="text-amber-800 font-bold">{card.budget}</p>
              </div>
              {card.searchUrl && (
                <a href={card.searchUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline">🔍 Find near Mount Prospect</a>
              )}
            </div>
          </>
        )}

        {card.type === 'home' && (
          <>
            <div>
              <div className="text-5xl mb-4">{card.emoji || '🏠'}</div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{card.category}</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1 mb-2">{card.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
            </div>
            <div className="bg-slate-100 rounded-lg px-4 py-2 inline-block w-fit">
              <p className="text-slate-800 font-bold">{card.budget}</p>
            </div>
          </>
        )}

        {card.type === 'event' && (
          <>
            <div>
              <div className="text-5xl mb-4">{card.emoji || '🎟️'}</div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{card.category}</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1 mb-1">{card.name}</h3>
              {card.description && <p className="text-gray-600 text-sm">{card.description}</p>}
              {card.date && <p className="text-gray-500 text-xs mt-1">{card.date}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-primary-100 rounded-lg px-4 py-2 inline-block w-fit">
                <p className="text-primary-800 font-bold">{card.budget}</p>
              </div>
              {card.url && (
                <a href={card.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline">🎟️ Get tickets</a>
              )}
            </div>
          </>
        )}

        {card.type === 'wildcard' && (
          <>
            <div>
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Wildcard Idea!</h3>
              <p className="text-gray-700 text-lg leading-relaxed">{card.idea}</p>
            </div>
            <div className="bg-purple-100 rounded-lg px-4 py-2 inline-block">
              <p className="text-purple-800 font-bold text-xl">{card.budget}</p>
            </div>
          </>
        )}
      </div>

      {/* Button Controls for Desktop */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-10 pb-8">
        <button
          onClick={() => onSwipe('left')}
          className="bg-slate-200 hover:bg-red-500 hover:text-white text-slate-600 w-16 h-16 rounded-full shadow-soft text-2xl transition-all duration-200 hover:scale-110"
          title="Pass"
        >
          ✕
        </button>

        <button
          onClick={() => onSwipe('right')}
          className="bg-emerald-500 hover:bg-emerald-600 text-white w-16 h-16 rounded-full shadow-soft text-2xl transition-all duration-200 hover:scale-110 hover:shadow-card"
          title="Choose this!"
        >
          ♥
        </button>
      </div>
    </div>
  )
}

export default SwipeCard
