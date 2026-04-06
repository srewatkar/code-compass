import { useState, useMemo } from 'react'
import { topics } from './data/topics'
import Sidebar from './components/Sidebar'
import DetailPanel from './components/DetailPanel'
import './App.css'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const selectedTopic = useMemo(() => {
    for (const cat of topics) {
      const found = cat.items.find(item => item.id === selectedId)
      if (found) return found
    }
    return null
  }, [selectedId])

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search comparisons..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="main">
        <Sidebar
          topics={topics}
          selectedId={selectedId}
          onSelect={setSelectedId}
          searchQuery={searchQuery}
        />
        <DetailPanel topic={selectedTopic} />
      </div>
    </div>
  )
}
