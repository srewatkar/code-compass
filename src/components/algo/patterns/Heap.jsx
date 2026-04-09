import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'
import { algoPatterns } from '../../../data/algoPatterns'

const category = algoPatterns.find(c => c.id === 'other')
const pattern  = category.patterns.find(p => p.id === 'heap')
const TRACE_CODE = {
  js:     pattern.codeBlocks[0].js,
  python: pattern.codeBlocks[0].python,
}

// Simple min-heap operations on a sorted array (ascending)
function heapPush(heap, val) {
  const next = [...heap, val].sort((a, b) => a - b)
  return next
}

function heapPop(heap) {
  // Remove min (first element), return [min, newHeap]
  const sorted = [...heap].sort((a, b) => a - b)
  return [sorted[0], sorted.slice(1)]
}

export function generateSteps() {
  const arr = [3, 1, 4, 1, 5, 9, 2, 6]
  const k = 3
  const steps = []
  const log = []
  let heap = []

  log.unshift(`Start: Find ${k} largest in [${arr.join(',')}] using min-heap of size k=${k}`)
  steps.push({
    visual: { arr, heap: [], currentI: -1, action: 'init', k },
    msg: `Find ${k} largest in [${arr.join(',')}] using min-heap of size k=${k}`,
    log: [...log],
    currentLine: 10,
    variables: { i: -1, val: null, heap: [] },
  })

  for (let i = 0; i < arr.length; i++) {
    const val = arr[i]

    if (heap.length < k) {
      heap = heapPush(heap, val)
      log.unshift(`Push ${val}: heap=[${heap.join(',')}], size=${heap.length}${heap.length === k ? '=k (heap full)' : '<k'}`)
      steps.push({
        visual: { arr, heap: [...heap], currentI: i, action: 'push', k },
        msg: `Push ${val}: heap=[${heap.join(',')}], size=${heap.length}${heap.length === k ? '=k (heap full)' : '<k'}`,
        log: [...log],
        currentLine: 12,
        variables: { i, val, heap: [...heap] },
      })
    } else {
      const heapMin = heap[0]
      if (val > heapMin) {
        const [popped, newHeap] = heapPop(heap)
        heap = heapPush(newHeap, val)
        log.unshift(`${val} > heap min (${heapMin}) → pop ${popped}, push ${val} → heap=[${heap.join(',')}]`)
        steps.push({
          visual: { arr, heap: [...heap], currentI: i, action: 'replace', k },
          msg: `${val} > heap min (${heapMin}) → pop ${heapMin}, push ${val} → heap=[${heap.join(',')}]`,
          log: [...log],
          currentLine: 14,
          variables: { i, val, heap: [...heap] },
        })
      } else {
        log.unshift(`${val} <= heap min (${heapMin}) → skip`)
        steps.push({
          visual: { arr, heap: [...heap], currentI: i, action: 'skip', k },
          msg: `${val} <= heap min (${heapMin}) → skip`,
          log: [...log],
          currentLine: 12,
          variables: { i, val, heap: [...heap] },
        })
      }
    }
  }

  log.unshift(`Done! K largest elements: [${heap.join(',')}]`)
  steps.push({
    visual: { arr, heap: [...heap], currentI: -1, action: 'done', k },
    msg: `Done! K largest elements: [${heap.join(',')}]`,
    log: [...log],
    currentLine: 17,
    variables: { i: -1, val: null, heap: [...heap] },
  })

  return steps
}

function HeapVisual({ step }) {
  const { arr, heap, currentI, action, k } = step.visual

  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        K Largest Elements — arr=[3,1,4,1,5,9,2,6], k={k}
      </div>

      {/* Array */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>array</div>
        <div style={{ display: 'flex', gap: 5 }}>
          {arr.map((v, i) => {
            const isCurrent = i === currentI
            const isPast = i < currentI
            const bg = isCurrent
              ? action === 'skip' ? '#fef9c3' : '#fef3c7'
              : isPast ? '#f1f5f9' : '#f8faff'
            const border = isCurrent
              ? action === 'skip' ? '#facc15' : '#f59e0b'
              : isPast ? '#e2e8f0' : '#e2e8f0'
            const color = isCurrent
              ? action === 'skip' ? '#713f12' : '#92400e'
              : isPast ? '#94a3b8' : '#475569'
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 34, height: 34, background: bg, border: `${isCurrent ? 2 : 1}px solid ${border}`, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 13, fontWeight: isCurrent ? 700 : 400, color }}>
                  {v}
                </div>
                <div style={{ fontSize: 9, color: '#94a3b8' }}>[{i}]</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Min-Heap */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          min-heap (size {heap.length}/{k}, min at left)
        </div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', minHeight: 40 }}>
          {heap.length === 0
            ? <span style={{ fontSize: 11, color: '#94a3b8', fontStyle: 'italic' }}>empty</span>
            : heap.map((v, i) => {
              const isMin = i === 0
              const isDone = action === 'done'
              const bg = isDone ? '#d1fae5' : isMin ? '#fef3c7' : '#ede9fe'
              const border = isDone ? '#10b981' : isMin ? '#f59e0b' : '#7c3aed'
              const color = isDone ? '#065f46' : isMin ? '#92400e' : '#7c3aed'
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ fontSize: 8, color: isMin && !isDone ? '#f59e0b' : 'transparent', fontWeight: 700 }}>min</div>
                  <div style={{ width: 34, height: 34, background: bg, border: `2px solid ${border}`, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color }}>
                    {v}
                  </div>
                </div>
              )
            })
          }
          {heap.length < k && heap.length > 0 && Array.from({ length: k - heap.length }).map((_, i) => (
            <div key={`empty-${i}`} style={{ width: 34, height: 34, background: '#f8faff', border: '1px dashed #e2e8f0', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 12, color: '#94a3b8' }}>
              —
            </div>
          ))}
        </div>
      </div>

      {action === 'done' && (
        <div style={{ padding: '6px 10px', background: '#d1fae5', border: '2px solid #10b981', borderRadius: 6, fontSize: 13, color: '#065f46', fontWeight: 700 }}>
          K largest: [{heap.join(', ')}]
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, fontSize: 11, marginTop: 8 }}>
        <span style={{ color: '#f59e0b' }}>■ current / heap min</span>
        <span style={{ color: '#7c3aed' }}>■ in heap</span>
        <span style={{ color: '#10b981' }}>■ result</span>
        <span style={{ color: '#94a3b8' }}>■ skipped</span>
      </div>
    </div>
  )
}

export default function Heap() {
  const steps = useMemo(() => generateSteps(), [])
  return (
    <PatternSimulator
      steps={steps}
      renderStep={(step) => <HeapVisual step={step} />}
      traceCode={TRACE_CODE}
    />
  )
}
