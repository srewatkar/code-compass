import { useState } from 'react'
import { algoPatterns } from '../../data/algoPatterns'
import AlgoCodeView from './AlgoCodeView'
import SlidingWindow from './patterns/SlidingWindow'
import TwoPointers from './patterns/TwoPointers'
import FastSlowPointers from './patterns/FastSlowPointers'
import PrefixSum from './patterns/PrefixSum'
import MonotonicStack from './patterns/MonotonicStack'
import BFSTemplate from './patterns/BFSTemplate'
import DFSTemplate from './patterns/DFSTemplate'
import Backtracking from './patterns/Backtracking'
import TopologicalSort from './patterns/TopologicalSort'
import BinarySearch from './patterns/BinarySearch'
import BinarySearchOnAnswer from './patterns/BinarySearchOnAnswer'
import DP1DMemo from './patterns/DP1DMemo'
import DP1DTab from './patterns/DP1DTab'
import DP2D from './patterns/DP2D'
import HashMap from './patterns/HashMap'
import MergeIntervals from './patterns/MergeIntervals'
import Heap from './patterns/Heap'
import './AlgoPanel.css'

const PATTERN_SIMULATORS = {
  'sliding-window': SlidingWindow,
  'two-pointers': TwoPointers,
  'fast-slow-pointers': FastSlowPointers,
  'prefix-sum': PrefixSum,
  'monotonic-stack': MonotonicStack,
  'bfs': BFSTemplate,
  'dfs': DFSTemplate,
  'backtracking': Backtracking,
  'topological-sort': TopologicalSort,
  'binary-search': BinarySearch,
  'binary-search-on-answer': BinarySearchOnAnswer,
  'dp-1d-memo': DP1DMemo,
  'dp-1d-tab': DP1DTab,
  'dp-2d': DP2D,
  'hashmap': HashMap,
  'merge-intervals': MergeIntervals,
  'heap': Heap,
}

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
            : (() => {
                const SimulatorComponent = PATTERN_SIMULATORS[selectedPattern.id]
                return SimulatorComponent
                  ? <SimulatorComponent />
                  : <div>No simulator yet</div>
              })()
          }
        </div>
      </div>
    </div>
  )
}
