import { useState } from 'react'
import { dsaTopics } from '../../data/dsaTopics'
import DsaCodeView from './DsaCodeView'
import './dsa.css'

const APPEND_JS = `function append(list, val) {\n  const node = { val, next: null }\n  if (!list.head) { list.head = node; return }\n  let curr = list.head\n  while (curr.next) curr = curr.next\n  curr.next = node   // link to tail\n}`
const APPEND_PY = `def append(self, val):\n    node = Node(val)\n    if not self.head:\n        self.head = node; return\n    curr = self.head\n    while curr.next: curr = curr.next\n    curr.next = node   # link to tail`

const PREPEND_JS = `function prepend(list, val) {\n  list.head = { val, next: list.head }  // new head\n}`
const PREPEND_PY = `def prepend(self, val):\n    self.head = Node(val, self.head)  # new head`

const DELETE_JS = `function deleteNode(list, val) {\n  if (list.head?.val === val) { list.head = list.head.next; return }\n  let curr = list.head\n  while (curr.next && curr.next.val !== val) curr = curr.next\n  if (curr.next) curr.next = curr.next.next  // skip node\n}`
const DELETE_PY = `def delete(self, val):\n    if self.head and self.head.val == val:\n        self.head = self.head.next; return\n    curr = self.head\n    while curr.next and curr.next.val != val: curr = curr.next\n    if curr.next: curr.next = curr.next.next  # skip node`

export default function LinkedList({ view, setTrace }) {
  const [list, setList] = useState([4, 2, 8])
  const [inputVal, setInputVal] = useState('')
  const [log, setLog] = useState(['List initialized with 4 → 2 → 8'])
  const [deletedIdx, setDeletedIdx] = useState(null)

  const addLog = (msg) => setLog(prev => [msg, ...prev])

  const parse = (val) => isNaN(val.trim()) ? val.trim() : Number(val.trim())

  const append = () => {
    const val = inputVal.trim()
    if (!val) return
    const num = parse(val)
    setList(prev => {
      const newList = [...prev, num]
      addLog(`Appended ${num} → list is now ${newList.join(' → ')}`)
      setTrace?.({ jsCode: APPEND_JS, pyCode: APPEND_PY, activeLine: 5, variables: { val: num, length: newList.length } })
      return newList
    })
    setInputVal('')
  }

  const prepend = () => {
    const val = inputVal.trim()
    if (!val) return
    const num = parse(val)
    setList(prev => {
      const newList = [num, ...prev]
      addLog(`Prepended ${num} → list is now ${newList.join(' → ')}`)
      setTrace?.({ jsCode: PREPEND_JS, pyCode: PREPEND_PY, activeLine: 1, variables: { val: num, length: newList.length } })
      return newList
    })
    setInputVal('')
  }

  const deleteNode = () => {
    const val = inputVal.trim()
    if (!val) return
    const num = parse(val)
    const idx = list.findIndex(v => v == num)
    if (idx === -1) { addLog(`${num} not found in list`); return }
    setDeletedIdx(idx)
    setTimeout(() => {
      setList(prev => {
        const next = prev.filter((_, i) => i !== idx)
        addLog(`Deleted ${num} → list is now ${next.join(' → ') || 'empty'}`)
        setTrace?.({ jsCode: DELETE_JS, pyCode: DELETE_PY, activeLine: 4, variables: { deleted: num, length: next.length } })
        return next
      })
      setDeletedIdx(null)
    }, 300)
    setInputVal('')
  }

  const clear = () => { setList([]); setLog(['List cleared']); setDeletedIdx(null) }

  if (view === 'code') return <DsaCodeView blocks={dsaTopics.linkedlist} />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div className="ds-controls">
        <input
          className="ds-input"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="value"
        />
        <button type="button" className="ds-btn" title="Add value to the end of the list (O(n))" onClick={append}>Append</button>
        <button type="button" className="ds-btn" title="Add value to the beginning of the list (O(1))" onClick={prepend}>Prepend</button>
        <button type="button" className="ds-btn secondary" title="Find and remove the node with this value" onClick={deleteNode} disabled={list.length === 0}>Delete</button>
        <button type="button" className="ds-btn secondary" title="Remove all nodes from the list" onClick={clear}>Clear</button>
      </div>

      <div className="ds-visual-label">Linked List (head → tail)</div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4, minHeight: 52 }}>
        {list.length === 0 && (
          <div style={{ color: '#94a3b8', fontSize: 13, fontStyle: 'italic' }}>List is empty</div>
        )}
        {list.map((val, i) => (
          <div key={`${val}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{
              background: deletedIdx === i ? '#fee2e2' : i === 0 ? '#ede9fe' : '#f8faff',
              border: `1px solid ${deletedIdx === i ? '#fca5a5' : i === 0 ? '#7c3aed' : '#e2e8f0'}`,
              borderRadius: 6,
              padding: '8px 14px',
              fontFamily: 'monospace',
              fontSize: 13,
              color: deletedIdx === i ? '#dc2626' : i === 0 ? '#7c3aed' : '#334155',
              fontWeight: i === 0 ? 700 : 400,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              minWidth: 48,
              opacity: deletedIdx === i ? 0.4 : 1,
              transition: 'all 0.25s',
            }}>
              <span>{val}</span>
              {i === 0 && <span style={{ fontSize: 10, color: '#a78bfa', fontWeight: 400 }}>head</span>}
              {i === list.length - 1 && i !== 0 && <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 400 }}>tail</span>}
            </div>
            {i < list.length - 1 && <span style={{ color: '#7c3aed', fontSize: 16, fontWeight: 700 }}>→</span>}
          </div>
        ))}
        {list.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#cbd5e1', fontSize: 16 }}>→</span>
            <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>null</span>
          </div>
        )}
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
