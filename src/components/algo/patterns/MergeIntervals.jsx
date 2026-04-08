import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'

export function generateSteps() {
  const intervals = [[1, 4], [2, 6], [8, 10], [15, 18]]
  const steps = []
  const log = []

  log.unshift(`Start: intervals=[[1,4],[2,6],[8,10],[15,18]]`)
  steps.push({
    visual: { intervals, sorted: [...intervals], merged: [], currentIdx: -1, phase: 'init' },
    msg: `Init: show all 4 intervals on timeline`,
    log: [...log],
  })

  // Sort step (already sorted)
  const sorted = [...intervals].sort((a, b) => a[0] - b[0])
  log.unshift(`Sort by start: [1,4],[2,6],[8,10],[15,18] (already sorted)`)
  steps.push({
    visual: { intervals, sorted, merged: [], currentIdx: -1, phase: 'sort' },
    msg: `Sorted: [1,4],[2,6],[8,10],[15,18] (already sorted)`,
    log: [...log],
  })

  const merged = []

  for (let i = 0; i < sorted.length; i++) {
    const cur = sorted[i]
    if (merged.length === 0) {
      merged.push([...cur])
      log.unshift(`Take [${cur}]: result=[[${merged.map(m => `[${m}]`).join(',')}]]`)
      steps.push({
        visual: { intervals, sorted, merged: merged.map(m => [...m]), currentIdx: i, phase: 'merge' },
        msg: `Take [${cur[0]},${cur[1]}]: result=[[${cur[0]},${cur[1]}]]`,
        log: [...log],
      })
    } else {
      const last = merged[merged.length - 1]
      if (cur[0] <= last[1]) {
        const newEnd = Math.max(last[1], cur[1])
        log.unshift(`[${cur}] overlaps [${last}] (${cur[0]}<=${last[1]}): merge → [${last[0]},${newEnd}]`)
        last[1] = newEnd
        steps.push({
          visual: { intervals, sorted, merged: merged.map(m => [...m]), currentIdx: i, phase: 'merge' },
          msg: `[${cur[0]},${cur[1]}] overlaps [${last[0]},${last[1]}] (${cur[0]}<=${last[1]}): merge → [${last[0]},${newEnd}]`,
          log: [...log],
        })
      } else {
        log.unshift(`[${cur}] does not overlap [${last}] (${cur[0]}>${last[1]}): add → result has ${merged.length + 1} intervals`)
        merged.push([...cur])
        steps.push({
          visual: { intervals, sorted, merged: merged.map(m => [...m]), currentIdx: i, phase: 'merge' },
          msg: `[${cur[0]},${cur[1]}] does not overlap [${last[0]},${last[1]}] (${cur[0]}>${last[1]}): add → result=[[${merged.map(m => `[${m}]`).join(',')}]]`,
          log: [...log],
        })
      }
    }
  }

  log.unshift(`Done! Merged to ${merged.length} intervals: [[1,6],[8,10],[15,18]]`)
  steps.push({
    visual: { intervals, sorted, merged: merged.map(m => [...m]), currentIdx: -1, phase: 'done' },
    msg: `Done! Merged to ${merged.length} intervals: [[1,6],[8,10],[15,18]]`,
    log: [...log],
  })

  return steps
}

const MIN_VAL = 0
const MAX_VAL = 19

function TimelineBar({ interval, color, bg, label }) {
  const totalRange = MAX_VAL - MIN_VAL
  const left = ((interval[0] - MIN_VAL) / totalRange) * 100
  const width = ((interval[1] - interval[0]) / totalRange) * 100
  return (
    <div style={{ position: 'relative', height: 20, marginBottom: 4 }}>
      <div style={{ position: 'absolute', left: `${left}%`, width: `${width}%`, minWidth: 6, height: '100%', background: bg, border: `2px solid ${color}`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
        <span style={{ fontSize: 9, color, fontWeight: 700, whiteSpace: 'nowrap', padding: '0 2px' }}>{label}</span>
      </div>
    </div>
  )
}

function MergeIntervalsVisual({ step }) {
  const { intervals, merged, currentIdx, sorted, phase } = step.visual
  const totalRange = MAX_VAL - MIN_VAL
  const ticks = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        Merge overlapping intervals — [[1,4],[2,6],[8,10],[15,18]]
      </div>

      {/* Input intervals */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>input intervals</div>
        <div style={{ position: 'relative', paddingBottom: 18 }}>
          {intervals.map((iv, i) => {
            const isCurrent = i === currentIdx
            return (
              <TimelineBar
                key={i}
                interval={iv}
                color={isCurrent ? '#f59e0b' : '#7c3aed'}
                bg={isCurrent ? '#fef3c7' : '#ede9fe'}
                label={`[${iv[0]},${iv[1]}]`}
              />
            )
          })}
          {/* Tick marks */}
          <div style={{ position: 'relative', height: 16, borderTop: '1px solid #e2e8f0', marginTop: 4 }}>
            {ticks.map(t => (
              <div key={t} style={{ position: 'absolute', left: `${((t - MIN_VAL) / totalRange) * 100}%`, transform: 'translateX(-50%)', fontSize: 8, color: '#94a3b8' }}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Merged result */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          merged result ({merged.length} interval{merged.length !== 1 ? 's' : ''})
        </div>
        <div style={{ position: 'relative', paddingBottom: 18, minHeight: 40 }}>
          {merged.length === 0
            ? <span style={{ fontSize: 11, color: '#94a3b8', fontStyle: 'italic' }}>empty</span>
            : merged.map((iv, i) => (
              <TimelineBar
                key={i}
                interval={iv}
                color={phase === 'done' ? '#10b981' : '#f59e0b'}
                bg={phase === 'done' ? '#d1fae5' : '#fef3c7'}
                label={`[${iv[0]},${iv[1]}]`}
              />
            ))
          }
          {merged.length > 0 && (
            <div style={{ position: 'relative', height: 16, borderTop: '1px solid #e2e8f0', marginTop: 4 }}>
              {ticks.map(t => (
                <div key={t} style={{ position: 'absolute', left: `${((t - MIN_VAL) / totalRange) * 100}%`, transform: 'translateX(-50%)', fontSize: 8, color: '#94a3b8' }}>{t}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {phase === 'done' && (
        <div style={{ padding: '6px 10px', background: '#d1fae5', border: '2px solid #10b981', borderRadius: 6, fontSize: 13, color: '#065f46', fontWeight: 700 }}>
          Result: [[1,6],[8,10],[15,18]]
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, fontSize: 11, marginTop: 8 }}>
        <span style={{ color: '#7c3aed' }}>■ input</span>
        <span style={{ color: '#f59e0b' }}>■ current / merging</span>
        <span style={{ color: '#10b981' }}>■ done</span>
      </div>
    </div>
  )
}

export default function MergeIntervals() {
  const steps = useMemo(() => generateSteps(), [])
  return <PatternSimulator steps={steps} renderStep={(step) => <MergeIntervalsVisual step={step} />} />
}
