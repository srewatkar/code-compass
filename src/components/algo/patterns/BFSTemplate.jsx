import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'

export function generateSteps() {
  const grid = [
    [0, 0, 1, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  const ROWS = 4, COLS = 4
  const dist = Array.from({ length: ROWS }, () => new Array(COLS).fill(-1))
  const steps = []
  const log = []
  const queue = [[0, 0]]
  dist[0][0] = 0

  log.unshift('Start BFS from (0,0), distance=0')
  steps.push({
    visual: { grid, dist: dist.map(r => [...r]), current: null, found: false },
    msg: 'Start at (0,0)',
    log: [...log],
  })

  const dirs = [[-1,0],[1,0],[0,-1],[0,1]]
  while (queue.length > 0) {
    const [r, c] = queue.shift()
    if (r === 3 && c === 3) {
      log.unshift(`Reached (3,3)! Shortest path = ${dist[3][3]} steps`)
      steps.push({
        visual: { grid, dist: dist.map(row => [...row]), current: [r, c], found: true },
        msg: `Reached (3,3) — distance = ${dist[3][3]}`,
        log: [...log],
      })
      break
    }
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] === 0 && dist[nr][nc] === -1) {
        dist[nr][nc] = dist[r][c] + 1
        queue.push([nr, nc])
        log.unshift(`Visit (${nr},${nc}), distance=${dist[nr][nc]}`)
        steps.push({
          visual: { grid, dist: dist.map(row => [...row]), current: [nr, nc], found: false },
          msg: `Visit (${nr},${nc}) — distance ${dist[nr][nc]}`,
          log: [...log],
        })
      }
    }
  }
  return steps
}

const LEVEL_COLORS = ['#ede9fe','#ddd6fe','#c4b5fd','#a78bfa','#8b5cf6','#7c3aed','#6d28d9','#5b21b6']

function BFSVisual({ step }) {
  const { grid, dist, current, found } = step.visual
  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        4×4 grid — find shortest path from (0,0) to (3,3). Gray = wall.
      </div>
      <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(4, 44px)', gap: 4, marginBottom: 12 }}>
        {grid.map((row, r) => row.map((cell, c) => {
          const d = dist[r][c]
          const isWall = cell === 1
          const isCurrent = current && current[0] === r && current[1] === c
          const isStart = r === 0 && c === 0
          const isEnd = r === 3 && c === 3
          let bg = '#f8faff'
          let border = '#e2e8f0'
          let color = '#475569'
          if (isWall) { bg = '#e2e8f0'; color = '#94a3b8' }
          else if (isEnd && found) { bg = '#dcfce7'; border = '#16a34a'; color = '#16a34a' }
          else if (isCurrent) { bg = '#fef3c7'; border = '#d97706'; color = '#92400e' }
          else if (d >= 0) { bg = LEVEL_COLORS[Math.min(d, LEVEL_COLORS.length-1)]; border = '#7c3aed'; color = '#fff' }
          return (
            <div key={`${r}-${c}`} style={{ width: 44, height: 44, background: bg, border: `2px solid ${border}`, borderRadius: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color }}>
              <div>{isStart ? 'S' : isEnd ? 'E' : isWall ? '■' : d >= 0 ? d : ''}</div>
              <div style={{ fontSize: 8, opacity: 0.8 }}>{`${r},${c}`}</div>
            </div>
          )
        }))}
      </div>
      <div style={{ display: 'flex', gap: 12, fontSize: 11, flexWrap: 'wrap' }}>
        <span style={{ color: '#7c3aed' }}>■ visited (number = distance)</span>
        <span style={{ color: '#d97706' }}>■ current</span>
        <span style={{ color: '#94a3b8' }}>■ wall</span>
      </div>
    </div>
  )
}

export default function BFSTemplate() {
  const steps = useMemo(() => generateSteps(), [])
  return <PatternSimulator steps={steps} renderStep={(step) => <BFSVisual step={step} />} />
}
