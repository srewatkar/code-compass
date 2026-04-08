import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TracePanel from '../components/shared/TracePanel'

const JS_CODE = `function push(stack, val) {\n  stack.push(val)\n  return stack\n}`
const PY_CODE = `def push(stack, val):\n    stack.append(val)\n    return stack`

describe('TracePanel', () => {
  it('renders JS code by default', () => {
    render(<TracePanel jsCode={JS_CODE} pyCode={PY_CODE} currentLine={1} variables={{}} />)
    expect(screen.getByText(/stack\.push/)).toBeDefined()
  })

  it('highlights the active line with a marker', () => {
    const { container } = render(
      <TracePanel jsCode={JS_CODE} pyCode={PY_CODE} currentLine={1} variables={{}} />
    )
    const lines = container.querySelectorAll('[data-line]')
    expect(lines[1].textContent).toMatch(/→/)
  })

  it('switches to Python when toggle clicked', async () => {
    render(<TracePanel jsCode={JS_CODE} pyCode={PY_CODE} currentLine={0} variables={{}} />)
    await userEvent.click(screen.getByRole('button', { name: /python/i }))
    expect(screen.getByText(/stack\.append/)).toBeDefined()
  })

  it('shows variables when provided', () => {
    const { container } = render(<TracePanel jsCode={JS_CODE} pyCode={PY_CODE} currentLine={0} variables={{ val: 5, size: 4 }} />)
    const varsPanel = container.querySelector('.trace-vars')
    expect(varsPanel).toBeDefined()
    expect(varsPanel.textContent).toMatch(/val/)
    expect(varsPanel.textContent).toMatch(/5/)
  })

  it('hides variables panel when variables is empty', () => {
    const { container } = render(
      <TracePanel jsCode={JS_CODE} pyCode={PY_CODE} currentLine={0} variables={{}} />
    )
    expect(container.querySelector('.trace-vars')).toBeNull()
  })

  it('renders with null currentLine (no highlight)', () => {
    const { container } = render(
      <TracePanel jsCode={JS_CODE} pyCode={PY_CODE} currentLine={null} variables={{}} />
    )
    const highlighted = [...container.querySelectorAll('[data-line]')].filter(
      el => el.style.background && el.style.background !== ''
    )
    expect(highlighted).toHaveLength(0)
  })
})
