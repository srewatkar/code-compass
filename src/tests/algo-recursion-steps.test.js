import { describe, it, expect } from 'vitest'
import { generateSteps } from '../components/algo/patterns/Recursion'

describe('Recursion (fib5) steps', () => {
  const steps = generateSteps()

  it('returns an array', () => {
    expect(Array.isArray(steps)).toBe(true)
  })

  it('has 22 steps', () => {
    expect(steps.length).toBe(22)
  })

  it('each step has visual.nodes, visual.stack, msg string, log array', () => {
    steps.forEach(step => {
      expect(Array.isArray(step.visual.nodes)).toBe(true)
      expect(Array.isArray(step.visual.stack)).toBe(true)
      expect(typeof step.msg).toBe('string')
      expect(step.msg.length).toBeGreaterThan(0)
      expect(Array.isArray(step.log)).toBe(true)
    })
  })

  it('first step: root is active, stack has fib(5) and length 1', () => {
    const first = steps[0]
    const root = first.visual.nodes.find(n => n.id === 'n5')
    expect(root.state).toBe('active')
    expect(first.visual.stack).toContain('fib(5)')
    expect(first.visual.stack).toHaveLength(1)
  })

  it('last step: root is resolved with value 5, stack is empty', () => {
    const last = steps[steps.length - 1]
    const root = last.visual.nodes.find(n => n.id === 'n5')
    expect(root.state).toBe('resolved')
    expect(root.value).toBe(5)
    expect(last.visual.stack).toHaveLength(0)
  })

  it('last step msg includes 5 (the answer)', () => {
    expect(steps[steps.length - 1].msg).toMatch(/5/)
  })

  it('all 15 nodes are present in every step', () => {
    steps.forEach(step => {
      expect(step.visual.nodes).toHaveLength(15)
    })
  })

  it('fib(4) resolves with value 3 by step 14 (0-indexed)', () => {
    const n4 = steps[13].visual.nodes.find(n => n.id === 'n4')
    expect(n4.state).toBe('resolved')
    expect(n4.value).toBe(3)
  })
})
