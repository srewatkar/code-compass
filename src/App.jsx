import { useState, useMemo } from 'react'
import { topics } from './data/topics'
import TopNav from './components/TopNav'
import Sidebar from './components/Sidebar'
import DetailPanel from './components/DetailPanel'
import DsaPanel from './components/dsa/DsaPanel'
import AlgoPanel from './components/algo/AlgoPanel'
import './App.css'

export default function App() {
  const [mode, setMode] = useState('cheatsheet')
  const [selectedId, setSelectedId] = useState(topics[0]?.items[0]?.id ?? null)
  const [searchQuery, setSearchQuery] = useState('')

  const totalTopics = topics.reduce((sum, cat) => sum + cat.items.length, 0)

  const selectedTopic = useMemo(() => {
    for (const cat of topics) {
      const found = cat.items.find(item => item.id === selectedId)
      if (found) return found
    }
    return null
  }, [selectedId])

  return (
    <div className="app">
      <TopNav mode={mode} onModeChange={setMode} />

      {mode === 'cheatsheet' && (
        <div className="cheatsheet-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder={`🔍 Search ${totalTopics} comparisons...`}
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
      )}

      {mode === 'dsa' && <DsaPanel />}
      {mode === 'algo' && <AlgoPanel />}
    </div>
  )
}
