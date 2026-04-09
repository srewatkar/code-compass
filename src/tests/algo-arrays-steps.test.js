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
  it('each step has currentLine (number or null) and variables (object)', () => {
    steps.forEach(step => {
      expect(step.currentLine === null || typeof step.currentLine === 'number').toBe(true)
      expect(typeof step.variables).toBe('object')
    })
  })
  it('step 0 traces line 2 (init window loop)', () => {
    expect(steps[0].currentLine).toBe(2)
    expect(steps[0].variables.windowSum).toBe(8)
  })
  it('step 1 traces line 6 (slide: update windowSum)', () => {
    expect(steps[1].currentLine).toBe(6)
    expect(steps[1].variables.i).toBe(3)
  })
})

describe('TwoPointers steps', () => {
  const steps = tpSteps()
  it('generates steps', () => validateSteps(steps))
  it('last step has found=true', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.found).toBe(true)
  })
  it('each step has currentLine (number or null) and variables (object)', () => {
    steps.forEach(step => {
      expect(step.currentLine === null || typeof step.currentLine === 'number').toBe(true)
      expect(typeof step.variables).toBe('object')
    })
  })
})

describe('FastSlowPointers steps', () => {
  const steps = fspSteps()
  it('generates steps', () => validateSteps(steps))
  it('last step detects cycle (slow === fast)', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.met).toBe(true)
  })
  it('each step has currentLine (number or null) and variables (object)', () => {
    steps.forEach(step => {
      expect(step.currentLine === null || typeof step.currentLine === 'number').toBe(true)
      expect(typeof step.variables).toBe('object')
    })
  })
})

describe('PrefixSum steps', () => {
  const steps = psSteps()
  it('generates steps', () => validateSteps(steps))
  it('query result for range [2,5] = 19', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.queryResult).toBe(19)
  })
  it('each step has currentLine (number or null) and variables (object)', () => {
    steps.forEach(step => {
      expect(step.currentLine === null || typeof step.currentLine === 'number').toBe(true)
      expect(typeof step.variables).toBe('object')
    })
  })
})

describe('MonotonicStack steps', () => {
  const steps = msSteps()
  it('generates steps', () => validateSteps(steps))
  it('final result is [5,5,6,6,-1,-1]', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.result).toEqual([5, 5, 6, 6, -1, -1])
  })
  it('each step has currentLine (number or null) and variables (object)', () => {
    steps.forEach(step => {
      expect(step.currentLine === null || typeof step.currentLine === 'number').toBe(true)
      expect(typeof step.variables).toBe('object')
    })
  })
})
