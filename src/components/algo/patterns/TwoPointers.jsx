import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'

export function generateSteps() {
  const arr = [1, 3, 4, 6, 8, 9]
  const target = 14
  const steps = []
  const log = []
  let left = 0
  let right = arr.length - 1

  log.unshift(`Start: left=0 (${arr[0]}), right=${arr.length-1} (${arr[arr.length-1]}), target=${target}`)
  steps.push({
    visual: { arr, left, right, target, found: false },
    msg: `left=${left} (${arr[left]}), right=${right} (${arr[right]})`,
    log: [...log],
  })

  while (left < right) {
    const sum = arr[left] + arr[right]
    if (sum === target) {
      log.unshift(`✓ arr[${left}] + arr[${right}] = ${arr[left]} + ${arr[right]} = ${sum} == ${target} — FOUND!`)
      steps.push({
        visual: { arr, left, right, target, found: true },
        msg: `Found! arr[${left}] + arr[${right}] = ${target}`,
        log: [...log],
      })
      break
    } else if (sum < target) {
      log.unshift(`${arr[left]} + ${arr[right]} = ${sum} < ${target} → move left right`)
      steps.push({
        visual: { arr, left, right, target, found: false, sum },
        msg: `sum ${sum} < ${target} → move left →`,
        log: [...log],
      })
      left++
    } else {
      log.unshift(`${arr[left]} + ${arr[right]} = ${sum} > ${target} → move right left`)
      steps.push({
        visual: { arr, left, right, target, found: false, sum },
        msg: `sum ${sum} > ${target} → move right ←`,
        log: [...log],
      })
      right--
    }
  }

  return steps
}

function TwoPointersVisual({ step }) {
  const { arr, left, right, found } = step.visual
  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        sorted arr = [1, 3, 4, 6, 8, 9], target = 14
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
        {arr.map((val, i) => {
          const isLeft = i === left
          const isRight = i === right
          const isFound = found && (isLeft || isRight)
          const bg = isFound ? '#dcfce7' : isLeft ? '#ede9fe' : isRight ? '#fef3c7' : '#f8faff'
          const border = isFound ? '#16a34a' : isLeft ? '#7c3aed' : isRight ? '#d97706' : '#e2e8f0'
          const color = isFound ? '#16a34a' : isLeft ? '#7c3aed' : isRight ? '#d97706' : '#475569'
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{
                width: 36, height: 36, background: bg,
                border: `${(isLeft || isRight) ? 2 : 1}px solid ${border}`,
                borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'monospace', fontSize: 14, fontWeight: (isLeft || isRight) ? 700 : 400, color,
              }}>{val}</div>
              <div style={{ fontSize: 9, color, fontWeight: 600 }}>
                {isLeft && isRight ? 'L=R' : isLeft ? 'L' : isRight ? 'R' : ''}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
        <span style={{ color: '#7c3aed' }}>■ left pointer</span>
        <span style={{ color: '#d97706' }}>■ right pointer</span>
        {found && <span style={{ color: '#16a34a' }}>■ found!</span>}
      </div>
    </div>
  )
}

export default function TwoPointers() {
  const steps = useMemo(() => generateSteps(), [])
  return <PatternSimulator steps={steps} renderStep={(step) => <TwoPointersVisual step={step} />} />
}
