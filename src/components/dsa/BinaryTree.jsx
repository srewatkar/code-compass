import { useState } from 'react'
import { dsaTopics } from '../../data/dsaTopics'
import DsaCodeView from './DsaCodeView'
import './dsa.css'

function insertBST(node, val) {
  if (!node) return { value: val, left: null, right: null }
  if (val < node.value) return { ...node, left: insertBST(node.left, val) }
  if (val > node.value) return { ...node, right: insertBST(node.right, val) }
  return node
}

function getSearchPath(node, val, path = []) {
  if (!node) return path
  path.push(node.value)
  if (node.value === val) return path
  if (val < node.value) return getSearchPath(node.left, val, path)
  return getSearchPath(node.right, val, path)
}

function calcPositions(node, x, y, spread, result = []) {
  if (!node) return result
  result.push({ value: node.value, x, y })
  if (node.left) calcPositions(node.left, x - spread, y + 70, spread / 2, result)
  if (node.right) calcPositions(node.right, x + spread, y + 70, spread / 2, result)
  return result
}

function calcEdges(node, x, y, spread, result = []) {
  if (!node) return result
  if (node.left) {
    result.push({ x1: x, y1: y, x2: x - spread, y2: y + 70 })
    calcEdges(node.left, x - spread, y + 70, spread / 2, result)
  }
  if (node.right) {
    result.push({ x1: x, y1: y, x2: x + spread, y2: y + 70 })
    calcEdges(node.right, x + spread, y + 70, spread / 2, result)
  }
  return result
}

function treeHeight(node) {
  if (!node) return 0
  return 1 + Math.max(treeHeight(node.left), treeHeight(node.right))
}

export default function BinaryTree({ view }) {
  const buildInitial = () => {
    let t = null
    for (const v of [5, 3, 8, 1, 4]) t = insertBST(t, v)
    return t
  }

  const [tree, setTree] = useState(buildInitial)
  const [inputVal, setInputVal] = useState('')
  const [highlighted, setHighlighted] = useState([])
  const [log, setLog] = useState(['Tree initialized with values: 5, 3, 8, 1, 4'])

  const addLog = (msg) => setLog(prev => [msg, ...prev])

  const insert = () => {
    const val = Number(inputVal.trim())
    if (isNaN(val) || inputVal.trim() === '') return
    setTree(prev => {
      const newTree = insertBST(prev, val)
      if (JSON.stringify(newTree) === JSON.stringify(prev)) {
        addLog(`${val} already exists — duplicates are ignored`)
      } else {
        addLog(`Inserted ${val} into the BST`)
      }
      return newTree
    })
    setInputVal('')
    setHighlighted([])
  }

  const search = () => {
    const val = Number(inputVal.trim())
    if (isNaN(val) || inputVal.trim() === '') return
    const path = getSearchPath(tree, val)
    const found = path.length > 0 && path[path.length - 1] === val
    setHighlighted(path)
    addLog(found
      ? `Found ${val}! Path: ${path.join(' → ')}`
      : `${val} not found. Searched: ${path.join(' → ')} → null`
    )
    setInputVal('')
    setTimeout(() => setHighlighted([]), 2000)
  }

  const clear = () => {
    setTree(null)
    setHighlighted([])
    setLog(['Tree cleared'])
  }

  if (view === 'code') return <DsaCodeView blocks={dsaTopics.binarytree} />

  const height = treeHeight(tree)
  const svgW = 500
  const svgH = Math.max(height * 70 + 40, 80)
  const positions = tree ? calcPositions(tree, svgW / 2, 30, 100) : []
  const edges = tree ? calcEdges(tree, svgW / 2, 30, 100) : []

  return (
    <div>
      <div className="ds-controls">
        <input
          className="ds-input"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && insert()}
          placeholder="number"
          type="number"
        />
        <button type="button" className="ds-btn" onClick={insert}>Insert</button>
        <button type="button" className="ds-btn secondary" onClick={search} disabled={!tree}>Search</button>
        <button type="button" className="ds-btn secondary" onClick={clear}>Clear</button>
      </div>

      <div className="ds-visual-label">Binary Search Tree</div>
      {!tree ? (
        <div style={{ color: '#94a3b8', fontSize: 13, fontStyle: 'italic' }}>Tree is empty</div>
      ) : (
        <svg width={svgW} height={svgH} style={{ overflow: 'visible' }}>
          {edges.map((e, i) => (
            <line
              key={i}
              x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke="#e2e8f0" strokeWidth={2}
            />
          ))}
          {positions.map((pos, i) => {
            const isHighlighted = highlighted.includes(pos.value)
            const isFound = isHighlighted && highlighted[highlighted.length - 1] === pos.value
            return (
              <g key={i}>
                <circle
                  cx={pos.x} cy={pos.y} r={20}
                  fill={isFound ? '#7c3aed' : isHighlighted ? '#ede9fe' : '#f8faff'}
                  stroke={isHighlighted ? '#7c3aed' : '#e2e8f0'}
                  strokeWidth={isHighlighted ? 2 : 1}
                />
                <text
                  x={pos.x} y={pos.y + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={13} fontWeight={isHighlighted ? 700 : 500}
                  fontFamily="monospace"
                  fill={isFound ? '#ffffff' : isHighlighted ? '#7c3aed' : '#334155'}
                >
                  {pos.value}
                </text>
              </g>
            )
          })}
        </svg>
      )}

      <div className="ds-log">
        <div className="ds-log-header">Log</div>
        <div className="ds-log-entries">
          {log.map((entry, i) => <div key={i} className="ds-log-entry">{entry}</div>)}
        </div>
      </div>
    </div>
  )
}
