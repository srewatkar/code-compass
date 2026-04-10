import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'

// All 15 nodes in the fib(5) call tree, with fixed SVG positions.
// Tree layout (DFS left-first):
//                     fib(5)
//              fib(4)         fib(3)
//         fib(3)  fib(2)  fib(2)  fib(1)
//       fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)
//     fib(1) fib(0)
const NODES = [
  { id: 'n5',  label: 'fib(5)', children: ['n4',  'n3a'], x: 280, y: 30  },
  { id: 'n4',  label: 'fib(4)', children: ['n3b', 'n2a'], x: 140, y: 90  },
  { id: 'n3a', label: 'fib(3)', children: ['n2b', 'n1a'], x: 420, y: 90  },
  { id: 'n3b', label: 'fib(3)', children: ['n2c', 'n1b'], x: 70,  y: 150 },
  { id: 'n2a', label: 'fib(2)', children: ['n1c', 'n0a'], x: 210, y: 150 },
  { id: 'n2b', label: 'fib(2)', children: ['n1d', 'n0b'], x: 350, y: 150 },
  { id: 'n1a', label: 'fib(1)', children: [],              x: 490, y: 150 },
  { id: 'n2c', label: 'fib(2)', children: ['n1e', 'n0c'], x: 35,  y: 210 },
  { id: 'n1b', label: 'fib(1)', children: [],              x: 105, y: 210 },
  { id: 'n1c', label: 'fib(1)', children: [],              x: 175, y: 210 },
  { id: 'n0a', label: 'fib(0)', children: [],              x: 245, y: 210 },
  { id: 'n1d', label: 'fib(1)', children: [],              x: 315, y: 210 },
  { id: 'n0b', label: 'fib(0)', children: [],              x: 385, y: 210 },
  { id: 'n1e', label: 'fib(1)', children: [],              x: 20,  y: 270 },
  { id: 'n0c', label: 'fib(0)', children: [],              x: 50,  y: 270 },
]

const EDGES = NODES.flatMap(n => n.children.map(childId => [n.id, childId]))

export function generateSteps() {
  // DFS event sequence for fib(5):
  // 'call'   → push label onto callStack, set node active
  // 'base'   → resolve node immediately (no push to callStack)
  // 'return' → pop callStack, set node resolved with value
  const events = [
    { type: 'call',   id: 'n5',  msg: 'Call fib(5) — 5 > 1, not a base case. Recurse: fib(4) + fib(3)' },
    { type: 'call',   id: 'n4',  msg: 'Call fib(4) — 4 > 1, recurse left first: fib(3) + fib(2)' },
    { type: 'call',   id: 'n3b', msg: 'Call fib(3) — 3 > 1, recurse left: fib(2) + fib(1)' },
    { type: 'call',   id: 'n2c', msg: 'Call fib(2) — 2 > 1, recurse left: fib(1) + fib(0)' },
    { type: 'base',   id: 'n1e', value: 1, msg: 'Call fib(1) — base case (n ≤ 1), return 1' },
    { type: 'base',   id: 'n0c', value: 0, msg: 'Call fib(0) — base case (n ≤ 1), return 0' },
    { type: 'return', id: 'n2c', value: 1, msg: 'fib(2) = fib(1)+fib(0) = 1+0 = 1 → return 1, pop stack' },
    { type: 'base',   id: 'n1b', value: 1, msg: 'Call fib(1) — base case, return 1' },
    { type: 'return', id: 'n3b', value: 2, msg: 'fib(3) = fib(2)+fib(1) = 1+1 = 2 → return 2, pop stack' },
    { type: 'call',   id: 'n2a', msg: 'Call fib(2) — right branch of fib(4), recurse: fib(1)+fib(0)' },
    { type: 'base',   id: 'n1c', value: 1, msg: 'Call fib(1) — base case, return 1' },
    { type: 'base',   id: 'n0a', value: 0, msg: 'Call fib(0) — base case, return 0' },
    { type: 'return', id: 'n2a', value: 1, msg: 'fib(2) = 1+0 = 1 → return 1, pop stack' },
    { type: 'return', id: 'n4',  value: 3, msg: 'fib(4) = fib(3)+fib(2) = 2+1 = 3 → return 3, pop stack' },
    { type: 'call',   id: 'n3a', msg: 'Call fib(3) — right branch of fib(5), recurse: fib(2)+fib(1)' },
    { type: 'call',   id: 'n2b', msg: 'Call fib(2) — left branch of fib(3), recurse: fib(1)+fib(0)' },
    { type: 'base',   id: 'n1d', value: 1, msg: 'Call fib(1) — base case, return 1' },
    { type: 'base',   id: 'n0b', value: 0, msg: 'Call fib(0) — base case, return 0' },
    { type: 'return', id: 'n2b', value: 1, msg: 'fib(2) = 1+0 = 1 → return 1, pop stack' },
    { type: 'base',   id: 'n1a', value: 1, msg: 'Call fib(1) — base case, return 1' },
    { type: 'return', id: 'n3a', value: 2, msg: 'fib(3) = fib(2)+fib(1) = 1+1 = 2 → return 2, pop stack' },
    { type: 'return', id: 'n5',  value: 5, msg: 'fib(5) = fib(4)+fib(3) = 3+2 = 5 ✓ Done!' },
  ]

  const state = {}
  NODES.forEach(n => { state[n.id] = { state: 'pending', value: null } })

  const steps = []
  const log = []
  const callStack = []

  for (const event of events) {
    const node = NODES.find(n => n.id === event.id)
    log.unshift(event.msg)

    if (event.type === 'call') {
      state[event.id] = { state: 'active', value: null }
      callStack.push(node.label)
    } else if (event.type === 'base') {
      state[event.id] = { state: 'resolved', value: event.value }
    } else {
      state[event.id] = { state: 'resolved', value: event.value }
      callStack.pop()
    }

    steps.push({
      visual: {
        nodes: NODES.map(n => ({ ...n, ...state[n.id] })),
        stack: [...callStack],
      },
      msg: event.msg,
      log: [...log],
    })
  }

  return steps
}

