import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'

const WEIGHTS = [1, 2, 3, 4, 5]
const D = 3

function canShip(weights, d, cap) {
  let days = 1, curr = 0
  for (const w of weights) {
    if (curr + w > cap) { days++; curr = 0 }
    curr += w
  }
  return days <= d
}

export function generateSteps() {
  const steps = []
  const log = []
  let lo = Math.max(...WEIGHTS)  // 5
  let hi = WEIGHTS.reduce((a, b) => a + b, 0)  // 15

  log.unshift(`lo=max(weights)=${lo}, hi=sum(weights)=${hi}`)
  steps.push({
    visual: { lo, hi, mid: -1, checkResult: null, answer: null },
    msg: `lo=${lo} (must carry max), hi=${hi} (all in one day)`,
    log: [...log],
  })

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2)
    const ok = canShip(WEIGHTS, D, mid)
    log.unshift(`mid=${mid}, canShip(${mid})=${ok} → ${ok ? `hi=${mid}` : `lo=${mid+1}`}`)
    steps.push({
      visual: { lo, hi, mid, checkResult: ok, answer: null },
      msg: `check(${mid}): ${ok ? `✓ works → hi=${mid}` : `✗ fails → lo=${mid+1}`}`,
      log: [...log],
    })
    if (ok) hi = mid
    else lo = mid + 1
  }

  log.unshift(`lo == hi == ${lo} → minimum capacity = ${lo}`)
  steps.push({
    visual: { lo, hi: lo, mid: -1, checkResult: null, answer: lo },
    msg: `Answer: minimum capacity = ${lo}`,
    log: [...log],
  })

  return steps
}

function BSOnAnswerVisual({ step }) {
  const { lo, hi, mid, checkResult, answer } = step.visual
  const MIN = 5, MAX = 15
  const range = MAX - MIN
  const loFrac = (lo - MIN) / range
  const hiFrac = (hi - MIN) / range
  const midFrac = mid >= MIN ? (mid - MIN) / range : -1

  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        weights=[1,2,3,4,5], D=3 days — find min shipping capacity
      </div>
      {/* Answer space bar */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Answer space [{MIN}..{MAX}]
        </div>
        <div style={{ position: 'relative', height: 28, background: '#f1f5f9', borderRadius: 6, marginBottom: 4 }}>
          {/* Active range */}
          <div style={{ position: 'absolute', left: `${loFrac * 100}%`, width: `${(hiFrac - loFrac) * 100}%`, height: '100%', background: '#ede9fe', borderRadius: 4, transition: 'all 0.2s' }} />
          {/* mid marker */}
          {midFrac >= 0 && (
            <div style={{ position: 'absolute', left: `${midFrac * 100}%`, top: 0, bottom: 0, width: 3, background: '#d97706', borderRadius: 2, transform: 'translateX(-50%)' }} />
          )}
          {/* lo/hi labels */}
          <div style={{ position: 'absolute', left: `${loFrac * 100}%`, top: -18, transform: 'translateX(-50%)', fontSize: 10, color: '#7c3aed', fontWeight: 700 }}>lo={lo}</div>
          <div style={{ position: 'absolute', left: `${hiFrac * 100}%`, top: -18, transform: 'translateX(-50%)', fontSize: 10, color: '#7c3aed', fontWeight: 700 }}>hi={hi}</div>
          {midFrac >= 0 && <div style={{ position: 'absolute', left: `${midFrac * 100}%`, bottom: -16, transform: 'translateX(-50%)', fontSize: 10, color: '#d97706', fontWeight: 700 }}>mid={mid}</div>}
        </div>
      </div>
      {/* Check result */}
      {mid >= 0 && checkResult !== null && (
        <div style={{ marginBottom: 10, padding: '8px 12px', background: checkResult ? '#dcfce7' : '#fee2e2', border: `1px solid ${checkResult ? '#16a34a' : '#ef4444'}`, borderRadius: 6, fontSize: 12, color: checkResult ? '#16a34a' : '#ef4444', fontWeight: 600 }}>
          canShip(capacity={mid}): {checkResult ? `✓ fits in ≤${D} days → try smaller` : `✗ needs more than ${D} days → go larger`}
        </div>
      )}
      {answer !== null && (
        <div style={{ padding: '8px 12px', background: '#ede9fe', border: '2px solid #7c3aed', borderRadius: 6, fontSize: 13, color: '#7c3aed', fontWeight: 700 }}>
          ✓ Minimum capacity = {answer}
        </div>
      )}
    </div>
  )
}

export default function BinarySearchOnAnswer() {
  const steps = useMemo(() => generateSteps(), [])
  return <PatternSimulator steps={steps} renderStep={(step) => <BSOnAnswerVisual step={step} />} />
}
