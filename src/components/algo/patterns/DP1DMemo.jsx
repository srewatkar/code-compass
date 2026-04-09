import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'
import { algoPatterns } from '../../../data/algoPatterns'

const category = algoPatterns.find(c => c.id === 'dp')
const pattern  = category.patterns.find(p => p.id === 'dp-1d-memo')
const TRACE_CODE = {
  js:     pattern.codeBlocks[0].js,
  python: pattern.codeBlocks[0].python,
}

export function generateSteps() {
  const N = 6
  const steps = []
  const log = []
  const cache = {}

  function fib(n) {
    if (n <= 1) {
      if (!(n in cache)) {
        cache[n] = n
        log.unshift(`fib(${n}) = ${n} (base case) → cache[${n}]=${n}`)
        steps.push({
          visual: { n: N, cache: { ...cache }, currentCall: n, result: null },
          msg: `fib(${n}) = ${n} (base case)`,
          log: [...log],
          currentLine: 1,
          variables: { n, result: n },
        })
      }
      return cache[n]
    }
    if (n in cache) {
      log.unshift(`fib(${n}) → cache HIT! return ${cache[n]}`)
      steps.push({
        visual: { n: N, cache: { ...cache }, currentCall: n, cacheHit: true, result: cache[n] },
        msg: `fib(${n}) — cache hit! = ${cache[n]}`,
        log: [...log],
        currentLine: 2,
        variables: { n, result: cache[n] },
      })
      return cache[n]
    }
    log.unshift(`fib(${n}) → computing (fib(${n-1}) + fib(${n-2}))...`)
    steps.push({
      visual: { n: N, cache: { ...cache }, currentCall: n, result: null },
      msg: `fib(${n}) — compute fib(${n-1}) + fib(${n-2})`,
      log: [...log],
      currentLine: 3,
      variables: { n, result: null },
    })
    const val = fib(n - 1) + fib(n - 2)
    cache[n] = val
    log.unshift(`fib(${n}) = ${val} → cache[${n}]=${val}`)
    steps.push({
      visual: { n: N, cache: { ...cache }, currentCall: n, result: val },
      msg: `fib(${n}) = ${val} — cached`,
      log: [...log],
      currentLine: 4,
      variables: { n, result: val },
    })
    return val
  }

  log.unshift(`Start: compute fib(${N}) with memoization`)
  steps.push({
    visual: { n: N, cache: {}, currentCall: null, result: null },
    msg: `Compute fib(${N}) — cache starts empty`,
    log: [...log],
    currentLine: 0,
    variables: { n: N, result: null },
  })

  const answer = fib(N)
  log.unshift(`Done! fib(${N}) = ${answer}`)
  steps.push({
    visual: { n: N, cache: { ...cache }, currentCall: null, result: answer, done: true },
    msg: `fib(${N}) = ${answer}`,
    log: [...log],
    currentLine: null,
    variables: { n: N, result: answer },
  })

  return steps
}

function DP1DMemoVisual({ step }) {
  const { n, cache, currentCall, result, cacheHit, done } = step.visual
  const indices = Array.from({ length: n + 1 }, (_, i) => i)
  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        fib(6) with top-down memoization — fib(n) = fib(n-1) + fib(n-2)
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          cache
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {indices.map(i => {
            const cached = i in cache
            const isCurrent = currentCall === i
            const isHit = isCurrent && cacheHit
            const bg = isHit ? '#dcfce7' : isCurrent ? '#fef3c7' : cached ? '#ede9fe' : '#f1f5f9'
            const border = isHit ? '#16a34a' : isCurrent ? '#d97706' : cached ? '#7c3aed' : '#e2e8f0'
            const color = isHit ? '#16a34a' : isCurrent ? '#92400e' : cached ? '#7c3aed' : '#94a3b8'
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 38, height: 38, background: bg, border: `${isCurrent ? 2 : 1}px solid ${border}`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 13, fontWeight: isCurrent ? 700 : 400, color }}>
                  {cached ? cache[i] : '?'}
                </div>
                <div style={{ fontSize: 9, color: '#94a3b8' }}>f({i})</div>
              </div>
            )
          })}
        </div>
      </div>
      {currentCall !== null && (
        <div style={{ padding: '6px 10px', background: cacheHit ? '#dcfce7' : '#fef3c7', border: `1px solid ${cacheHit ? '#16a34a' : '#d97706'}`, borderRadius: 6, fontSize: 12, color: cacheHit ? '#16a34a' : '#92400e', fontWeight: 600, marginBottom: 8 }}>
          {cacheHit ? `↩ cache HIT: fib(${currentCall}) = ${result}` : `→ calling fib(${currentCall})`}
        </div>
      )}
      {done && (
        <div style={{ padding: '6px 10px', background: '#ede9fe', border: '2px solid #7c3aed', borderRadius: 6, fontSize: 13, color: '#7c3aed', fontWeight: 700 }}>
          ✓ fib({n}) = {result}
        </div>
      )}
      <div style={{ display: 'flex', gap: 12, fontSize: 11, marginTop: 8 }}>
        <span style={{ color: '#7c3aed' }}>■ cached</span>
        <span style={{ color: '#d97706' }}>■ computing</span>
        <span style={{ color: '#16a34a' }}>■ cache hit</span>
      </div>
    </div>
  )
}

export default function DP1DMemo() {
  const steps = useMemo(() => generateSteps(), [])
  return (
    <PatternSimulator
      steps={steps}
      renderStep={(step) => <DP1DMemoVisual step={step} />}
      traceCode={TRACE_CODE}
    />
  )
}
