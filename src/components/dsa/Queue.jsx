import { useState } from 'react'
import { dsaTopics } from '../../data/dsaTopics'
import DsaCodeView from './DsaCodeView'
import './dsa.css'

export default function Queue({ view }) {
  const [queue, setQueue] = useState([1, 5, 9])
  const [inputVal, setInputVal] = useState('')
  const [log, setLog] = useState(['Queue initialized with [1, 5, 9]'])

  const addLog = (msg) => setLog(prev => [msg, ...prev])

  const enqueue = () => {
    const val = inputVal.trim()
    if (!val) return
    const num = isNaN(val) ? val : Number(val)
    setQueue(prev => {
      addLog(`Enqueued ${num} → queue is now [${[...prev, num].join(', ')}]`)
      return [...prev, num]
    })
    setInputVal('')
  }

  const dequeue = () => {
    if (queue.length === 0) { addLog('Queue is empty — nothing to dequeue'); return }
    const front = queue[0]
    setQueue(prev => {
      const next = prev.slice(1)
      addLog(`Dequeued ${front} → queue is now [${next.join(', ')}]`)
      return next
    })
  }

  const peek = () => {
    if (queue.length === 0) { addLog('Queue is empty — nothing to peek'); return }
    addLog(`Peek → front is ${queue[0]} (queue unchanged)`)
  }

  const clear = () => { setQueue([]); setLog(['Queue cleared']) }

  if (view === 'code') return <DsaCodeView blocks={dsaTopics.queue} />

  return (
    <div>
      <div className="ds-controls">
        <input
          className="ds-input"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && enqueue()}
          placeholder="value"
        />
        <button type="button" className="ds-btn" onClick={enqueue}>Enqueue</button>
        <button type="button" className="ds-btn secondary" onClick={dequeue} disabled={queue.length === 0}>Dequeue</button>
        <button type="button" className="ds-btn secondary" onClick={peek} disabled={queue.length === 0}>Peek</button>
        <button type="button" className="ds-btn secondary" onClick={clear}>Clear</button>
      </div>

      <div className="ds-visual-label">Queue (front → back)</div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', minHeight: 52 }}>
        {queue.length === 0 && (
          <div style={{ color: '#94a3b8', fontSize: 13, fontStyle: 'italic' }}>Queue is empty</div>
        )}
        {queue.map((val, i) => (
          <div key={`${val}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              background: i === 0 ? '#ede9fe' : '#f8faff',
              border: `1px solid ${i === 0 ? '#7c3aed' : '#e2e8f0'}`,
              borderRadius: 6,
              padding: '10px 16px',
              fontFamily: 'monospace',
              fontSize: 14,
              fontWeight: i === 0 ? 700 : 400,
              color: i === 0 ? '#7c3aed' : '#334155',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              minWidth: 48,
              transition: 'all 0.15s',
            }}>
              <span>{val}</span>
              {i === 0 && <span style={{ fontSize: 10, color: '#a78bfa', fontWeight: 400 }}>front</span>}
              {i === queue.length - 1 && i !== 0 && <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 400 }}>back</span>}
            </div>
            {i < queue.length - 1 && <span style={{ color: '#cbd5e1', fontSize: 18 }}>→</span>}
          </div>
        ))}
      </div>

      <div className="ds-log">
        <div className="ds-log-header">Log</div>
        <div className="ds-log-entries">
          {log.map((entry, i) => <div key={i} className="ds-log-entry">{entry}</div>)}
        </div>
      </div>
    </div>
  )
}