const NODE_FILL   = { pending: '#f1f5f9', active: '#ede9fe', resolved: '#d1fae5' }
const NODE_STROKE = { pending: '#e2e8f0', active: '#7c3aed', resolved: '#10b981' }
const NODE_COLOR  = { pending: '#94a3b8', active: '#7c3aed', resolved: '#065f46' }

function RecursionVisual({ step }) {
  const { nodes, stack } = step.visual
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6, fontStyle: 'italic' }}>
          Call tree — fib(5)
        </div>
        <svg viewBox="0 0 560 300" width="100%" style={{ maxWidth: 560, display: 'block' }}>
          {EDGES.map(([fromId, toId]) => {
            const from = nodeMap[fromId]
            const to   = nodeMap[toId]
            return (
              <line
                key={`${fromId}-${toId}`}
                x1={from.x} y1={from.y + 14}
                x2={to.x}   y2={to.y - 14}
                stroke="#e2e8f0" strokeWidth={1.5}
              />
            )
          })}
          {nodes.map(node => (
            <g key={node.id}>
              <circle
                cx={node.x} cy={node.y} r={14}
                fill={NODE_FILL[node.state]}
                stroke={NODE_STROKE[node.state]}
                strokeWidth={node.state === 'active' ? 2 : 1}
              />
              <text
                x={node.x} y={node.y}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={9} fontFamily="monospace"
                fill={NODE_COLOR[node.state]}
                fontWeight={node.state === 'active' ? 700 : 400}
              >
                {node.state === 'resolved' ? `${node.value}` : node.label.replace('fib', 'f')}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6, fontStyle: 'italic' }}>
          Call stack
        </div>
        {stack.length === 0 ? (
          <div style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>✓ Complete</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 3 }}>
            {stack.map((frame, i) => {
              const isTop = i === stack.length - 1
              return (
                <div key={i} style={{
                  padding: '4px 8px',
                  background: isTop ? '#ede9fe' : '#f8fafc',
                  border: `1px solid ${isTop ? '#7c3aed' : '#e2e8f0'}`,
                  borderRadius: 4,
                  fontSize: 11,
                  fontFamily: 'monospace',
                  color: isTop ? '#7c3aed' : '#475569',
                  fontWeight: isTop ? 700 : 400,
                }}>
                  {isTop ? `▶ ${frame}` : frame}
                </div>
              )
            })}
          </div>
        )}
        <div style={{ marginTop: 8, fontSize: 10, color: '#94a3b8' }}>↑ top (current)</div>
      </div>
    </div>
  )
}

export default function Recursion() {
  const steps = useMemo(() => generateSteps(), [])
  return (
    <PatternSimulator
      steps={steps}
      renderStep={(step) => <RecursionVisual step={step} />}
    />
  )
}
