import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'

const NODES = ['A','B','C','D','E']
const EDGES = [['A','C'],['B','C'],['B','D'],['C','E'],['D','E']]

export function generateSteps() {
  const steps = []
  const log = []

  // Build adjacency + in-degrees
  const adj = {}
  const inDegree = {}
  NODES.forEach(n => { adj[n] = []; inDegree[n] = 0 })
  EDGES.forEach(([from, to]) => { adj[from].push(to); inDegree[to]++ })

  const result = []
  const queue = NODES.filter(n => inDegree[n] === 0)
  const deg = { ...inDegree }

  log.unshift(`In-degrees: ${NODES.map(n => `${n}:${deg[n]}`).join(', ')}`)
  log.unshift(`Initial queue (in-degree 0): [${queue.join(',')}]`)
  steps.push({
    visual: { deg: { ...deg }, queue: [...queue], result: [], processedNode: null },
    msg: `Queue = [${queue.join(', ')}] — nodes with in-degree 0`,
    log: [...log],
  })

  while (queue.length > 0) {
    const node = queue.shift()
    result.push(node)
    log.unshift(`Process ${node} → add to result=[${result.join(',')}]`)

    const newQueue = []
    for (const neighbor of adj[node]) {
      deg[neighbor]--
      if (deg[neighbor] === 0) {
        queue.push(neighbor)
        newQueue.push(neighbor)
      }
    }
    if (newQueue.length) log.unshift(`  ${node}'s neighbors: ${newQueue.join(',')} now have in-degree 0 → enqueue`)

    steps.push({
      visual: { deg: { ...deg }, queue: [...queue], result: [...result], processedNode: node },
      msg: `Processed ${node} — result: [${result.join(', ')}]`,
      log: [...log],
    })
  }

  log.unshift(`Done! Topological order: [${result.join(' → ')}]`)
  steps.push({
    visual: { deg: { ...deg }, queue: [], result: [...result], processedNode: null, done: true },
    msg: `Order: ${result.join(' → ')}`,
    log: [...log],
  })

  return steps
}

// Node positions for DAG layout
const NODE_POS = { A:[60,30], B:[60,110], C:[180,70], D:[180,150], E:[300,110] }

function TopoSortVisual({ step }) {
  const { deg, queue, result, processedNode, done } = step.visual
  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8, fontStyle: 'italic' }}>
        DAG: A→C, B→C, B→D, C→E, D→E — find topological order
      </div>
      <svg width={360} height={190} style={{ display: 'block', marginBottom: 8 }}>
        {EDGES.map(([a, b]) => {
          const [x1,y1] = NODE_POS[a], [x2,y2] = NODE_POS[b]
          const dx = x2-x1, dy = y2-y1, len = Math.sqrt(dx*dx+dy*dy)
          const ex = x2 - (dx/len)*18, ey = y2 - (dy/len)*18
          return <line key={`${a}-${b}`} x1={x1+(dx/len)*18} y1={y1+(dy/len)*18} x2={ex} y2={ey} stroke="#cbd5e1" strokeWidth={2} markerEnd="url(#arrow)" />
        })}
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#cbd5e1" />
          </marker>
        </defs>
        {NODES.map(n => {
          const [x, y] = NODE_POS[n]
          const isDone = result.includes(n)
          const isCurrent = processedNode === n
          const inQueue = queue.includes(n)
          const fill = done ? '#dcfce7' : isCurrent ? '#fef3c7' : isDone ? '#dcfce7' : inQueue ? '#ede9fe' : '#f8faff'
          const stroke = done ? '#16a34a' : isCurrent ? '#d97706' : isDone ? '#16a34a' : inQueue ? '#7c3aed' : '#e2e8f0'
          const textColor = done ? '#16a34a' : isCurrent ? '#92400e' : isDone ? '#16a34a' : inQueue ? '#7c3aed' : '#475569'
          return (
            <g key={n}>
              <circle cx={x} cy={y} r={18} fill={fill} stroke={stroke} strokeWidth={isCurrent ? 3 : 2} />
              <text x={x} y={y-4} textAnchor="middle" fontSize={13} fontWeight={700} fill={textColor}>{n}</text>
              <text x={x} y={y+9} textAnchor="middle" fontSize={9} fill={textColor}>in:{deg[n]}</text>
            </g>
          )
        })}
      </svg>
      <div style={{ display: 'flex', gap: 16, fontSize: 11, marginBottom: 6 }}>
        <span style={{ color: '#7c3aed' }}>■ in queue</span>
        <span style={{ color: '#d97706' }}>■ processing</span>
        <span style={{ color: '#16a34a' }}>■ done</span>
      </div>
      <div style={{ fontSize: 12, fontFamily: 'monospace', color: '#475569' }}>
        result: [{result.join(' → ')}]
      </div>
    </div>
  )
}

export default function TopologicalSort() {
  const steps = useMemo(() => generateSteps(), [])
  return <PatternSimulator steps={steps} renderStep={(step) => <TopoSortVisual step={step} />} />
}
