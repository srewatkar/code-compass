import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'

export function generateSteps() {
  const nums = [1, 2, 3]
  const steps = []
  const log = []
  const results = []

  log.unshift('Start: current=[], remaining=[1,2,3]')
  steps.push({
    visual: { current: [], remaining: [...nums], results: [] },
    msg: 'Start — nothing chosen yet',
    log: [...log],
  })

  function backtrack(current, remaining) {
    if (remaining.length === 0) {
      results.push([...current])
      log.unshift(`✓ Complete permutation: [${current.join(',')}]`)
      steps.push({
        visual: { current: [...current], remaining: [], results: results.map(r => [...r]) },
        msg: `Found: [${current.join(', ')}]`,
        log: [...log],
      })
      return
    }
    for (let i = 0; i < remaining.length; i++) {
      const chosen = remaining[i]
      const nextRemaining = remaining.filter((_, j) => j !== i)
      current.push(chosen)
      log.unshift(`Choose ${chosen} → current=[${current.join(',')}], remaining=[${nextRemaining.join(',')}]`)
      steps.push({
        visual: { current: [...current], remaining: nextRemaining, results: results.map(r => [...r]) },
        msg: `Choose ${chosen} — path so far: [${current.join(', ')}]`,
        log: [...log],
      })
      backtrack(current, nextRemaining)
      current.pop()
      log.unshift(`Backtrack ← unchoose ${chosen}, current=[${current.join(',')}]`)
      steps.push({
        visual: { current: [...current], remaining, results: results.map(r => [...r]) },
        msg: `Backtrack — unchoose ${chosen}`,
        log: [...log],
      })
    }
  }

  backtrack([], [...nums])

  log.unshift(`Done! Found ${results.length} permutations`)
  steps.push({
    visual: { current: [], remaining: [], results: results.map(r => [...r]), done: true },
    msg: `All ${results.length} permutations found`,
    log: [...log],
  })

  return steps
}

function BacktrackingVisual({ step }) {
  const { current, remaining, results } = step.visual
  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        Permutations of [1, 2, 3] — choose, recurse, unchoose
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>current path</div>
          <div style={{ display: 'flex', gap: 6, minHeight: 40, alignItems: 'center' }}>
            {current.length === 0
              ? <span style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>[ ]</span>
              : current.map((v, i) => (
                <div key={i} style={{ width: 32, height: 32, background: '#ede9fe', border: '2px solid #7c3aed', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: '#7c3aed' }}>{v}</div>
              ))
            }
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>remaining</div>
          <div style={{ display: 'flex', gap: 6, minHeight: 40, alignItems: 'center' }}>
            {remaining.length === 0
              ? <span style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>[ ]</span>
              : remaining.map((v, i) => (
                <div key={i} style={{ width: 32, height: 32, background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 14, color: '#475569' }}>{v}</div>
              ))
            }
          </div>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>results so far ({results.length})</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {results.length === 0
            ? <span style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>none yet</span>
            : results.map((r, i) => (
              <div key={i} style={{ padding: '4px 10px', background: '#dcfce7', border: '1px solid #16a34a', borderRadius: 6, fontFamily: 'monospace', fontSize: 12, color: '#16a34a', fontWeight: 600 }}>
                [{r.join(',')}]
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default function Backtracking() {
  const steps = useMemo(() => generateSteps(), [])
  return <PatternSimulator steps={steps} renderStep={(step) => <BacktrackingVisual step={step} />} />
}
