import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'
import { algoPatterns } from '../../../data/algoPatterns'

// Pull the JS and Python templates from the data file so there's one source of truth
const category = algoPatterns.find(c => c.id === 'arrays')
const pattern  = category.patterns.find(p => p.id === 'sliding-window')
const TRACE_CODE = {
  js:     pattern.codeBlocks.find(b => b.id === 'sliding-window-fixed').js,
  python: pattern.codeBlocks.find(b => b.id === 'sliding-window-fixed').python,
}

export function generateSteps() {
  const arr = [2, 1, 5, 1, 3, 2]
  const k = 3
  const steps = []
  const log = []

  let windowSum = arr[0] + arr[1] + arr[2]
  let maxSum = windowSum
  log.unshift(`Initial window [0..2] → sum=${windowSum}, max=${maxSum}`)
  steps.push({
    visual: { arr, windowStart: 0, windowEnd: 2, currentSum: windowSum, maxSum, k },
    msg: `Initial window [0..2]: sum = ${windowSum}`,
    log: [...log],
    currentLine: 2,
    variables: { k, windowSum, maxSum },
  })

  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]
    maxSum = Math.max(maxSum, windowSum)
    const start = i - k + 1
    log.unshift(`Slide → remove arr[${i-k}]=${arr[i-k]}, add arr[${i}]=${arr[i]} → window [${start}..${i}], sum=${windowSum}, max=${maxSum}`)
    steps.push({
      visual: { arr, windowStart: start, windowEnd: i, currentSum: windowSum, maxSum, k },
      msg: `Window [${start}..${i}]: sum = ${windowSum}, max so far = ${maxSum}`,
      log: [...log],
      currentLine: 6,
      variables: { i, windowSum, maxSum },
    })
  }

  log.unshift(`Done! Max sum of size-${k} window = ${maxSum}`)
  steps.push({
    visual: { arr, windowStart: -1, windowEnd: -1, currentSum: windowSum, maxSum, k, done: true },
    msg: `Answer: max sum = ${maxSum}`,
    log: [...log],
    currentLine: 9,
    variables: { maxSum },
  })

  return steps
}

function SlidingWindowVisual({ step }) {
  const { arr, windowStart, windowEnd, currentSum, maxSum, done } = step.visual
  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        arr = [2, 1, 5, 1, 3, 2], k = 3 — find max sum subarray
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
        {arr.map((val, i) => {
          const inWindow = !done && i >= windowStart && i <= windowEnd
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{
                width: 36, height: 36,
                background: inWindow ? '#ede9fe' : '#f8faff',
                border: `${inWindow ? 2 : 1}px solid ${inWindow ? '#7c3aed' : '#e2e8f0'}`,
                borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'monospace', fontSize: 14,
                fontWeight: inWindow ? 700 : 400,
                color: inWindow ? '#7c3aed' : '#475569',
              }}>
                {val}
              </div>
              <div style={{ fontSize: 10, color: inWindow ? '#7c3aed' : '#94a3b8' }}>{i}</div>
            </div>
          )
        })}
      </div>
      <div style={{ fontSize: 12, color: '#7c3aed', fontFamily: 'monospace' }}>
        {done ? `✓ Max sum = ${maxSum}` : `window sum = ${currentSum}  |  max so far = ${maxSum}`}
      </div>
    </div>
  )
}

export default function SlidingWindow() {
  const steps = useMemo(() => generateSteps(), [])
  return (
    <PatternSimulator
      steps={steps}
      renderStep={(step) => <SlidingWindowVisual step={step} />}
      traceCode={TRACE_CODE}
    />
  )
}
