import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import PatternSimulator from '../components/algo/PatternSimulator'

const steps = [
  { visual: {}, msg: 'Step 1', log: [], currentLine: 2, variables: { i: 0 } },
  { visual: {}, msg: 'Step 2', log: ['did step 1'], currentLine: 3, variables: { i: 1 } },
]

describe('PatternSimulator', () => {
  it('renders without traceCode (single column)', () => {
    const { container } = render(
      <PatternSimulator steps={steps} renderStep={() => <div>visual</div>} />
    )
    expect(container.querySelector('.trace-panel')).toBeNull()
  })

  it('renders split layout when traceCode provided', () => {
    const { container } = render(
      <PatternSimulator
        steps={steps}
        renderStep={() => <div>visual</div>}
        traceCode={{ js: 'let i = 0\ni++\nreturn i', python: 'i = 0\ni += 1\nreturn i' }}
      />
    )
    expect(container.querySelector('.trace-panel')).toBeDefined()
  })

  it('TracePanel shows currentLine from current step', () => {
    const { container } = render(
      <PatternSimulator
        steps={steps}
        renderStep={() => <div>visual</div>}
        traceCode={{ js: 'let i = 0\ni++\nreturn i', python: 'i = 0\ni += 1\nreturn i' }}
      />
    )
    // Step 0 has currentLine=2 — line index 2 ("return i") should be active
    const lines = container.querySelectorAll('[data-line]')
    expect(lines[2].classList.contains('active')).toBe(true)
  })
})
