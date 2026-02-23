import { useState } from 'react'

function ManageView({ spots, wildcards, addSpot, deleteSpot, addWildcard, deleteWildcard, onBack }) {
  const [tab, setTab] = useState('spots')
  const [showForm, setShowForm] = useState(false)

  const [newSpot, setNewSpot] = useState({
    name: '',
    category: '',
    budget: '$'
  })

  const [newWildcard, setNewWildcard] = useState({
    idea: '',
    budget: '$'
  })

  const handleAddSpot = (e) => {
    e.preventDefault()
    if (newSpot.name && newSpot.category) {
      addSpot(newSpot)
      setNewSpot({ name: '', category: '', budget: '$' })
      setShowForm(false)
    }
  }

  const handleAddWildcard = (e) => {
    e.preventDefault()
    if (newWildcard.idea) {
      addWildcard(newWildcard)
      setNewWildcard({ idea: '', budget: '$' })
      setShowForm(false)
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl p-6 md:p-8 shadow-card border border-slate-200/80">
      <button
        onClick={onBack}
        className="mb-4 text-slate-600 hover:text-slate-900 font-medium py-1 px-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        ← Back
      </button>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Manage Your Collection</h2>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-slate-200">
        <button
          onClick={() => setTab('spots')}
          className={`pb-3 px-4 font-medium transition-colors rounded-t-lg ${
            tab === 'spots'
              ? 'text-primary-600 border-b-2 border-primary-500 bg-primary-50/30'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Spots ({spots.length})
        </button>

        <button
          onClick={() => setTab('wildcards')}
          className={`pb-3 px-4 font-medium transition-colors rounded-t-lg ${
            tab === 'wildcards'
              ? 'text-primary-600 border-b-2 border-primary-500 bg-primary-50/30'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Wildcards ({wildcards.length})
        </button>
      </div>

      {/* Spots Tab */}
      {tab === 'spots' && (
        <div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-4 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm hover:shadow transition-all"
          >
            {showForm ? '✕ Cancel' : '+ Add Spot'}
          </button>

          {showForm && (
            <form onSubmit={handleAddSpot} className="bg-primary-50/80 rounded-xl p-6 mb-6 border border-primary-100">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Spot Name</label>
                  <input
                    type="text"
                    value={newSpot.name}
                    onChange={(e) => setNewSpot({ ...newSpot, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Bella Vista"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Category</label>
                  <input
                    type="text"
                    value={newSpot.category}
                    onChange={(e) => setNewSpot({ ...newSpot, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Italian, Entertainment"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Budget</label>
                  <select
                    value={newSpot.budget}
                    onChange={(e) => setNewSpot({ ...newSpot, budget: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="$">$ (Budget-friendly)</option>
                    <option value="$$">$$ (Moderate)</option>
                    <option value="$$$">$$$ (Upscale)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-bold transition"
                >
                  Add Spot
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {spots.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No spots yet. Add your first one!</p>
            ) : (
              spots.map(spot => (
                <div key={spot.id} className="bg-slate-50/80 rounded-xl p-4 flex justify-between items-center border border-slate-100">
                  <div>
                    <h4 className="font-bold text-gray-800">{spot.name}</h4>
                    <p className="text-gray-600 text-sm">{spot.category} • {spot.budget}</p>
                  </div>
                  <button
                    onClick={() => deleteSpot(spot.id)}
                    className="text-red-500 hover:text-red-700 font-bold text-xl"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Wildcards Tab */}
      {tab === 'wildcards' && (
        <div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-4 bg-violet-500 hover:bg-violet-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm hover:shadow transition-all"
          >
            {showForm ? '✕ Cancel' : '+ Add Wildcard'}
          </button>

          {showForm && (
            <form onSubmit={handleAddWildcard} className="bg-violet-50/80 rounded-xl p-6 mb-6 border border-violet-100">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Wildcard Idea</label>
                  <textarea
                    value={newWildcard.idea}
                    onChange={(e) => setNewWildcard({ ...newWildcard, idea: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24"
                    placeholder="e.g., Try a new cuisine we've never had"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Budget</label>
                  <select
                    value={newWildcard.budget}
                    onChange={(e) => setNewWildcard({ ...newWildcard, budget: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="$">$ (Budget-friendly)</option>
                    <option value="$$">$$ (Moderate)</option>
                    <option value="$$$">$$$ (Upscale)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-bold transition"
                >
                  Add Wildcard
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {wildcards.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No wildcards yet. Add your first one!</p>
            ) : (
              wildcards.map(wildcard => (
                <div key={wildcard.id} className="bg-slate-50/80 rounded-xl p-4 flex justify-between items-start border border-slate-100">
                  <div className="flex-1">
                    <p className="text-gray-800">{wildcard.idea}</p>
                    <p className="text-gray-600 text-sm mt-1">{wildcard.budget}</p>
                  </div>
                  <button
                    onClick={() => deleteWildcard(wildcard.id)}
                    className="text-red-500 hover:text-red-700 font-bold text-xl ml-4"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageView
