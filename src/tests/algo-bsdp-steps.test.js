import { describe, it, expect } from 'vitest'
import { generateSteps as bsSteps } from '../components/algo/patterns/BinarySearch'
import { generateSteps as bsaSteps } from '../components/algo/patterns/BinarySearchOnAnswer'
import { generateSteps as memoSteps } from '../components/algo/patterns/DP1DMemo'
import { generateSteps as tabSteps } from '../components/algo/patterns/DP1DTab'
import { generateSteps as dp2dSteps } from '../components/algo/patterns/DP2D'

function validateSteps(steps) {
  expect(steps.length).toBeGreaterThan(0)
  steps.forEach(step => {
    expect(step.visual).toBeDefined()
    expect(typeof step.msg).toBe('string')
    expect(step.msg.length).toBeGreaterThan(0)
    expect(Array.isArray(step.log)).toBe(true)
  })
}

describe('BinarySearch steps', () => {
  const steps = bsSteps()
  it('generates steps', () => validateSteps(steps))
  it('last step has found=true', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.found).toBe(true)
  })
  it('finds target 13 at index 6', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.foundIdx).toBe(6)
  })
})

describe('BinarySearchOnAnswer steps', () => {
  const steps = bsaSteps()
  it('generates steps', () => validateSteps(steps))
  it('answer is 6', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.answer).toBe(6)
  })
})

describe('DP1DMemo steps', () => {
  const steps = memoSteps()
  it('generates steps', () => validateSteps(steps))
  it('fib(6) = 8', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.result).toBe(8)
  })
})

describe('DP1DTab steps', () => {
  const steps = tabSteps()
  it('generates steps', () => validateSteps(steps))
  it('climbStairs(6) = 13', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.dp[6]).toBe(13)
  })
})

describe('DP2D steps', () => {
  const steps = dp2dSteps()
  it('generates steps', () => validateSteps(steps))
  it('LCS("ABCD","ACD") = 3', () => {
    const last = steps[steps.length - 1]
    expect(last.visual.answer).toBe(3)
  })
})
