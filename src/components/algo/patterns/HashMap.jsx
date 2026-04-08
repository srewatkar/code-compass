import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'

export function generateSteps() {
  const arr = [2, 7, 11, 15]
  const target = 9
  const steps = []
  const log = []
  const map = {}

  log.unshift(`Start: arr=[${arr.join(',')}], target=${target}, map={}`)
  steps.push({
    visual: { arr, map: { ...map }, currentI: -1, foundPair: null, target },
    msg: `Scanning arr=[${arr.join(',')}], target=${target}`,
    log: [...log],
  })

  for (let i = 0; i < arr.length; i++) {
    const val = arr[i]
    const complement = target - val

    if (map[complement] !== undefined) {
      log.unshift(`i=${i}, val=${val}: complement=${complement} FOUND in map at index ${map[complement]} → return [${map[complement]},${i}]`)
      steps.push({
        visual: { arr, map: { ...map }, currentI: i, foundPair: [map[complement], i], target },
        msg: `i=${i}, val=${val}: complement=${complement} found in map at index ${map[complement]} → return [${map[complement]},${i}]`,
        log: [...log],
      })
      log.unshift(`Done! Found pair: arr[${map[complement]}]+arr[${i}]=${arr[map[complement]]}+${val}=${target}`)
      steps.push({
        visual: { arr, map: { ...map }, currentI: -1, foundPair: [map[complement], i], target, done: true },
        msg: `Done! Found pair: arr[${map[complement]}]+arr[${i}]=${arr[map[complement]]}+${val}=${target}`,
        log: [...log],
      })
      return steps
    }

    log.unshift(`i=${i}, val=${val}: complement=${complement} not in map → add {${val}:${i}} to map`)
    map[val] = i
    steps.push({
      visual: { arr, map: { ...map }, currentI: i, foundPair: null, target },
      msg: `i=${i}, val=${val}: complement=${complement} not in map → add {${val}:${i}}`,
      log: [...log],
    })
  }

  return steps
}

function HashMapVisual({ step }) {
  const { arr, map, currentI, foundPair, target, done } = step.visual
  const mapEntries = Object.entries(map)

  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        Two Sum — arr=[2,7,11,15], target={target}
      </div>

      {/* Array */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>array</div>
        <div style={{ display: 'flex', gap: 5 }}>
          {arr.map((v, i) => {
            const isCurrent = i === currentI
            const isInPair = foundPair && foundPair.includes(i)
            const bg = isInPair ? '#dcfce7' : isCurrent ? '#fef3c7' : '#f8faff'
            const border = isInPair ? '#10b981' : isCurrent ? '#f59e0b' : '#e2e8f0'
            const color = isInPair ? '#10b981' : isCurrent ? '#92400e' : '#475569'
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 36, height: 36, background: bg, border: `${isCurrent || isInPair ? 2 : 1}px solid ${border}`, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 14, fontWeight: isCurrent || isInPair ? 700 : 400, color }}>
                  {v}
                </div>
                <div style={{ fontSize: 9, color: '#94a3b8' }}>[{i}]</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* HashMap */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>hash map (value → index)</div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', minHeight: 40, alignItems: 'center' }}>
          {mapEntries.length === 0
            ? <span style={{ fontSize: 11, color: '#94a3b8', fontStyle: 'italic' }}>empty</span>
            : mapEntries.map(([key, val]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', background: '#ede9fe', border: '1px solid #7c3aed', borderRadius: 5, padding: '4px 8px', fontFamily: 'monospace', fontSize: 12, color: '#7c3aed', fontWeight: 600 }}>
                {key} → {val}
              </div>
            ))
          }
        </div>
      </div>

      {done && foundPair && (
        <div style={{ padding: '6px 10px', background: '#dcfce7', border: '2px solid #10b981', borderRadius: 6, fontSize: 13, color: '#065f46', fontWeight: 700 }}>
          Found: arr[{foundPair[0]}] + arr[{foundPair[1]}] = {arr[foundPair[0]]} + {arr[foundPair[1]]} = {target}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, fontSize: 11, marginTop: 8 }}>
        <span style={{ color: '#f59e0b' }}>■ current</span>
        <span style={{ color: '#7c3aed' }}>■ in map</span>
        <span style={{ color: '#10b981' }}>■ found pair</span>
      </div>
    </div>
  )
}

export default function HashMap() {
  const steps = useMemo(() => generateSteps(), [])
  return <PatternSimulator steps={steps} renderStep={(step) => <HashMapVisual step={step} />} />
}
