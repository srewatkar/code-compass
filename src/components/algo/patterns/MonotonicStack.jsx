import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'
import { algoPatterns } from '../../../data/algoPatterns'

const category = algoPatterns.find(c => c.id === 'arrays')
const pattern  = category.patterns.find(p => p.id === 'monotonic-stack')
const TRACE_CODE = {
  js:     pattern.codeBlocks[0].js,
  python: pattern.codeBlocks[0].python,
}

export function generateSteps() {
  const arr = [2, 1, 5, 3, 6, 4]
  const result = new Array(arr.length).fill(-1)
  const stack = [] // stores indices
  const steps = []
  const log = []

  log.unshift('Start: stack=[], result=[-1,-1,-1,-1,-1,-1]')
  steps.push({
    visual: { arr, stack: [...stack], result: [...result], currentI: -1 },
    msg: 'Start — empty stack, all results = -1',
    log: [...log],
    currentLine: 1,
    variables: { i: -1, val: null, stack: [] },
  })

  for (let i = 0; i < arr.length; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] < arr[i]) {
      const popped = stack.pop()
      result[popped] = arr[i]
      log.unshift(`arr[${i}]=${arr[i]} > arr[${popped}]=${arr[popped]} → pop ${popped}, result[${popped}]=${arr[i]}`)
      steps.push({
        visual: { arr, stack: [...stack], result: [...result], currentI: i, justPopped: popped },
        msg: `Pop index ${popped} — next greater for ${arr[popped]} is ${arr[i]}`,
        log: [...log],
        currentLine: 5,
        variables: { i, val: arr[i], stack: stack.map(s => arr[s]) },
      })
    }
    stack.push(i)
    log.unshift(`Push index ${i} (val=${arr[i]}) onto stack → stack=[${stack.map(s => arr[s]).join(',')}]`)
    steps.push({
      visual: { arr, stack: [...stack], result: [...result], currentI: i },
      msg: `Push ${arr[i]} — stack = [${stack.map(s => arr[s]).join(', ')}]`,
      log: [...log],
      currentLine: 8,
      variables: { i, val: arr[i], stack: stack.map(s => arr[s]) },
    })
  }

  log.unshift(`Done! Remaining in stack have no next greater. result=[${result.join(',')}]`)
  steps.push({
    visual: { arr, stack: [], result: [...result], currentI: -1, done: true },
    msg: `result = [${result.join(', ')}]`,
    log: [...log],
    currentLine: 10,
    variables: { i: -1, val: null, stack: [] },
  })

  return steps
}

function MonotonicStackVisual({ step }) {
  const { arr, stack, result, currentI, done } = step.visual
  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        arr = [2, 1, 5, 3, 6, 4] — next greater element for each
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
        {/* Array */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>array</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {arr.map((v, i) => {
              const isCurrent = i === currentI
              const inStack = stack.includes(i)
              const bg = isCurrent ? '#fef3c7' : inStack ? '#ede9fe' : '#f8faff'
              const border = isCurrent ? '#d97706' : inStack ? '#7c3aed' : '#e2e8f0'
              const color = isCurrent ? '#92400e' : inStack ? '#7c3aed' : '#475569'
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <div style={{ width: 32, height: 32, background: bg, border: `${isCurrent || inStack ? 2 : 1}px solid ${border}`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 13, fontWeight: isCurrent ? 700 : 400, color }}>{v}</div>
                  <div style={{ fontSize: 9, color: '#94a3b8' }}>{i}</div>
                </div>
              )
            })}
          </div>
        </div>
        {/* Stack */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>stack (values)</div>
          <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', minHeight: 40, borderLeft: '2px solid #e2e8f0', paddingLeft: 6 }}>
            {stack.length === 0
              ? <span style={{ fontSize: 11, color: '#94a3b8', fontStyle: 'italic' }}>empty</span>
              : stack.map((idx, si) => (
                <div key={si} style={{ width: 30, height: 30, background: '#ede9fe', border: '1px solid #7c3aed', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 12, color: '#7c3aed', fontWeight: 600 }}>
                  {arr[idx]}
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {/* Result */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>result (next greater)</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {result.map((v, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 32, height: 32, background: v !== -1 ? '#dcfce7' : '#f1f5f9', border: `1px solid ${v !== -1 ? '#16a34a' : '#e2e8f0'}`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 12, color: v !== -1 ? '#16a34a' : '#94a3b8' }}>
                {v === -1 ? '—' : v}
              </div>
              <div style={{ fontSize: 9, color: '#94a3b8' }}>{i}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function MonotonicStack() {
  const steps = useMemo(() => generateSteps(), [])
  return (
    <PatternSimulator
      steps={steps}
      renderStep={(step) => <MonotonicStackVisual step={step} />}
      traceCode={TRACE_CODE}
    />
  )
}
