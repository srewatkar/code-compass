import { describe, it, expect } from 'vitest'
import { generateSteps as bfsSteps } from '../components/algo/patterns/BFSTemplate'
import { generateSteps as dfsSteps } from '../components/algo/patterns/DFSTemplate'
import { generateSteps as btSteps } from '../components/algo/patterns/Backtracking'
import { generateSteps as tsSteps } from '../components/algo/patterns/TopologicalSort'

function validateSteps(steps) {
  expect(steps.length).toBeGreaterThan(0)
  steps.forEach(step => {
    expect(step.visual).toBeDefined()
    expect(typeof step.msg).toBe('string')
    expect(step.msg.length).toBeGreaterThan(0)
    expect(Array.isArray(step.log)).toBe(true)
  })
}

describe('BFSTemplate steps', () => {
  const steps = bfsSteps()
  it('generates steps', () => validateSteps(steps))
  it('last step has found=true', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.found).toBe(true)
  })
})

describe('DFSTemplate steps', () => {
  const steps = dfsSteps()
  it('generates steps', () => validateSteps(steps))
  it('last step has found=true', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.found).toBe(true)
  })
})

describe('Backtracking steps', () => {
  const steps = btSteps()
  it('generates steps', () => validateSteps(steps))
  it('final step has 6 permutations', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.results.length).toBe(6)
  })
})

describe('TopologicalSort steps', () => {
  const steps = tsSteps()
  it('generates steps', () => validateSteps(steps))
  it('result has all 5 nodes', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.result.length).toBe(5)
  })
  it('E is last in result', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.result[last.visual.result.length - 1]).toBe('E')
  })
})
