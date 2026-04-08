import { useMemo } from 'react'
import PatternSimulator from '../PatternSimulator'

export function generateSteps() {
  const s1 = 'ABCD', s2 = 'ACD'
  const m = s1.length, n = s2.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  const steps = []
  const log = []

  log.unshift(`s1="${s1}", s2="${s2}" — dp[i][j] = LCS length of s1[0..i-1] and s2[0..j-1]`)
  log.unshift('Initialize: dp[0][j]=0 for all j, dp[i][0]=0 for all i (empty string has LCS 0)')
  steps.push({
    visual: { s1, s2, dp: dp.map(r => [...r]), currentI: 0, currentJ: 0 },
    msg: 'Initialize: row 0 and column 0 = 0',
    log: [...log],
  })

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
        log.unshift(`s1[${i-1}]='${s1[i-1]}' == s2[${j-1}]='${s2[j-1]}' → dp[${i}][${j}] = dp[${i-1}][${j-1}]+1 = ${dp[i][j]}`)
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
        log.unshift(`s1[${i-1}]='${s1[i-1]}' != s2[${j-1}]='${s2[j-1]}' → dp[${i}][${j}] = max(${dp[i-1][j]},${dp[i][j-1]}) = ${dp[i][j]}`)
      }
      steps.push({
        visual: { s1, s2, dp: dp.map(r => [...r]), currentI: i, currentJ: j },
        msg: `dp[${i}][${j}] = ${dp[i][j]} — s1[${i-1}]='${s1[i-1]}', s2[${j-1}]='${s2[j-1]}'`,
        log: [...log],
      })
    }
  }

  log.unshift(`Done! LCS("${s1}","${s2}") = dp[${m}][${n}] = ${dp[m][n]}`)
  steps.push({
    visual: { s1, s2, dp: dp.map(r => [...r]), currentI: -1, currentJ: -1, done: true, answer: dp[m][n] },
    msg: `LCS length = ${dp[m][n]}`,
    log: [...log],
  })

  return steps
}

function DP2DVisual({ step }) {
  const { s1, s2, dp, currentI, currentJ, done, answer } = step.visual
  const cellSize = 36
  return (
    <div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, fontStyle: 'italic' }}>
        LCS of "{s1}" and "{s2}" — dp[i][j] = LCS of first i chars of s1, first j chars of s2
      </div>
      <div style={{ overflowX: 'auto', marginBottom: 10 }}>
        <table style={{ borderCollapse: 'separate', borderSpacing: 3 }}>
          <thead>
            <tr>
              <td style={{ width: cellSize }} />
              <td style={{ width: cellSize, textAlign: 'center', fontSize: 11, color: '#64748b', fontWeight: 700 }}>ε</td>
              {s2.split('').map((c, j) => (
                <td key={j} style={{ width: cellSize, textAlign: 'center', fontSize: 12, color: '#7c3aed', fontWeight: 700, fontFamily: 'monospace' }}>{c}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {dp.map((row, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'center', fontSize: 12, color: '#7c3aed', fontWeight: 700, fontFamily: 'monospace', paddingRight: 4 }}>
                  {i === 0 ? 'ε' : s1[i - 1]}
                </td>
                {row.map((val, j) => {
                  const isCurrent = i === currentI && j === currentJ
                  const isDep = !done && i === currentI && j === currentJ - 1 ||
                                !done && i === currentI - 1 && j === currentJ ||
                                !done && i === currentI - 1 && j === currentJ - 1
                  const isDone = done
                  const bg = isDone ? '#ede9fe' : isCurrent ? '#fef3c7' : isDep ? '#dbeafe' : val > 0 ? '#f0fdf4' : '#f8faff'
                  const border = isDone ? '#7c3aed' : isCurrent ? '#d97706' : isDep ? '#3b82f6' : '#e2e8f0'
                  const color = isDone ? '#7c3aed' : isCurrent ? '#92400e' : isDep ? '#1d4ed8' : val > 0 ? '#16a34a' : '#94a3b8'
                  return (
                    <td key={j}>
                      <div style={{ width: cellSize, height: cellSize, background: bg, border: `${isCurrent ? 2 : 1}px solid ${border}`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 13, fontWeight: isCurrent ? 700 : 400, color }}>
                        {val}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {done && (
        <div style={{ padding: '6px 10px', background: '#ede9fe', border: '2px solid #7c3aed', borderRadius: 6, fontSize: 13, color: '#7c3aed', fontWeight: 700 }}>
          ✓ LCS("{s1}", "{s2}") = {answer}
        </div>
      )}
      <div style={{ display: 'flex', gap: 12, fontSize: 11, marginTop: 8 }}>
        <span style={{ color: '#d97706' }}>■ current cell</span>
        <span style={{ color: '#3b82f6' }}>■ dependencies</span>
        <span style={{ color: '#16a34a' }}>■ non-zero</span>
      </div>
    </div>
  )
}

export default function DP2D() {
  const steps = useMemo(() => generateSteps(), [])
  return <PatternSimulator steps={steps} renderStep={(step) => <DP2DVisual step={step} />} />
}
