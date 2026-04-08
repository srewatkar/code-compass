import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'

export function generateSteps() {
  const N = 6
  const dp = new Array(N + 1).fill(0)
  dp[0] = 1
  dp[1] = 1
  const steps = []
  const log = []

  log.unshift(`Base cases: dp[0]=1 (1 way to stay), dp[1]=1 (1 way: take 1 step)`)
  steps.push({
    visual: { dp: [...dp], currentI: 1, N },
    msg: 'dp[0]=1, dp[1]=1 (base cases)',
    log: [...log],
  })

  for (let i = 2; i <= N; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
    log.unshift(`dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`)
    steps.push({
      visual: { dp: [...dp], currentI: i, N },
      msg: `dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i]}`,
      log: [...log],
    })
  }

  log.unshift(`Done! Ways to climb ${N} stairs = dp[${N}] = ${dp[N]}`)
  steps.push({
    visual: { dp: [...dp], currentI: -1, N, done: true },
    msg: `Ways to climb ${N} stairs = ${dp[N]}`,
    log: [...log],
  })

  return steps
}

function DP1DTabVisual({ step }) {
  const { dp, currentI, N, done } = step.visual
  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        Climbing stairs(6) — dp[i] = dp[i-1] + dp[i-2], how many ways to reach step 6?
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>dp array</div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end' }}>
          {dp.map((v, i) => {
            const isCurrent = i === currentI
            const isFilled = v > 0 || i === 0
            const isDep = !done && isFilled && (i === currentI - 1 || i === currentI - 2)
            const bg = done ? '#ede9fe' : isCurrent ? '#fef3c7' : isDep ? '#dbeafe' : isFilled ? '#ede9fe' : '#f1f5f9'
            const border = done ? '#7c3aed' : isCurrent ? '#d97706' : isDep ? '#3b82f6' : isFilled ? '#7c3aed' : '#e2e8f0'
            const color = done ? '#7c3aed' : isCurrent ? '#92400e' : isDep ? '#1d4ed8' : isFilled ? '#7c3aed' : '#94a3b8'
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 40, height: 40, background: bg, border: `${isCurrent ? 2 : 1}px solid ${border}`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 14, fontWeight: isCurrent ? 700 : 400, color }}>
                  {v || '0'}
                </div>
                <div style={{ fontSize: 9, color: '#94a3b8' }}>dp[{i}]</div>
              </div>
            )
          })}
        </div>
      </div>
      {!done && currentI >= 2 && (
        <div style={{ fontSize: 12, fontFamily: 'monospace', color: '#475569', marginBottom: 8 }}>
          dp[{currentI}] = dp[{currentI-1}]({dp[currentI-1]}) + dp[{currentI-2}]({dp[currentI-2]}) = <strong style={{ color: '#7c3aed' }}>{dp[currentI]}</strong>
        </div>
      )}
      {done && (
        <div style={{ padding: '6px 10px', background: '#ede9fe', border: '2px solid #7c3aed', borderRadius: 6, fontSize: 13, color: '#7c3aed', fontWeight: 700 }}>
          ✓ {N} stairs → {dp[N]} ways
        </div>
      )}
      <div style={{ display: 'flex', gap: 12, fontSize: 11, marginTop: 8 }}>
        <span style={{ color: '#7c3aed' }}>■ filled</span>
        <span style={{ color: '#d97706' }}>■ current</span>
        <span style={{ color: '#3b82f6' }}>■ dependencies</span>
      </div>
    </div>
  )
}

export default function DP1DTab() {
  const steps = useMemo(() => generateSteps(), [])
  return <PatternSimulator steps={steps} renderStep={(step) => <DP1DTabVisual step={step} />} />
}
