import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'

export function generateSteps() {
  const arr = [1, 3, 5, 7, 9, 11, 13, 15]
  const target = 13
  const steps = []
  const log = []
  let lo = 0, hi = arr.length - 1

  log.unshift(`Start: lo=0, hi=${arr.length-1}, target=${target}`)
  steps.push({
    visual: { arr, lo, hi, mid: -1, target, found: false, foundIdx: -1 },
    msg: `lo=0, hi=${arr.length-1} — searching for ${target}`,
    log: [...log],
  })

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2)
    if (arr[mid] === target) {
      log.unshift(`arr[${mid}]=${arr[mid]} == ${target} → FOUND at index ${mid}!`)
      steps.push({
        visual: { arr, lo, hi, mid, target, found: true, foundIdx: mid },
        msg: `arr[${mid}] = ${target} — found at index ${mid}!`,
        log: [...log],
      })
      break
    } else if (arr[mid] < target) {
      log.unshift(`arr[${mid}]=${arr[mid]} < ${target} → lo = mid+1 = ${mid+1}`)
      steps.push({
        visual: { arr, lo, hi, mid, target, found: false, foundIdx: -1 },
        msg: `arr[${mid}]=${arr[mid]} < ${target} → move lo right`,
        log: [...log],
      })
      lo = mid + 1
    } else {
      log.unshift(`arr[${mid}]=${arr[mid]} > ${target} → hi = mid-1 = ${mid-1}`)
      steps.push({
        visual: { arr, lo, hi, mid, target, found: false, foundIdx: -1 },
        msg: `arr[${mid}]=${arr[mid]} > ${target} → move hi left`,
        log: [...log],
      })
      hi = mid - 1
    }
  }
  return steps
}

function BinarySearchVisual({ step }) {
  const { arr, lo, hi, mid, target, found, foundIdx } = step.visual
  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        sorted arr = [1,3,5,7,9,11,13,15], target = {target}
      </div>
      <div style={{ display: 'flex', gap: 5, marginBottom: 12, flexWrap: 'wrap' }}>
        {arr.map((v, i) => {
          const isMid = i === mid
          const isFound = i === foundIdx && found
          const inRange = i >= lo && i <= hi
          const bg = isFound ? '#dcfce7' : isMid ? '#fef3c7' : inRange ? '#ede9fe' : '#f1f5f9'
          const border = isFound ? '#16a34a' : isMid ? '#d97706' : inRange ? '#7c3aed' : '#e2e8f0'
          const color = isFound ? '#16a34a' : isMid ? '#92400e' : inRange ? '#7c3aed' : '#94a3b8'
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ fontSize: 9, height: 12, color: isMid ? '#d97706' : 'transparent', fontWeight: 700 }}>
                {isMid ? 'mid' : ''}
              </div>
              <div style={{ width: 34, height: 34, background: bg, border: `${isMid || isFound ? 2 : 1}px solid ${border}`, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 13, fontWeight: isMid || isFound ? 700 : 400, color }}>
                {v}
              </div>
              <div style={{ fontSize: 9, color: i === lo ? '#7c3aed' : i === hi ? '#7c3aed' : '#94a3b8', fontWeight: (i === lo || i === hi) ? 700 : 400 }}>
                {i === lo && i === hi ? 'lo/hi' : i === lo ? 'lo' : i === hi ? 'hi' : i}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
        <span style={{ color: '#7c3aed' }}>■ search range</span>
        <span style={{ color: '#d97706' }}>■ mid</span>
        <span style={{ color: '#16a34a' }}>■ found</span>
        <span style={{ color: '#94a3b8' }}>■ eliminated</span>
      </div>
    </div>
  )
}

export default function BinarySearch() {
  const steps = useMemo(() => generateSteps(), [])
  return <PatternSimulator steps={steps} renderStep={(step) => <BinarySearchVisual step={step} />} />
}
