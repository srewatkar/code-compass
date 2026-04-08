import { describe, it, expect } from 'vitest'
import { generateSteps as swSteps } from '../components/algo/patterns/SlidingWindow'
import { generateSteps as tpSteps } from '../components/algo/patterns/TwoPointers'
import { generateSteps as fspSteps } from '../components/algo/patterns/FastSlowPointers'
import { generateSteps as psSteps } from '../components/algo/patterns/PrefixSum'
import { generateSteps as msSteps } from '../components/algo/patterns/MonotonicStack'

function validateSteps(steps) {
  expect(steps.length).toBeGreaterThan(0)
  steps.forEach(step => {
    expect(step.visual).toBeDefined()
    expect(typeof step.msg).toBe('string')
    expect(step.msg.length).toBeGreaterThan(0)
    expect(Array.isArray(step.log)).toBe(true)
  })
}

describe('SlidingWindow steps', () => {
  const steps = swSteps()
  it('generates steps', () => validateSteps(steps))
  it('last step has max=9', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.maxSum).toBe(9)
  })
})

describe('TwoPointers steps', () => {
  const steps = tpSteps()
  it('generates steps', () => validateSteps(steps))
  it('last step has found=true', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.found).toBe(true)
  })
})

describe('FastSlowPointers steps', () => {
  const steps = fspSteps()
  it('generates steps', () => validateSteps(steps))
  it('last step detects cycle (slow === fast)', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.met).toBe(true)
  })
})

describe('PrefixSum steps', () => {
  const steps = psSteps()
  it('generates steps', () => validateSteps(steps))
  it('query result for range [2,5] = 19', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.queryResult).toBe(19)
  })
})

describe('MonotonicStack steps', () => {
  const steps = msSteps()
  it('generates steps', () => validateSteps(steps))
  it('final result is [5,5,6,6,-1,-1]', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.result).toEqual([5, 5, 6, 6, -1, -1])
  })
})
