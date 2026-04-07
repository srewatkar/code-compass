import { describe, it, expect } from 'vitest'

// Step generator functions — extracted for testing
function bubbleSortSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length
  const sorted = new Set()
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j + 1], swapped: false, sorted: [...sorted] })
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        steps.push({ array: [...a], comparing: [j, j + 1], swapped: true, sorted: [...sorted] })
      }
    }
    sorted.add(n - 1 - i)
  }
  sorted.add(0)
  steps.push({ array: [...a], comparing: [], swapped: false, sorted: [...sorted] })
  return steps
}

function selectionSortSteps(arr) {
  const steps = []
  const a = [...arr]
  const n = a.length
  const sorted = new Set()
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      steps.push({ array: [...a], comparing: [minIdx, j], swapped: false, sorted: [...sorted] })
      if (a[j] < a[minIdx]) minIdx = j
    }
    if (minIdx !== i) {
      ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
      steps.push({ array: [...a], comparing: [i, minIdx], swapped: true, sorted: [...sorted] })
    }
    sorted.add(i)
  }
  sorted.add(n - 1)
  steps.push({ array: [...a], comparing: [], swapped: false, sorted: [...sorted] })
  return steps
}

function insertionSortSteps(arr) {
  const steps = []
  const a = [...arr]
  const sorted = new Set([0])
  for (let i = 1; i < a.length; i++) {
    let j = i
    while (j > 0 && a[j - 1] > a[j]) {
      steps.push({ array: [...a], comparing: [j - 1, j], swapped: false, sorted: [...sorted] })
      ;[a[j], a[j - 1]] = [a[j - 1], a[j]]
      steps.push({ array: [...a], comparing: [j - 1, j], swapped: true, sorted: [...sorted] })
      j--
    }
    sorted.add(i)
  }
  steps.push({ array: [...a], comparing: [], swapped: false, sorted: [...Array.from({ length: a.length }, (_, k) => k)] })
  return steps
}

describe('bubbleSortSteps', () => {
  it('final step has fully sorted array', () => {
    const steps = bubbleSortSteps([3, 1, 2])
    const last = steps[steps.length - 1]
    expect(last.array).toEqual([1, 2, 3])
  })

  it('generates steps for already-sorted array', () => {
    const steps = bubbleSortSteps([1, 2, 3])
    expect(steps.length).toBeGreaterThan(0)
    expect(steps[steps.length - 1].array).toEqual([1, 2, 3])
  })
})

describe('selectionSortSteps', () => {
  it('final step has fully sorted array', () => {
    const steps = selectionSortSteps([4, 2, 8, 1])
    const last = steps[steps.length - 1]
    expect(last.array).toEqual([1, 2, 4, 8])
  })
})

describe('insertionSortSteps', () => {
  it('final step has fully sorted array', () => {
    const steps = insertionSortSteps([5, 3, 1, 4, 2])
    const last = steps[steps.length - 1]
    expect(last.array).toEqual([1, 2, 3, 4, 5])
  })
})
