import { useState } from 'react'
import { algoPatterns } from '../../data/algoPatterns'
import AlgoCodeView from './AlgoCodeView'
import './AlgoPanel.css'

export default function AlgoPanel() {
  const [selectedId, setSelectedId] = useState('sliding-window')
  const [activeView, setActiveView] = useState('simulate')

  const selectedPattern = algoPatterns
    .flatMap(cat => cat.patterns)
    .find(p => p.id === selectedId) ?? algoPatterns[0].patterns[0]

  return (
    <div className="algo-panel">
      {/* Sidebar */}
      <div className="algo-sidebar">
        {algoPatterns.map(cat => (
          <div key={cat.id}>
            <div className="algo-cat-label">{cat.label}</div>
            {cat.patterns.map(p => (
              <button
                key={p.id}
                type="button"
                className={`algo-pattern-btn${selectedId === p.id ? ' active' : ''}`}
                onClick={() => { setSelectedId(p.id); setActiveView('simulate') }}
              >
                {p.title}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Detail panel */}
      <div className="algo-detail">
        {/* Header: title + when to use */}
        <div className="algo-detail-header">
          <div className="algo-detail-title">{selectedPattern.title}</div>
          <div className="algo-when-to-use">
            <strong>When to use: </strong>{selectedPattern.whenToUse}
          </div>
        </div>

        {/* View tabs */}
        <div className="algo-view-tabs">
          <button
            type="button"
            className={`algo-view-tab${activeView === 'simulate' ? ' active' : ''}`}
            onClick={() => setActiveView('simulate')}
          >
            Simulate
          </button>
          <button
            type="button"
            className={`algo-view-tab${activeView === 'code' ? ' active' : ''}`}
            onClick={() => setActiveView('code')}
          >
            Code
          </button>
        </div>

        {/* Content */}
        <div className="algo-content">
          {activeView === 'code'
            ? <AlgoCodeView blocks={selectedPattern.codeBlocks} />
            : (
              <div style={{ color: '#94a3b8', fontSize: 13, fontStyle: 'italic', paddingTop: 8 }}>
                Simulator coming soon for {selectedPattern.title}
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
