import { useState, useRef, useEffect } from 'react'
import { dsaTopics } from '../../data/dsaTopics'
import DsaCodeView from './DsaCodeView'
import './dsa.css'

const DEFAULT_ARRAY = [5, 3, 8, 1, 6, 2, 7, 4]

function bubbleSortSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length
  const sorted = new Set()
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const msg = `Comparing index ${j} (${a[j]}) and index ${j+1} (${a[j+1]})`
      steps.push({ array: [...a], comparing: [j, j + 1], swapped: false, sorted: [...sorted], msg })
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        steps.push({ array: [...a], comparing: [j, j + 1], swapped: true, sorted: [...sorted], msg: `${msg} → swapped` })
      }
    }
    sorted.add(n - 1 - i)
  }
  sorted.add(0)
  steps.push({ array: [...a], comparing: [], swapped: false, sorted: [...sorted], msg: 'Sorting complete!' })
  return steps
}

function selectionSortSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length
  const sorted = new Set()
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      const msg = `Finding min in unsorted portion — comparing ${a[minIdx]} and ${a[j]}`
      steps.push({ array: [...a], comparing: [minIdx, j], swapped: false, sorted: [...sorted], msg })
      if (a[j] < a[minIdx]) minIdx = j
    }
    if (minIdx !== i) {
      ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
      steps.push({ array: [...a], comparing: [i, minIdx], swapped: true, sorted: [...sorted], msg: `Swapped min ${a[i]} into position ${i}` })
    }
    sorted.add(i)
  }
  sorted.add(n - 1)
  steps.push({ array: [...a], comparing: [], swapped: false, sorted: [...sorted], msg: 'Sorting complete!' })
  return steps
}

function insertionSortSteps(arr) {
  const steps = []
  const a = [...arr]
  const sorted = new Set([0])
  for (let i = 1; i < a.length; i++) {
    let j = i
    while (j > 0 && a[j - 1] > a[j]) {
      steps.push({ array: [...a], comparing: [j - 1, j], swapped: false, sorted: [...sorted], msg: `Comparing ${a[j-1]} > ${a[j]} → shift left` })
      ;[a[j], a[j - 1]] = [a[j - 1], a[j]]
      steps.push({ array: [...a], comparing: [j - 1, j], swapped: true, sorted: [...sorted], msg: `Inserted ${a[j]} into sorted position` })
      j--
    }
    sorted.add(i)
  }
  steps.push({ array: [...a], comparing: [], swapped: false, sorted: [...Array.from({ length: a.length }, (_, k) => k)], msg: 'Sorting complete!' })
  return steps
}

const ALGORITHMS = {
  bubble: { label: 'Bubble Sort', fn: bubbleSortSteps },
  selection: { label: 'Selection Sort', fn: selectionSortSteps },
  insertion: { label: 'Insertion Sort', fn: insertionSortSteps },
}

export default function Sorting({ view }) {
  const [algo, setAlgo] = useState('bubble')
  const [customInput, setCustomInput] = useState('')
  const [steps, setSteps] = useState(() => bubbleSortSteps(DEFAULT_ARRAY))
  const [stepIdx, setStepIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const playRef = useRef(null)

  const currentStep = steps[stepIdx] ?? steps[0]
  const maxVal = Math.max(...currentStep.array)

  const reset = (newAlgo = algo, arr = DEFAULT_ARRAY) => {
    setStepIdx(0)
    setPlaying(false)
    clearInterval(playRef.current)
    setSteps(ALGORITHMS[newAlgo].fn(arr))
  }

  const changeAlgo = (newAlgo) => {
    setAlgo(newAlgo)
    reset(newAlgo)
  }

  const applyCustom = () => {
    const arr = customInput.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n) && n > 0)
    if (arr.length < 2) return
    reset(algo, arr)
    setCustomInput('')
  }

  const next = () => setStepIdx(prev => Math.min(prev + 1, steps.length - 1))
  const prev = () => setStepIdx(prev => Math.max(prev - 1, 0))

  const togglePlay = () => {
    if (playing) {
      clearInterval(playRef.current)
      setPlaying(false)
    } else {
      setPlaying(true)
      playRef.current = setInterval(() => {
        setStepIdx(prev => {
          if (prev >= steps.length - 1) {
            clearInterval(playRef.current)
            setPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 400)
    }
  }

  useEffect(() => () => clearInterval(playRef.current), [])

  if (view === 'code') return <DsaCodeView blocks={dsaTopics.sorting} />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* Algorithm picker */}
      <div className="ds-controls" style={{ marginBottom: 12 }}>
        {Object.entries(ALGORITHMS).map(([key, { label }]) => (
          <button
            type="button"
            key={key}
            className={`ds-btn${algo === key ? '' : ' secondary'}`}
            onClick={() => changeAlgo(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Custom array input */}
      <div className="ds-controls">
        <input
          className="ds-input"
          style={{ width: 200 }}
          value={customInput}
          onChange={e => setCustomInput(e.target.value)}
          placeholder="e.g. 5,3,8,1,6"
          onKeyDown={e => e.key === 'Enter' && applyCustom()}
        />
        <button type="button" className="ds-btn secondary" title="Use your comma-separated numbers as the input array" onClick={applyCustom}>Use custom array</button>
        <button type="button" className="ds-btn secondary" title="Go back to the default array [5, 3, 8, 1, 6, 2, 7, 4]" onClick={() => reset(algo)}>Reset default</button>
      </div>

      {/* Bar chart */}
      <div className="ds-visual-label">
        Step {stepIdx + 1} of {steps.length}
        <span style={{ marginLeft: 8, fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: '#7c3aed', fontSize: 12 }}>
          {currentStep.msg}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120, marginBottom: 16 }}>
        {currentStep.array.map((val, i) => {
          const isComparing = currentStep.comparing.includes(i)
          const isSorted = currentStep.sorted.includes(i)
          const isSwapped = isComparing && currentStep.swapped
          const barH = Math.max((val / maxVal) * 100, 8)
          const bg = isSorted ? '#22c55e' : isSwapped ? '#f97316' : isComparing ? '#eab308' : '#7c3aed'
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
              <span style={{ fontSize: 11, color: '#64748b', fontFamily: 'monospace' }}>{val}</span>
              <div style={{
                width: '100%',
                height: barH,
                background: bg,
                borderRadius: '3px 3px 0 0',
                transition: 'height 0.15s, background 0.15s',
                opacity: isSorted ? 0.8 : 1,
              }} />
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: 12, color: '#64748b' }}>
        {[['#eab308','Comparing'],['#f97316','Swapping'],['#22c55e','Sorted'],['#7c3aed','Unsorted']].map(([color, label]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 12, height: 12, background: color, borderRadius: 2 }} />
            {label}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="ds-controls">
        <button type="button" className="ds-btn secondary" title="Go back one step" onClick={prev} disabled={stepIdx === 0}>◀ Prev</button>
        <button type="button" className="ds-btn" title="Auto-step through the algorithm at 400ms intervals" onClick={togglePlay} disabled={stepIdx === steps.length - 1}>
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
        <button type="button" className="ds-btn secondary" title="Advance one step" onClick={next} disabled={stepIdx === steps.length - 1}>Next ▶</button>
        <button type="button" className="ds-btn secondary" title="Restart from the beginning" onClick={() => reset(algo)}>↺ Reset</button>
      </div>
    </div>
  )
}
