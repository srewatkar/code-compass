import { useState } from 'react'
import { dsaTopics } from '../../data/dsaTopics'
import DsaCodeView from './DsaCodeView'
import './dsa.css'

export default function Stack({ view }) {
  const [stack, setStack] = useState([3, 7, 1])
  const [inputVal, setInputVal] = useState('')
  const [log, setLog] = useState(['Stack initialized with [3, 7, 1]'])

  const addLog = (msg) => setLog(prev => [msg, ...prev])

  const push = () => {
    const val = inputVal.trim()
    if (!val) return
    const num = isNaN(val) ? val : Number(val)
    setStack(prev => {
      addLog(`Pushed ${num} → stack is now [${[...prev, num].join(', ')}]`)
      return [...prev, num]
    })
    setInputVal('')
  }

  const pop = () => {
    if (stack.length === 0) { addLog('Stack is empty — nothing to pop'); return }
    const top = stack[stack.length - 1]
    setStack(prev => {
      const next = prev.slice(0, -1)
      addLog(`Popped ${top} → stack is now [${next.join(', ')}]`)
      return next
    })
  }

  const peek = () => {
    if (stack.length === 0) { addLog('Stack is empty — nothing to peek'); return }
    addLog(`Peek → top is ${stack[stack.length - 1]} (stack unchanged)`)
  }

  const clear = () => {
    setStack([])
    setLog(['Stack cleared'])
  }

  if (view === 'code') return <DsaCodeView blocks={dsaTopics.stack} />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div className="ds-controls">
        <input
          className="ds-input"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && push()}
          placeholder="value"
          type="text"
        />
        <button type="button" className="ds-btn" title="Add value to the top of the stack" onClick={push}>Push</button>
        <button type="button" className="ds-btn secondary" title="Remove and return the top value" onClick={pop} disabled={stack.length === 0}>Pop</button>
        <button type="button" className="ds-btn secondary" title="View the top value without removing it" onClick={peek} disabled={stack.length === 0}>Peek</button>
        <button type="button" className="ds-btn secondary" title="Remove all values from the stack" onClick={clear}>Clear</button>
      </div>

      <div className="ds-visual-label">Stack (top → bottom)</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 60 }}>
        {stack.length === 0 && (
          <div style={{ color: '#94a3b8', fontSize: 13, fontStyle: 'italic' }}>Stack is empty</div>
        )}
        {[...stack].reverse().map((val, i) => (
          <div
            key={`${val}-${i}`}
            style={{
              background: i === 0 ? '#ede9fe' : '#f8faff',
              border: `1px solid ${i === 0 ? '#7c3aed' : '#e2e8f0'}`,
              borderRadius: 6,
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'monospace',
              fontSize: 14,
              fontWeight: i === 0 ? 700 : 400,
              color: i === 0 ? '#7c3aed' : '#334155',
              transition: 'all 0.15s',
              maxWidth: 320,
            }}
          >
            <span>{val}</span>
            {i === 0 && <span style={{ fontSize: 11, fontWeight: 400, color: '#a78bfa' }}>← top</span>}
          </div>
        ))}
      </div>

      <div className="ds-log">
        <div className="ds-log-header">Log</div>
        <div className="ds-log-entries">
          {log.length === 0
            ? <span className="ds-empty-log">No operations yet</span>
            : log.map((entry, i) => <div key={i} className="ds-log-entry">{entry}</div>)
          }
        </div>
      </div>
    </div>
  )
}
