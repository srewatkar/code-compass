import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'

export function generateSteps() {
  // Nodes: 1→2→3→4→5→(back to 3, index 2)
  const nodeVals = [1, 2, 3, 4, 5]
  const nextIdx =  [1, 2, 3, 4, 2]  // next[i] = index of next node (index 4 → index 2 = cycle)
  const steps = []
  const log = []

  let slow = 0
  let fast = 0

  log.unshift('Initialize slow=head (node 1), fast=head (node 1)')
  steps.push({
    visual: { nodeVals, nextIdx, slow, fast, met: false, cycleAt: 2 },
    msg: 'slow=node 1, fast=node 1',
    log: [...log],
  })

  for (let iter = 0; iter < 8; iter++) {
    const nextSlow = nextIdx[slow]
    const nextFast = nextIdx[nextIdx[fast]]
    slow = nextSlow
    fast = nextFast
    const met = slow === fast
    log.unshift(`slow → node ${nodeVals[slow]}  |  fast → node ${nodeVals[fast]}${met ? '  ← MEET! Cycle detected' : ''}`)
    steps.push({
      visual: { nodeVals, nextIdx, slow, fast, met, cycleAt: 2 },
      msg: met ? `slow and fast both at node ${nodeVals[slow]} — cycle detected!` : `slow=node ${nodeVals[slow]}, fast=node ${nodeVals[fast]}`,
      log: [...log],
    })
    if (met) break
  }

  return steps
}

function FastSlowVisual({ step }) {
  const { nodeVals, slow, fast, met, cycleAt } = step.visual
  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        1 → 2 → 3 → 4 → 5 → (back to 3) — detect the cycle
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
        {nodeVals.map((val, i) => {
          const isSlow = i === slow
          const isFast = i === fast
          const isBoth = isSlow && isFast
          const bg = isBoth ? (met ? '#dcfce7' : '#fef3c7') : isSlow ? '#ede9fe' : isFast ? '#dbeafe' : '#f8faff'
          const border = isBoth ? (met ? '#16a34a' : '#d97706') : isSlow ? '#7c3aed' : isFast ? '#3b82f6' : '#e2e8f0'
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ fontSize: 9, color: isSlow ? '#7c3aed' : 'transparent', fontWeight: 700 }}>S</div>
                <div style={{
                  width: 36, height: 36, background: bg,
                  border: `${(isSlow || isFast) ? 2 : 1}px solid ${border}`,
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'monospace', fontSize: 13, fontWeight: 600, color: border,
                }}>{val}</div>
                <div style={{ fontSize: 9, color: isFast ? '#3b82f6' : 'transparent', fontWeight: 700 }}>F</div>
              </div>
              {i < nodeVals.length - 1 && (
                <div style={{ fontSize: 12, color: '#94a3b8' }}>→</div>
              )}
              {i === nodeVals.length - 1 && (
                <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600 }}>↩ node {nodeVals[cycleAt]}</div>
              )}
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
        <span style={{ color: '#7c3aed' }}>■ slow (1 step)</span>
        <span style={{ color: '#3b82f6' }}>■ fast (2 steps)</span>
        {met && <span style={{ color: '#16a34a', fontWeight: 600 }}>✓ cycle detected!</span>}
      </div>
    </div>
  )
}

export default function FastSlowPointers() {
  const steps = useMemo(() => generateSteps(), [])
  return <PatternSimulator steps={steps} renderStep={(step) => <FastSlowVisual step={step} />} />
}
