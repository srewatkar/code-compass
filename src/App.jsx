import { useState } from 'react'
import './App.css'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

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
        {/* Sidebar and DetailPanel go here */}
      </div>
    </div>
  )
}
