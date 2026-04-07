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

function inorder(node, result = []) {
  if (!node) return result
  inorder(node.left, result)
  result.push(node.value)
  inorder(node.right, result)
  return result
}

function preorder(node, result = []) {
  if (!node) return result
  result.push(node.value)
  preorder(node.left, result)
  preorder(node.right, result)
  return result
}

function postorder(node, result = []) {
  if (!node) return result
  postorder(node.left, result)
  postorder(node.right, result)
  result.push(node.value)
  return result
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
  const [highlightMode, setHighlightMode] = useState('search') // 'search' | 'traversal'
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
    setHighlightMode('search')
    setHighlighted(path)
    addLog(found
      ? `Found ${val}! Path: ${path.join(' → ')}`
      : `${val} not found. Searched: ${path.join(' → ')} → null`
    )
    setInputVal('')
    setTimeout(() => setHighlighted([]), 2000)
  }

  const doTraversal = (type) => {
    if (!tree) return
    const order = type === 'inorder' ? inorder(tree)
      : type === 'preorder' ? preorder(tree)
      : postorder(tree)
    const label = type === 'inorder' ? 'Inorder (L→Root→R)'
      : type === 'preorder' ? 'Preorder (Root→L→R)'
      : 'Postorder (L→R→Root)'
    addLog(`${label}: ${order.join(' → ')}`)
    setHighlightMode('traversal')
    order.forEach((val, i) => {
      setTimeout(() => setHighlighted([val]), i * 500)
    })
    setTimeout(() => setHighlighted([]), order.length * 500 + 300)
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
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div className="ds-controls">
        <input
          className="ds-input"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && insert()}
          placeholder="number"
          type="number"
        />
        <button type="button" className="ds-btn" title="Insert a number into the BST (smaller → left, larger → right)" onClick={insert}>Insert</button>
        <button type="button" className="ds-btn secondary" title="Search for a value — highlights the path taken" onClick={search} disabled={!tree}>Search</button>
        <button type="button" className="ds-btn secondary" title="Remove all nodes from the tree" onClick={clear}>Clear</button>
      </div>

      <div className="ds-controls" style={{ marginTop: -8 }}>
        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginRight: 4 }}>Traversals:</span>
        <button type="button" className="ds-btn secondary" title="Left → Root → Right. Visits nodes in sorted order." onClick={() => doTraversal('inorder')} disabled={!tree}>Inorder</button>
        <button type="button" className="ds-btn secondary" title="Root → Left → Right. Used for copying or serializing the tree." onClick={() => doTraversal('preorder')} disabled={!tree}>Preorder</button>
        <button type="button" className="ds-btn secondary" title="Left → Right → Root. Used for deleting the tree." onClick={() => doTraversal('postorder')} disabled={!tree}>Postorder</button>
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
            const isSearchFound = highlightMode === 'search' && isHighlighted && highlighted[highlighted.length - 1] === pos.value
            const isTraversal = highlightMode === 'traversal' && isHighlighted
            return (
              <g key={i}>
                <circle
                  cx={pos.x} cy={pos.y} r={20}
                  fill={isSearchFound ? '#7c3aed' : isHighlighted ? '#ede9fe' : '#f8faff'}
                  stroke={isTraversal ? '#f59e0b' : isHighlighted ? '#7c3aed' : '#e2e8f0'}
                  strokeWidth={isHighlighted ? 2 : 1}
                />
                <text
                  x={pos.x} y={pos.y + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={13} fontWeight={isHighlighted ? 700 : 500}
                  fontFamily="monospace"
                  fill={isSearchFound ? '#ffffff' : isHighlighted ? '#7c3aed' : '#334155'}
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
