import { useState } from 'react'
import { dsaTopics } from '../../data/dsaTopics'
import DsaCodeView from './DsaCodeView'
import './dsa.css'

const ENQUEUE_JS = `function enqueue(queue, val) {\n  queue.push(val)       // add to back, O(1)\n}`
const ENQUEUE_PY = `def enqueue(queue, val):\n    queue.append(val)     # add to back, O(1)`
const DEQUEUE_JS = `function dequeue(queue) {\n  return queue.shift()  // remove from front, O(n)\n}`
const DEQUEUE_PY = `def dequeue(queue):\n    return queue.pop(0)   # remove from front, O(n)`
const PEEK_Q_JS  = `function peek(queue) {\n  return queue[0]       // front element\n}`
const PEEK_Q_PY  = `def peek(queue):\n    return queue[0]       # front element`
const CLEAR_Q_JS = `function clear(queue) {\n  queue.length = 0\n}`
const CLEAR_Q_PY = `def clear(queue):\n    queue.clear()`

export default function Queue({ view, setTrace }) {
  const [queue, setQueue] = useState([1, 5, 9])
  const [inputVal, setInputVal] = useState('')
  const [log, setLog] = useState(['Queue initialized with [1, 5, 9]'])

  const addLog = (msg) => setLog(prev => [msg, ...prev])

  const enqueue = () => {
    const val = inputVal.trim()
    if (!val) return
    const num = isNaN(val) ? val : Number(val)
    setQueue(prev => {
      const next = [...prev, num]
      addLog(`Enqueued ${num} → queue is now [${next.join(', ')}]`)
      setTrace?.({ jsCode: ENQUEUE_JS, pyCode: ENQUEUE_PY, activeLine: 1, variables: { val: num, queueSize: next.length } })
      return next
    })
    setInputVal('')
  }

  const dequeue = () => {
    if (queue.length === 0) { addLog('Queue is empty — nothing to dequeue'); return }
    const dequeued = queue[0]
    setQueue(prev => {
      const next = prev.slice(1)
      addLog(`Dequeued ${dequeued} → queue is now [${next.join(', ')}]`)
      setTrace?.({ jsCode: DEQUEUE_JS, pyCode: DEQUEUE_PY, activeLine: 1, variables: { dequeued, queueSize: next.length } })
      return next
    })
  }

  const peek = () => {
    if (queue.length === 0) { addLog('Queue is empty — nothing to peek'); return }
    const front = queue[0]
    addLog(`Peek → front is ${front} (queue unchanged)`)
    setTrace?.({ jsCode: PEEK_Q_JS, pyCode: PEEK_Q_PY, activeLine: 1, variables: { front, queueSize: queue.length } })
  }

  const clear = () => {
    setQueue([])
    setLog(['Queue cleared'])
    setTrace?.({ jsCode: CLEAR_Q_JS, pyCode: CLEAR_Q_PY, activeLine: 1, variables: { queueSize: 0 } })
  }

  if (view === 'code') return <DsaCodeView blocks={dsaTopics.queue} />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div className="ds-controls">
        <input
          className="ds-input"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && enqueue()}
          placeholder="value"
        />
        <button type="button" className="ds-btn" title="Add value to the back of the queue" onClick={enqueue}>Enqueue</button>
        <button type="button" className="ds-btn secondary" title="Remove and return the front value" onClick={dequeue} disabled={queue.length === 0}>Dequeue</button>
        <button type="button" className="ds-btn secondary" title="View the front value without removing it" onClick={peek} disabled={queue.length === 0}>Peek</button>
        <button type="button" className="ds-btn secondary" title="Remove all values from the queue" onClick={clear}>Clear</button>
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
