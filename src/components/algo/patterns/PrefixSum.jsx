import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'
import { algoPatterns } from '../../../data/algoPatterns'

const category = algoPatterns.find(c => c.id === 'arrays')
const pattern  = category.patterns.find(p => p.id === 'prefix-sum')
const TRACE_CODE = {
  js:     pattern.codeBlocks[0].js,
  python: pattern.codeBlocks[0].python,
}

export function generateSteps() {
  const arr = [3, 1, 4, 1, 5, 9, 2, 6]
  const queryL = 2, queryR = 5
  const steps = []
  const log = []
  const prefix = [0]

  log.unshift('Initialize prefix[0] = 0 (empty prefix)')
  steps.push({
    visual: { arr, prefix: [...prefix], building: true, currentI: -1, queryL, queryR, queryResult: null },
    msg: 'prefix[0] = 0',
    log: [...log],
    currentLine: 1,
    variables: { i: -1, prefix: [...prefix] },
  })

  for (let i = 0; i < arr.length; i++) {
    prefix.push(prefix[i] + arr[i])
    log.unshift(`prefix[${i+1}] = prefix[${i}] + arr[${i}] = ${prefix[i]} + ${arr[i]} = ${prefix[i+1]}`)
    steps.push({
      visual: { arr, prefix: [...prefix], building: true, currentI: i, queryL, queryR, queryResult: null },
      msg: `prefix[${i+1}] = ${prefix[i+1]}`,
      log: [...log],
      currentLine: 3,
      variables: { i, prefix: [...prefix] },
    })
  }

  const result = prefix[queryR + 1] - prefix[queryL]
  log.unshift(`Query [${queryL},${queryR}]: prefix[${queryR+1}] - prefix[${queryL}] = ${prefix[queryR+1]} - ${prefix[queryL]} = ${result}`)
  steps.push({
    visual: { arr, prefix: [...prefix], building: false, currentI: -1, queryL, queryR, queryResult: result },
    msg: `range sum [${queryL},${queryR}] = ${result}`,
    log: [...log],
    currentLine: 9,
    variables: { i: -1, prefix: [...prefix] },
  })

  return steps
}

function PrefixSumVisual({ step }) {
  const { arr, prefix, building, currentI, queryL, queryR, queryResult } = step.visual
  const cellStyle = (bg, border, color, bold) => ({
    width: 32, height: 32, background: bg,
    border: `${bold ? 2 : 1}px solid ${border}`,
    borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'monospace', fontSize: 12, fontWeight: bold ? 700 : 400, color,
  })
  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        arr = [3,1,4,1,5,9,2,6] — build prefix, then query range [2,5]
      </div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>arr</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {arr.map((v, i) => {
            const inQuery = !building && i >= queryL && i <= queryR
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={cellStyle(inQuery ? '#ede9fe' : '#f8faff', inQuery ? '#7c3aed' : '#e2e8f0', inQuery ? '#7c3aed' : '#475569', inQuery)}>
                  {v}
                </div>
                <div style={{ fontSize: 9, color: '#94a3b8' }}>{i}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>prefix</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {prefix.map((v, i) => {
            const isNew = building && i === currentI + 1
            const isQueryRef = !building && (i === queryL || i === queryR + 1)
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={cellStyle(isNew ? '#fef3c7' : isQueryRef ? '#ede9fe' : '#f1f5f9', isNew ? '#d97706' : isQueryRef ? '#7c3aed' : '#e2e8f0', isNew ? '#92400e' : isQueryRef ? '#7c3aed' : '#475569', isNew || isQueryRef)}>
                  {v}
                </div>
                <div style={{ fontSize: 9, color: isQueryRef ? '#7c3aed' : '#94a3b8' }}>{i}</div>
              </div>
            )
          })}
        </div>
      </div>
      {queryResult !== null && (
        <div style={{ marginTop: 10, fontSize: 12, color: '#7c3aed', fontFamily: 'monospace', fontWeight: 600 }}>
          sum([{queryL}..{queryR}]) = prefix[{queryR+1}] − prefix[{queryL}] = {prefix[queryR+1]} − {prefix[queryL]} = {queryResult}
        </div>
      )}
    </div>
  )
}

export default function PrefixSum() {
  const steps = useMemo(() => generateSteps(), [])
  return (
    <PatternSimulator
      steps={steps}
      renderStep={(step) => <PrefixSumVisual step={step} />}
      traceCode={TRACE_CODE}
    />
  )
}
