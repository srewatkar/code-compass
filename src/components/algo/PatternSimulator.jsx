import { useState, useRef, useEffect } from 'react'
import '../dsa/dsa.css'

export default function PatternSimulator({ steps, renderStep }) {
  const [stepIdx, setStepIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const playRef = useRef(null)

  // Reset when steps array changes (different pattern selected)
  useEffect(() => {
    setStepIdx(0)
    setPlaying(false)
    clearInterval(playRef.current)
  }, [steps])

  // Stop playing state when last step is reached via autoplay
  useEffect(() => {
    if (playing && stepIdx >= steps.length - 1) setPlaying(false)
  }, [stepIdx, playing, steps.length])

  useEffect(() => () => clearInterval(playRef.current), [])

  const currentStep = steps[stepIdx] ?? steps[0]

  const prev = () => setStepIdx(i => Math.max(i - 1, 0))
  const next = () => setStepIdx(i => Math.min(i + 1, steps.length - 1))
  const reset = () => {
    clearInterval(playRef.current)
    setPlaying(false)
    setStepIdx(0)
  }

  const togglePlay = () => {
    if (playing) {
      clearInterval(playRef.current)
      setPlaying(false)
    } else {
      setPlaying(true)
      playRef.current = setInterval(() => {
        setStepIdx(idx => {
          if (idx >= steps.length - 1) {
            clearInterval(playRef.current)
            playRef.current = null
            return idx
          }
          return idx + 1
        })
      }, 500)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* Step counter + message */}
      <div className="ds-visual-label" style={{ marginBottom: 12 }}>
        Step {stepIdx + 1} of {steps.length}
        <span style={{ marginLeft: 8, fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: '#7c3aed', fontSize: 12 }}>
          {currentStep.msg}
        </span>
      </div>

      {/* Pattern-specific visual */}
      <div style={{ marginBottom: 16 }}>
        {renderStep(currentStep)}
      </div>

      {/* Controls */}
      <div className="ds-controls">
        <button type="button" className="ds-btn secondary" title="Go back one step" onClick={prev} disabled={stepIdx === 0}>◀ Prev</button>
        <button type="button" className="ds-btn" title="Auto-step at 500ms intervals" onClick={togglePlay} disabled={stepIdx === steps.length - 1}>
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
        <button type="button" className="ds-btn secondary" title="Advance one step" onClick={next} disabled={stepIdx === steps.length - 1}>Next ▶</button>
        <button type="button" className="ds-btn secondary" title="Restart from beginning" onClick={reset}>↺ Reset</button>
      </div>

      {/* Log */}
      <div className="ds-log">
        <div className="ds-log-header">Log</div>
        <div className="ds-log-entries">
          {currentStep.log.length === 0
            ? <span className="ds-empty-log">No operations yet</span>
            : currentStep.log.map((entry) => (
                <div key={entry} className="ds-log-entry">{entry}</div>
              ))
          }
        </div>
      </div>
    </div>
  )
}
