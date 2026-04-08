import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'

// Tree: node id → children ids
const TREE = { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: [] }
const TARGET = 5

export function generateSteps() {
  const steps = []
  const log = []
  const visited = new Set()
  let found = false

  log.unshift('Start DFS from root (node 1), looking for node 5')
  steps.push({
    visual: { visited: new Set(), current: null, found: false, stack: [1] },
    msg: 'Start DFS — stack = [1]',
    log: [...log],
  })

  const stack = [1]
  while (stack.length > 0) {
    const node = stack.pop()
    if (visited.has(node)) continue
    visited.add(node)

    if (node === TARGET) {
      found = true
      log.unshift(`✓ Found node ${TARGET}!`)
      steps.push({
        visual: { visited: new Set(visited), current: node, found: true, stack: [...stack] },
        msg: `Found node ${TARGET}! Path exists.`,
        log: [...log],
      })
      break
    }

    const children = TREE[node] ?? []
    const toAdd = [...children].reverse()
    toAdd.forEach(c => stack.push(c))
    log.unshift(`Visit node ${node} → push children [${children.join(',')}], stack=[${[...stack].join(',')}]`)
    steps.push({
      visual: { visited: new Set(visited), current: node, found: false, stack: [...stack] },
      msg: `Visit node ${node} → explore children [${children.join(', ')}]`,
      log: [...log],
    })
  }

  if (!found) {
    log.unshift('DFS complete — node not found')
    steps.push({
      visual: { visited: new Set(visited), current: null, found: false, stack: [] },
      msg: 'Node not found',
      log: [...log],
    })
  }
  return steps
}

// Tree layout positions for 3-level tree
const NODE_POS = { 1: [160, 20], 2: [80, 90], 3: [240, 90], 4: [40, 160], 5: [120, 160], 6: [240, 160] }
const EDGES = [[1,2],[1,3],[2,4],[2,5],[3,6]]

function DFSVisual({ step }) {
  const { visited, current, found } = step.visual
  const W = 320, H = 200
  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8, fontStyle: 'italic' }}>
        Tree: 1→[2,3], 2→[4,5], 3→[6] — find node 5 with DFS
      </div>
      <svg width={W} height={H} style={{ display: 'block', marginBottom: 8 }}>
        {EDGES.map(([a, b]) => {
          const [x1, y1] = NODE_POS[a]
          const [x2, y2] = NODE_POS[b]
          return <line key={`${a}-${b}`} x1={x1} y1={y1+14} x2={x2} y2={y2-14} stroke="#e2e8f0" strokeWidth={2} />
        })}
        {Object.entries(NODE_POS).map(([id, [x, y]]) => {
          const nid = Number(id)
          const isVisited = visited.has(nid)
          const isCurrent = current === nid
          const isTarget = nid === TARGET
          const fill = found && isTarget ? '#dcfce7' : isCurrent ? '#fef3c7' : isVisited ? '#ede9fe' : '#f8faff'
          const stroke = found && isTarget ? '#16a34a' : isCurrent ? '#d97706' : isVisited ? '#7c3aed' : '#e2e8f0'
          const textColor = found && isTarget ? '#16a34a' : isCurrent ? '#92400e' : isVisited ? '#7c3aed' : '#475569'
          return (
            <g key={id}>
              <circle cx={x} cy={y} r={16} fill={fill} stroke={stroke} strokeWidth={isCurrent ? 3 : 2} />
              <text x={x} y={y+5} textAnchor="middle" fontSize={13} fontWeight={600} fill={textColor}>{id}</text>
            </g>
          )
        })}
      </svg>
      <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
        <span style={{ color: '#7c3aed' }}>■ visited</span>
        <span style={{ color: '#d97706' }}>■ current</span>
        <span style={{ color: '#16a34a' }}>■ found</span>
      </div>
    </div>
  )
}

export default function DFSTemplate() {
  const steps = useMemo(() => generateSteps(), [])
  return <PatternSimulator steps={steps} renderStep={(step) => <DFSVisual step={step} />} />
}
