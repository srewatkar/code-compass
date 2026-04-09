import { describe, it, expect } from 'vitest'
import { generateSteps as hashMapSteps } from '../components/algo/patterns/HashMap'
import { generateSteps as mergeSteps } from '../components/algo/patterns/MergeIntervals'
import { generateSteps as heapSteps } from '../components/algo/patterns/Heap'

function validateSteps(steps) {
  expect(Array.isArray(steps)).toBe(true)
  expect(steps.length).toBeGreaterThan(0)
  steps.forEach(step => {
    expect(step.visual).toBeDefined()
    expect(typeof step.msg).toBe('string')
    expect(step.msg.length).toBeGreaterThan(0)
    expect(Array.isArray(step.log)).toBe(true)
  })
}

describe('HashMap steps', () => {
  const steps = hashMapSteps()

  it('returns an array', () => {
    expect(Array.isArray(steps)).toBe(true)
  })

  it('has expected number of steps', () => {
    // init + i=0 add + i=1 found + done = 4 steps
    expect(steps.length).toBe(4)
  })

  it('first step has a msg string', () => {
    expect(typeof steps[0].msg).toBe('string')
    expect(steps[0].msg.length).toBeGreaterThan(0)
  })

  it('last step msg includes "Found"', () => {
    const last = steps[steps.length - 1]
    expect(last.msg).toMatch(/Found|Done/i)
  })

  it('each step has visual, msg, log', () => {
    validateSteps(steps)
  })

  it('last step has foundPair [0,1]', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.foundPair).toEqual([0, 1])
  })
  it('each step has currentLine (number or null) and variables (object)', () => {
    steps.forEach(step => {
      expect(step.currentLine === null || typeof step.currentLine === 'number').toBe(true)
      expect(typeof step.variables).toBe('object')
    })
  })
})

describe('MergeIntervals steps', () => {
  const steps = mergeSteps()

  it('returns an array', () => {
    expect(Array.isArray(steps)).toBe(true)
  })

  it('has expected number of steps', () => {
    // init + sort + take[1,4] + merge[2,6] + add[8,10] + add[15,18] + done = 7 steps
    expect(steps.length).toBe(7)
  })

  it('first step has a msg string', () => {
    expect(typeof steps[0].msg).toBe('string')
    expect(steps[0].msg.length).toBeGreaterThan(0)
  })

  it('last step msg includes "Done"', () => {
    const last = steps[steps.length - 1]
    expect(last.msg).toMatch(/Done/i)
  })

  it('each step has visual, msg, log', () => {
    validateSteps(steps)
  })

  it('last step has merged result [[1,6],[8,10],[15,18]]', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.merged).toEqual([[1, 6], [8, 10], [15, 18]])
  })
  it('each step has currentLine (number or null) and variables (object)', () => {
    steps.forEach(step => {
      expect(step.currentLine === null || typeof step.currentLine === 'number').toBe(true)
      expect(typeof step.variables).toBe('object')
    })
  })
})

describe('Heap steps', () => {
  const steps = heapSteps()

  it('returns an array', () => {
    expect(Array.isArray(steps)).toBe(true)
  })

  it('has expected number of steps', () => {
    // init + 8 elements + done = 10 steps
    expect(steps.length).toBe(10)
  })

  it('first step has a msg string', () => {
    expect(typeof steps[0].msg).toBe('string')
    expect(steps[0].msg.length).toBeGreaterThan(0)
  })

  it('last step msg includes "Done"', () => {
    const last = steps[steps.length - 1]
    expect(last.msg).toMatch(/Done/i)
  })

  it('each step has visual, msg, log', () => {
    validateSteps(steps)
  })

  it('last step heap contains k=3 largest elements [5,6,9]', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.heap).toEqual([5, 6, 9])
  })
  it('each step has currentLine (number or null) and variables (object)', () => {
    steps.forEach(step => {
      expect(step.currentLine === null || typeof step.currentLine === 'number').toBe(true)
      expect(typeof step.variables).toBe('object')
    })
  })
})
